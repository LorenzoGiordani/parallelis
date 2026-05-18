/* ============================================
   Parallelis — Interactions & Animations
   ============================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  /* --- Header scroll --- */
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-menu');
  let lastScroll = 0;

  function updateHeader() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    lastScroll = y;
  }

  /* --- Hamburger toggle --- */
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  /* --- Scroll reveal --- */
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* --- Process step rings + timeline fill --- */
  const processSteps = document.querySelectorAll('.process-step');
  const processTimeline = document.querySelector('.process-timeline');
  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          stepObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  processSteps.forEach((el) => stepObserver.observe(el));

  /* Fill timeline as last step appears */
  if (processTimeline && processSteps.length) {
    const lastStep = processSteps[processSteps.length - 1];
    const fillObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          processTimeline.classList.add('filled');
          fillObserver.unobserve(lastStep);
        }
      },
      { threshold: 0.3 }
    );
    fillObserver.observe(lastStep);
  }

  /* --- Hero Canvas: Shader-inspired Parallel Lines --- */
  const canvas = document.querySelector('.hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, animationId;
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const accentRGB = 'oklch(65% 0.18 75)';

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = canvas.width = rect.width * dpr;
      h = canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now) {
      const dw = canvas.width / (window.devicePixelRatio || 1);
      const dh = canvas.height / (window.devicePixelRatio || 1);
      const cx = dw * 0.45;
      const cy = dh * 0.48;

      ctx.clearRect(0, 0, dw, dh);

      const t = now * 0.00012;

      // === 1. Subtle gradient wash ===
      const wash = ctx.createRadialGradient(cx, cy, 0, cx, cy, dh * 0.8);
      wash.addColorStop(0, accent + '08');
      wash.addColorStop(0.5, accent + '03');
      wash.addColorStop(1, 'transparent');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, dw, dh);

      // === 2. Horizontal shader lines with varying density ===
      const primaryLineCount = 48;
      const pSpacing = dh / (primaryLineCount - 1);

      for (let i = 0; i < primaryLineCount; i++) {
        const by = i * pSpacing;
        const dc = Math.abs(by - cy) / (dh * 0.5);
        const prox = 1 - Math.min(dc, 1);
        const proxSq = prox * prox;

        const wobble = Math.sin(t * 2.2 + i * 0.18) * 5 * prox;
        const wobble2 = Math.sin(t * 1.4 + i * 0.4) * 8 * proxSq;
        const totalWobble = wobble + wobble2;

        const alpha = 0.03 + 0.18 * proxSq;
        const lw = 0.2 + 3.0 * proxSq;

        ctx.strokeStyle = accent;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lw;

        ctx.beginPath();
        ctx.moveTo(0, by);

        const segs = 14;
        for (let j = 1; j <= segs; j++) {
          const x = (dw / segs) * j;
          const p = j / segs;
          const yOff = Math.sin(p * Math.PI * 2.5) * 0.08 * dh * prox + Math.sin(p * Math.PI * 0.8) * 0.06 * dh * proxSq + totalWobble * p;
          ctx.lineTo(x, by + yOff);
        }

        ctx.stroke();
      }

      // === 3. Sparse over/under lines (density variation) ===
      ctx.globalAlpha = 0.025;
      for (let i = 0; i < 24; i++) {
        const by = (i / 23) * dh + Math.sin(t + i * 0.7) * dh * 0.02;
        const dc = Math.abs(by - cy) / (dh * 0.5);
        if (dc > 0.6) continue;
        const prox = 1 - Math.min(dc, 1);

        ctx.strokeStyle = accent;
        ctx.lineWidth = 0.3 + 1.5 * prox;

        ctx.beginPath();
        ctx.moveTo(0, by);
        for (let j = 1; j <= 10; j++) {
          const x = (dw / 10) * j;
          ctx.lineTo(x, by + Math.sin(t * 3 + i * 0.5 + j * 0.3) * 3 * prox);
        }
        ctx.stroke();
      }

      // === 4. Diagonal beam lines ===
      ctx.globalAlpha = 0.035;
      ctx.lineWidth = 0.5;
      for (let d = 0; d < 12; d++) {
        const x = d * (dw / 12);
        ctx.beginPath();
        ctx.moveTo(x - 20, 0);
        ctx.lineTo(x + dw * 0.12 - 20 + Math.sin(t + d) * 10, dh);
        ctx.stroke();
      }

      // === 5. Glow nodes at convergence zone ===
      for (let n = 0; n < 5; n++) {
        const nx = cx + (n - 2) * dw * 0.08;
        const ny = cy + Math.sin(t * 1.8 + n * 0.9) * dh * 0.05;
        const pulse = 1 + Math.sin(t * 2.5 + n * 1.2) * 0.3;
        const radius = (20 + 15 * (1 - Math.abs(n - 2) / 2.5)) * pulse;

        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius * 2.5);
        grad.addColorStop(0, accent + '50');
        grad.addColorStop(0.2, accent + '18');
        grad.addColorStop(0.6, accent + '06');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.7 + Math.sin(t * 1.3 + n) * 0.3;
        ctx.beginPath();
        ctx.arc(nx, ny, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // === 6. Central vertical light column ===
      const beam = ctx.createLinearGradient(cx, 0, cx, dh);
      beam.addColorStop(0, 'transparent');
      beam.addColorStop(0.35, accent + '06');
      beam.addColorStop(0.5, accent + '12');
      beam.addColorStop(0.65, accent + '06');
      beam.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.5 + Math.sin(t * 0.8) * 0.5;
      ctx.fillStyle = beam;
      ctx.fillRect(cx - dw * 0.04, 0, dw * 0.08, dh);

      // === 7. Floating particles ===
      ctx.globalAlpha = 0.4;
      for (let p = 0; p < 15; p++) {
        const phase = p * 0.8;
        const px = cx + (p - 7) * dw * 0.06 + Math.sin(t * 1.1 + phase) * dw * 0.08;
        const py = cy + Math.sin(t * 0.7 + phase * 1.3) * dh * 0.15;
        const size = 1 + Math.sin(t * 2 + phase) * 0.5;
        const dist = Math.abs(px - cx) / (dw * 0.5);
        const pAlpha = 0.1 * (1 - Math.min(dist, 1));

        ctx.fillStyle = accent;
        ctx.globalAlpha = pAlpha * (0.5 + Math.sin(t * 1.5 + phase) * 0.5);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    }

    function initHero() {
      resize();
      animationId = requestAnimationFrame(draw);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    });

    const heroSection = document.getElementById('hero');
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!animationId) animationId = requestAnimationFrame(draw);
          } else {
            if (animationId) {
              cancelAnimationFrame(animationId);
              animationId = null;
            }
          }
        });
      },
      { threshold: 0 }
    );

    if (heroSection) heroObserver.observe(heroSection);

    initHero();
  }

  /* --- Stat counter animation --- */
  const statValues = document.querySelectorAll('.hero-stat-value[data-count]');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1200;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(tick);
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statValues.forEach((el) => statObserver.observe(el));

  /* --- Scroll handler --- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* --- Contact form --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalHtml = btn.innerHTML;
      btn.innerHTML = 'Invio in corso...';
      btn.disabled = true;

      try {
        const formData = new FormData(form);
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        });

        btn.innerHTML = 'Ricevuto! Ti contatteremo presto';
        form.reset();
      } catch {
        btn.innerHTML = 'Errore. Riprova o scrivici via email.';
        btn.style.setProperty('--btn-error', '1');
      } finally {
        btn.disabled = false;
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.setProperty('--btn-error', '0');
        }, 4000);
      }
    });
  }
})();
