import React, { useState } from 'react';
import ReceiptNode from './ReceiptNode.jsx';
import { Network, Zap } from 'lucide-react';

const previewClusters = {
  all: [
    {
      id: 'p1',
      type: 'music',
      title: 'Midnight Synthwave',
      subtitle: 'Spotify • 11:45 PM',
      time: '11:45 PM',
      x: 15,
      y: 20
    },
    {
      id: 'p2',
      type: 'purchase',
      title: 'Double Shot Espresso',
      subtitle: 'Artisan Roastery',
      amount: '$4.75',
      time: '11:52 PM',
      x: 45,
      y: 18
    },
    {
      id: 'p3',
      type: 'place',
      title: 'City View Point',
      subtitle: 'GPS Check-in',
      time: '12:15 AM',
      x: 78,
      y: 35
    },
    {
      id: 'p4',
      type: 'photo',
      title: 'Skyline_Blur.raw',
      subtitle: 'Camera Roll',
      time: '12:22 AM',
      x: 25,
      y: 70
    },
    {
      id: 'p5',
      type: 'search',
      title: 'open late night diner',
      subtitle: 'Search History',
      time: '01:05 AM',
      x: 65,
      y: 75
    }
  ],
  lateNight: [
    {
      id: 'p1',
      type: 'music',
      title: 'Midnight Synthwave',
      subtitle: 'Spotify • 11:45 PM',
      time: '11:45 PM',
      x: 20,
      y: 25
    },
    {
      id: 'p3',
      type: 'place',
      title: 'City View Point',
      subtitle: 'GPS Check-in',
      time: '12:15 AM',
      x: 55,
      y: 30
    },
    {
      id: 'p5',
      type: 'search',
      title: 'open late night diner',
      subtitle: 'Search History',
      time: '01:05 AM',
      x: 70,
      y: 70
    }
  ],
  coffeeCode: [
    {
      id: 'p2',
      type: 'purchase',
      title: 'Double Shot Espresso',
      subtitle: 'Artisan Roastery',
      amount: '$4.75',
      time: '11:52 PM',
      x: 30,
      y: 40
    },
    {
      id: 'p4',
      type: 'photo',
      title: 'Code_Snippet.png',
      subtitle: 'Camera Roll',
      time: '11:58 PM',
      x: 65,
      y: 45
    }
  ]
};

export default function ConnectionPreview({ onNodeSelect }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredPreviewNode, setHoveredPreviewNode] = useState(null);

  const currentNodes = previewClusters[activeFilter] || previewClusters.all;

  return (
    <section
      id="explore"
      style={{
        padding: '100px 0',
        background: '#080B16',
        color: '#FFFFFF',
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
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              color: '#22D3EE',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px'
            }}
          >
            <Network size={14} /> CONNECTION DISCOVERY
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '16px'
            }}
          >
            Your digital life, connected.
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.6 }}>
            "Every receipt is a moment. Every connection tells part of the story."
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}
        >
          {[
            { id: 'all', label: 'All Connected Moments' },
            { id: 'lateNight', label: '🌙 Late Night Drive Pattern' },
            { id: 'coffeeCode', label: '☕ Coffee & Coding Cluster' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 600,
                border: activeFilter === btn.id ? '1px solid #22D3EE' : '1px solid rgba(255,255,255,0.1)',
                background: activeFilter === btn.id ? 'rgba(34, 211, 238, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                color: activeFilter === btn.id ? '#22D3EE' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeFilter === btn.id ? '0 0 20px rgba(34, 211, 238, 0.3)' : 'none'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Large Dark Navy Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '480px',
            borderRadius: '28px',
            background: 'linear-gradient(145deg, #0F172A 0%, #080B16 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(37, 99, 255, 0.1)',
            overflow: 'hidden'
          }}
        >
          <div className="bg-grid-dark" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

          {/* SVG Glow Connections */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            <defs>
              <linearGradient id="previewLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {currentNodes.map((node, i) => {
              if (i === currentNodes.length - 1) return null;
              const nextNode = currentNodes[i + 1];
              return (
                <g key={`preview-line-${i}`}>
                  <path
                    d={`M ${node.x * 12.8} ${node.y * 4.8} Q ${(node.x + nextNode.x) * 6.4} ${(node.y + nextNode.y) * 2.4 - 20} ${nextNode.x * 12.8} ${nextNode.y * 4.8}`}
                    fill="none"
                    stroke="url(#previewLineGrad)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="animated-dash-line"
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
            {currentNodes.map((node) => (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.5s ease'
                }}
              >
                <ReceiptNode
                  type={node.type}
                  title={node.title}
                  subtitle={node.subtitle}
                  time={node.time}
                  amount={node.amount}
                  isHovered={hoveredPreviewNode === node.id}
                  onClick={() => onNodeSelect && onNodeSelect(node)}
                  onMouseEnter={() => setHoveredPreviewNode(node.id)}
                  onMouseLeave={() => setHoveredPreviewNode(null)}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '24px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '12px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: '0.8rem',
              color: '#E2E8F0'
            }}
          >
            <Zap size={14} color="#22D3EE" />
            <span>Interactive Correlation Node Preview</span>
          </div>
        </div>
      </div>
    </section>
  );
}
