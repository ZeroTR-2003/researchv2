# 🏛️ Ascend Windhoek - Interactive Virtual Tour

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)

> **Final Year Research Project** - An immersive virtual tour showcasing Windhoek's most iconic landmarks through interactive 3D models and 360° panoramic photography.

---

## ✨ Features

### 🎮 Interactive 3D Models
- **High-quality GLB models** of landmark exteriors
- **90vh viewport height** for immersive viewing
- **Fullscreen mode** for detailed exploration
- **Orbit controls** with auto-rotation
- **Camera presets** (Front, Side, Top views)

### 🌍 360° Virtual Tours
- **Panoramic interior views** using Panoee integration
- **Device motion support** for mobile gyroscope control
- **Fullscreen capability**

### 🎨 Premium Design
- **Dark mode** with smooth transitions
- **Theme persistence** via localStorage
- **Luxury travel-inspired** UI design
- **Responsive** mobile-first design

### 🗺️ Rich Information
- **Interactive maps** for each landmark
- **Quick facts** cards
- **Photo galleries** with hover effects

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm/yarn/pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/ZeroTR-2003/researchv2.git
cd researchv2

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🏛️ Landmarks

The tour features **3 iconic landmarks**:

1. **🕍 Christuskirche** - Lutheran Church (1907-1910)
2. **⚔️ Heroes' Acre** - National Monument (2002)
3. **🏛️ Windhoek City Museum** - Cultural Heritage

---

## 🛠️ Tech Stack

- **Next.js 15.5.4** - React framework with SSR/SSG
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Three.js** - WebGL 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Tailwind CSS 3** - Utility-first styling
- **React Context API** - Theme state management

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── landmarks/[slug]/   # Dynamic landmark pages
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── GLBViewer.tsx     # 3D model viewer
│   ├── Header.tsx        # Navigation
│   ├── TourEmbed.tsx     # 360° tours
│   └── ...
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Dark mode
├── data/
│   └── landmarks.json    # Content data
└── lib/
    └── cms.ts           # Content management
```

---

## 🚢 Deployment to Vercel

### Option 1: Via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Build Configuration

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

## 💻 Development

### Adding New Landmarks

Edit `src/data/landmarks.json`:

```json
{
  "slug": "new-landmark",
  "title": "New Landmark",
  "shortDescription": "Description",
  "glbExterior": "/models/new-landmark.glb",
  "tour360Url": "https://...",
  "coords": { "lat": -22.5, "lng": 17.0 },
  "facts": {...},
  "gallery": [...]
}
```

Add your `.glb` file to `public/models/`

### Theme Customization

Edit colors in `src/app/globals.css`:

```css
:root {
  --brand-900: #2a343d;
  --accent: #ffae62;
  /* ... */
}
```

---

## 🎓 Academic Context

This **Final Year Research Project** demonstrates:

✅ Modern web development (React 18, Next.js 15)  
✅ 3D visualization with Three.js  
✅ Interactive user experiences  
✅ Responsive design principles  
✅ Performance optimization  
✅ Dark mode implementation  

---

## 📝 License

Academic project - All rights reserved © 2025

---

## 🙏 Acknowledgments

- **Namibia Tourism Board** - Landmark information
- **Panoee** - 360° tour platform
- **Next.js Team** - Framework
- **Vercel** - Deployment platform

---

## 📧 Contact

- **GitHub**: [@ZeroTR-2003](https://github.com/ZeroTR-2003)
- **Repository**: [github.com/ZeroTR-2003/researchv2](https://github.com/ZeroTR-2003/researchv2)

---

**Built with ❤️ using Next.js, React, Three.js, and Tailwind CSS**

🚀 [Live Demo](https://researchv2.vercel.app) _(Update after deployment)_
