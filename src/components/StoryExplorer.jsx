import React, { useState, useMemo, useRef } from 'react';
import {
  BookOpen,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Layers,
  Link as LinkIcon,
  X,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import StoryChapterCard from './StoryChapterCard.jsx';
import { getStories } from '../data/storyEngine.js';

export default function StoryExplorer({ onSelectReceipt }) {
  const { chapters, stats } = useMemo(() => getStories(), []);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0] || null);
  const detailRef = useRef(null);

  const handleSelectChapter = (chapter) => {
    setSelectedChapter(chapter);
    // Smooth scroll down slightly to detail view if on mobile/small screen
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="stories"
      style={{
        padding: '100px 0 120px 0',
        background: 'linear-gradient(180deg, #080B16 0%, #0B1120 50%, #080B16 100%)',
        position: 'relative',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Background ambient lighting glows */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(37, 99, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(37, 99, 255, 0.12)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              color: '#22D3EE',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '18px',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={13} color="#22D3EE" />
            Phase 05 • Narrative Story Engine
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '18px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
              background: 'linear-gradient(135deg, #FFFFFF 30%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Life, Connected Into Chapters
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#94A3B8',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            Individual receipts and daily transactions become meaningful life chapters when viewed through verified connection signals. Explore {stats.totalChapters} synthesized chapters discovered across {stats.momentsConnected} connected moments.
          </p>
        </div>

        {/* Aggregate Calculated Stats Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22D3EE', lineHeight: 1 }}>
              {stats.totalChapters}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Chapters Discovered
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60A5FA', lineHeight: 1 }}>
              {stats.momentsConnected}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Moments Connected
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#C084FC', lineHeight: 1 }}>
              {stats.categoriesRepresented}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Categories Represented
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34D399', lineHeight: 1 }}>
              {stats.sourcesRepresented}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Datasets Synthesized
            </div>
          </div>
        </div>

        {/* Interactive Active Chapter Immersion Stage */}
        {selectedChapter && (
          <div
            ref={detailRef}
            style={{
              marginBottom: '56px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(37, 99, 255, 0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Cyan Accent bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #22D3EE, #2563FF, #8B5CF6)',
              }}
            />

            {/* Stage Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: 'linear-gradient(135deg, rgba(37, 99, 255, 0.3), rgba(34, 211, 238, 0.3))',
                      color: '#22D3EE',
                      border: '1px solid rgba(34, 211, 238, 0.4)',
                    }}
                  >
                    ACTIVE CHAPTER {selectedChapter.number}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                    {selectedChapter.dateDisplay}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>•</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{selectedChapter.source}</span>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                  }}
                >
                  {selectedChapter.title}
                </h3>
              </div>

              {/* Spend / Quick Metric */}
              <div
                style={{
                  textAlign: 'right',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Chapter Scope
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#34D399', marginTop: '2px' }}>
                  {selectedChapter.totalAmountFormatted || `${selectedChapter.receiptCount} Audio Streams`}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                  {selectedChapter.receiptCount} moments • {selectedChapter.connectionCount} connections
                </div>
              </div>
            </div>

            {/* Narrative Box */}
            <div
              style={{
                background: 'rgba(37, 99, 255, 0.06)',
                border: '1px solid rgba(37, 99, 255, 0.18)',
                borderRadius: '14px',
                padding: '18px 24px',
                marginBottom: '28px',
                lineHeight: 1.7,
                fontSize: '0.98rem',
                color: '#E2E8F0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Info size={18} color="#22D3EE" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#22D3EE' }}>Factual Chapter Narrative: </strong>
                  {selectedChapter.narrative}
                </div>
              </div>
            </div>

            {/* Connection Rationale Tags */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Verified Connection Signals in this Chapter:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedChapter.distinctReasons.map((reason, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#CBD5E1',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22D3EE' }} />
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            {/* Chronological Moments Sequence */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Connected Moments Sequence ({selectedChapter.receipts.length} Receipts)
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Click any receipt to open full inspection modal
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '14px',
                }}
              >
                {selectedChapter.receipts.map((receipt, idx) => (
                  <div
                    key={receipt.id}
                    onClick={() => onSelectReceipt && onSelectReceipt(receipt)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#22D3EE';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'rgba(34, 211, 238, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}
                  >
                    <div>
                      {/* Top Row: Sequence # + Time/Date */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#60A5FA',
                            background: 'rgba(37, 99, 255, 0.15)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          MOMENT #{idx + 1}
                        </span>

                        <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={11} color="#94A3B8" />
                          {receipt.time || receipt.date}
                        </span>
                      </div>

                      {/* Receipt Title */}
                      <h4
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          marginBottom: '4px',
                          lineHeight: 1.3,
                        }}
                      >
                        {receipt.title}
                      </h4>

                      {/* Subtitle / Note */}
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#94A3B8',
                          marginBottom: '12px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {receipt.subtitle}
                      </p>
                    </div>

                    {/* Bottom Row: Amount / Location + Detail link */}
                    <div
                      style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingTop: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: receipt.numericAmount > 0 ? '#34D399' : '#C084FC' }}>
                        {receipt.amount || 'Audio Stream'}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.72rem',
                          color: '#22D3EE',
                          fontWeight: 600,
                        }}
                      >
                        <span>Inspect</span>
                        <ExternalLink size={11} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Chapters Grid */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '20px',
              fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
            }}
          >
            All Discovered Life Chapters ({chapters.length})
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px',
            }}
          >
            {chapters.map((chapter) => (
              <StoryChapterCard
                key={chapter.id}
                chapter={chapter}
                isSelected={selectedChapter?.id === chapter.id}
                onSelect={handleSelectChapter}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
