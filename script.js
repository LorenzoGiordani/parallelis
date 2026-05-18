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

  /* --- Process step rings --- */
  const processSteps = document.querySelectorAll('.process-step');
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

  /* --- Hero Canvas: Geometric Convergence --- */
  const canvas = document.querySelector('.hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, animationId;
    let time = 0;
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = canvas.width = rect.width * dpr;
      h = canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now) {
      const displayW = canvas.width / (window.devicePixelRatio || 1);
      const displayH = canvas.height / (window.devicePixelRatio || 1);
      const cx = displayW * 0.45;
      const cy = displayH * 0.48;

      ctx.clearRect(0, 0, displayW, displayH);

      const t = now * 0.00015;

      // === GRID: horizontal lines converging to center ===
      const lineCount = 60;
      const spacing = displayH / (lineCount - 1);

      for (let i = 0; i < lineCount; i++) {
        const baseY = i * spacing;
        const distFromCenter = Math.abs(baseY - cy) / cy;
        const proximity = 1 - Math.min(distFromCenter, 1);

        const bendStrength = 0.5 * proximity;
        const wobble = Math.sin(t * 2.5 + i * 0.25) * 6 * proximity;
        const alpha = 0.05 + 0.2 * proximity;
        const lineWidth = 0.3 + 2.5 * proximity;

        ctx.strokeStyle = accentColor || 'oklch(65% 0.18 75)';
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(0, baseY);

        const segments = 12;
        for (let j = 1; j <= segments; j++) {
          const x = (displayW / segments) * j;
          const progress = j / segments;
          const yShift = Math.sin(progress * Math.PI) * bendStrength * displayH * 0.12 + wobble * progress;
          ctx.lineTo(x, baseY + yShift);
        }

        ctx.stroke();
      }

      // === DIAGONAL connectors between horizontals ===
      ctx.globalAlpha = 0.04;
      ctx.lineWidth = 0.5;
      const diagSpacing = displayW / 7;
      for (let d = 0; d < 8; d++) {
        const x = d * diagSpacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + displayW * 0.15, displayH);
        ctx.stroke();
      }

      // === GLOW NODES at convergence ===
      for (let n = 0; n < 4; n++) {
        const nx = cx + (n - 1.5) * displayW * 0.1;
        const ny = cy + Math.sin(t * 2 + n * 0.8) * displayH * 0.06;
        const radius = 30 + Math.sin(t * 3 + n) * 15 + 20 * (1 - Math.abs(n - 1.5) / 2);
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius * 2);
        gradient.addColorStop(0, accentColor + '60');
        gradient.addColorStop(0.3, accentColor + '15');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nx, ny, radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // === CENTRAL BEAM: vertical light column ===
      const beamGrad = ctx.createLinearGradient(cx, 0, cx, displayH);
      beamGrad.addColorStop(0, 'transparent');
      beamGrad.addColorStop(0.4, accentColor + '08');
      beamGrad.addColorStop(0.5, accentColor + '03');
      beamGrad.addColorStop(0.6, accentColor + '08');
      beamGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(cx - displayW * 0.06, 0, displayW * 0.12, displayH);

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

    /* Pause canvas when hero is off-screen */
    const heroSection = document.getElementById('hero');
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!animationId) animationId = requestAnimationFrame(draw);
            time = performance.now() * 0.0001;
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
