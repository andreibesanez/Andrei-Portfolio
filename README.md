# Andrei Besañez — The Classical Observatory
### *A timeless academic atmosphere combined with modern web development.*

🌐 **Live Observatory:** [andreibesanez.vercel.app](https://andreibesanez.vercel.app)  
📁 **Repository:** [github.com/andreibesanez/Andrei-Portfolio](https://github.com/andreibesanez/Andrei-Portfolio)

---

## 🏛️ Creative Direction & Concept

The portfolio is conceived as **The Classical Observatory** — entering a private scholar’s study inside an old observatory:
- An elegant study desk, scientific manuscripts, celestial globes, engraved star charts, and brass instruments bathed in warm sunlight.
- **Classical Elegance**: Editorial layouts, serif typography, carefully framed compositions, and subtle ornamental corner brackets.
- **Astronomical Wonder**: Concentric orbital rings, astrolabe diagrams, armillary spheres, and celestial coordinates (`06°44' N, 125°21' E`).
- **Professional Developer Identity**: Demonstrating tangible capabilities as an IT student in the Philippines actively building functional, human-centered applications.
- **Modern Technical Execution**: Responsive mobile-first architecture, component-based React 19, pinned horizontal scrolling folio, alternating directional scroll reveals, and zero-runtime Plain CSS.

---

## 🔭 Dynamic Observatory Scrolling & Animations

- **Hero Chamber**: Astrolabe armillary sphere zooms 2.4x and rotates 140° on scroll down while manuscript glides toward the left horizon.
- **Section II Scholar's Study**: Academic manuscript slides in from the left while the institution seal and coordinates slide in from the right with parallax velocity.
- **Section III Instruments**: Frontend and Backend skill catalogs glide in from opposite flanks; technical tiles reveal with a tactile 3D scale cascade.
- **Section IV The Project Folio (Horizontal Glider)**: Viewport pins while cards glide seamlessly right-to-left across the screen. Central cards zoom in (`scale: 1.04`) under the observer's lens and zoom out as they pass. Equipped with category filters, brass gauge needle, and glide navigation arrows.
- **Section V The Chronicle**: Vertical brass timeline axis dynamically draws downwards with scroll scrub; milestone cards alternate entrances from left and right.
- **Section VI The Dispatch**: Deep perspective zoom-in on the correspondence manuscript, with theme-adaptive cartography and verified direct lines.

---

## 🎨 Visual Identity & Palette

| Swatch | Name | Hex Code | Purpose |
|:---|:---|:---|:---|
| 📜 | **Warm Parchment** | `#F4EFE4` | Primary manuscript background |
| 📄 | **Aged Paper** | `#E9DFCE` | Card, tray, and panel surfaces |
| 🌌 | **Midnight Navy** | `#18273B` | High-contrast headers, nocturnal celestial sky |
| 🧭 | **Antique Brass** | `#AE8950` | Primary accents, ornamental rules, astrolabe rings |
| ⭐ | **Muted Gold** | `#D7BD8B` | Celestial coordinate markers, star nodes, badges |
| ✒️ | **Charcoal Ink** | `#292A27` | Primary engraved body typography |

### Typography

- **Headings & Epitaphs**: `Cormorant Garamond` (Classical, serif, editorial)
- **Body & Manuscripts**: `DM Sans` (Clean, balanced, contemporary legibility)
- **Technical Coordinates & Logs**: `DM Mono` (Catalog indices, coordinates, reference tags)

---

## ⚡ Tech Stack

| Technology | Purpose |
|:---|:---|
| **React 19** | Reusable, declarative UI component architecture |
| **Vite** | Lightning-fast development server & optimized production bundler |
| **TypeScript** | Type-safe data models and robust component interfaces |
| **React Router v7** | Smooth client-side navigation supporting single-page and multi-route views |
| **Plain CSS** | Pure custom responsive styling, CSS variables, and night/day theme transitions |
| **GSAP + ScrollTrigger** | Armillary sphere rotation, staggered manuscript reveals, and scroll animations |
| **MapLibre GL** | Interactive cartography map with theme-adaptive CARTO tiles |
| **Web3Forms** | Direct inbox transmission without server/PHP maintenance |

---

## 📁 Repository Structure

```
├── public/
│   ├── images/
│   │   ├── pfp.png               # Scholar portrait
│   │   ├── CorJesu.webp          # Academic institution emblem
│   │   └── projects/
│   │       ├── chainbudget.png   # Chainbudget preview
│   │       └── 4ps-Nexus.png     # 4Ps-Nexus preview
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── CelestialOrb.tsx      # SVG armillary sphere with continuous GSAP orbit
│   │   ├── CelestialOrb.css
│   │   ├── ObservatoryNav.tsx    # Persistent Side Navigation + Mobile Drawer + Ripple Wipe
│   │   ├── ObservatoryNav.css
│   │   ├── ResumeModal.tsx       # Printable scholarly curriculum vitae modal
│   │   ├── ResumeModal.css
│   │   ├── CompassReturn.tsx     # Floating astrolabe scroll-to-zenith compass
│   │   ├── CompassReturn.css
│   │   ├── ProjectCard.tsx       # Standardized catalog card with repo/demo links
│   │   ├── ProjectCard.css
│   │   ├── Footer.tsx            # Colophon, coordinates & verified social links
│   │   ├── Footer.css
│   │   ├── Map.tsx               # Cartography coordinate viewer
│   │   ├── SocialIcons.tsx       # Precision vector glyphs
│   │   ├── Layout.tsx            # Master viewport shell with responsive side dock
│   │   └── Layout.css
│   ├── data/
│   │   └── portfolioData.ts      # Single source of truth for all portfolio data
│   ├── pages/
│   │   ├── ObservatoryView.tsx   # Master unified observatory scroll experience
│   │   ├── Home.tsx              # Section I: The Observatory Chamber
│   │   ├── Home.css
│   │   ├── About.tsx             # Section II: The Scholar's Study
│   │   ├── About.css
│   │   ├── Skills.tsx            # Section III: Scientific Instruments & Arsenal
│   │   ├── Skills.css
│   │   ├── Projects.tsx          # Section IV: The Project Folio
│   │   ├── Projects.css
│   │   ├── Experience.tsx        # Section V: The Historical Chronicle
│   │   ├── Experience.css
│   │   ├── Contact.tsx           # Section VI: The Dispatch & Correspondence
│   │   └── Contact.css
│   ├── types/
│   │   └── portfolio.ts          # TypeScript data contracts
│   ├── App.tsx                   # Route definitions & scroll anchor manager
│   ├── index.css                 # Classical Observatory design tokens & reset
│   └── main.tsx                  # React entry point
├── index.html                    # Google Fonts & metadata
├── package.json
├── tsconfig.json
├── vercel.json                   # Vercel SPA rewrites
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, minified production build in `dist/`.

---

## 📬 Contact Form Configuration

To connect the Dispatch form to your personal inbox:
1. Visit [web3forms.com](https://web3forms.com) and submit your email (`andreibesanez20@gmail.com`) to generate an access key.
2. In your `.env` file (or Vercel Environment Variables):
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_key_here
   ```

---

## 📜 License

Preserved and published under the [MIT License](https://opensource.org/licenses/MIT).
