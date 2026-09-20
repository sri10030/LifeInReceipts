import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#080B16',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#94A3B8',
        padding: '64px 0 32px 0',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            marginBottom: '48px'
          }}
          className="footer-content"
        >
          {/* Brand Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #2563FF 0%, #22D3EE 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}
                >
                  🧾
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em'
                  }}
                >
                  YOUR LIFE, <span style={{ color: '#2563FF' }}>IN RECEIPTS</span>
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#64748B', maxWidth: '380px' }}>
                Transforming raw, disconnected digital moments into connected stories.
                An interactive digital museum of your life.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <a href="#hero" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>
                Home
              </a>
              <a href="#explore" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>
                Explore
              </a>
              <a href="#connections" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>
                Connections
              </a>
              <a href="#stories" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>
                Stories
              </a>

              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#64748B'
          }}
          className="footer-bottom"
        >
          <span>© 2026 Your Life, In Receipts • High-Modern Foundation</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built for 5-Hour Frontend Hackathon <Sparkles size={12} color="#22D3EE" />
          </span>
        </div>
      </div>
    </footer>
  );
}
