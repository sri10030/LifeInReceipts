import React, { useMemo } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  Database,
  Link as LinkIcon,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  MapPin,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { getInsights } from '../data/insightsEngine.js';

export default function InsightsExplorer() {
  const insights = useMemo(() => getInsights(), []);
  const { overview, categories, spending, temporal, datasetComparison, connections, stories } = insights;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="insights"
      style={{
        padding: '100px 0 120px 0',
        background: '#080B16',
        position: 'relative',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(37, 99, 255, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(70px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(70px)',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px auto' }}>
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
            <TrendingUp size={13} color="#22D3EE" />
            Phase 06 • Objective Data Intelligence
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
            Macro Insights & Behavioral Patterns
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#94A3B8',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            Empirical distributions and recurring temporal rhythms calculated dynamically across {overview.totalReceipts.toLocaleString()} normalized records without statistical extrapolation or speculative modeling.
          </p>
        </div>

        {/* 1. Macro Activity Overview Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Normalized Receipts
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
              {overview.totalReceipts.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
              Across 3 real datasets
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Monetary Receipts
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#22D3EE', marginTop: '6px' }}>
              {overview.monetaryReceipts.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
              {overview.monetaryPercentage}% of total records
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Volume
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#34D399', marginTop: '6px' }}>
              {overview.totalSpendFormatted}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
              Cumulative financial spend
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mean Transaction
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#60A5FA', marginTop: '6px' }}>
              {overview.avgSpendFormatted}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
              Max: {overview.maxSpendFormatted}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Categories & Places
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#C084FC', marginTop: '6px' }}>
              {overview.categoriesCount} / {overview.locationsCount}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
              Categories / locations
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Category Patterns & Spending Distribution */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {/* Category Patterns Card */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '28px',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(34, 211, 238, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BarChart3 size={16} color="#22D3EE" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                    Most Frequent Categories
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                    Ranked by normalized receipt volume
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Top 8 shown
              </span>
            </div>

            {/* Category Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categories.top.map((cat, idx) => (
                <div key={cat.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '0.82rem' }}>
                    <span style={{ color: '#E2E8F0', fontWeight: 500 }}>
                      {cat.category}
                    </span>
                    <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>
                      <strong style={{ color: '#FFFFFF' }}>{cat.count}</strong> receipts ({cat.percentage}%)
                    </span>
                  </div>
                  <div
                    style={{
                      height: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(100, Math.max(3, parseFloat(cat.percentage)))}%`,
                        background: idx === 0
                          ? 'linear-gradient(90deg, #A855F7, #C084FC)'
                          : 'linear-gradient(90deg, #2563FF, #22D3EE)',
                        borderRadius: '999px',
                        transition: 'width 0.8s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '20px',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                fontSize: '0.78rem',
                color: '#94A3B8',
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: '#C084FC' }}>Data Note: </strong>
              Music & Audio accounts for {categories.top[0]?.count} of the {overview.totalReceipts.toLocaleString()} normalized receipts, followed by daily sustenance and retail transactions.
            </div>
          </div>

          {/* Spending Patterns Card */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '28px',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(52, 211, 153, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CreditCard size={16} color="#34D399" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                    Spending Scale & Distribution
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                    Calculated from {spending.monetaryCount.toLocaleString()} valid monetary transactions
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>
                {overview.totalSpendFormatted}
              </span>
            </div>

            {/* Distribution Brackets Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              {spending.distribution.map((bracket) => (
                <div
                  key={bracket.label}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>
                    {bracket.label}
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: bracket.color }}>
                    {bracket.count.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                    {bracket.pct}% of monetary receipts
                  </div>
                  <div
                    style={{
                      height: '4px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '999px',
                      marginTop: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${bracket.pct}%`,
                        background: bracket.color,
                        borderRadius: '999px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
              }}
            >
              <div>
                <span style={{ color: '#94A3B8' }}>Average Transaction: </span>
                <strong style={{ color: '#60A5FA' }}>{spending.avgSpendFormatted}</strong>
              </div>
              <div>
                <span style={{ color: '#94A3B8' }}>Highest Single Value: </span>
                <strong style={{ color: '#FBBF24' }}>{spending.maxSpendFormatted}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Temporal Distribution & Diurnal Patterns */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '28px',
            backdropFilter: 'blur(16px)',
            marginBottom: '48px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={16} color="#F59E0B" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                  Temporal Patterns & Diurnal Rhythms
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  24-hour distribution across all 3,000 timestamps
                </div>
              </div>
            </div>

            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              100% of receipts contain timestamp metadata
            </span>
          </div>

          {/* Time bins progress row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {temporal.timeBins.map((bin) => (
              <div
                key={bin.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                }}
              >
                <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginBottom: '4px' }}>
                  {bin.label}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: bin.color }}>
                  {bin.count.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                  {bin.pct}% of all records
                </div>
                <div
                  style={{
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '999px',
                    marginTop: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${bin.pct}%`,
                      background: bin.color,
                      borderRadius: '999px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dataset Peak Activity Records */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '18px 20px',
            }}
          >
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Historical Peak Activity Dates By Source:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
              {temporal.peaks.map((peak, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}
                >
                  <Calendar size={15} color="#22D3EE" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#FFFFFF' }}>{peak.dataset}</strong> ({peak.date}):{' '}
                    <span style={{ color: '#94A3B8' }}>{peak.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Dataset Source Comparison */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-heading, "Outfit", sans-serif)' }}>
              Dataset Architecture Comparison
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
              Synthesizing 3 heterogeneous data formats spanning 11 total calendar years
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {datasetComparison.map((ds) => (
              <div
                key={ds.source}
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        background: `${ds.badgeColor}22`,
                        color: ds.badgeColor,
                        border: `1px solid ${ds.badgeColor}44`,
                      }}
                    >
                      {ds.source}
                    </span>

                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                      {ds.count.toLocaleString()} records
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#E2E8F0', marginBottom: '12px', lineHeight: 1.5 }}>
                    {ds.primaryFocus}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                      <span>Active Date Span:</span>
                      <strong style={{ color: '#FFFFFF' }}>{ds.dateRange}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                      <span>Categories Mapped:</span>
                      <strong style={{ color: '#FFFFFF' }}>{ds.categoriesCount} categories</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                      <span>Financial Volume:</span>
                      <strong style={{ color: ds.monetaryCount > 0 ? '#34D399' : '#94A3B8' }}>
                        {ds.totalAmountFormatted}
                      </strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    marginTop: '18px',
                    paddingTop: '12px',
                    fontSize: '0.74rem',
                    color: '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ShieldCheck size={13} color="#34D399" />
                  <span>Normalized & verified into uniform schema</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Connections & Stories Cross-Navigation Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 255, 0.12) 0%, rgba(34, 211, 238, 0.12) 100%)',
            border: '1px solid rgba(34, 211, 238, 0.25)',
            borderRadius: '20px',
            padding: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={16} color="#22D3EE" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#22D3EE', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                End-to-End Synthesis
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0', fontFamily: 'var(--font-heading, "Outfit", sans-serif)' }}>
              From Raw Transactions to Connected Narratives
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
              The {connections.total} discovered multi-signal connections power {stories.totalChapters} synthesized life chapters representing {stories.momentsConnected} moments across {stories.categoriesRepresented} categories.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => scrollToSection('connections-explorer')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                color: '#FFFFFF',
                padding: '10px 18px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
            >
              <LinkIcon size={14} color="#60A5FA" />
              <span>Explore Connections ({connections.total})</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('stories')}
              style={{
                background: 'linear-gradient(135deg, #2563FF 0%, #22D3EE 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#FFFFFF',
                padding: '10px 20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37, 99, 255, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.92'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <BookOpen size={14} color="#FFFFFF" />
              <span>Explore Life Chapters ({stories.totalChapters})</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
