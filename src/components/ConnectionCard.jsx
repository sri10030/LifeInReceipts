import React, { useState } from 'react';
import { CategoryMeta } from './ReceiptNode.jsx';
import {
  ArrowRight,
  Clock,
  MapPin,
  Layers,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';

const CONNECTION_TYPE_META = {
  same_location: { label: 'Same Location', color: '#22D3EE', icon: MapPin },
  temporal_session: { label: 'Session Cluster', color: '#8B5CF6', icon: Zap },
  same_date: { label: 'Same Day', color: '#2563FF', icon: Clock },
  category_pair: { label: 'Category Link', color: '#60A5FA', icon: Layers },
  high_value_day: { label: 'High-Value Day', color: '#F59E0B', icon: Zap },
};

function ReceiptMiniCard({ receipt, onClick }) {
  const meta = CategoryMeta[receipt.type] || CategoryMeta.purchase;
  const Icon = meta.icon;

  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        background: 'rgba(15, 23, 42, 0.9)',
        border: `1px solid ${meta.color}33`,
        borderRadius: '16px',
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'all 0.22s ease',
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = meta.color;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 12px 28px ${meta.color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${meta.color}33`;
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Category badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '7px',
            background: meta.tagBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: meta.color,
            flexShrink: 0,
          }}
        >
          <Icon size={13} />
        </div>
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: meta.color,
          }}
        >
          {receipt.category}
        </span>
      </div>

      {/* Title */}
      <h4
        style={{
          fontSize: '0.88rem',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '4px',
          lineHeight: 1.3,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {receipt.title}
      </h4>

      {/* Date */}
      <p style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '6px' }}>
        {receipt.date}
      </p>

      {/* Amount or duration */}
      {receipt.amount ? (
        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#22D3EE' }}>
          {receipt.amount}
        </span>
      ) : receipt.metadata?.duration ? (
        <span style={{ fontSize: '0.72rem', color: '#8B5CF6', fontWeight: 600 }}>
          🎵 {receipt.metadata.duration}
        </span>
      ) : null}

      {/* Click hint */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '8px',
          fontSize: '0.68rem',
          color: '#475569',
        }}
      >
        <ExternalLink size={11} />
        <span>View detail</span>
      </div>
    </div>
  );
}

export default function ConnectionCard({ connection, onSelectReceipt }) {
  const [expanded, setExpanded] = useState(false);
  const typeMeta = CONNECTION_TYPE_META[connection.type] || CONNECTION_TYPE_META.same_date;
  const TypeIcon = typeMeta.icon;

  const strengthColor = connection.strength === 'strong' ? '#22D3EE' : '#8B5CF6';
  const strengthLabel = connection.strength === 'strong' ? 'Strong Connection' : 'Possible Connection';

  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${expanded ? strengthColor + '55' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '22px',
        padding: '20px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: expanded ? `0 12px 40px ${strengthColor}15` : 'none',
      }}
    >
      {/* Header row: strength badge + type */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              borderRadius: '9999px',
              background: `${strengthColor}18`,
              border: `1px solid ${strengthColor}44`,
              fontSize: '0.7rem',
              fontWeight: 700,
              color: strengthColor,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <TypeIcon size={11} />
            {strengthLabel}
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.06)',
              color: '#94A3B8',
              fontWeight: 600,
            }}
          >
            {typeMeta.label}
          </span>
        </div>

        {/* Score pill */}
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: strengthColor,
            padding: '3px 10px',
            borderRadius: '9999px',
            background: `${strengthColor}12`,
          }}
        >
          Score: {connection.score}
        </div>
      </div>

      {/* Two receipt mini cards with connector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '12px',
          marginBottom: '14px',
        }}
      >
        <ReceiptMiniCard
          receipt={connection.receiptA}
          onClick={() => onSelectReceipt && onSelectReceipt(connection.receiptA)}
        />

        {/* Connection bridge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            gap: '6px',
            minWidth: '36px',
          }}
        >
          <div
            style={{
              flex: 1,
              width: '2px',
              background: `linear-gradient(180deg, transparent 0%, ${strengthColor} 50%, transparent 100%)`,
            }}
          />
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: `${strengthColor}18`,
              border: `1.5px solid ${strengthColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ArrowRight size={13} color={strengthColor} />
          </div>
          <div
            style={{
              flex: 1,
              width: '2px',
              background: `linear-gradient(180deg, ${strengthColor} 50%, transparent 100%)`,
            }}
          />
        </div>

        <ReceiptMiniCard
          receipt={connection.receiptB}
          onClick={() => onSelectReceipt && onSelectReceipt(connection.receiptB)}
        />
      </div>

      {/* Why connected — reason chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '12px',
        }}
      >
        {connection.reasons.map((reason, i) => (
          <span
            key={i}
            style={{
              fontSize: '0.72rem',
              padding: '3px 10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#CBD5E1',
              fontWeight: 600,
            }}
          >
            • {reason}
          </span>
        ))}
      </div>

      {/* Expand / collapse metadata */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: 'none',
          color: '#64748B',
          fontSize: '0.75rem',
          cursor: 'pointer',
          padding: '0',
          fontFamily: 'inherit',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#94A3B8')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Hide source details' : 'See source context'}
      </button>

      {expanded && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px',
            background: 'rgba(8, 11, 22, 0.6)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          {[connection.receiptA, connection.receiptB].map((r, idx) => (
            <div key={idx}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '6px',
                }}
              >
                {idx === 0 ? 'Receipt A' : 'Receipt B'} — {r.sourceDataset}
              </p>
              {r.location && (
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '3px' }}>
                  📍 {r.location}
                </p>
              )}
              {r.metadata &&
                Object.entries(r.metadata)
                  .filter(([k, v]) => v && v !== 'N/A' && !k.includes('cardNum') && !k.includes('currency'))
                  .slice(0, 3)
                  .map(([k, v]) => (
                    <p key={k} style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '2px' }}>
                      {k.replace(/([A-Z])/g, ' $1')}: <strong style={{ color: '#CBD5E1' }}>{String(v)}</strong>
                    </p>
                  ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
