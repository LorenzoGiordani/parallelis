/* ============================================
   Parallelis — Interactions & Animations
   ============================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Header scroll --- */
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-menu');
  function updateHeader() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
  }

  /* --- Hamburger toggle --- */
  if (hamburger && navMenu) {
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    function toggleNav(open) {
      navMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      overlay.classList.toggle('visible', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => {
      toggleNav(!navMenu.classList.contains('open'));
    });

    const closeNav = () => toggleNav(false);

    overlay.addEventListener('click', closeNav);

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeNav();
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
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#D97706';
    const ca = (alpha) => accent.replace(')', ` / ${alpha})`);

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

      const t = now * 0.00015;

      // === 1. Horizontal converging lines ===
      const lineCount = 60;
      const spacing = dh / (lineCount - 1);
      for (let i = 0; i < lineCount; i++) {
        const by = i * spacing;
        const dc = Math.abs(by - cy) / (dh * 0.5);
        const prox = 1 - Math.min(dc, 1);
        const wobble = Math.sin(t * 2.5 + i * 0.25) * 6 * prox;
        const bend = Math.sin(i * 0.1 + t * 0.8) * 0.5 * prox;

        const alpha = 0.05 + 0.2 * prox;
        const lw = 0.3 + 2.5 * prox;

        ctx.strokeStyle = accent;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lw;

        ctx.beginPath();
        ctx.moveTo(0, by);

        const segs = 12;
        for (let j = 1; j <= segs; j++) {
          const x = (dw / segs) * j;
          const p = j / segs;
          const yOff = Math.sin(p * Math.PI * 2) * bend * dh * 0.08 + wobble * p;
          ctx.lineTo(x, by + yOff);
        }
        ctx.stroke();
      }

      // === 2. Diagonal connector lines ===
      ctx.globalAlpha = 0.03;
      ctx.lineWidth = 0.8;
      for (let d = 0; d < 8; d++) {
        const x = d * (dw / 8);
        ctx.beginPath();
        ctx.moveTo(x, -10);
        ctx.lineTo(x + dw * 0.1 + Math.sin(t + d * 0.5) * 8, dh + 10);
        ctx.stroke();
      }

      // === 3. Glow nodes at convergence ===
      for (let n = 0; n < 4; n++) {
        const nx = cx + (n - 1.5) * dw * 0.08;
        const ny = cy + Math.sin(t * 1.5 + n * 0.8) * dh * 0.04;
        const pulse = 1 + Math.sin(t * 2 + n * 1.1) * 0.25;
        const radius = (25 + 20 * (1 - Math.abs(n - 1.5) / 2)) * pulse;

        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius * 2.5);
        grad.addColorStop(0, ca('0.55'));
        grad.addColorStop(0.3, ca('0.15'));
        grad.addColorStop(0.7, ca('0.04'));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.6 + Math.sin(t * 1.2 + n) * 0.3;
        ctx.beginPath();
        ctx.arc(nx, ny, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // === 4. Central vertical column ===
      ctx.save();
      ctx.globalAlpha = 0.15 + Math.sin(t * 0.6) * 0.1;
      const beam = ctx.createLinearGradient(cx, 0, cx + dw * 0.03, dh);
      beam.addColorStop(0, ca('0.03'));
      beam.addColorStop(0.4, ca('0.10'));
      beam.addColorStop(0.6, ca('0.10'));
      beam.addColorStop(1, ca('0.03'));
      ctx.fillStyle = beam;
      ctx.fillRect(cx - dw * 0.02, 0, dw * 0.07, dh);
      ctx.restore();

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    }

    function initHero() {
      resize();
      if (!prefersReduced) {
        animationId = requestAnimationFrame(draw);
      }
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
            if (!animationId && !prefersReduced) animationId = requestAnimationFrame(draw);
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

  /* --- FAQ smooth accordion --- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-question');
    const a = item.querySelector('.faq-answer');
    if (!q || !a) return;

    q.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpening = !item.open;

      /* Close all others */
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          const siblingAnswer = openItem.querySelector('.faq-answer');
          siblingAnswer.style.maxHeight = '0px';
          siblingAnswer.style.opacity = '0';
          siblingAnswer.classList.remove('open');
          openItem.classList.remove('open');
        }
      });

      if (isOpening) {
        item.open = true;
        requestAnimationFrame(() => {
          a.style.maxHeight = a.scrollHeight + 'px';
          a.style.opacity = '1';
          a.classList.add('open');
        });
        item.classList.add('open');
      } else {
        a.style.maxHeight = '0px';
        a.style.opacity = '0';
        a.classList.remove('open');
        setTimeout(() => { item.open = false; }, 300);
      }
    });
  });

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
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) throw new Error('Errore server');

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
