/* ============================================
   Lead Reactivation Agent — Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const canvas = document.querySelector('.lp-hero-canvas');
  if (!canvas) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#D97706';

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.r = Math.random() * 1.5 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.3;
      ctx.fill();
    }
  }

  const count = Math.min(60, Math.floor((w * h) / 8000));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  let mouse = { x: null, y: null };
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  let animationId;
  function animate() {
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, w, h);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.15 * (1 - dist / 120);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    if (mouse.x !== null) {
      for (let p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.2 * (1 - dist / 150);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animationId = requestAnimationFrame(animate);
  }

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!animationId) animationId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      });
    }, { threshold: 0 });
    observer.observe(heroSection);
  }
  animationId = requestAnimationFrame(animate);
});
