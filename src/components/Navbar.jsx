import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onExploreClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Explore', href: '#explorer' },
    { name: 'Connections', href: '#connections-explorer' },
    { name: 'Stories', href: '#stories' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(8, 11, 22, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        padding: '16px 0'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#FFFFFF'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563FF 0%, #22D3EE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(37, 99, 255, 0.5)'
            }}
          >
            <span style={{ fontSize: '18px' }}>🧾</span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'baseline',
              gap: '6px'
            }}
          >
            YOUR LIFE,<span style={{ color: '#2563FF' }}>IN RECEIPTS</span>
          </span>
        </a>

        {/* Desktop Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              style={{
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: activeTab === item.name ? 600 : 500,
                color: activeTab === item.name ? '#22D3EE' : 'rgba(255, 255, 255, 0.75)',
                transition: 'color 0.2s ease',
                position: 'relative',
                padding: '6px 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = activeTab === item.name ? '#22D3EE' : 'rgba(255, 255, 255, 0.75)')
              }
            >
              {item.name}
              {activeTab === item.name && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    borderRadius: '2px',
                    background: 'linear-gradient(90deg, #2563FF, #22D3EE)',
                    boxShadow: '0 0 8px #22D3EE'
                  }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="desktop-nav-cta" style={{ display: 'none' }}>
          <button
            onClick={onExploreClick}
            className="btn-primary-blue"
            style={{ padding: '10px 22px', fontSize: '0.88rem' }}
          >
            Explore Your Life <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="mobile-hamburger-btn"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(8, 11, 22, 0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenuOpen(false);
              }}
              style={{
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: activeTab === item.name ? '#22D3EE' : 'rgba(255, 255, 255, 0.85)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {item.name}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onExploreClick) onExploreClick();
            }}
            className="btn-primary-blue"
            style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
          >
            Explore Your Life <ArrowRight size={16} />
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-nav-cta { display: block !important; }
          .mobile-hamburger-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
