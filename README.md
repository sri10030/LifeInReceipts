# LifeInReceipts

> Turning fragmented digital activity into meaningful connections, patterns, and stories.

## Live Demo

**https://life-in-receipts-lime.vercel.app/**

---

## Overview

LifeInReceipts is an interactive web experience that transforms thousands of digital activity records into a visual journey.

Instead of presenting raw data as tables or isolated records, the application explores relationships between moments through time, location, category, and activity. These relationships are then organized into patterns and story-like chapters.

The experience follows a simple flow:

**Moments → Connections → Patterns → Stories**

---

## What It Does

### Receipt Explorer

Explore and search through 3,000 records from three different datasets.

- Full-text search
- Category filtering
- Dataset filtering
- Value-based filtering
- Sorting and progressive loading
- Detailed receipt inspection

### Connection Discovery

The connection engine identifies relationships between records using measurable signals such as:

- Same date
- Same location
- Temporal proximity
- Related categories
- High-value activity
- Shared artists

Each connection has an explainable score and supporting signals.

### Life Chapters

Connected moments are grouped into larger story units based on shared context.

Each chapter presents:

- Date and location
- Connected moments
- Categories
- Connection count
- Monetary activity
- Individual receipt details

### Insights

The insights section provides a higher-level view of the complete dataset, including:

- Category distribution
- Spending ranges
- Activity by time of day
- Geographic distribution
- Dataset comparisons
- Connection statistics
- Story statistics

### Digital Museum

The final experience brings the discovered patterns back into an editorial-style presentation, turning raw records into a visual narrative.

---

## Dataset

The application works with 3,000 records across three datasets.

| Dataset | Records | Description |
| :--- | ---: | :--- |
| India MultiFacet | 1,000 | Transactions and activity records |
| Daily Household | 1,000 | Household transaction records |
| Spotify History | 1,000 | Music listening records |
| **Total** | **3,000** | |

The application normalizes these datasets into a common structure before running the connection, story, and insight engines.

---

## Architecture

```text
Raw Datasets
     |
     v
Normalization
     |
     +-------------------+
     |                   |
     v                   v
Receipt Explorer    Insights Engine
     |
     v
Connection Engine
     |
     v
Story Engine
     |
     v
Interactive Experience
     |
     +-------------------+
     |         |         |
     v         v         v
Connections  Stories   Insights
```

The connection and story engines are deterministic and operate directly on the normalized dataset. No external AI service is required.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React |
| **Build Tool** | Vite |
| **Language** | JavaScript / JSX |
| **Styling** | Custom CSS |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Data Processing** | Client-side JavaScript |
| **Deployment** | Vercel |

---

## Project Structure

```text
LifeInReceipts/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ConstellationVisual.jsx
│   │   ├── ReceiptExplorer.jsx
│   │   ├── ReceiptDetailModal.jsx
│   │   ├── ConnectionExplorer.jsx
│   │   ├── ConnectionCard.jsx
│   │   ├── StoryExplorer.jsx
│   │   ├── StoryChapterCard.jsx
│   │   ├── InsightsExplorer.jsx
│   │   ├── MuseumShowcase.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   ├── normalizedReceipts.js
│   │   ├── connectionEngine.js
│   │   ├── storyEngine.js
│   │   └── insightsEngine.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
├── LICENSE
└── .gitignore
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Design

The interface uses a dark editorial visual system with deep navy backgrounds, electric blue and cyan accents, glass surfaces, subtle gradients, and motion-based interactions.

The design is intentionally focused on presenting data as an experience rather than a conventional dashboard.

---

## Performance

The application uses client-side optimizations to keep exploration responsive across thousands of records.

- Indexed data grouping
- Memoized calculations
- Deterministic connection discovery
- Cached derived results
- Progressive receipt loading
- Responsive layouts

---

## License

This project is licensed under the MIT License.

---

## Live Demo

[https://life-in-receipts-lime.vercel.app/](https://life-in-receipts-lime.vercel.app/)
