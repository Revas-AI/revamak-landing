# Revamak Landing Page

The marketing website for **Revamak** — an inference engineering workbench that helps teams optimize AI model serving costs while maintaining performance.

## About Revamak

Revamak orchestrates inference engines teams already trust (vLLM, SGLang, LoRAX) to make every token cheaper. The platform provides three core modes:

- **Optimize** — Run configuration sweeps to find the best cost-latency tradeoffs with Pareto frontier visualization
- **Forward Deployed** — Deploy optimized configs across multiple client environments with isolation
- **Operate** — Monitor production inference with real-time cost tracking and alerts

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Animations**: [GSAP](https://gsap.com) with ScrollTrigger
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) with Three.js
- **Icons**: [Lucide React](https://lucide.dev)

## Features

- Responsive design for mobile, tablet, and desktop (including large 24"+ screens)
- Smooth scroll-triggered animations throughout
- Interactive configuration sweep visualization with Pareto frontier
- Animated funnel dot visualization with staggered wave effect
- 3D neural network hero animation
- Scroll-linked marquee text
- Interactive accordion for product modes

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with Lenis smooth scrolling
│   ├── page.tsx        # Main landing page
│   └── globals.css     # Global styles and Tailwind imports
└── components/
    ├── Header.tsx          # Navigation header
    ├── Hero.tsx            # Hero section with 3D background
    ├── NeuralNetwork3D.tsx # Three.js neural network visualization
    ├── Workbench.tsx       # Product workbench demo section
    ├── FunnelStatement.tsx # Animated funnel dot grid
    ├── ModesIntro.tsx      # Modes introduction
    ├── ModesAccordion.tsx  # Interactive accordion with sweep visualization
    ├── Numbers.tsx         # Key metrics section
    ├── Marquee.tsx         # Scroll-linked marquee
    ├── Pricing.tsx         # Pricing tiers
    ├── Footer.tsx          # Footer with CTA
    └── Logo.tsx            # SVG logo component
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd revamak-landing

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Design Tokens

The site uses a custom color palette defined in Tailwind:

| Token | Description |
|-------|-------------|
| `paper` | Light background (#EEECE6) |
| `ink` | Primary text (#1A1A1D) |
| `ember` | Accent color (#D2572B) |
| `night` | Dark background (#1A1A1D) |
| `muted` | Secondary text |
| `line` | Border color |

## Deployment

The site is optimized for deployment on [Vercel](https://vercel.com):

```bash
npm run build
```

The build outputs static pages that can be deployed to any static hosting provider.

## License

Private - All rights reserved.

---

Built in Accra, for teams everywhere.
