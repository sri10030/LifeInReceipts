/**
 * Connection Engine — Phase 4 Core Module
 *
 * Strategy overview (based on actual data analysis):
 *
 * Dataset date ranges:
 *   - India Transact MultiFacet:  2022-04-17 to 2024-04-14
 *   - Daily Household Log:         2017-01-09 to 2018-12-08
 *   - Spotify Listening History:   2013-07-07 to 2015-08-27
 *
 * IMPORTANT: The three datasets cover DIFFERENT time periods with ZERO date overlap.
 * Therefore cross-source temporal connections are NOT possible with this real data.
 * All connections are within-dataset but across different CATEGORIES.
 *
 * Connection Signals Used (from real available fields):
 *
 * 1. SAME_DATE — two receipts share same date, different categories  (any source)
 * 2. SAME_LOCATION — two MultiFacet receipts share the same Indian state
 * 3. TEMPORAL_SESSION — Spotify tracks within the same listening session (< 30 min apart)
 * 4. CATEGORY_PAIR — semantically meaningful category combinations
 * 5. HIGH_VALUE_DAY — two+ high-value transactions on the same day (MF)
 *
 * Scoring (additive, transparent):
 *   Same date:              +3 pts
 *   Same location/state:   +3 pts
 *   Temporal proximity:    +2 pts (< 30 min) / +1 pt (< 2h)
 *   Meaningful category pair: +2 pts
 *   Both high-value:       +1 pt
 *
 *   Strong connection:   >= 5 pts
 *   Possible connection: 3-4 pts
 *   (< 3 pts are excluded entirely)
 *
 * Performance:
 *   - Receipts grouped by date and state BEFORE pairwise comparison.
 *   - Only receipts within same group are compared (avoids O(n²) across all 3000).
 *   - Spotify sessions grouped by session buckets (30-min windows).
 *   - Total candidate pairs: bounded by group sizes, not total n.
 *   - Deduplication: pairs stored as "smaller-id__larger-id".
 *   - Max connections returned: 300 (capped for UI performance).
 */

import { NORMALIZED_RECEIPTS } from './normalizedReceipts.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Try to parse a normalized receipt's timestamp into a JS Date.
 * Handles: "2023-06-10T12:09:00", "15/09/2018 06:34:17", "2013-07-08 03:17:52"
 */
function parseReceiptDate(r) {
  const raw = r.rawTimestamp;
  if (!raw) return null;

  // ISO-ish: "2023-06-10T12:09:00"
  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) {
    const d = new Date(raw);
    return isNaN(d) ? null : d;
  }

  // Space-separated ISO: "2013-07-08 03:17:52"
  if (/^\d{4}-\d{2}-\d{2} /.test(raw)) {
    const d = new Date(raw.replace(' ', 'T'));
    return isNaN(d) ? null : d;
  }

  // DD/MM/YYYY HH:MM:SS  or  DD/MM/YYYY
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(raw)) {
    const parts = raw.split(' ');
    const [day, month, year] = parts[0].split('/');
    const time = parts[1] || '12:00:00';
    const d = new Date(`${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}T${time}`);
    return isNaN(d) ? null : d;
  }

  // M/D/YYYY HH:MM (US-style from MultiFacet)
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(raw)) {
    const d = new Date(raw);
    return isNaN(d) ? null : d;
  }

  return null;
}

/** Returns YYYY-MM-DD string from a Date, or null */
function toDateKey(d) {
  if (!d) return null;
  return d.toISOString().slice(0, 10);
}

/** Returns diff in minutes between two Date objects */
function diffMinutes(a, b) {
  return Math.abs(a - b) / 60000;
}

// ---------------------------------------------------------------------------
// Meaningful category pair definitions (only real categories in data)
// ---------------------------------------------------------------------------
const MEANINGFUL_PAIRS = new Set([
  'Food & Dining|Transportation',
  'Transportation|Food & Dining',
  'Food & Dining|Subscriptions',
  'Subscriptions|Food & Dining',
  'Entertainment & Media|Food & Dining',
  'Food & Dining|Entertainment & Media',
  'Transportation|Subscriptions',
  'Subscriptions|Transportation',
  'Food & Dining|Household',
  'Household|Food & Dining',
  'Food & Dining|Festivals & Culture',
  'Festivals & Culture|Food & Dining',
  'Salary|Food & Dining',
  'Food & Dining|Salary',
  'Salary|Household',
  'Household|Salary',
  'Entertainment & Media|Travel & Places',
  'Travel & Places|Entertainment & Media',
  'Online Shopping|Travel & Places',
  'Travel & Places|Online Shopping',
  'Health & Fitness|Food & Dining',
  'Food & Dining|Health & Fitness',
  'Transportation|Travel & Places',
  'Travel & Places|Transportation',
  'Music & Audio|Entertainment & Media',
  'Entertainment & Media|Music & Audio',
  'Transportation|Food & Dining',
  'Family & Personal|Food & Dining',
  'Food & Dining|Family & Personal',
]);

function isMeaningfulPair(catA, catB) {
  return MEANINGFUL_PAIRS.has(`${catA}|${catB}`) || MEANINGFUL_PAIRS.has(`${catB}|${catA}`);
}

// ---------------------------------------------------------------------------
// Connection Explanation Builder
// ---------------------------------------------------------------------------
function buildReasons(a, b, signals) {
  const reasons = [];
  if (signals.sameDate) reasons.push(`Same date (${signals.dateKey})`);
  if (signals.sameState) reasons.push(`Same location: ${signals.state}`);
  if (signals.temporalProximity) {
    const mins = Math.round(signals.minutesDiff);
    if (mins < 60) reasons.push(`${mins} minutes apart`);
    else reasons.push(`${Math.round(mins / 60)}h apart same day`);
  }
  if (signals.meaningfulCategories) reasons.push(`${a.category} + ${b.category}`);
  if (signals.sameArtist) reasons.push(`Same artist: ${signals.artist}`);
  if (signals.sameSession) reasons.push('Same listening session');
  if (signals.highValueDay) reasons.push('High-value transactions that day');
  return reasons;
}

// ---------------------------------------------------------------------------
// Connection Types
// ---------------------------------------------------------------------------
export const CONNECTION_TYPES = {
  SAME_DATE: 'same_date',
  SAME_LOCATION: 'same_location',
  TEMPORAL_SESSION: 'temporal_session',
  CATEGORY_PAIR: 'category_pair',
  HIGH_VALUE_DAY: 'high_value_day',
};

// ---------------------------------------------------------------------------
// Main Engine
// ---------------------------------------------------------------------------
export function buildConnectionEngine(receipts = NORMALIZED_RECEIPTS) {
  const seen = new Set();       // dedup: "idA__idB"
  const connections = [];

  // Pre-attach parsed dates to each receipt (avoid re-parsing)
  const withDates = receipts.map(r => ({
    ...r,
    _parsedDate: parseReceiptDate(r),
  }));

  // ---------------------------------------------------------------------------
  // STEP 1 — Group by sourceDataset first (no cross-dataset date overlap)
  // ---------------------------------------------------------------------------
  const bySource = {};
  withDates.forEach(r => {
    const src = r.sourceDataset;
    if (!bySource[src]) bySource[src] = [];
    bySource[src].push(r);
  });

  // ---------------------------------------------------------------------------
  // STEP 2 — Within each source, group by date (YYYY-MM-DD)
  // ---------------------------------------------------------------------------
  function groupByDate(recs) {
    const groups = {};
    recs.forEach(r => {
      const key = r._parsedDate ? toDateKey(r._parsedDate) : r.date;
      if (!key) return;
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    });
    return groups;
  }

  // ---------------------------------------------------------------------------
  // Helper to add a connection (with dedup)
  // ---------------------------------------------------------------------------
  function tryAdd(a, b, score, type, reasons) {
    if (a.id === b.id) return;
    const key = [a.id, b.id].sort().join('__');
    if (seen.has(key)) return;
    seen.add(key);
    if (score < 3) return; // below threshold
    const strength = score >= 5 ? 'strong' : 'possible';
    connections.push({
      id: key,
      receiptA: a,
      receiptB: b,
      score,
      strength,
      type,
      reasons,
      category: `${a.category} ↔ ${b.category}`,
    });
  }

  // ---------------------------------------------------------------------------
  // STEP 3A — HOUSEHOLD LOG: Same-date multi-category connections
  // Rich for this because many categories land on the same real day.
  // ---------------------------------------------------------------------------
  const hhRecs = bySource['Daily Household Log'] || [];
  const hhByDate = groupByDate(hhRecs);

  for (const [dateKey, dayRecs] of Object.entries(hhByDate)) {
    if (dayRecs.length < 2) continue;

    // Limit group size to avoid combinatorial explosion
    const sample = dayRecs.slice(0, 12);

    for (let i = 0; i < sample.length; i++) {
      for (let j = i + 1; j < sample.length; j++) {
        const a = sample[i];
        const b = sample[j];
        if (a.category === b.category) continue; // same category = boring

        let score = 3; // base: same date
        const signals = { sameDate: true, dateKey };
        let type = CONNECTION_TYPES.SAME_DATE;

        // Temporal proximity (HH records have real timestamps)
        if (a._parsedDate && b._parsedDate) {
          const mins = diffMinutes(a._parsedDate, b._parsedDate);
          signals.minutesDiff = mins;
          if (mins < 30) {
            score += 2;
            signals.temporalProximity = true;
            type = CONNECTION_TYPES.TEMPORAL_SESSION;
          } else if (mins < 120) {
            score += 1;
            signals.temporalProximity = true;
          }
        }

        // Meaningful category pair
        if (isMeaningfulPair(a.category, b.category)) {
          score += 2;
          signals.meaningfulCategories = true;
        }

        // High value
        if (a.numericAmount > 1000 && b.numericAmount > 1000) {
          score += 1;
          signals.highValueDay = true;
        }

        const reasons = buildReasons(a, b, signals);
        tryAdd(a, b, score, type, reasons);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // STEP 3B — INDIA MULTIFACET: Same-state + same-date connections
  // 994 of 1000 records have real Indian state data.
  // ---------------------------------------------------------------------------
  const mfRecs = bySource['India Transact MultiFacet'] || [];

  // Group by date
  const mfByDate = groupByDate(mfRecs);

  for (const [dateKey, dayRecs] of Object.entries(mfByDate)) {
    if (dayRecs.length < 2) continue;
    const sample = dayRecs.slice(0, 15);

    for (let i = 0; i < sample.length; i++) {
      for (let j = i + 1; j < sample.length; j++) {
        const a = sample[i];
        const b = sample[j];
        if (a.category === b.category) continue;

        let score = 3;
        const signals = { sameDate: true, dateKey };
        let type = CONNECTION_TYPES.SAME_DATE;

        // State match
        const stateA = a.metadata?.state;
        const stateB = b.metadata?.state;
        if (stateA && stateB && stateA !== 'N/A' && stateA === stateB) {
          score += 3;
          signals.sameState = true;
          signals.state = stateA;
          type = CONNECTION_TYPES.SAME_LOCATION;
        }

        // Temporal proximity
        if (a._parsedDate && b._parsedDate) {
          const mins = diffMinutes(a._parsedDate, b._parsedDate);
          signals.minutesDiff = mins;
          if (mins < 30) {
            score += 2;
            signals.temporalProximity = true;
          } else if (mins < 120) {
            score += 1;
            signals.temporalProximity = true;
          }
        }

        // Meaningful category pair
        if (isMeaningfulPair(a.category, b.category)) {
          score += 2;
          signals.meaningfulCategories = true;
        }

        const reasons = buildReasons(a, b, signals);
        tryAdd(a, b, score, type, reasons);
      }
    }
  }

  // Also: same-STATE, different dates (location-based only)
  const mfByState = {};
  mfRecs.forEach(r => {
    const state = r.metadata?.state;
    if (state && state !== 'N/A') {
      if (!mfByState[state]) mfByState[state] = [];
      mfByState[state].push(r);
    }
  });

  for (const [state, stateRecs] of Object.entries(mfByState)) {
    if (stateRecs.length < 2) continue;
    // Take up to 8 per state, only different categories
    const sample = stateRecs.slice(0, 8);
    for (let i = 0; i < sample.length; i++) {
      for (let j = i + 1; j < sample.length; j++) {
        const a = sample[i];
        const b = sample[j];
        if (a.category === b.category) continue;

        // Only allow state-only if score can reach 3
        let score = 0;
        const signals = { sameState: true, state };
        let type = CONNECTION_TYPES.SAME_LOCATION;

        score += 3; // same state

        if (isMeaningfulPair(a.category, b.category)) {
          score += 2;
          signals.meaningfulCategories = true;
        }

        const reasons = buildReasons(a, b, signals);
        tryAdd(a, b, score, type, reasons);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // STEP 3C — SPOTIFY: Session-based connections (same listening session)
  // Group by 30-minute session buckets.
  // ---------------------------------------------------------------------------
  const spRecs = bySource['Spotify Listening History'] || [];
  const parsedSp = spRecs
    .filter(r => r._parsedDate)
    .sort((a, b) => a._parsedDate - b._parsedDate);

  // Build sessions: new session if > 30 min gap
  const spSessions = [];
  let currentSession = [];
  for (let i = 0; i < parsedSp.length; i++) {
    const r = parsedSp[i];
    if (currentSession.length === 0) {
      currentSession.push(r);
    } else {
      const prev = currentSession[currentSession.length - 1];
      const mins = diffMinutes(r._parsedDate, prev._parsedDate);
      if (mins <= 30) {
        currentSession.push(r);
      } else {
        if (currentSession.length >= 2) spSessions.push(currentSession);
        currentSession = [r];
      }
    }
  }
  if (currentSession.length >= 2) spSessions.push(currentSession);

  // Within each session, connect adjacent + skip-one pairs
  for (const session of spSessions) {
    const sample = session.slice(0, 10); // max 10 per session
    for (let i = 0; i < sample.length - 1; i++) {
      const a = sample[i];
      const b = sample[i + 1];
      const mins = diffMinutes(a._parsedDate, b._parsedDate);

      const signals = {
        sameSession: true,
        temporalProximity: true,
        minutesDiff: mins,
      };

      // Same artist is a strong bonus
      const artistA = a.metadata?.artist;
      const artistB = b.metadata?.artist;
      if (artistA && artistB && artistA === artistB) {
        signals.sameArtist = true;
        signals.artist = artistA;
      }

      let score = 3; // base: session
      if (mins < 5) score += 2;
      else if (mins < 15) score += 1;
      if (signals.sameArtist) score += 2;

      const reasons = buildReasons(a, b, signals);
      tryAdd(a, b, score, CONNECTION_TYPES.TEMPORAL_SESSION, reasons);
    }
  }

  // ---------------------------------------------------------------------------
  // Sort by score descending, cap at 300 for UI
  // ---------------------------------------------------------------------------
  connections.sort((a, b) => b.score - a.score);
  const final = connections.slice(0, 300);

  // ---------------------------------------------------------------------------
  // Build summary statistics
  // ---------------------------------------------------------------------------
  const strongCount = final.filter(c => c.strength === 'strong').length;
  const possibleCount = final.filter(c => c.strength === 'possible').length;

  const involvedCategories = new Set();
  final.forEach(c => {
    involvedCategories.add(c.receiptA.category);
    involvedCategories.add(c.receiptB.category);
  });

  const involvedSources = new Set();
  final.forEach(c => {
    involvedSources.add(c.receiptA.sourceDataset);
    involvedSources.add(c.receiptB.sourceDataset);
  });

  const typeBreakdown = {};
  final.forEach(c => {
    typeBreakdown[c.type] = (typeBreakdown[c.type] || 0) + 1;
  });

  return {
    connections: final,
    stats: {
      total: final.length,
      strong: strongCount,
      possible: possibleCount,
      categoriesInvolved: involvedCategories.size,
      sourcesInvolved: involvedSources.size,
      typeBreakdown,
    },
  };
}

// Singleton memoized result — computed once, reused everywhere
let _cachedResult = null;

export function getConnections() {
  if (!_cachedResult) {
    _cachedResult = buildConnectionEngine();
  }
  return _cachedResult;
}
