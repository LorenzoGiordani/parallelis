# Formazione AI per PMI — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create landing page for Parallelis formazione AI offering, link from existing site

**Architecture:** New HTML page (`formazione-ai.html`) + new CSS (`formazione-ai.css`) following ai-receptionist page pattern. No JS needed for this page (no canvas, no counters). Reuse existing site-header, site-footer, and design system from styles.css.

**Tech Stack:** Vanilla HTML/CSS, same design system (Neo-Industrial Solar)

---

### Task 1: Update index.html navigation + services + footer

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add "Formazione AI" to nav**

```html
<!-- In index.html nav-links, add after AI Receptionist -->
<a href="formazione-ai.html">Formazione AI</a>
```

- [ ] **Step 2: Update Formazione service card to link to new page**

```html
<!-- Replace the formazione service card (currently #servizi only) -->
<article class="service-card" data-reveal>
  <span class="service-num">02</span>
  <h3 class="service-title">Formazione & Workshop</h3>
  <p class="service-desc">
    Corsi hands-on per team su AI agents, prompt engineering e automazione. Il tuo team diventa autonomo nel costruire e gestire agenti.
  </p>
  <a href="formazione-ai.html" class="btn btn--ghost" style="margin-top:var(--space-sm)">
    Scopri i corsi <span class="btn-arrow">→</span>
  </a>
</article>
```

- [ ] **Step 3: Add Formazione AI link in footer**

```html
<!-- In footer-col Servizi, add after Custom Solutions -->
<a href="formazione-ai.html">Formazione AI</a>
```

### Task 2: Create formazione-ai.css

**Files:**
- Create: `formazione-ai.css`

- [ ] **Step 1: Create CSS file with all page-specific styles**

Use existing patterns from receptionist.css (lp-container, lp-section-header, lp-badge, lp-hero, lp-pricing-grid, lp-price-card, lp-compare-table, lp-faq, lp-cta, lp-mobile-cta).

New styles needed:
- `.fa-roi-table` — ROI comparison table with two columns (conservative vs realistic)
- `.fa-pain-cards` — 3 pain point cards
- `.fa-method-timeline` — custom timeline for Parallelis method
- `.fa-target-grid` — vertical targets grid (4 items: commercialisti, dentisti, manifatturiero, legali)

### Task 3: Create formazione-ai.html

**Files:**
- Create: `formazione-ai.html`

- [ ] **Step 1: Create full HTML page**

Structure (matches design spec):
1. Hero — "Formazione AI per PMI. Non teoria — strumenti che funzionano domani."
2. Social proof bar — "ROI 14x—29x" · "Casi reali" · "Docenti attivi nel campo AI"
3. Pain — 3 card: "L'AI cambia ogni settimana", "Hai Claude ma non lo usi", "Dipendenti usano ChatGPT senza controllo"
4. Metodo Parallelis — 3 step timeline con check SVG
5. Pacchetti — 4 pricing cards (AI Start €597, AI Operativo €1.497, AI Transformation €2.997, AI Update Club €297/mese)
6. ROI section — comparison table dual column con note fonti dati
7. Target verticali — 4 cards (Commercialisti, Dentisti, Manifatturiero, Studi Legali)
8. FAQ — 6 domande su misura
9. CTA — form contatto Netlify con campo "Sono interessato a: Workshop / Percorso / Consulenza / Update Club"

### Task 4: Update ai-receptionist.html footer

- [ ] **Step 1: Add Formazione AI link in ai-receptionist.html footer**
