import React from 'react';
import { BookOpen, Calendar, MapPin, Layers, Link as LinkIcon, ArrowRight, CheckCircle2 } from 'lucide-react';

const CATEGORY_COLORS = {
  'Food & Dining': { bg: 'rgba(239, 68, 68, 0.15)', text: '#F87171', border: 'rgba(239, 68, 68, 0.3)' },
  'Transportation': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: 'rgba(59, 130, 246, 0.3)' },
  'Household': { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.3)' },
  'Music & Audio': { bg: 'rgba(168, 85, 247, 0.15)', text: '#C084FC', border: 'rgba(168, 85, 247, 0.3)' },
  'Entertainment & Media': { bg: 'rgba(236, 72, 153, 0.15)', text: '#F472B6', border: 'rgba(236, 72, 153, 0.3)' },
  'Online Shopping': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.3)' },
  'Travel & Places': { bg: 'rgba(14, 165, 233, 0.15)', text: '#38BDF8', border: 'rgba(14, 165, 233, 0.3)' },
  'Health & Fitness': { bg: 'rgba(20, 184, 166, 0.15)', text: '#2DD4BF', border: 'rgba(20, 184, 166, 0.3)' },
  'Subscriptions': { bg: 'rgba(99, 102, 241, 0.15)', text: '#818CF8', border: 'rgba(99, 102, 241, 0.3)' },
  'Family & Personal': { bg: 'rgba(217, 70, 239, 0.15)', text: '#E879F9', border: 'rgba(217, 70, 239, 0.3)' },
};

function getCategoryStyle(cat) {
  return CATEGORY_COLORS[cat] || {
    bg: 'rgba(148, 163, 184, 0.15)',
    text: '#94A3B8',
    border: 'rgba(148, 163, 184, 0.3)',
  };
}

export default function StoryChapterCard({ chapter, isSelected, onSelect }) {
  const isSelectedStyle = isSelected ? {
    borderColor: '#22D3EE',
    boxShadow: '0 0 30px rgba(34, 211, 238, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.05)',
  } : {};

  return (
    <div
      onClick={() => onSelect(chapter)}
      style={{
        background: isSelected ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        ...isSelectedStyle,
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.35)';
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(37, 99, 255, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Subtle top gradient accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: isSelected
            ? 'linear-gradient(90deg, #22D3EE, #2563FF)'
            : 'linear-gradient(90deg, rgba(37, 99, 255, 0.4), rgba(34, 211, 238, 0.1))',
        }}
      />

      {/* Top Header Row */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(37, 99, 255, 0.2)',
                color: '#60A5FA',
                border: '1px solid rgba(37, 99, 255, 0.3)',
              }}
            >
              CHAPTER {chapter.number}
            </span>

            <span
              style={{
                fontSize: '0.72rem',
                color: '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '4px 8px',
                borderRadius: '6px',
              }}
            >
              <Calendar size={12} color="#22D3EE" />
              {chapter.dateDisplay}
            </span>
          </div>

          <span
            style={{
              fontSize: '0.7rem',
              color: '#64748B',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            {chapter.source}
          </span>
        </div>

        {/* Chapter Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '10px',
            lineHeight: 1.3,
            fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
          }}
        >
          {chapter.title}
        </h3>

        {/* Short Narrative Summary */}
        <p
          style={{
            fontSize: '0.86rem',
            color: '#94A3B8',
            lineHeight: 1.6,
            marginBottom: '18px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {chapter.narrative}
        </p>

        {/* Metadata Quick Chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px',
            padding: '10px 14px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#E2E8F0' }}>
            <Layers size={13} color="#22D3EE" />
            <span><strong>{chapter.receiptCount}</strong> moments</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#E2E8F0' }}>
            <LinkIcon size={13} color="#60A5FA" />
            <span><strong>{chapter.connectionCount}</strong> connections</span>
          </div>

          {chapter.totalAmountFormatted && (
            <div style={{ fontSize: '0.78rem', color: '#34D399', fontWeight: 600 }}>
              {chapter.totalAmountFormatted} total
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.74rem',
              color: '#94A3B8',
              marginLeft: 'auto',
              maxWidth: '180px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={chapter.location}
          >
            <MapPin size={12} color="#F59E0B" />
            <span>{chapter.location}</span>
          </div>
        </div>

        {/* Categories Involved */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {chapter.categories.map((cat) => {
            const style = getCategoryStyle(cat);
            return (
              <span
                key={cat}
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: style.bg,
                  color: style.text,
                  border: `1px solid ${style.border}`,
                  fontWeight: 500,
                }}
              >
                {cat}
              </span>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748B' }}>
          <CheckCircle2 size={13} color="#34D399" />
          <span>Multi-signal verified</span>
        </div>

        <button
          type="button"
          style={{
            background: isSelected
              ? 'linear-gradient(135deg, #2563FF 0%, #22D3EE 100%)'
              : 'rgba(37, 99, 255, 0.15)',
            color: isSelected ? '#FFFFFF' : '#60A5FA',
            border: isSelected ? 'none' : '1px solid rgba(37, 99, 255, 0.3)',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <span>{isSelected ? 'Viewing Chapter' : 'Explore Chapter'}</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
