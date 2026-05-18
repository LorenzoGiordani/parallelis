/* ============================================
   AI Receptionist — Landing Page Interactions
   ============================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Hero Canvas: Sound wave / voice visualization --- */
  const canvas = document.querySelector('.lp-hero-canvas');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h, animationId;

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
      const cx = displayW * 0.2;
      const cy = displayH * 0.5;
      const t = now * 0.0008;

      ctx.clearRect(0, 0, displayW, displayH);

      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#D97706';

      // === Sound wave rings emanating from left ===
      for (let ring = 0; ring < 6; ring++) {
        const phase = (t * 0.8 + ring * 0.5) % 4;
        const radius = phase * displayW * 0.25;
        const alpha = Math.max(0, 0.08 - phase * 0.02);
        ctx.strokeStyle = accentColor;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, -0.4, 0.4);
        ctx.stroke();
      }

      // === Horizontal wave lines (voice frequency) ===
      const lineCount = 35;
      const spacing = displayH / (lineCount - 1);
      for (let i = 0; i < lineCount; i++) {
        const baseY = i * spacing;
        const distFromCenter = Math.abs(baseY - cy) / (displayH * 0.5);
        const proximity = Math.max(0, 1 - distFromCenter);
        const amplitude = proximity * proximity * 25;

        ctx.strokeStyle = accentColor;
        ctx.globalAlpha = 0.04 + 0.12 * proximity;
        ctx.lineWidth = 0.3 + 1.5 * proximity;
        ctx.beginPath();

        const segments = 60;
        for (let j = 0; j <= segments; j++) {
          const x = (displayW / segments) * j;
          const progress = x / displayW;
          const wave = Math.sin(t * 2 + i * 0.3 + progress * 8) * amplitude * Math.sin(progress * Math.PI);
          const y = baseY + wave;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // === Glow node at source ===
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      gradient.addColorStop(0, accentColor + '25');
      gradient.addColorStop(0.3, accentColor + '08');
      gradient.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.8 + Math.sin(t * 3) * 0.2;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();

      // === Small dots along central axis ===
      ctx.globalAlpha = 1;
      for (let d = 0; d < 12; d++) {
        const dx = cx + 40 + d * (displayW * 0.06);
        const dy = cy + Math.sin(t * 1.5 + d * 0.6) * (8 + d * 1.5);
        const dotAlpha = 0.15 - d * 0.01;
        const dotSize = 2 - d * 0.1;
        ctx.globalAlpha = Math.max(0, dotAlpha);
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(dx, dy, Math.max(0.5, dotSize), 0, Math.PI * 2);
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

  if (!prefersReduced) {
    /* --- Counter animation for hero metrics --- */
    const metricValues = document.querySelectorAll('.lp-metric-value[data-count]');
    const metricObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const duration = 1400;
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
            metricObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    metricValues.forEach((el) => metricObserver.observe(el));

    /* --- Stagger flow steps --- */
    const flowSteps = document.querySelectorAll('.lp-flow-step');
    const flowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${Array.from(flowSteps).indexOf(entry.target) * 0.12}s`;
            entry.target.classList.add('visible');
            flowObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    flowSteps.forEach((el) => flowObserver.observe(el));

    /* --- Stagger pricing cards --- */
    const priceCards = document.querySelectorAll('.lp-price-card');
    const priceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${Array.from(priceCards).indexOf(entry.target) * 0.1}s`;
            entry.target.classList.add('visible');
            priceObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    priceCards.forEach((el) => priceObserver.observe(el));
  }

  /* --- FAQ toggle --- */
  const faqItems = document.querySelectorAll('.lp-faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });

  /* --- Mobile sticky CTA --- */
  const mobileCta = document.getElementById('mobile-cta');
  if (mobileCta) {
    const heroSection = document.getElementById('hero');
    const mobileCtaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          mobileCta.classList.toggle('visible', !entry.isIntersecting);
          mobileCta.setAttribute('aria-hidden', entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    if (heroSection) mobileCtaObserver.observe(heroSection);
  }

  /* --- CTA form --- */
  const form = document.querySelector('.lp-cta .contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalHtml = btn.innerHTML;
      btn.innerHTML = 'Invio in corso...';
      btn.disabled = true;

      try {
        const formData = new FormData(form);
        const res = await fetch('/ai-receptionist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        });
        if (!res.ok) throw new Error('Errore server');

        btn.innerHTML = 'Ricevuto! Ti contatteremo entro 24 ore';
        form.reset();
      } catch {
        btn.innerHTML = 'Errore. Riprova o chiamaci.';
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
