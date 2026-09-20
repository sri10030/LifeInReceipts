import React, { useState } from 'react';
import ReceiptNode from './ReceiptNode.jsx';
import { Sparkles } from 'lucide-react';

const mockNodes = [
  {
    id: 'music-1',
    type: 'music',
    title: 'Midnight Drive',
    subtitle: 'The Weeknd • Blinding Lights',
    time: '11:42 PM',
    x: 50,
    y: 17,
    connectedTo: ['place-1', 'travel-1', 'purchase-1']
  },
  {
    id: 'place-1',
    type: 'place',
    title: 'Downtown Cafe',
    subtitle: '742 Evergreen Terrace',
    time: '11:58 AM',
    x: 77,
    y: 28,
    connectedTo: ['purchase-1', 'music-1']
  },
  {
    id: 'purchase-1',
    type: 'purchase',
    title: 'Coffee & Pastry',
    subtitle: 'Espresso Bar No. 4',
    amount: '₹12.50',
    time: '12:06 AM',
    x: 82,
    y: 50,
    connectedTo: ['place-1', 'movie-1']
  },
  {
    id: 'movie-1',
    type: 'movie',
    title: 'Neon Horizons',
    subtitle: 'Cinemark IMAX • Row 7',
    time: '09:30 PM',
    x: 77,
    y: 72,
    connectedTo: ['purchase-1', 'health-1']
  },
  {
    id: 'health-1',
    type: 'health',
    title: 'Morning Run',
    subtitle: 'Park Trail • 5.2 km',
    time: '06:45 AM',
    x: 50,
    y: 83,
    connectedTo: ['movie-1', 'note-1']
  },
  {
    id: 'note-1',
    type: 'note',
    title: 'Late Night Thoughts',
    subtitle: 'Memories connect patterns',
    time: '02:15 AM',
    x: 23,
    y: 72,
    connectedTo: ['health-1', 'photo-1']
  },
  {
    id: 'photo-1',
    type: 'photo',
    title: 'Golden Hour.jpg',
    subtitle: 'ISO 200 • 35mm f/1.8',
    time: '06:15 PM',
    x: 18,
    y: 50,
    connectedTo: ['note-1', 'travel-1']
  },
  {
    id: 'travel-1',
    type: 'travel',
    title: 'Flight Booking',
    subtitle: 'IndiGo • DEL → BOM',
    time: '08:15 AM',
    x: 23,
    y: 28,
    connectedTo: ['photo-1', 'music-1']
  }
];

export default function ConstellationVisual({ onSelectNode }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(mockNodes[0]);

  const centerHub = { x: 50, y: 50 };
  const orbitRadius = 30;

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '580px',
        minHeight: '520px',
        height: '520px',
        borderRadius: '26px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.96) 0%, rgba(8, 11, 22, 0.98) 100%)',
        border: '1px solid rgba(34, 211, 238, 0.22)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), inset 0 0 50px rgba(37, 99, 255, 0.12), 0 0 35px rgba(37, 99, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      {/* Grid Overlay */}
      <div className="bg-grid-dark" style={{ position: 'absolute', inset: 0, opacity: 0.55 }} />

      {/* Central Ambient Blobs */}
      <div
        className="glow-blob-blue"
        style={{
          top: '30%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          opacity: 0.5
        }}
      />
      <div
        className="glow-blob-cyan"
        style={{
          bottom: '20%',
          right: '20%',
          width: '280px',
          height: '280px',
          opacity: 0.4
        }}
      />

      {/* SVG Canvas for Orbital Circle and Connection Lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
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
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#2563FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="lineGradSubtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.15" />
          </linearGradient>
          <filter id="glowLine">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbital Dashed Ring */}
        <circle
          cx={centerHub.x}
          cy={centerHub.y}
          r={orbitRadius}
          stroke="rgba(34, 211, 238, 0.2)"
          strokeDasharray="2.5 2.5"
          strokeWidth="0.35"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* Radial Connection Lines and Glowing Orbit Intersection Beads */}
        {mockNodes.map((node) => {
          const isRelatedToHover =
            hoveredNode &&
            (hoveredNode.id === node.id || hoveredNode.connectedTo.includes(node.id));

          const isLineActive =
            (selectedNode && selectedNode.id === node.id) || isRelatedToHover;

          const dx = node.x - centerHub.x;
          const dy = node.y - centerHub.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const beadX = centerHub.x + (dx / dist) * orbitRadius;
          const beadY = centerHub.y + (dy / dist) * orbitRadius;

          return (
            <g key={`hub-${node.id}`}>
              {/* Radial Line to Node */}
              <line
                x1={centerHub.x}
                y1={centerHub.y}
                x2={node.x}
                y2={node.y}
                stroke={isLineActive ? 'url(#lineGradActive)' : 'url(#lineGradSubtle)'}
                strokeWidth={isLineActive ? '0.55' : '0.22'}
                strokeDasharray={isLineActive ? 'none' : '1.2 1.2'}
                vectorEffect="non-scaling-stroke"
                filter={isLineActive ? 'url(#glowLine)' : undefined}
                style={{ transition: 'all 0.4s ease' }}
              />

              {/* Glowing Bead on the Orbital Ring */}
              <circle
                cx={beadX}
                cy={beadY}
                r={isLineActive ? '1.1' : '0.8'}
                fill={isLineActive ? '#22D3EE' : 'rgba(34, 211, 238, 0.65)'}
                style={{
                  filter: isLineActive
                    ? 'drop-shadow(0 0 3px #22D3EE)'
                    : 'drop-shadow(0 0 1.5px rgba(34, 211, 238, 0.4))',
                  transition: 'all 0.3s ease'
                }}
              />

              {/* Animated Photon Pulse for Active Connection */}
              {isLineActive && (
                <circle r="0.9" fill="#22D3EE" style={{ filter: 'drop-shadow(0 0 3px #22D3EE)' }}>
                  <animateMotion
                    path={`M ${centerHub.x},${centerHub.y} L ${node.x},${node.y}`}
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Central Hub Node: Relation Core */}
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
          gap: '7px',
          pointerEvents: 'none'
        }}
      >
        <div
          className="animate-pulse-glow"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #22D3EE 0%, #2563FF 55%, #0F172A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.85)',
            boxShadow: '0 0 35px rgba(34, 211, 238, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.8)',
            pointerEvents: 'auto',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={26} color="#FFFFFF" />
        </div>
        <div
          style={{
            padding: '4px 14px',
            borderRadius: '9999px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1.5px solid rgba(34, 211, 238, 0.45)',
            color: '#22D3EE',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.6), 0 0 12px rgba(34, 211, 238, 0.2)',
            whiteSpace: 'nowrap',
            pointerEvents: 'auto'
          }}
        >
          RELATION CORE
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
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto',
                zIndex: isSel ? 25 : isHov ? 20 : 12,
              }}
            >
              <div
                className={`animate-float-${(index % 3) + 1}`}
                style={{
                  transition: 'transform 0.3s ease',
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
