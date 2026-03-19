# Fitness Sports Center

A premium, multi-page React application conceptualized for an elite gym and fitness facility. Built to be blazing fast with Vite, it features a highly dynamic, user-centric interface that seamlessly navigates across multiple highly-detailed landing pages representing different fitness plans, pricing models, and services.

### 🌐 Live Link
*(Insert Production URL Here once deployed!)*
- **Local Dev Server**:

---

## 🛠 Tech Stack

- **Framework**: React 18
- **Routing**: React Router DOM (v6.15+) for internal SPA architecture.
- **Build Tool**: Vite for incredibly fast Hot Module Replacement (HMR) and dev server.
- **Styling**: Vanilla CSS injected dynamically. No external component libraries are used, ensuring a 100% custom, bespoke design focused on dynamic aesthetics (CSS Variables, Flexbox/Grid patterns).
- **Tooling**: TypeScript config with strict settings, combined with standard JS/JSX page logic.

---

## ✨ Key Features & Capabilities

- **Multi-Page Architecture**: 
  - Comprehensive standalone routing covering: `/personal-training`, `/group-classes`, `/modern-equipment`, `/cardio-health`, and a dedicated `/pricing` page.
- **Dark/Light Mode**:
  - Global CSS context toggling implemented right in the navigation bar, switching fluidly between sleek dark backgrounds and accessible light palettes.
- **Integrated Program Search**:
  - A real-time keyword search bar mounted in the primary Navigation. Searches actively filter the "Programs" grid while instantly scrolling the user down to view the live results.
- **Intersection Observer Animations**:
  - Built-in `useInView` Custom Hooks trigger elegant fade-up CSS keyframe animations exclusively when elements scroll into the viewport.
- **Simulated API Form Handling**:
  - A robust "Contact Us" web form complete with field validation. On submit, it disables the UI to display a loading state, fires a `fetch` POST request to a standard mock JSON API (`jsonplaceholder`), and handles both network success and error status outputs.
- **Anchor Smooth Scrolling**:
  - Seamless layout jumping to internal anchors (`#hero`, `#about`, `#programs`, `#contact`) utilizing both direct clicks and React-Router's `useLocation().hash` hook.

---

## ⚙️ Setup Instructions

To get a local clone running on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/en/) installed securely (NPM comes mapped by default).

### 2. Installation
Clone this repository and verify you are in the project's root folder:
```bash
git clone https://github.com/HimashaSawani/gym-promo-website
cd gym-promo-website
```

Run basic NPM install to catch all `package.json` dependencies (Vite, React DOM, Router):
```bash
npm install
```

### 3. Run Locally 
To spin up the development environment, execute:
```bash
npm run dev
```
Navigate to your provided localized host (typically `http://localhost:5173`) in your web browser. 

### 4. Build for Production
To bundle a minified, lightweight build into a `/dist` folder for hosting via Vercel, Firebase, AWS, run:
```bash
npm run build
npm run preview  
