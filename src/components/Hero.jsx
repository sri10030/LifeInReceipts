import React from 'react';
import ConstellationVisual from './ConstellationVisual.jsx';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export default function Hero({ onExploreClick, onSeeHowItWorksClick, onSelectNode }) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '80px',
        background: 'linear-gradient(180deg, #080B16 0%, #0F172A 70%, #F8FAFC 100%)',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Glow Blobs */}
      <div
        className="glow-blob-blue"
        style={{
          top: '-10%',
          left: '15%',
          opacity: 0.7
        }}
      />
      <div
        className="glow-blob-cyan"
        style={{
          top: '30%',
          right: '5%',
          opacity: 0.6
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
        {/* Eyebrow Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(37, 99, 255, 0.12)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            marginBottom: '24px'
          }}
        >
          <Sparkles size={14} color="#22D3EE" />
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#22D3EE',
              textTransform: 'uppercase'
            }}
          >
            Digital Museum Experience • Phase 1 Foundation
          </span>
        </div>

        {/* 2-Column Responsive Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'center'
          }}
          className="hero-grid-container"
        >
          {/* Left Column: Headlines & CTAs */}
          <div>
            <h1
              className="hero-headline"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                color: '#FFFFFF'
              }}
            >
              YOUR LIFE, <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 30%, #60A5FA 70%, #22D3EE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                IN RECEIPTS.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: '#94A3B8',
                lineHeight: 1.6,
                maxWidth: '540px',
                marginBottom: '36px',
                fontWeight: 400
              }}
            >
              Your digital life is made of hundreds of tiny moments. <br />
              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>
                Discover the connections hiding between them.
              </span>
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '40px'
              }}
            >
              <button onClick={onExploreClick} className="btn-primary-blue">
                Explore Your Life <ArrowRight size={18} />
              </button>

              <button onClick={onSeeHowItWorksClick} className="btn-secondary-outline">
                <Play size={16} fill="currentColor" /> See How It Works
              </button>
            </div>

            {/* Highlights */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 800, color: '#22D3EE' }}>
                  9 Types
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Digital Moments</span>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(255, 255, 255, 0.1)' }} />
              <div>
                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 800, color: '#2563FF' }}>
                  100%
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Visual Constellation</span>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(255, 255, 255, 0.1)' }} />
              <div>
                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 800, color: '#8B5CF6' }}>
                  Museum
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Editorial Feel</span>
              </div>
            </div>
          </div>

          {/* Right Column: Connected Constellation Graph */}
          <div>
            <ConstellationVisual onSelectNode={onSelectNode} />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid-container {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
}
