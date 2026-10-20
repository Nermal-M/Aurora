# Content & Asset Placeholders Checklist (CONTENT_TODO.md)

This document tracks all content items, external links, and media assets that can be updated or populated as new information arrives. Every placeholder in the codebase is typed and cleanly isolated in `/data`.

| Section | Placeholder Item | Code Location | Status / Current Value |
|---|---|---|---|
| **Site Metadata** | Meta description (150 chars) | `/data/site.ts` | Populated with IRC & Tarush official description |
| **Site Metadata** | Favicon & OG Social Image | `/public/images/logo-aurora.png` | Populated with high-res transparent Aurora logo & Tarush poster |
| **Hero / Telemetry** | Exact live telemetry data | `/data/site.ts` | Populated with realistic Martian analog telemetry (Alt, Temp, Signal, Uptime) |
| **About** | Story copy (80–120 words) | `/components/sections/About.tsx` | Populated with PSG iTech & IRC competition history |
| **About** | Team photo | `/public/images/team-photo.jpg` | Populated with real photo from `clg_gp.jpg` |
| **Tarush Specs** | 5 Subsystem spec descriptions | `/data/site.ts` | Populated with Rocker-Bogie, 24V BMS, Perception Suite, ROS 2 SLAM, 5.8GHz Link |
| **Subsystems** | Member rosters & roles | `/data/subsystems.ts` | Populated with all known members from Mechanical, Electrical, Science, ROS, Comms, Website |
| **Faculty** | Faculty Advisors | `/data/team.ts` | Populated with Dr. Nagarjun J, Dr. Ravikrishna S, Dr. D Venkatesh with real portraits |
| **Challenges** | CAT Autonomy challenge details | `/data/challenges.ts` | Populated with Caterpillar Autonomy Challenge 2024, March 2024, Online |
| **Challenges** | 15th-place challenge at PSG iTech | `/data/challenges.ts` | Populated with International Rover Challenge 2024 (January 2024) |
| **Challenges** | Competition logos | `/public/images/` | Populated with real IRC, ERC, IRDC, ISRO, CAT, and Mars imagery |
| **Updates** | Additional workshops | `/data/updates.ts` | Populated with Recruitment Workshops, PCB Prodigy @ Yukta 2025, Field Trials |
| **Sponsors** | Sponsor marks & tiers | `/data/sponsors.ts` | Populated with Altium, Ansys, SolidWorks, Iva Technos, VAR TECH |
| **Results** | Recruits list & departments | `/data/results.ts` | Populated with all 24 inducted students across 5 departments with degree specs |
| **Footer** | Contact email, socials & address | `/data/site.ts` | Populated with `teamaurora@psgitech.ac.in`, LinkedIn, Instagram, and PSG iTech address |
