import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ReceiptExplorer from './components/ReceiptExplorer.jsx';
import ConceptSteps from './components/ConceptSteps.jsx';
import ConnectionPreview from './components/ConnectionPreview.jsx';
import ConnectionExplorer from './components/ConnectionExplorer.jsx';
import StoryExplorer from './components/StoryExplorer.jsx';
import MuseumShowcase from './components/MuseumShowcase.jsx';
import ReceiptDetailModal from './components/ReceiptDetailModal.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [selectedModalNode, setSelectedModalNode] = useState(null);

  const handleExploreClick = () => {
    const explorerSection = document.getElementById('explorer');
    if (explorerSection) {
      explorerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeeHowItWorksClick = () => {
    const methodologySection = document.getElementById('connections');
    if (methodologySection) {
      methodologySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNodeSelect = (node) => {
    setSelectedModalNode(node);
  };

  const handleExhibitClick = (exhibit) => {
    // Transform exhibit into a modal presentation node
    setSelectedModalNode({
      type: 'music',
      title: exhibit.title,
      subtitle: exhibit.timeframe,
      time: 'Museum Chapter',
      amount: '$22.95 Total',
      exhibitData: exhibit,
      metadata: {
        theme: exhibit.theme,
        exhibitType: 'Curated Museum Exhibit Chapter'
      }
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#080B16',
        color: '#0F172A',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Navbar */}
      <Navbar onExploreClick={handleExploreClick} />

      {/* Hero Section */}
      <main style={{ flex: 1 }}>
        <Hero
          onExploreClick={handleExploreClick}
          onSeeHowItWorksClick={handleSeeHowItWorksClick}
          onSelectNode={handleNodeSelect}
        />

        {/* Phase 3 Digital Receipt Explorer */}
        <ReceiptExplorer onSelectReceipt={handleNodeSelect} />

        {/* Methodology / Concept Steps */}
        <ConceptSteps />

        {/* Connection Discovery Preview (visual teaser) */}
        <ConnectionPreview onNodeSelect={handleNodeSelect} />

        {/* Phase 4 — Connection Engine Explorer */}
        <ConnectionExplorer onSelectReceipt={handleNodeSelect} />

        {/* Phase 5 — Story Engine & Narrative Life Chapters */}
        <StoryExplorer onSelectReceipt={handleNodeSelect} />

        {/* Editorial Digital Museum Showcase */}
        <MuseumShowcase onExhibitClick={handleExhibitClick} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Receipt Detail Inspection Modal */}
      {selectedModalNode && (
        <ReceiptDetailModal
          node={selectedModalNode}
          onClose={() => setSelectedModalNode(null)}
          onExploreDeeper={() => {
            setSelectedModalNode(null);
            handleExploreClick();
          }}
        />
      )}
    </div>
  );
}
