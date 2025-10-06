# TrackProgress — Windhoek Virtual Tour

## Project snapshot
Repo: <repo-url>
Main branch: main
Dev branch: develop
Date started: 2025-10-04

## Current status
- Phase: [x] setup [x] UI [ ] 3D [ ] 360 embed [ ] polish [ ] deploy
- Completed tasks:
  - scaffolded project
  - added tailwind tokens
  - landing + detail routes scaffolded

## Tasks (ordered)
1. Setup
   - [x] create repo, add README, .gitignore
   - [x] scaffold Next.js + TS (+ Tailwind v4)
   - [ ] eslint/prettier fine-tuning
2. Design tokens
   - [x] add tokens in globals.css (brand, accent, sand)
3. Content model
   - [x] create src/data/landmarks.json (3 entries)
4. GLB viewer
   - [x] add @react-three/fiber and drei
   - [x] implement viewer with presets + graceful fallback
   - [ ] add real .glb assets in public/models
5. 360 embeds
   - [x] add iframe component; lazy-load and accessible
   - [ ] replace sample URLs with your real tours
6. Landmark pages
   - [x] create routes and templates
7. QA & performance
   - [ ] run Lighthouse, fix issues
8. Deploy
   - [ ] setup Vercel project

## How to continue (step-by-step)
1. Add real GLB models to public/models
2. Replace tour360Url in src/data/landmarks.json with your provider URLs
3. Run `npm run dev` and test /landmarks/<slug>
4. Optimize assets (draco compressed glTF)
5. Commit and push to Vercel for deploy

## Notes / decisions
- Tailwind v4 used with @theme tokens in globals.css
- 3D fallback renders a cube if model fails to load (keeps page working)
- Map uses OSM embed and link to Google Maps

## Contacts
- Author: <Your name>
- Supervisor: <Supervisor name/contact>
