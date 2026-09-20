import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { CategoryMeta } from './ReceiptNode.jsx';

export default function ReceiptDetailModal({ node, onClose, onExploreDeeper }) {
  if (!node) return null;

  const meta = CategoryMeta[node.type] || CategoryMeta.purchase;
  const Icon = meta.icon;

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
        background: 'rgba(8, 11, 22, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'linear-gradient(145deg, #0F172A, #080B16)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(37, 99, 255, 0.3)',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: meta.tagBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: meta.color
            }}
          >
            <Icon size={22} />
          </div>
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: meta.color
              }}
            >
              {meta.label} Moment
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.2 }}>
              {node.title}
            </h3>
          </div>
        </div>

        {/* Details Box */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px stroke-dasharray rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '18px',
            marginBottom: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Timestamp</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
              {node.time} • Sept 20, 2026
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Details</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
              {node.subtitle}
            </span>
          </div>

          {node.amount && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Transaction Value</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#22D3EE' }}>
                {node.amount}
              </span>
            </div>
          )}
        </div>

        {/* Correlation Insight */}
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
              POTENTIAL CORRELATION
            </span>
            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.4 }}>
              This moment connects with <strong>2 adjacent receipts</strong> logged within a 30-minute window.
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
          Explore Connected Pattern <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
