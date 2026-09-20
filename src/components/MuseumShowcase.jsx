import React from 'react';
import { Bookmark, Clock, Music, MapPin, ShoppingBag, ArrowRight } from 'lucide-react';

const exhibits = [
  {
    id: 'ex-1',
    badge: 'EXHIBIT #01',
    title: 'The Midnight Espresso Run',
    timeframe: 'Sept 14 • 11:42 PM - 12:30 AM',
    story: 'Connected 1 song, 1 coffee purchase, and 1 location ping into a late-night focus session chapter.',
    moments: [
      { icon: Music, label: 'The Weeknd — Blinding Lights' },
      { icon: ShoppingBag, label: '$4.75 Artisan Roastery' },
      { icon: MapPin, label: 'Downtown Plaza' }
    ],
    accent: '#2563FF',
    glow: 'rgba(37, 99, 255, 0.2)'
  },
  {
    id: 'ex-2',
    badge: 'EXHIBIT #02',
    title: 'Rainy Day Acoustic Chapter',
    timeframe: 'Sept 18 • 02:15 PM - 05:00 PM',
    story: 'Correlated 3 acoustic indie tracks with 2 search queries for cozy libraries during heavy rainfall.',
    moments: [
      { icon: Music, label: 'Bon Iver — Holocene' },
      { icon: ShoppingBag, label: 'Used Book Store $18.20' },
      { icon: MapPin, label: 'Central Library Hall' }
    ],
    accent: '#22D3EE',
    glow: 'rgba(34, 211, 238, 0.2)'
  },
  {
    id: 'ex-3',
    badge: 'EXHIBIT #03',
    title: 'Hackathon Midnight Eureka',
    timeframe: 'Sept 20 • 01:00 AM - 04:30 AM',
    story: 'Linked continuous synthwave streams with rapid note taking and late night food delivery receipts.',
    moments: [
      { icon: Music, label: 'Lofi Girl — Synthwave Chill' },
      { icon: ShoppingBag, label: 'Ramen Express $16.50' },
      { icon: MapPin, label: 'Innovation Hub' }
    ],
    accent: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.2)'
  }
];

export default function MuseumShowcase({ onExhibitClick }) {
  return (
    <section
      id="museum-showcase"
      style={{
        padding: '100px 0',
        background: '#0F172A',
        color: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '64px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#C084FC',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px'
            }}
          >
            <Bookmark size={14} /> DIGITAL MUSEUM EXHIBITS
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '16px'
            }}
          >
            Curated chapters of a life.
          </h2>

          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '600px' }}>
            Explore how disconnected digital receipts assemble into narrative museum exhibits.
          </p>
        </div>

        {/* Exhibit Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {exhibits.map((ex) => (
            <div
              key={ex.id}
              onClick={() => onExhibitClick && onExhibitClick(ex)}
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
              }}
              className="glass-card-interactive"
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '180px',
                  height: '180px',
                  background: `radial-gradient(circle, ${ex.glow} 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: ex.accent,
                    textTransform: 'uppercase'
                  }}
                >
                  {ex.badge}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {ex.timeframe}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  lineHeight: 1.2
                }}
              >
                {ex.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '24px', lineHeight: 1.5 }}>
                {ex.story}
              </p>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  padding: '14px',
                  marginBottom: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                  Connected Moments
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {ex.moments.map((m, idx) => {
                    const MIcon = m.icon;
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#CBD5E1' }}>
                        <MIcon size={14} color={ex.accent} />
                        <span>{m.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 700, color: ex.accent }}>
                <span>Inspect Exhibit Narrative</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
