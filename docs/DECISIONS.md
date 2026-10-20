# Architecture Decisions & Implementation Log (DECISIONS.md)

## 1. Directory Isolation
- All development, source code, data, assets, and documentation were strictly isolated to `c:\Users\nerma\Desktop\Aurora-main\new_aurora`.
- Existing team imagery, competition marks, and sponsor graphics were copied into `new_aurora/public/images/` and optimized for Next.js.

## 2. 3D Mars Rover Architecture & Compression
- **Source Model**: Found `rover_mirrored.glb` (9.09 MB) in the project workspace.
- **Node Analysis**: Inspected using `@gltf-transform/cli`. The model consists of a single unified mesh (`model_852.obj`) with PBR metallic-roughness material and 172,383 vertices.
- **Optimization**: Applied Draco geometry compression using `@gltf-transform/cli`. The file size was reduced from **9.09 MB to 1.03 MB** (89% bandwidth reduction), comfortably below the 2–3 MB performance target.
- **Node Separation Fallback**: Per specification section 6, because the model was exported as a single unified mesh without separated wheel transform nodes, whole-model scroll-linked transforms were adopted (turntable rotation, orbital scrub, pitch/yaw hover parallax, translation, and parking).
- **Procedural & Poster Fallback**: Implemented an automated procedural Mars rover fallback within Three.js alongside a static poster image (`rover-poster.png`) when `prefers-reduced-motion` is active.

## 3. Motion & Smooth Scrolling
- Integrated **Lenis** with GSAP ticker synchronization (`gsap.ticker.add((t) => lenis.raf(t * 1000))` and `gsap.ticker.lagSmoothing(0)`).
- Implemented a custom char/word text splitter in `/lib/splitText.ts` for staggered reveals without requiring Club GreenSock commercial plugins.
- Built a custom magnetic cursor in `/components/ui/Cursor.tsx` with smooth GSAP quickTo tracking, disabled automatically on touch/coarse pointers.

## 4. Neo-Brutalist & Technical Aesthetics
- Defined CSS variables in `globals.css` with dark space and Mars rust palettes (`--space-900`, `--mars`, `--solar`, `--aurora-teal`, `--bone`).
- Implemented neo-brutalist zero-blur hard offset shadows (`4px 4px 0px var(--bone)`), collapsing on hover with `(3px, 3px)` translate.
- Implemented signature outline-vs-solid text strokes (`-webkit-text-stroke: 1.5px var(--bone)`).
- Dynamically toggled `data-theme` on `<body>` via ScrollTrigger across sections.

## 5. Signature Challenges Section
- Designed the full-screen wipe to `--mars` (`#E2552B`) rust background with a high-contrast technical black grid.
- Implemented a repeating CSS grid letter field (`C H A L L E N G E S`) with parallax depth.
- Created a horizontal pinned cassette card track sliding along `xPercent` scrubbed to user scroll, with full responsive fallback to vertical stacked cards on mobile devices.
