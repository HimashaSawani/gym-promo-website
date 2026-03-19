# Fitness Sports Center

A premium, multi-page React application conceptualized for an elite gym and fitness facility. Built with **Vite** for blazing fast performance, it features a highly dynamic, user-centric interface across multiple landing pages representing fitness plans, services, and pricing models.


## 🌐 Live Demo
[https://gym-promo-website.vercel.app/]

**Local Dev Server:** [http://localhost:5173]



## 🛠 Tech Stack

- **Framework:** React 18  
- **Routing:** React Router DOM (v6.15+)  
- **Build Tool:** Vite  
- **Styling:** Vanilla CSS with dynamic CSS variables, Flexbox/Grid patterns  
- **Tooling:** TypeScript (strict settings) with standard JS/JSX  



## ✨ Key Features

- **Multi-Page Architecture:** `/personal-training`, `/group-classes`, `/modern-equipment`, `/cardio-health`, `/pricing`.  
- **Dark/Light Mode:** Global toggle via navigation bar.  
- **Integrated Program Search:** Real-time filtering with scroll-to results.  
- **Intersection Observer Animations:** `useInView` custom hooks for elegant fade-up animations.  
- **Simulated API Form Handling:** Contact form with validation, loading states, and fetch to mock API (`jsonplaceholder`).  
- **Anchor Smooth Scrolling:** Seamless navigation to internal anchors.  



## ⚙️ Setup Instructions

### 1. Prerequisites
Ensure [Node.js](https://nodejs.org/) is installed (includes NPM).  

### 2. Installation
```bash
git clone https://github.com/HimashaSawani/gym-promo-website
cd gym-promo-website
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 4. Build for Production

```bash
npm run build
npm run preview
```

* Production build will be in `/dist`.



## 📁 Project Structure

.
├── public/                # Static assets (images, icons, etc.)
├── src/                   # Source code
│   ├── data/              # Data sources and services
│   ├── pages/             # Route pages and view components
│   ├── styles/            # Global styles and CSS utilities
│   ├── App.tsx            # App root + route layout
│   ├── main.tsx           # Vite entry point
│   └── routes.tsx         # React Router routes config
├── index.html             # Vite HTML template
├── package.json           # npm metadata + scripts
├── tailwind.config.js     # Tailwind configuration
└── vite.config.ts         # Vite build/dev config


## 🚀 Deployment

This project is deployed via **Vercel**. Steps to deploy:

1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and select **New Project → Import Git Repository**.
3. Choose your repository (`gym-promo-website`) and branch (`master`).
4. Set **Framework Preset** to **Vite**.
5. Set **Build Command:** `npm run build`
6. Set **Output Directory:** `dist`
7. Click **Deploy** → your site is live!

> Future pushes to `master` automatically trigger redeploys.



## 🧩 NPM Scripts

* `npm run dev` – Runs Vite dev server with HMR
* `npm run build` – Production build in `/dist`
* `npm run preview` – Preview production build locally



## 🤝 Contributing

Issues, features, and pull requests are welcome. Feel free to contribute!



