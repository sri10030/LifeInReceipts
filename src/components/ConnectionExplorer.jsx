import React, { useState, useMemo } from 'react';
import { getConnections } from '../data/connectionEngine.js';
import ConnectionCard from './ConnectionCard.jsx';
import {
  GitMerge,
  Zap,
  Clock,
  MapPin,
  Layers,
  Filter,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

const TYPE_LABELS = {
  all: 'All Connections',
  same_location: 'Same Location',
  temporal_session: 'Session Cluster',
  same_date: 'Same Day',
};

const STRENGTH_LABELS = {
  all: 'All Strengths',
  strong: 'Strong Only',
  possible: 'Possible Only',
};

export default function ConnectionExplorer({ onSelectReceipt }) {
  const { connections, stats } = useMemo(() => getConnections(), []);

  const [typeFilter, setTypeFilter] = useState('all');
  const [strengthFilter, setStrengthFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    let result = connections;
    if (typeFilter !== 'all') result = result.filter(c => c.type === typeFilter);
    if (strengthFilter !== 'all') result = result.filter(c => c.strength === strengthFilter);
    return result;
  }, [connections, typeFilter, strengthFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleReset = () => {
    setTypeFilter('all');
    setStrengthFilter('all');
    setVisibleCount(12);
  };

  return (
    <section
      id="connections-explorer"
      style={{
        padding: '100px 0',
        background: '#0F172A',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glows */}
      <div
        className="glow-blob-purple"
        style={{ top: '10%', right: '5%', opacity: 0.4, width: '500px', height: '500px' }}
      />
      <div
        className="glow-blob-blue"
        style={{ bottom: '15%', left: '3%', opacity: 0.35, width: '400px', height: '400px' }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 56px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              color: '#8B5CF6',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}
          >
            <GitMerge size={14} /> CONNECTION ENGINE
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            Some moments were{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              closer than they looked.
            </span>
          </h2>

          <p style={{ fontSize: '1.08rem', color: '#94A3B8', lineHeight: 1.6 }}>
            The Connection Engine analyzed{' '}
            <strong style={{ color: '#E2E8F0' }}>3,000 real receipts</strong> across 3 datasets and
            discovered relationships between separate moments in your digital life.
          </p>
        </div>

        {/* Real Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {[
            { label: 'Connections Discovered', value: stats.total, color: '#22D3EE', icon: GitMerge },
            { label: 'Strong Connections', value: stats.strong, color: '#8B5CF6', icon: Zap },
            { label: 'Possible Connections', value: stats.possible, color: '#60A5FA', icon: Layers },
            { label: 'Categories Involved', value: stats.categoriesInvolved, color: '#2563FF', icon: Filter },
            { label: 'Datasets Linked', value: stats.sourcesInvolved, color: '#F59E0B', icon: Sparkles },
          ].map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${color}22`,
                borderRadius: '18px',
                padding: '18px 16px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${color}18`,
                  color,
                  marginBottom: '10px',
                }}
              >
                <Icon size={18} />
              </div>
              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color,
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, lineHeight: 1.3 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* How the engine works — transparent explainer */}
        <div
          style={{
            background: 'rgba(37, 99, 255, 0.08)',
            border: '1px solid rgba(37, 99, 255, 0.25)',
            borderRadius: '18px',
            padding: '20px 24px',
            marginBottom: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <Sparkles size={18} color="#22D3EE" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#22D3EE' }}>HOW CONNECTIONS ARE SCORED:</span>
          </div>
          {[
            { signal: 'Same date', pts: '+3 pts' },
            { signal: 'Same location / state', pts: '+3 pts' },
            { signal: 'Listening session (< 30 min)', pts: '+2 pts' },
            { signal: 'Meaningful category pair', pts: '+2 pts' },
            { signal: 'Temporal proximity (< 30 min)', pts: '+2 pts' },
            { signal: 'High-value day', pts: '+1 pt' },
          ].map(({ signal, pts }) => (
            <span
              key={signal}
              style={{
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#CBD5E1',
              }}
            >
              <strong style={{ color: '#22D3EE' }}>{pts}</strong> {signal}
            </span>
          ))}
          <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: 'auto' }}>
            Score ≥5 = Strong · Score 3-4 = Possible
          </span>
        </div>

        {/* Filter Toolbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px',
            padding: '14px 20px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
            {/* Type filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GitMerge size={14} color="#8B5CF6" />
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setVisibleCount(12); }}
                style={{
                  background: 'rgba(8, 11, 22, 0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  color: '#E2E8F0',
                  fontSize: '0.82rem',
                  padding: '6px 12px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {Object.entries(TYPE_LABELS).map(([v, l]) => (
                  <option key={v} value={v} style={{ background: '#0F172A' }}>
                    {l}
                    {v !== 'all' && stats.typeBreakdown[v] ? ` (${stats.typeBreakdown[v]})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Strength filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={14} color="#22D3EE" />
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Strength:</span>
              <select
                value={strengthFilter}
                onChange={(e) => { setStrengthFilter(e.target.value); setVisibleCount(12); }}
                style={{
                  background: 'rgba(8, 11, 22, 0.9)',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  borderRadius: '10px',
                  color: '#22D3EE',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  padding: '6px 12px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {Object.entries(STRENGTH_LABELS).map(([v, l]) => (
                  <option key={v} value={v} style={{ background: '#0F172A', color: '#FFF' }}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result count + reset */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
              Showing{' '}
              <strong style={{ color: '#22D3EE' }}>{Math.min(visibleCount, filtered.length)}</strong>{' '}
              of <strong style={{ color: '#FFF' }}>{filtered.length}</strong> connections
            </span>
            {(typeFilter !== 'all' || strengthFilter !== 'all') && (
              <button
                onClick={handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#F87171',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Connection Cards Grid */}
        {filtered.length > 0 ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              {visible.map((connection) => (
                <ConnectionCard
                  key={connection.id}
                  connection={connection}
                  onSelectReceipt={onSelectReceipt}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="btn-primary-blue"
                  style={{ padding: '14px 32px', borderRadius: '9999px', fontSize: '0.95rem' }}
                >
                  <ChevronDown size={16} /> Discover More Connections (+12)
                </button>
                <p style={{ marginTop: '10px', fontSize: '0.78rem', color: '#64748B' }}>
                  {visibleCount} of {filtered.length} connections shown
                </p>
              </div>
            )}
          </>
        ) : (
          /* Empty state */
          <div
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px dashed rgba(139, 92, 246, 0.3)',
              borderRadius: '24px',
            }}
          >
            <GitMerge size={40} color="#8B5CF6" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
              No connections match those filters
            </h3>
            <button onClick={handleReset} className="btn-primary-blue" style={{ marginTop: '16px' }}>
              <RotateCcw size={16} /> Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
