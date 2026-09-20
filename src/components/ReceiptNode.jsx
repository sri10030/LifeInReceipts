import React from 'react';
import {
  Music,
  MapPin,
  Camera,
  ShoppingBag,
  Film,
  MessageSquare,
  Search,
  Calendar,
  FileText,
  Plane,
  Heart
} from 'lucide-react';

export const CategoryMeta = {
  music: { label: 'Music', icon: Music, color: '#A855F7', tagBg: 'rgba(168, 85, 247, 0.15)' },
  place: { label: 'Place', icon: MapPin, color: '#22D3EE', tagBg: 'rgba(34, 211, 238, 0.15)' },
  photo: { label: 'Photo', icon: Camera, color: '#38BDF8', tagBg: 'rgba(56, 189, 248, 0.15)' },
  purchase: { label: 'Purchase', icon: ShoppingBag, color: '#60A5FA', tagBg: 'rgba(96, 165, 250, 0.15)' },
  movie: { label: 'Movie', icon: Film, color: '#C084FC', tagBg: 'rgba(192, 132, 252, 0.15)' },
  message: { label: 'Message', icon: MessageSquare, color: '#38BDF8', tagBg: 'rgba(56, 189, 248, 0.15)' },
  search: { label: 'Search', icon: Search, color: '#22D3EE', tagBg: 'rgba(34, 211, 238, 0.15)' },
  event: { label: 'Event', icon: Calendar, color: '#3B82F6', tagBg: 'rgba(59, 130, 246, 0.15)' },
  note: { label: 'Note', icon: FileText, color: '#818CF8', tagBg: 'rgba(129, 140, 248, 0.15)' },
  travel: { label: 'Travel', icon: Plane, color: '#38BDF8', tagBg: 'rgba(56, 189, 248, 0.15)' },
  health: { label: 'Health', icon: Heart, color: '#2DD4BF', tagBg: 'rgba(45, 212, 191, 0.15)' }
};

export default function ReceiptNode({
  type = 'purchase',
  title,
  subtitle,
  time,
  amount,
  location,
  isSelected = false,
  isHovered = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style = {}
}) {
  const meta = CategoryMeta[type] || CategoryMeta.purchase;
  const Icon = meta.icon;

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        width: '158px',
        padding: '9px 12px',
        borderRadius: '14px',
        background: isSelected
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(37, 99, 255, 0.35))'
          : 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: isSelected
          ? '1.5px solid #22D3EE'
          : isHovered
          ? '1.5px solid #2563FF'
          : '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: isSelected
          ? '0 0 30px rgba(34, 211, 238, 0.45)'
          : isHovered
          ? '0 12px 28px rgba(37, 99, 255, 0.4)'
          : '0 8px 24px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-3px) scale(1.02)' : 'none',
        userSelect: 'none',
        ...style
      }}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              background: meta.tagBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: meta.color
            }}
          >
            <Icon size={12} />
          </div>
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: meta.color
            }}
          >
            {meta.label}
          </span>
        </div>
        <span style={{ fontSize: '0.64rem', color: '#64748B', fontWeight: 600 }}>
          {time}
        </span>
      </div>

      {/* Main Title */}
      <h4
        style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '2px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {title}
      </h4>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '0.68rem',
          color: '#94A3B8',
          marginBottom: amount ? '5px' : '0px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {subtitle || location}
      </p>

      {/* Amount if purchase */}
      {amount && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '5px',
            borderTop: '1px dashed rgba(255, 255, 255, 0.08)'
          }}
        >
          <span style={{ fontSize: '0.64rem', color: '#64748B' }}>Total</span>
          <span style={{ fontSize: '0.80rem', fontWeight: 800, color: '#22D3EE' }}>{amount}</span>
        </div>
      )}

      {/* Glowing Connection Dot */}
      <div
        style={{
          position: 'absolute',
          top: '-3px',
          right: '-3px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isSelected ? '#22D3EE' : '#2563FF',
          boxShadow: `0 0 10px ${isSelected ? '#22D3EE' : '#2563FF'}`
        }}
      />
    </div>
  );
}
