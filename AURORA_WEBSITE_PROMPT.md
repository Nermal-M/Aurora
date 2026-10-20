# PROMPT: Build the PSG Team Aurora Website ("Descent to Mars")

You are a senior creative frontend engineer. Build a complete, production-quality, scroll-driven website for **PSG Team Aurora**, a Mars rover team from PSG Institute of Technology and Applied Research (PSG iTech). The rover is called **Tarush**. This is a ground-up redesign of https://psgteamaurora.in/. Build the full project, not a prototype.

Read this whole file before writing any code. Follow the phases in section 13. Anything written as `[[PLACEHOLDER: ...]]` is unknown content: render believable placeholder content in its place, keep every placeholder in the typed data files under `/data`, and make each one trivial to replace later. Do not invent facts that are not given in this file.

---

## 1. Concept

**"Descent to Mars."** The whole site is one continuous mission. A 3D rover (Tarush) is the recurring hero object that ties every section together, the way a cassette tape ties together the ACM-VIT site. The rover lands in the hero, reacts to each section, and parks on a Mars horizon in the footer.

Visual language: dark, technical, HUD/telemetry style, with a secondary "neo-brutalist" language (thick outlines, hard offset shadows with zero blur) borrowed from the Asterix site.

Design references (for technique, not for copying):
- **ACM-VIT (acmvit.in):** pinned full-screen story sections, per-section color moods, floating pill nav with active-section highlight, a recurring hero object, a vertical pill that turns into a field of repeating letters, cards sliding horizontally one at a time, giant outline/solid headlines, marquees, a closing horizon scene.
- **Asterix (asterix-website.vercel.app):** stacked deck cards with "DECK 03" labels and "03 / 06" progress bars, outline-vs-solid headlines, giant faint section numbers (`// 03`), hard-shadow cards, curved marquee, tilted photo wall, light-dark rhythm.

---

## 2. Tech Stack (use exactly this unless something is impossible)

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + CSS variables for design tokens |
| Smooth scroll | Lenis |
| Animation | GSAP + ScrollTrigger (use SplitText only if available; otherwise write a small custom char/word/line splitter in `/lib`) |
| 3D | three + @react-three/fiber + @react-three/drei |
| Fonts | `next/font` (see section 4) |
| Content | Typed TS files in `/data` |
| Hosting target | Vercel |

Setup rules:
- Register ScrollTrigger once inside a client-side provider.
- Sync Lenis with GSAP: `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((t) => lenis.raf(t * 1000))`, with `gsap.ticker.lagSmoothing(0)`.
- Use `gsap.matchMedia()` so desktop gets pinned and scrubbed effects and mobile gets lighter variants.
- Respect `prefers-reduced-motion`: disable pins, scrubbed motion and 3D motion, and show static layouts.
- Animate only `transform` and `opacity`. Use `will-change` sparingly.
- Kill and recreate ScrollTriggers on resize, and clean up on unmount (use `gsap.context()` / `useGSAP`).

---

## 3. Color System (dark theme)

Define as CSS variables in `globals.css` and expose through the Tailwind config.

| Token | Hex | Use |
|---|---|---|
| `--space-900` | `#07080D` | Main background |
| `--space-800` | `#0E1018` | Cards, panels |
| `--space-700` | `#171A26` | Borders, dotted grid |
| `--mars` | `#E2552B` | Primary accent: buttons, key words, active nav |
| `--mars-deep` | `#7A1F12` | Dark rust backgrounds |
| `--solar` | `#FFC93C` | Highlights: rank numbers, stats, badges |
| `--aurora-teal` | `#2EE6C5` | HUD lines, progress, hover glow |
| `--aurora-violet` | `#8B6CFF` | Gradients, secondary tags |
| `--bone` | `#F3EDE4` | Headlines and body text |
| `--dust` | `#9A948C` | Muted text |

Section moods (switch with a `data-theme` attribute on `<body>` toggled by ScrollTrigger, with CSS variable transitions):
- Hero, About: `--space-900` with a faint dotted grid.
- Rover: black with a teal HUD overlay.
- Subsystems: black cards, each with its own accent color.
- **Challenges: full wipe to `--mars` with a black grid** (signature section).
- Updates: black with a violet glow.
- Team/Faculty: black with a rust gradient behind the giant title.
- Sponsors, Results: `--space-800` band for rhythm.
- Footer: Mars horizon gradient (`#1A0A06` to `--mars-deep` to orange at the horizon line).

Contrast rules: body text is always `--bone` on dark. Never put teal text on rust. Keep WCAG AA contrast for all body text.

---

## 4. Typography

- **Headlines:** Space Grotesk or Clash Display, heavy weight, uppercase, tight tracking, oversized: `clamp(3rem, 12vw, 12rem)`.
- **Body and labels:** JetBrains Mono or IBM Plex Mono.
- **Signature device:** outline-vs-solid headlines (one word filled, the next with `-webkit-text-stroke: 1.5px var(--bone)` and transparent fill), plus a huge faint section number behind each heading (`// 01`, `// 02`, ...).
- Small section label pill at the top of each section (for example `MISSION: ABOUT`), in coral/rust on dark.

---

## 5. Global Motion System

| Pattern | Implementation |
|---|---|
| Smooth scroll | Lenis, `lerp: 0.08` |
| Heading reveal | Split into lines or chars, `yPercent: 110` to `0` inside `overflow: hidden`, stagger 0.03 to 0.06 |
| Easing | `power3.out` for reveals, `expo.inOut` for wipes, `none` for scrubbed timelines |
| Duration | 0.6 to 1.0 s for reveals, about 1.2 s for wipes |
| Marquees | Duplicated content with GSAP `repeat: -1`; speed reacts to scroll velocity |
| Cursor | Custom dot that grows over interactive elements, magnetic buttons (desktop and fine pointers only) |
| Hover | Hard-shadow cards translate `(4px, 4px)` and the shadow collapses |
| Background | CSS dotted grid; star-field canvas in hero only |
| Theme shifts | ScrollTrigger toggles `data-theme`; colors transition via CSS variables |

---

## 6. The 3D Rover

The user will place the rover model in the project folder. **Look for a `.glb` or `.gltf` file in the project folder (search the whole workspace, including `/public` and any root-level `models` folder)** and move or copy it to `/public/models/tarush.glb`. If the file is a different format (for example `.fbx`, `.obj`, `.step`, `.stl`), convert it to GLB with an available tool and tell me what you did. If no model is found, build with a clearly-marked procedural placeholder rover (box chassis, six wheels, mast) behind the same `RoverModel` component interface so the real model drops in without code changes.

Pipeline:
1. Optimize the GLB with `gltf-transform` (Draco or Meshopt compression, textures resized to 1024 to 2048 px, merged meshes where safe). Target under 5 MB, ideally 2 to 3 MB.
2. Inspect the node names in the model. Log them in the console and write them into a short `/docs/rover-nodes.md` file. Detect wheels, mast, arm and chassis nodes by name where possible and wire wheel rotation to scroll when wheel nodes are found. If nothing can be detected, skip that and keep whole-model animation only.
3. Use one persistent fixed `<Canvas>` (`position: fixed; inset: 0; z-index: 0; pointer-events: none`) behind all content. Do not create a canvas per section.
4. Drive the rover from one master scroll progress value (0 to 1). Map ranges of that value to position, rotation, scale and camera per section.
5. Lighting: key light in rust orange, rim light in teal, soft environment map, contact shadows on a ground plane. Auto-center and auto-scale the model on load so any model size works.
6. Loading: lazy-load the Canvas after first paint. The preloader progress tracks the GLB load (`useProgress`).
7. Fallback: on low-power devices, `prefers-reduced-motion`, or very narrow screens, show a static rover poster image `[[PLACEHOLDER: /public/images/rover-poster.webp]]` instead of the live canvas.

Rover behavior per section:

| Section | Rover state |
|---|---|
| Hero | Rises out of the dark, slow turntable rotation, mouse-parallax tilt |
| About | Slides right, shrinks to a ghost layer (reduced opacity) |
| Rover (Tarush) | Centered and large, orbits with scroll, HUD callouts attach to parts |
| Subsystems | Camera nudges toward the relevant part per card (or subtle rotation if parts are not separable) |
| Challenges | Hidden (the rust wipe covers it); optionally a thin wheel-track line crossing the field |
| Team to Sponsors | Faint ghost in the background |
| Footer | Drives in from the left onto the Mars horizon and stops |

---

## 7. Page Structure and Sections

Sections in order. Each maps to a tab on the current site (Home, Team, Updates, Challenges, Sponsors, Results).

### 7.0 Preloader
Counter from 0 to 100 linked to real asset loading, with a mono line "INITIALIZING ROVER...". Ends with a clip-path reveal into the hero. Skip on repeat visits within the session.

### 7.1 Navigation
- Floating pill fixed at top center. Items: **Home, Team, Updates, Challenges, Sponsors, Results**. Team logo `[[PLACEHOLDER: /public/images/logo-aurora.svg]]` at the right. A "Sponsor Us" button.
- A sliding highlight indicator follows the active section (ScrollTrigger `onToggle`).
- Clicking a link scrolls with `lenis.scrollTo`.
- Mobile: hamburger opens a full-screen overlay with staggered links.
- Nav stays visible during pins and theme changes. Adapt its colors via the `data-theme` variables.

### 7.2 Hero (Home)
- Giant "AURORA" with a per-character stagger reveal. Mono sub-label: "PSG iTech / Mars Rover Team".
- Faint dotted grid plus a canvas star-field.
- Telemetry strip with ticking values (`ALT`, `TEMP`, `SIGNAL`, `UPTIME`), purely decorative.
- Scroll hint ("SCROLL TO DESCEND").
- On scroll the word splits apart (left half moves left, right half moves right) while the rover advances.

### 7.3 About (pinned story)
- Pinned for about 300% viewport height.
- Word-by-word text reveal scrubbed to scroll (opacity 0.15 to 1).
- Text content: `[[PLACEHOLDER: About the team and the International Rover Challenge (IRC), 80 to 120 words]]`. Known facts you may use: PSG Team Aurora is a team of undergraduate students from PSG Institute of Technology and Applied Research, building a rover for Martian terrain; the rover is called Tarush; the team has been active since 2019.
- Team photo in a thick-bordered frame with a hard offset shadow, tilted at the start and flattening as you scroll: `[[PLACEHOLDER: /public/images/team-photo.webp]]`.
- Stat counters (count up on enter): `[[PLACEHOLDER: founded year, team size, number of competitions, best rank]]`.

### 7.4 Rover: Tarush (pinned spec section)
- Pinned, rover centered and large.
- 3 to 5 HUD callouts appear one at a time, with thin teal SVG lines drawn using `stroke-dashoffset`. Callout content: `[[PLACEHOLDER: 5 specs, for example drivetrain, power, sensors, autonomy stack, communication; each with a label and a one-line description]]`.
- Side progress rail reading `01 / 05`.
- If the model's parts are separate nodes, add an exploded-view animation (parts translate outward along their normals and return).

### 7.5 Subsystems (Team part 1: fan-out into stacked deck)
Replaces the old accordion.
- Phase A (ACM "Domains" idea): a single card appears centered, then fans out into six cards.
- Phase B (Asterix deck idea): cards pin and stack, each sliding over the previous with a slight rotation. Each card has a colored top bar, a `DECK 0X` label, an icon, and a progress bar `0X / 06`.
- Subsystems: **Mechanical, Electrical, Science & Sensors, ROS & Autonomous, Communication, Website**. Each has its own accent color and a short description `[[PLACEHOLDER: one-line description per subsystem]]`.
- Clicking a card opens a roster panel/modal with member portraits staggering in.
- Known Mechanical members (as read from the current site, verify spelling is replaceable): Tharakeshwaran, Sailesh, Jerome Flawin J, Akash S.
- All other rosters: `[[PLACEHOLDER: member name, department, year, portrait path, per subsystem]]`.

### 7.6 Faculty and Board (Team part 2)
- A giant "THE TEAM" title rises behind the cards.
- Faculty cards arranged in a staggered pyramid:
  - Dr. Nagarjun J: Assistant Professor (Sl. Grade), Dept. of Mechanical Engineering, Faculty Incharge
  - Dr. Ravikrishna S: Assistant Professor (Sr. Grade), Dept. of EEE, Faculty Advisor
  - Dr. D Venkatesh: Assistant Professor (Sr. Grade), Dept. of ECE, Faculty Advisor
  - Photos: `[[PLACEHOLDER: /public/images/faculty/<name>.webp]]`
- Optional student leadership row: `[[PLACEHOLDER: team lead, vice lead, subsystem leads with photos]]`.
- Cards have a 3D hover tilt with a glare effect.
- Show a "Team 6.0" label. Build the data so an archive of older teams (`teams: [{ edition: "6.0", ... }]`) can be added later without refactoring.

### 7.7 Challenges (signature section, ACM "Events" effect)
This is the most important section. Spend the most polish time here.

**Entry:** the screen wipes to `--mars` rust with a clip-path or scaled full-screen layer, with a black grid overlay.

**Letter field:** a vertical pill labeled "CHALLENGES" appears at the left, then dissolves into a field of repeating `C H A L L E N G E S` characters (large, faint, black on rust, built from a CSS grid with per-letter stagger and light parallax).

**Cards:** each competition is a card in a horizontal pinned track. Cards slide in one at a time from the right, one per scroll segment, with the next card peeking in at the edge. Use one pinned section, `scrub: 1`, and a GSAP timeline on `xPercent`.

**Card design (wireframe "cassette" frame):**
- Hero number is the rank in huge `--solar` type (for example `24TH`).
- Challenge name, date and location in mono text.
- Logo or Mars-base render on the side.
- Hard offset shadow, thick outline.

**Exit:** the track ends with a "VIEW RESULTS" CTA, and the rust field wipes back to black.

Challenge entries (render all, newest first):

| Challenge | Rank | Date | Location |
|---|---|---|---|
| Mars Base Challenge 2025 | 6th globally | March 2025 | Online |
| International Rover Challenge (IRC) 2025 | 24th | January 2025 | India |
| `[[PLACEHOLDER: Caterpillar Autonomy challenge, full title, rank, date, location]]` | `[[PLACEHOLDER]]` | `[[PLACEHOLDER]]` | `[[PLACEHOLDER]]` |
| `[[PLACEHOLDER: challenge name for the 15th-place result held at PSG iTech, India]]` | 15th | `[[PLACEHOLDER]]` | PSG iTech, India |
| European Rover Challenge (Remote Edition) 2023 | 15th | September 2023 | Poland |
| International Rover Design Challenge (IRDC) 2022 | 4th | August 2022 | Online |
| International Rover Design Challenge (IRDC) 2021 | 7th | August 2021 | Online |
| International Mars Hackathon 2020 | 6th | November 2020 | Online |

Each entry also takes `[[PLACEHOLDER: image or logo path, 1 to 2 line description]]`.

Mobile fallback: vertical stack of the same cards with a simple fade-up, no horizontal pin.

### 7.8 Updates (ACM "Projects" style)
- Pinned; one update at a time fades in and out with about 100vh of scroll per update.
- Layout: title and short copy on the left, wireframe frame with photo or poster on the right, a button with a per-update accent color.
- Known updates:
  - **Recruitment Workshops**: April to July, campus and online.
  - **PCB Prodigy @ Yukta 2025**: March 2025, PSG iTech.
  - `[[PLACEHOLDER: additional updates, with title, date, description, image, link]]`

### 7.9 Sponsors
- Curved marquee adapted from the Asterix approach: sponsor names and logos run along an SVG arc (`textPath`) or a CSS 3D-curved band.
- Tier labels as pills.
- Known sponsors: **Iva Technos (Bronze), Altium (Bronze), SolidWorks, Ansys**. `[[PLACEHOLDER: tier for SolidWorks and Ansys; logo files for all four]]`.
- "Become a Sponsor" block with buttons: Mail Us `[[PLACEHOLDER: email address]]`, LinkedIn `[[PLACEHOLDER: URL]]`, Instagram `[[PLACEHOLDER: URL]]`. Hard-shadow style and magnetic hover.

### 7.10 Results (recruitment)
- Animated counters per subsystem, then a total:
  - ROS & Autonomous: 6
  - Electrical: 5
  - Sensors & Science: 5
  - Mechanical: 6
  - Communication: 2
  - **Total recruits: 24**
- Filter chips switch between subsystems; selected members stagger in with name and department.
- Recruit names and departments: `[[PLACEHOLDER: per-subsystem list of name and department]]`.
- Optional tilted photo wall (Asterix gallery effect) using event photos: `[[PLACEHOLDER: 6 to 12 event photos]]`.

### 7.11 Contact and Footer (closing scene)
- Mars horizon: 3 layered SVG dune silhouettes with parallax at different speeds, gradient sky from black to rust to orange, and the rover driving in from the left and stopping.
- Huge "AURORA" wordmark half-hidden behind the dunes. A few looping shooting-star streaks.
- Footer content: nav links, socials, contact email `[[PLACEHOLDER]]`, address `[[PLACEHOLDER: PSG iTech address]]`, "Back to top" using `lenis.scrollTo(0)`, copyright line.

---

## 8. Project Structure

```
/app
  layout.tsx            // fonts, providers, metadata
  page.tsx              // composes all sections
  globals.css           // tokens, base styles
/components
  providers/            // SmoothScrollProvider, GSAPProvider
  three/                // RoverCanvas, RoverModel, Lights, useRoverScroll
  sections/             // Preloader, Hero, About, RoverSpecs, Subsystems,
                        // Faculty, Challenges, Updates, Sponsors, Results, Footer
  ui/                   // Nav, Pill, Card, Marquee, Counter, Cursor, MagneticButton
/data                   // team.ts, subsystems.ts, challenges.ts, updates.ts,
                        // sponsors.ts, results.ts, site.ts
/lib                    // splitText.ts, gsap.ts, hooks
/public
  /models/tarush.glb
  /images
/docs
  rover-nodes.md
  CONTENT_TODO.md       // list of every [[PLACEHOLDER]] still unfilled
```

All copy and data come from `/data`, never hard-coded inside components. Every placeholder in the data files must be marked with a `// TODO: PLACEHOLDER` comment and listed in `/docs/CONTENT_TODO.md`.

---

## 9. Responsive Behavior

- Desktop (above 1024px): full pinned and scrubbed experience with live 3D.
- Tablet (768 to 1024px): reduced pin lengths, simpler rover motion.
- Mobile (below 768px): mostly fade-up reveals, vertical card stacks (Subsystems, Challenges), static or very light 3D, no custom cursor, large tap targets.
- Test at 360px, 768px, 1280px and 1920px. No horizontal page scroll anywhere.

---

## 10. Performance Targets

- Lighthouse performance 80+ on desktop, with a lighter experience on mobile.
- GLB under 5 MB, images in WebP or AVIF through `next/image`, any video under 3 MB with a poster frame.
- Lazy-load the Canvas and below-the-fold images.
- Cap device pixel ratio on the Canvas (`dpr={[1, 1.5]}`).
- Pause the Canvas render loop (`frameloop="demand"` or manual) when the rover is not visible.

---

## 11. Accessibility

- Semantic headings (one `h1`), landmarks, visible focus states, keyboard-operable nav and modals.
- `prefers-reduced-motion` fallback as described in section 2.
- Alt text for all photos, `aria-hidden` on decorative layers (letter field, grid, stars).
- Do not rely on color alone to convey information.

---

## 12. SEO and Metadata

- Title: "PSG Team Aurora | Mars Rover Team, PSG iTech".
- Description: `[[PLACEHOLDER: 150-character meta description]]`.
- Open Graph image: `[[PLACEHOLDER: /public/images/og.png]]`.
- Favicon: `[[PLACEHOLDER: /public/favicon.ico]]`.

---

## 13. Build Phases (do in order; run the dev server and verify after each)

1. **Foundation:** Next.js project, Tailwind tokens, fonts, Lenis + GSAP sync, nav, preloader, data files with placeholders.
2. **Hero and rover:** fixed Canvas, GLB discovery and optimization, rover loaded and centered, scroll-linked rover movement across sections.
3. **Story sections:** About (pinned word reveal), Rover specs (pinned HUD callouts), Subsystems (fan-out to stacked deck).
4. **Challenges:** wipe, letter field, sliding cards, exit wipe. Polish heavily.
5. **Remaining content:** Faculty, Updates, Sponsors (curved marquee), Results (counters, chips).
6. **Footer scene and polish:** Mars horizon, rover arrival, cursor, hover details, theme transitions.
7. **Responsive, performance and accessibility pass.** Fix any console errors or ScrollTrigger pin-spacing bugs. Produce `/docs/CONTENT_TODO.md`. Make sure `npm run build` succeeds.

---

## 14. Rules for You (the agent)

- Do not ask me for the unknowns. Use placeholders and keep going.
- Do not copy text or layouts from the reference sites. Borrow techniques only.
- Do not use stock images from the internet. Use generated gradients, SVG, or clearly-marked placeholder frames.
- Keep components small and typed. No `any` unless unavoidable.
- If something in this spec is impossible or a bad idea (for example a library incompatibility), pick the closest working option, and note the change in `/docs/DECISIONS.md`.
- When finished, give me: how to run the project, a summary of what was built, the list of placeholders I need to fill, and any known issues.

---

## 15. Unknowns Checklist (to fill later)

- [[PLACEHOLDER: About text (80 to 120 words)]]
- [[PLACEHOLDER: Team stats (founded year, size, competitions, best rank)]]
- [[PLACEHOLDER: Rover specs (5 callouts)]]
- [[PLACEHOLDER: Subsystem descriptions and full member rosters, with portraits]]
- [[PLACEHOLDER: Student leadership list]]
- [[PLACEHOLDER: Caterpillar Autonomy challenge details]]
- [[PLACEHOLDER: The 15th-place challenge held at PSG iTech (name and date)]]
- [[PLACEHOLDER: Challenge images and logos (IRC, ERC, Mars base renders)]]
- [[PLACEHOLDER: Additional updates]]
- [[PLACEHOLDER: Sponsor logos and tiers for SolidWorks and Ansys]]
- [[PLACEHOLDER: Contact email, LinkedIn, Instagram, address]]
- [[PLACEHOLDER: Recruit names and departments per subsystem]]
- [[PLACEHOLDER: Team logo, favicon, OG image, rover poster image, team photo, faculty photos, event photos]]
- [[PLACEHOLDER: Meta description]]
