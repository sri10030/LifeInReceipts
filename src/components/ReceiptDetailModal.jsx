import React from 'react';
import { X, Sparkles, ArrowRight, MapPin, Clock, Database, Tag, ShieldCheck, Music, CreditCard } from 'lucide-react';
import { CategoryMeta } from './ReceiptNode.jsx';

export default function ReceiptDetailModal({ node, onClose, onExploreDeeper }) {
  if (!node) return null;

  const meta = CategoryMeta[node.type] || CategoryMeta.purchase;
  const Icon = meta.icon;

  const hasMetadata = node.metadata && Object.keys(node.metadata).length > 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(8, 11, 22, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(145deg, #0F172A 0%, #080B16 100%)',
          border: '1px solid rgba(34, 211, 238, 0.35)',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(37, 99, 255, 0.25)',
          position: 'relative',
          color: '#FFFFFF'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94A3B8',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
        >
          <X size={18} />
        </button>

        {/* Category Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '20px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: meta.tagBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: meta.color,
              flexShrink: 0
            }}
          >
            <Icon size={24} />
          </div>
          <div style={{ flex: 1, paddingRight: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: meta.color
                }}
              >
                {node.category || meta.label} Moment
              </span>
              {node.sourceDataset && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#94A3B8',
                    fontWeight: 600
                  }}
                >
                  {node.sourceDataset}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.25, color: '#FFFFFF' }}>
              {node.title}
            </h3>
          </div>
        </div>

        {/* Details Box */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px'
          }}
        >
          {/* Subtitle / Note */}
          {node.subtitle && (
            <div
              style={{
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                Description / Context
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#E2E8F0', lineHeight: 1.4 }}>
                {node.subtitle}
              </span>
            </div>
          )}

          {/* Date & Time */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span style={{ fontSize: '0.82rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="#60A5FA" /> Date & Time
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
              {node.date || 'N/A'} • {node.time || ''}
            </span>
          </div>

          {/* Location */}
          {node.location && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <span style={{ fontSize: '0.82rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="#22D3EE" /> Location / Platform
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
                {node.location}
              </span>
            </div>
          )}

          {/* Amount / Value */}
          {node.amount && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Transaction Value</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#22D3EE' }}>
                {node.amount}
              </span>
            </div>
          )}
        </div>

        {/* Metadata Breakdown */}
        {hasMetadata && (
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#60A5FA',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              Metadata Breakdown
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(node.metadata).map(([key, val]) => {
                if (!val) return null;
                // format key name nicely
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase());

                return (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      padding: '4px 0',
                      borderBottom: '1px dashed rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <span style={{ color: '#94A3B8' }}>{formattedKey}</span>
                    <span style={{ color: '#CBD5E1', fontWeight: 600, textAlign: 'right', maxWidth: '240px', wordBreak: 'break-word' }}>
                      {String(val)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Correlation Insight Box */}
        <div
          style={{
            background: 'rgba(37, 99, 255, 0.12)',
            border: '1px solid rgba(37, 99, 255, 0.3)',
            borderRadius: '14px',
            padding: '14px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}
        >
          <Sparkles size={18} color="#22D3EE" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#22D3EE', display: 'block' }}>
              DIGITAL LIFE CORRELATION
            </span>
            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.4 }}>
              This normalized receipt is part of your digital timeline and correlates with nearby temporal activity.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onClose();
            if (onExploreDeeper) onExploreDeeper(node);
          }}
          className="btn-primary-blue"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Close Detail View <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
