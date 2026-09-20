import React, { useState, useMemo } from 'react';
import { NORMALIZED_RECEIPTS } from '../data/normalizedReceipts.js';
import { CategoryMeta } from './ReceiptNode.jsx';
import {
  Search,
  Filter,
  ArrowUpDown,
  Compass,
  X,
  Sparkles,
  ChevronDown,
  Database,
  Tag,
  Clock,
  MapPin,
  FileText,
  RotateCcw
} from 'lucide-react';

export default function ReceiptExplorer({ onSelectReceipt }) {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All'); // All | Paid | Free
  const [sortBy, setSortBy] = useState('newest'); // newest | oldest | highest | lowest | title
  const [visibleCount, setVisibleCount] = useState(24);

  // Derive unique categories and counts from the normalized dataset
  const categoryCounts = useMemo(() => {
    const counts = { All: NORMALIZED_RECEIPTS.length };
    NORMALIZED_RECEIPTS.forEach((r) => {
      const cat = r.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, []);

  const categoryList = useMemo(() => {
    const keys = Object.keys(categoryCounts).filter((k) => k !== 'All');
    // Sort categories by count descending
    keys.sort((a, b) => categoryCounts[b] - categoryCounts[a]);
    return ['All', ...keys];
  }, [categoryCounts]);

  // Derive unique sources
  const sourceList = useMemo(() => {
    const set = new Set(NORMALIZED_RECEIPTS.map((r) => r.sourceDataset).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter and Sort Pipeline
  const filteredAndSortedReceipts = useMemo(() => {
    let result = [...NORMALIZED_RECEIPTS];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((r) => {
        const titleMatch = r.title && r.title.toLowerCase().includes(q);
        const subMatch = r.subtitle && r.subtitle.toLowerCase().includes(q);
        const catMatch = r.category && r.category.toLowerCase().includes(q);
        const locMatch = r.location && r.location.toLowerCase().includes(q);
        const srcMatch = r.sourceDataset && r.sourceDataset.toLowerCase().includes(q);
        
        // Metadata fields search
        let metaMatch = false;
        if (r.metadata) {
          metaMatch = Object.values(r.metadata).some(
            (val) => val && String(val).toLowerCase().includes(q)
          );
        }

        return titleMatch || subMatch || catMatch || locMatch || srcMatch || metaMatch;
      });
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((r) => r.category === selectedCategory);
    }

    // 3. Source Dataset Filter
    if (selectedSource !== 'All') {
      result = result.filter((r) => r.sourceDataset === selectedSource);
    }

    // 4. Price/Value Filter
    if (priceFilter === 'Paid') {
      result = result.filter((r) => r.numericAmount && r.numericAmount > 0);
    } else if (priceFilter === 'Free') {
      result = result.filter((r) => !r.numericAmount || r.numericAmount === 0);
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.rawTimestamp || b.date) - new Date(a.rawTimestamp || a.date);
      }
      if (sortBy === 'oldest') {
        return new Date(a.rawTimestamp || a.date) - new Date(b.rawTimestamp || b.date);
      }
      if (sortBy === 'highest') {
        return (b.numericAmount || 0) - (a.numericAmount || 0);
      }
      if (sortBy === 'lowest') {
        return (a.numericAmount || 0) - (b.numericAmount || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedSource, priceFilter, sortBy]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSource('All');
    setPriceFilter('All');
    setSortBy('newest');
    setVisibleCount(24);
  };

  // Currently visible paginated slice
  const visibleReceipts = useMemo(() => {
    return filteredAndSortedReceipts.slice(0, visibleCount);
  }, [filteredAndSortedReceipts, visibleCount]);

  const hasMore = visibleCount < filteredAndSortedReceipts.length;

  return (
    <section
      id="explorer"
      style={{
        padding: '100px 0',
        background: '#080B16',
        color: '#FFFFFF',
        position: 'relative'
      }}
    >
      {/* Background Radial Glow */}
      <div
        className="glow-blob-blue"
        style={{
          top: '15%',
          left: '5%',
          opacity: 0.35,
          width: '450px',
          height: '450px'
        }}
      />
      <div
        className="glow-blob-cyan"
        style={{
          bottom: '20%',
          right: '5%',
          opacity: 0.3,
          width: '400px',
          height: '400px'
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(37, 99, 255, 0.12)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              color: '#22D3EE',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px'
            }}
          >
            <Compass size={14} /> DIGITAL RECEIPT EXPLORER
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
            Explore your digital life.
          </h2>

          <p style={{ fontSize: '1.08rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Browse, search, and filter <strong>3,000 real normalized receipts</strong> across financial transactions, Spotify music streams, and daily expense logs.
          </p>
        </div>

        {/* Dataset Origin Badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '36px'
          }}
        >
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '12px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(37, 99, 255, 0.25)',
              fontSize: '0.8rem',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Database size={13} color="#2563FF" />
            <span>MultiFacet Transactions: <strong style={{ color: '#E2E8F0' }}>1,000</strong></span>
          </div>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '12px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(34, 211, 238, 0.25)',
              fontSize: '0.8rem',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Database size={13} color="#22D3EE" />
            <span>Daily Household Log: <strong style={{ color: '#E2E8F0' }}>1,000</strong></span>
          </div>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '12px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              fontSize: '0.8rem',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Database size={13} color="#8B5CF6" />
            <span>Spotify History: <strong style={{ color: '#E2E8F0' }}>1,000</strong></span>
          </div>
        </div>

        {/* 1. Prominent Search Input */}
        <div
          style={{
            position: 'relative',
            maxWidth: '780px',
            margin: '0 auto 28px auto'
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '20px',
              padding: '4px 8px 4px 20px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(37, 99, 255, 0.1)'
            }}
          >
            <Search size={22} color="#22D3EE" style={{ marginRight: '12px', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by merchant, song, artist, location, note, or job..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '1rem',
                fontFamily: 'inherit',
                padding: '12px 0'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#94A3B8',
                  padding: '6px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Search Tag Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '12px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Try searching:</span>
            {['Netflix', 'Espresso', 'Lana Del Rey', 'Mumbai', 'Train', 'Surveyor', 'Flight'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: searchQuery === tag ? '#22D3EE' : '#94A3B8',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Category Filter Navigation Bar */}
        <div
          style={{
            marginBottom: '28px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'thin'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
              minWidth: 'max-content'
            }}
          >
            {categoryList.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(24);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.84rem',
                    fontWeight: isSelected ? 700 : 500,
                    border: isSelected
                      ? '1px solid #22D3EE'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isSelected
                      ? 'rgba(34, 211, 238, 0.18)'
                      : 'rgba(15, 23, 42, 0.7)',
                    color: isSelected ? '#22D3EE' : '#94A3B8',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 16px rgba(34, 211, 238, 0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      background: isSelected ? '#22D3EE' : 'rgba(255, 255, 255, 0.1)',
                      color: isSelected ? '#080B16' : '#94A3B8',
                      fontWeight: 800
                    }}
                  >
                    {count.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Toolbar: Source Filter, Price Filter & Sort Dropdown */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '14px 20px',
            marginBottom: '32px'
          }}
        >
          {/* Left Controls: Source Dataset & Price Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
            {/* Source Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={14} color="#60A5FA" />
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Source:</span>
              <select
                value={selectedSource}
                onChange={(e) => {
                  setSelectedSource(e.target.value);
                  setVisibleCount(24);
                }}
                style={{
                  background: 'rgba(8, 11, 22, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  color: '#E2E8F0',
                  fontSize: '0.82rem',
                  padding: '6px 12px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {sourceList.map((src) => (
                  <option key={src} value={src} style={{ background: '#0F172A', color: '#FFF' }}>
                    {src === 'All' ? 'All Datasets' : src}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Type:</span>
              {[
                { id: 'All', label: 'All' },
                { id: 'Paid', label: 'Paid Purchases' },
                { id: 'Free', label: 'Streams / Free' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPriceFilter(p.id);
                    setVisibleCount(24);
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    border: priceFilter === p.id ? '1px solid #2563FF' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: priceFilter === p.id ? 'rgba(37, 99, 255, 0.2)' : 'transparent',
                    color: priceFilter === p.id ? '#60A5FA' : '#94A3B8',
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Controls: Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={14} color="#22D3EE" />
            <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'rgba(8, 11, 22, 0.9)',
                border: '1px solid rgba(34, 211, 238, 0.3)',
                borderRadius: '10px',
                color: '#22D3EE',
                fontWeight: 600,
                fontSize: '0.82rem',
                padding: '6px 12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="newest" style={{ background: '#0F172A', color: '#FFF' }}>⏱️ Newest First</option>
              <option value="oldest" style={{ background: '#0F172A', color: '#FFF' }}>⌛ Oldest First</option>
              <option value="highest" style={{ background: '#0F172A', color: '#FFF' }}>💰 Highest Value First</option>
              <option value="lowest" style={{ background: '#0F172A', color: '#FFF' }}>🏷️ Lowest Value First</option>
              <option value="title" style={{ background: '#0F172A', color: '#FFF' }}>🔤 Title (A - Z)</option>
            </select>
          </div>
        </div>

        {/* 4. Result Summary Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ fontSize: '0.9rem', color: '#94A3B8' }}>
            Showing <strong style={{ color: '#22D3EE' }}>{Math.min(visibleCount, filteredAndSortedReceipts.length)}</strong> of{' '}
            <strong style={{ color: '#FFFFFF' }}>{filteredAndSortedReceipts.length.toLocaleString()}</strong> digital moments
            {filteredAndSortedReceipts.length !== NORMALIZED_RECEIPTS.length && (
              <span style={{ color: '#64748B', fontSize: '0.82rem' }}>
                {' '}(filtered from {NORMALIZED_RECEIPTS.length.toLocaleString()} total)
              </span>
            )}
          </div>

          {/* Active Filter Chips */}
          {(searchQuery || selectedCategory !== 'All' || selectedSource !== 'All' || priceFilter !== 'All') && (
            <button
              onClick={handleResetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#F87171',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={13} /> Reset All Filters
            </button>
          )}
        </div>

        {/* 5. Receipts Grid */}
        {filteredAndSortedReceipts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}
          >
            {visibleReceipts.map((receipt) => {
              const meta = CategoryMeta[receipt.type] || CategoryMeta.purchase;
              const Icon = meta.icon;

              return (
                <div
                  key={receipt.id}
                  onClick={() => onSelectReceipt && onSelectReceipt(receipt)}
                  className="glass-card-interactive"
                  style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Category Accent Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '20px',
                      right: '20px',
                      height: '2px',
                      background: meta.color,
                      opacity: 0.6
                    }}
                  />

                  {/* Top Row: Icon, Category Name & Date */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '14px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: meta.tagBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: meta.color
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: meta.color
                          }}
                        >
                          {receipt.category}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '0.75rem' }}>
                        <Clock size={12} />
                        <span>{receipt.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: '6px',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {receipt.title}
                    </h3>

                    {/* Subtitle / Note */}
                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: '#94A3B8',
                        marginBottom: '14px',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {receipt.subtitle}
                    </p>
                  </div>

                  {/* Bottom Row: Amount / Duration & Source Dataset Tag */}
                  <div
                    style={{
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      {receipt.amount ? (
                        <span
                          style={{
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: '#22D3EE'
                          }}
                        >
                          {receipt.amount}
                        </span>
                      ) : receipt.metadata?.duration ? (
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#8B5CF6' }}>
                          🎵 {receipt.metadata.duration}
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Digital Moment</span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '0.68rem',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: '#94A3B8',
                        fontWeight: 600
                      }}
                    >
                      {receipt.sourceDataset.replace('History', '').replace('Transactions', '')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 6. Polished Empty State */
          <div
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px dashed rgba(34, 211, 238, 0.3)',
              borderRadius: '24px',
              marginBottom: '40px'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'rgba(34, 211, 238, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color: '#22D3EE'
              }}
            >
              <Search size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              No digital moments found
            </h3>
            <p style={{ color: '#94A3B8', maxWidth: '440px', margin: '0 auto 24px auto', fontSize: '0.95rem' }}>
              We couldn't find any receipts matching "<strong>{searchQuery}</strong>" with your current filter selections.
            </p>
            <button onClick={handleResetFilters} className="btn-primary-blue">
              <RotateCcw size={16} /> Reset Search & Filters
            </button>
          </div>
        )}

        {/* 7. Pagination / Load More Control */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="btn-primary-blue"
              style={{
                padding: '14px 32px',
                fontSize: '0.95rem',
                borderRadius: '9999px'
              }}
            >
              <Sparkles size={16} /> Load More Moments (+24)
            </button>
            <p style={{ marginTop: '10px', fontSize: '0.78rem', color: '#64748B' }}>
              Showing {visibleCount} of {filteredAndSortedReceipts.length.toLocaleString()} moments
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
