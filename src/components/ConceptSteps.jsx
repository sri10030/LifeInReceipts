import React from 'react';
import { Layers, GitCommit, LineChart, BookOpen, Sparkles } from 'lucide-react';

const stages = [
  {
    number: '01',
    title: 'Moments',
    subtitle: 'Everyday digital traces',
    desc: 'Songs listened to, coffee purchased, photos snapped, places visited, and late night searches recorded as individual data points.',
    icon: Layers,
    color: '#60A5FA',
    accentBg: 'rgba(96, 165, 250, 0.1)'
  },
  {
    number: '02',
    title: 'Connections',
    subtitle: 'Find relationships between them',
    desc: 'Time, location, and topic correlation engines link isolated receipts into synchronized temporal clusters.',
    icon: GitCommit,
    color: '#22D3EE',
    accentBg: 'rgba(34, 211, 238, 0.1)'
  },
  {
    number: '03',
    title: 'Patterns',
    subtitle: 'Reveal recurring behavior',
    desc: 'Uncover hidden habits, Friday night routines, study sessions, and emotional cycles hiding across months of data.',
    icon: LineChart,
    color: '#2563FF',
    accentBg: 'rgba(37, 99, 255, 0.1)'
  },
  {
    number: '04',
    title: 'Stories',
    subtitle: 'Turn patterns into meaningful chapters',
    desc: 'Transform raw data into editorial digital exhibits—your personal life museum filled with rich, contextual narratives.',
    icon: BookOpen,
    color: '#8B5CF6',
    accentBg: 'rgba(139, 92, 246, 0.1)'
  }
];

export default function ConceptSteps() {
  return (
    <section
      id="connections"
      style={{
        padding: '100px 0',
        background: '#0F172A',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Glows */}
      <div
        className="glow-blob-purple"
        style={{
          top: '20%',
          right: '10%',
          opacity: 0.4
        }}
      />
      <div
        className="glow-blob-blue"
        style={{
          bottom: '10%',
          left: '5%',
          opacity: 0.4
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 72px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(37, 99, 255, 0.12)',
              border: '1px solid rgba(37, 99, 255, 0.3)',
              color: '#60A5FA',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px'
            }}
          >
            <Sparkles size={14} /> METHODOLOGY
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '16px'
            }}
          >
            From moments to meaning.
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Raw digital fragments become rich personal narratives through a four-stage museum correlation process.
          </p>
        </div>

        {/* 4 Stage Cards Grid with Connecting Line */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '28px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.2), rgba(34, 211, 238, 0.6), rgba(37, 99, 255, 0.6), rgba(139, 92, 246, 0.3))',
              zIndex: 1,
              display: 'none',
              '@media (min-width: 1024px)': { display: 'block' }
            }}
          />

          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.number}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '32px 24px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
                className="glass-card-interactive"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      color: stage.color,
                      opacity: 0.9
                    }}
                  >
                    {stage.number}
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      background: stage.accentBg,
                      border: `1px solid ${stage.color}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stage.color,
                      boxShadow: `0 0 15px ${stage.color}22`
                    }}
                  >
                    <Icon size={22} />
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '4px'
                  }}
                >
                  {stage.title}
                </h3>
                <h4
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: stage.color,
                    marginBottom: '14px'
                  }}
                >
                  "{stage.subtitle}"
                </h4>

                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6 }}>
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
