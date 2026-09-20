import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ConceptSteps from './components/ConceptSteps.jsx';
import ConnectionPreview from './components/ConnectionPreview.jsx';
import MuseumShowcase from './components/MuseumShowcase.jsx';
import ReceiptDetailModal from './components/ReceiptDetailModal.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [selectedModalNode, setSelectedModalNode] = useState(null);

  const handleExploreClick = () => {
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
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
      exhibitData: exhibit
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

        {/* Methodology / Concept Steps */}
        <ConceptSteps />

        {/* Connection Discovery Preview */}
        <ConnectionPreview onNodeSelect={handleNodeSelect} />

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
