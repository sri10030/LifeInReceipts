# LifeInReceipts 🧾

> **Transforming daily digital traces into interactive visual constellations and editorial museum stories.**

---

## 🌟 Short Description

**LifeInReceipts** is an interactive web experience and digital museum platform that synthesizes raw, fragmented digital receipts—financial transactions, music listening logs, dining receipts, transit activity, and micro-moments—into interconnected visual constellations and curated personal narrative exhibits.

---

## 💡 Hackathon & Problem Overview

### The Problem
Every day, we leave behind hundreds of digital footprints across banks, streaming platforms, delivery apps, and location logs. In isolation, a \$4.50 coffee receipt or a midnight song play feels transactional and forgettable. Traditional financial and activity tracking tools offer rigid spreadsheets and bland bar charts that miss the human context behind our spending and behavior.

### The Solution
**LifeInReceipts** reimagines digital footprint data as personal history. By correlating temporal, spatial, and emotional markers across disparate datasets (financial transactions, Spotify histories, household expense logs), **LifeInReceipts** connects isolated data nodes into visual constellations and curates them into editorial museum chapters. It turns raw transactions into a living digital memory box.

---

## ✨ Key Features

- **🌌 Interactive Constellation Node Graph**: Dynamic visual node map connecting multi-faceted receipts (Music, Coffee, Subscriptions, Rides, Groceries, Books) with hover effects, pulsing glow connections, and interactive node inspection.
- **🔬 4-Stage Methodology Pipeline**:
  1. **Moments**: Captures everyday digital traces.
  2. **Connections**: Identifies time, location, and contextual relationships.
  3. **Patterns**: Uncovers recurring routines and habits.
  4. **Stories**: Synthesizes patterns into editorial digital museum exhibits.
- **🏛️ Editorial Digital Museum Showcase**: Interactive exhibit chapters showcasing curated life periods (e.g., *Midnight Coding Sessions*, *The Coffee-Fuelled Hackathon*, *Autumn Indie Road Trip*).
- **🔎 Deep Receipt Inspection Modal**: Micro-detail modal card displaying itemized costs, exact timestamps, geo-coordinates, emotion tags, connected audio tracks, and contextual notes.
- **🎨 Glassmorphic Dark-Mode UI**: Built with a curated dark color palette (`#080B16`), subtle glassmorphism, responsive CSS grid layouts, and custom interactive transitions.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile views with custom navigation drawers.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework & Core** | React 18, Vite 5, JavaScript (ES Module) |
| **Styling** | Custom Vanilla CSS (Design Tokens, Glassmorphism, CSS Grid & Flexbox) |
| **Animation & Icons** | Framer Motion, Lucide React |
| **Build & Tooling** | Vite, Node.js |

---

## 📁 Project Structure

```text
LifeInReceipts/
├── Augment_IndiaTransactMultiFacet2024.csv    # Multi-facet transaction dataset (CSV)
├── Augment_IndiaTransactMultiFacet2024.json   # Multi-facet transaction dataset (JSON)
├── Augment_IndiaTransactMultiFacet2024.tsv    # Multi-facet transaction dataset (TSV)
├── Augment_IndiaTransactMultiFacet2024.xml    # Multi-facet transaction dataset (XML)
├── Daily Household Transactions.csv          # Household transaction dataset
├── spotify_data_dictionary.csv                # Data dictionary for streaming history
├── spotify_history.csv                        # Music streaming history dataset
├── index.html                                 # HTML entry point
├── package.json                               # Dependencies and scripts
├── package-lock.json                          # Lockfile
├── vite.config.js                             # Vite bundler configuration
├── LICENSE                                    # MIT License
├── .gitignore                                 # Git ignore configuration
└── src/
    ├── main.jsx                               # Application root entry point
    ├── App.jsx                                # Main container layout & state manager
    ├── index.css                              # Design system, tokens, and utility classes
    └── components/
        ├── Navbar.jsx                         # Top navigation bar with scroll detection
        ├── Hero.jsx                           # Main hero header with live stats & CTA
        ├── ConstellationVisual.jsx            # Interactive SVG node graph canvas
        ├── ReceiptNode.jsx                    # Floating interactive node element
        ├── ConceptSteps.jsx                   # 4-Stage Methodology pipeline presentation
        ├── ConnectionPreview.jsx              # Connection discovery grid & category filters
        ├── MuseumShowcase.jsx                 # Editorial digital museum exhibit cards
        ├── ReceiptDetailModal.jsx             # Comprehensive receipt inspection modal
        └── Footer.jsx                         # Project footer & metadata credits
```

---

## 🚀 How to Install and Run

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### Step-by-Step Setup

1. **Clone the repository** (or extract the project files):
   ```bash
   git clone https://github.com/your-username/LifeInReceipts.git
   cd LifeInReceipts
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the URL displayed in your terminal).

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## 📜 npm Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches Vite local development server with HMR |
| `npm run build` | Bundles production-optimized static assets into `dist/` |
| `npm run preview` | Serves the production build from `dist/` for local preview |
| `npm run lint` | Runs Vite build check for syntax & type validation |

---

## 🔮 Future Improvements

- **🤖 Automated Multi-Format Dataset Parser**: Enable drag-and-drop CSV, JSON, TSV, and XML upload to dynamically ingest user receipts into the constellation graph.
- **🔑 Live OAuth Integration**: Direct API connections with Spotify, Plaid, and Google Location History for real-time receipt syncing.
- **🌌 Spatial 3D Constellation Engine**: Upgrade the 2D node visualizer to a 3D WebGL space using Three.js / React Three Fiber.
- **📖 Personalized PDF/Web Memory Storybooks**: Export curated museum exhibits as shareable interactive links or high-resolution digital storybooks.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
