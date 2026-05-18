# Parallelis — Design Spec

## Brand
- **Nome**: Parallelis
- **Tipo**: AI Agency (consulenza, formazione, custom solutions, managed services agenti AI)
- **Target**: PMI 50-500 dipendenti
- **Tono**: Futuristico/Tech, audace, premium
- **Anti-AI-slop**: No ciano, no viola, no glassmorphism, no card grid monotone, no gradienti purple-blue

## Design System: Neo-Industrial Solar

### Palette (OKLCH)
- `--bg`: oklch(12% 0.005 260) — deep charcoal caldo
- `--surface`: oklch(16% 0.005 260)
- `--accent`: oklch(65% 0.18 75) — solar amber
- `--accent-2`: oklch(55% 0.12 45) — copper
- `--text`: oklch(92% 0 0)
- `--text-muted`: oklch(70% 0.005 75)
- `--border`: oklch(25% 0.005 75)

### Typography
- Display: Sora (headings, hero)
- Body: Satoshi (copy, UI)
- Mono: JetBrains Mono (code, tech data)

### Layout Principles
- Asimmetrico (70/30, 60/40 split)
- Pattern geometrici PCB/circuito come texture
- Sezioni con diagonal divider
- Nessuna card grid identica
- Full-bleed hero

### Motion
- Hero: animazione linee circuito (signature)
- Scroll reveal: stagger 80ms ease-out-expo
- Hover: glow ambra scale(1.02)
- prefers-reduced-motion: tutto disabilitato

### Pages
1. Hero — VP + CTA + circuito animato
2. Servizi — 4 pillar layout asimmetrico
3. Processo — timeline 3-step non lineare
4. Portfolio placeholder
5. Social proof — logo + metriche
6. CTA contatto
7. Footer

### SEO
- Semantic HTML5
- Meta tags completi (og, twitter, description)
- Schema.org Organization
- Performance: zero framework, CSS custom properties, lazy loading
- Mobile-first responsive
