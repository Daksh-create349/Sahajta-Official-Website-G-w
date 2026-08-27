# Sahajta AI — Production Platform & Web Application

## Overview

Sahajta AI is a high-performance web application built for an AI-native build studio and fractional CTO practice. The platform highlights autonomous AI solutions, custom agentic workflows, production case studies, engagement models, and founder leadership.

Designed with modern aesthetic principles, the application features dynamic liquid glass interfaces, 3D card interactions, smooth section scrolling, and accessible modal overlays.

---

## Technical Stack

### Core Technologies
- React 18 — Modern component-based user interface library
- TypeScript 5 — Statically typed JavaScript for robust application code
- Vite 8 — Lightning-fast development server and production bundler

### Styling & Animation
- Tailwind CSS v4 — Utility-first CSS framework with custom theme tokens
- Framer Motion — Physics-based animation engine for scroll transitions and layout animations
- CSS Modules & Variables — Micro-interactions, liquid glass backdrop filters, and custom scrollbars

---

## Repository Structure

```
.
├── src/
│   ├── assets/                 # Optimized images, logos, and video assets
│   │   ├── cover-*.png         # Case study cover graphics
│   │   ├── services/           # High-resolution service illustrations
│   │   ├── sahajta-logo.png    # Official brand mark
│   │   └── *.mp4               # Video showcases
│   │
│   ├── components/
│   │   ├── layout/             # Top-level layout wrappers
│   │   │   ├── Navbar.tsx      # Floating liquid glass navigation bar
│   │   │   └── Footer.tsx      # Minimal dark sign-off and footer navigation
│   │   │
│   │   ├── sections/           # Modular page sections
│   │   │   ├── Hero.tsx        # Hero banner with proof badges
│   │   │   ├── VideoShowcase.tsx # Autonomous motion graphic showcase
│   │   │   ├── Overview.tsx    # Interactive 4-pillar philosophy section
│   │   │   ├── Services.tsx    # 4-step capability showcase
│   │   │   ├── CaseStudies.tsx # 3D interactive flip-card project gallery
│   │   │   ├── LatestShip.tsx  # Featured latest production release
│   │   │   ├── Process.tsx     # Product momentum engine step deck
│   │   │   ├── Pricing.tsx     # Transparent engagement rate sheet
│   │   │   ├── Team.tsx        # Founder profiles and leadership focus
│   │   │   └── TalentShowcaseCTA.tsx # Video CTA container
│   │   │
│   │   └── ui/                 # Reusable UI primitives and modals
│   │       ├── FaqModal.tsx    # Interactive FAQ popup modal with accordion
│   │       └── aurora-background.tsx # Ambient hero gradient container
│   │
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn class merger)
│   │
│   ├── App.tsx                 # Main application container
│   ├── index.css               # Global typography, color tokens, and base layers
│   └── main.tsx                # Application entry point
│
├── public/                     # Static assets served at root
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript workspace configuration
├── tsconfig.app.json           # Application TypeScript compiler settings
└── vite.config.ts              # Vite build configuration
```

---

## Section Breakdown

### Navbar
- Floating liquid glass navigation bar (`liquid-glass` / `liquid-glass-scrolled`).
- Smooth scrolling event handlers connecting section targets (`#overview`, `#services`, `#case-studies`, `#process`, `#pricing`).
- Mobile responsive drawer menu with backdrop blur.

### Hero
- Primary headline positioning Sahajta as a fractional CTO and build partner.
- Interactive action buttons (*See If We Can Help*, *See What We Have Built*).
- Proof badges highlighting unlimited requests and weekly predictable sprints.

### VideoShowcase
- Full-frame uncropped motion graphic showcase presenting real-time system execution.

### Overview
- Interactive 4-pillar studio architecture showcase (*Rapid SLA Deployments*, *100% Code Ownership*, *Non-Invasive Integration*, *Production Validation Harnesses*).
- Dynamic tab switching with animated state indicators and full-resolution background imagery.

### Services
- Interactive 4-step capability cards featuring custom AI pipelines, business automation, existing system integration, and web engineering.

### CaseStudies
- 3D perspective flip cards detailing real-world client builds (*Stratapilot*, *HireAI*, *Invoice AI Parser*, *Blog Writing Agent*).
- Front face: Full-bleed project artwork and impact metrics.
- Back face: Technical stack tags, performance metrics, and key feature highlights.

### LatestShip
- Highlight card showcasing recent 24-hour production deploys.

### Process
- Sticky stacked deck animation guiding users through the 4-step sprint workflow (*Set the Goal*, *Plan the Work*, *Build and Test*, *Review and Ship*).

### Pricing
- Transparent rate sheet for core engagement models (*MVP Engineering*, *AI Automation & Agents*, *AI Feature Integration*, *Website Design & Build*).
- Expandable detailed deliverables list with fixed 24-hour quote SLA terms.

### Team
- Founder profiles for Shubhang Sethi (*Product Lead*) and Pranamya Jain (*Tech Lead*).
- Clean focus summaries and technology stack tags.

### Footer & FaqModal
- Inverted deep dark footer background with email call-to-action (`hello@sahajta.com`).
- Quick-access FAQ trigger opening `FaqModal`.
- Interactive FAQ accordion covering client compatibility, turnaround times, IP ownership, sprint structure, and engagement costs.

---

## Design System & Principles

### Color Palette
- Background: Warm off-white (`#faf8f6`)
- Card Surfaces: Light cream (`#eeebe4`), Subtle border (`#e2ded5`)
- Dark Contrast Surfaces: Deep charcoal (`#121212`, `#161616`, `#0a0a0a`)
- Text Tokens: Dark Charcoal (`#121212`), Muted Zinc (`#5a4235`, `#71717a`)

### Typography
- Headings & Titles: **Syne** (Google Fonts) — Bold, geometric, and modern
- Body Copy: **Inter** — Highly legible sans-serif for reading comfort
- Mono Elements & Badges: **Fragment Mono** — Technical, precise monospace font

### Interactive Aesthetics
- Liquid Glass: Blur filters (`backdrop-filter: blur(24px)`) paired with subtle specular highlights.
- Motion Control: Respects `prefers-reduced-motion` preferences across all Framer Motion components.
- Zero Emoji Policy: Pure typography, vector glyphs, and micro-dot indicators.

---

## Local Development Setup

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/sahajta/sahajta-website.git
   cd sahajta-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches Vite dev server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript and builds optimized production bundle to `dist/`. |
| `npm run preview` | Serves the built production bundle locally for testing. |
| `npx tsc --noEmit` | Runs TypeScript compiler type checking without emitting files. |

---

## SEO & AI Discoverability

This platform implements comprehensive search engine optimization and AI search discoverability infrastructure.

### AI Search Discovery Files
| File | Purpose |
| :--- | :--- |
| `/llms.txt` | Summary context file for LLM crawlers (ChatGPT, Claude, Gemini, Perplexity) |
| `/llms-full.txt` | Full knowledge base with service catalog, FAQ, and search query matching |
| `/.well-known/mcp.json` | Web MCP discovery — structured capabilities for AI agents |
| `/.well-known/security.txt` | RFC 9116 security contact discovery |
| `/humans.txt` | Team, tech stack, and AI context endpoints for crawlers |

### Structured Data (JSON-LD)
The `index.html` contains a comprehensive `@graph` with:
- **Organization** — Name, founders, `knowsAbout` (35+ technology topics)
- **WebSite** — Canonical site identity
- **ProfessionalService** — `OfferCatalog` with 12 service offers
- **FAQPage** — 22 question/answer pairs for Google rich snippets
- **BreadcrumbList** — Section navigation (Home, Services, Case Studies, Process, Contact)
- **HowTo** — 4-step engagement flow for Google featured snippets
- **WebPage** — `SpeakableSpecification` for voice search assistants

### GEO (Generative Engine Optimization)
Meta tags targeting AI search engines:
- `ai:description` — Structured AI-readable summary
- `citation_title`, `citation_author`, `citation_publication_date` — Academic-style citation metadata
- `abstract`, `subject`, `classification`, `category` — Semantic classification
- `<link rel="alternate">` — Points to llms.txt and llms-full.txt

### Crawler Configuration
- `robots.txt` — Allows all search engine and AI crawlers (Googlebot, GPTBot, ClaudeBot, PerplexityBot, etc.)
- `sitemap.xml` — All pages, section anchors, and AI discovery files with priorities
- `<noscript>` fallback — Keyword-rich HTML for crawlers that don't execute JavaScript

---

## Production Deployment

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates a static `dist/` directory ready for deployment on any static hosting provider:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 / CloudFront

---

## License

Copyright © 2026 Sahajta AI. All rights reserved. Proprietary codebase.
