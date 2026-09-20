import React, { useState } from 'react';
import ReceiptNode from './ReceiptNode.jsx';
import { Sparkles, Activity } from 'lucide-react';

const mockNodes = [
  {
    id: 'music-1',
    type: 'music',
    title: 'Midnight Drive',
    subtitle: 'The Weeknd • Blinding Lights',
    time: '11:42 PM',
    x: 18,
    y: 12,
    connectedTo: ['place-1', 'photo-1']
  },
  {
    id: 'place-1',
    type: 'place',
    title: 'Downtown Cafe',
    subtitle: '742 Evergreen Terrace',
    time: '11:58 PM',
    x: 72,
    y: 15,
    connectedTo: ['purchase-1', 'music-1']
  },
  {
    id: 'photo-1',
    type: 'photo',
    title: 'Golden Hour.jpg',
    subtitle: 'ISO 200 • 35mm f/1.8',
    time: '06:15 PM',
    x: 8,
    y: 48,
    connectedTo: ['music-1', 'search-1']
  },
  {
    id: 'purchase-1',
    type: 'purchase',
    title: 'Coffee & Pastry',
    amount: '$12.50',
    subtitle: 'Espresso Bar No. 4',
    time: '12:06 AM',
    x: 68,
    y: 52,
    connectedTo: ['place-1', 'movie-1']
  },
  {
    id: 'movie-1',
    type: 'movie',
    title: 'Neon Horizons',
    subtitle: 'Cinemark IMAX • Row F',
    time: '09:30 PM',
    x: 75,
    y: 82,
    connectedTo: ['purchase-1', 'event-1']
  },
  {
    id: 'message-1',
    type: 'message',
    title: 'Meeting at gallery',
    subtitle: '"See you in 10 mins!"',
    time: '07:45 PM',
    x: 38,
    y: 84,
    connectedTo: ['note-1', 'photo-1']
  },
  {
    id: 'search-1',
    type: 'search',
    title: 'rooftop stargazing spot',
    subtitle: 'Google Search • 3 results',
    time: '05:12 PM',
    x: 5,
    y: 80,
    connectedTo: ['photo-1', 'note-1']
  },
  {
    id: 'event-1',
    type: 'event',
    title: 'Design Summit 2026',
    subtitle: 'Main Stage Pass',
    time: '10:00 AM',
    x: 42,
    y: 8,
    connectedTo: ['music-1', 'place-1']
  },
  {
    id: 'note-1',
    type: 'note',
    title: 'Late Night Thoughts',
    subtitle: 'Memories connect patterns',
    time: '02:15 AM',
    x: 20,
    y: 65,
    connectedTo: ['search-1', 'message-1']
  }
];

export default function ConstellationVisual({ onSelectNode }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(mockNodes[0]);

  const centerHub = { x: 46, y: 46 };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '560px',
        height: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.95), rgba(8, 11, 22, 0.98))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(37, 99, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Grid */}
      <div className="bg-grid-dark" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Central Blue & Cyan Blobs */}
      <div
        className="glow-blob-blue"
        style={{
          top: '30%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: '340px',
          height: '340px'
        }}
      />
      <div
        className="glow-blob-cyan"
        style={{
          bottom: '20%',
          right: '20%',
          width: '300px',
          height: '300px'
        }}
      />

      {/* SVG Canvas for Connection Lines */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <defs>
          <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#2563FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="lineGradSubtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.15" />
          </linearGradient>
          <filter id="glowLine">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {mockNodes.map((node) => {
          const isRelatedToHover =
            hoveredNode &&
            (hoveredNode.id === node.id || hoveredNode.connectedTo.includes(node.id));

          const isLineActive =
            (selectedNode && selectedNode.id === node.id) || isRelatedToHover;

          const x1 = `${node.x}%`;
          const y1 = `${node.y}%`;
          const x2 = `${centerHub.x}%`;
          const y2 = `${centerHub.y}%`;

          return (
            <g key={`hub-${node.id}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isLineActive ? 'url(#lineGradActive)' : 'url(#lineGradSubtle)'}
                strokeWidth={isLineActive ? '2.5' : '1.2'}
                strokeDasharray={isLineActive ? 'none' : '4 4'}
                filter={isLineActive ? 'url(#glowLine)' : undefined}
                style={{ transition: 'all 0.4s ease' }}
              />
              {isLineActive && (
                <circle r="3.5" fill="#22D3EE" style={{ filter: 'drop-shadow(0 0 6px #22D3EE)' }}>
                  <animateMotion
                    path={`M ${node.x * 5.6},${node.y * 5.6} L ${centerHub.x * 5.6},${centerHub.y * 5.6}`}
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Central Hub Node */}
      <div
        style={{
          position: 'absolute',
          left: `${centerHub.x}%`,
          top: `${centerHub.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <div
          className="animate-pulse-glow"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #22D3EE 0%, #2563FF 60%, #0F172A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={28} color="#FFFFFF" />
        </div>
        <div
          style={{
            padding: '4px 12px',
            borderRadius: '9999px',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            color: '#22D3EE',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap'
          }}
        >
          LIFE CORRELATION CORE
        </div>
      </div>

      {/* Floating Receipt Cards */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 12, pointerEvents: 'none' }}>
        {mockNodes.map((node, index) => {
          const isSel = selectedNode?.id === node.id;
          const isHov = hoveredNode?.id === node.id;

          return (
            <div
              key={node.id}
              className={`animate-float-${(index % 3) + 1}`}
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto',
                transition: 'transform 0.3s ease'
              }}
            >
              <ReceiptNode
                type={node.type}
                title={node.title}
                subtitle={node.subtitle}
                time={node.time}
                amount={node.amount}
                isSelected={isSel}
                isHovered={isHov}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Hint Banner */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          padding: '8px 18px',
          borderRadius: '9999px',
          background: 'rgba(8, 11, 22, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#94A3B8',
          fontSize: '0.78rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Activity size={14} color="#22D3EE" />
        <span>Click any receipt node to inspect connected moments</span>
      </div>
    </div>
  );
}
