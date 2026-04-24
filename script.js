/* ═══════════════════════════════════════════════════════════════
   BARTHOLOMEW RICHARD — PORTFOLIO JS
   Custom cursor · Scroll effects · Counters · Magnetic buttons · Reveals
   ═══════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Scroll progress bar ─────────────────────────────────── */
  const progress = $('.scroll-progress');
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.width = `${(scrolled * 100).toFixed(2)}%`;
  };

  /* ─── Nav scroll state ─────────────────────────────────────── */
  const nav = $('.nav');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
    updateProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Active section indicator in nav ─────────────────────── */
  const navLinks = $$('[data-nav]');
  const sections = navLinks
    .map(a => {
      const id = a.getAttribute('href');
      return id?.startsWith('#') ? document.getElementById(id.slice(1)) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('is-active'));
            const active = navLinks.find(a => a.getAttribute('href') === `#${e.target.id}`);
            active?.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -55% 0px' }
    );
    sections.forEach(s => navObserver.observe(s));
  }

  /* ─── Mobile menu ──────────────────────────────────────────── */
  const toggle = $('#menuToggle');
  const navLinksWrap = $('.nav__links');
  if (toggle && navLinksWrap) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      navLinksWrap.classList.toggle('is-open');
      document.body.style.overflow = navLinksWrap.classList.contains('is-open') ? 'hidden' : '';
    });
    navLinksWrap.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        toggle.classList.remove('is-open');
        navLinksWrap.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── Custom cursor (desktop + fine pointer only) ─────────── */
  const canUseCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursor    = $('.cursor');
  const cursorDot = $('.cursor-dot');

  if (canUseCursor && cursor && cursorDot && !prefersReducedMotion) {
    let mx = 0, my = 0, cx = 0, cy = 0, dx = 0, dy = 0;

    window.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    const render = () => {
      // Smooth the ring
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      // Dot is faster
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;

      cursor.style.transform    = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    render();

    // Hover state on interactive elements
    const hoverables = 'a, button, .skill-group__tags li, .pub, .timeline__item, .stat, .contact__link, .award';
    $$(hoverables).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  } else {
    cursor?.remove();
    cursorDot?.remove();
  }

  /* ─── Magnetic buttons ─────────────────────────────────────── */
  if (canUseCursor && !prefersReducedMotion) {
    $$('[data-magnetic]').forEach(btn => {
      const strength = 0.25;
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ─── Intersection reveals ─────────────────────────────────── */
  // Add the data-reveal attribute to sections/cards we want to animate in
  const revealTargets = [
    '.section__head',
    '.about__body',
    '.about__stats',
    '.timeline__item',
    '.pub',
    '.skill-group',
    '.edu-card',
    '.award',
    '.reference',
    '.contact__title',
    '.contact__actions',
    '.references'
  ];
  const revealEls = $$(revealTargets.join(','));
  revealEls.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    // Stagger per section grouping
    el.style.transitionDelay = `${(i % 5) * 60}ms`;
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ─── Counter animation ────────────────────────────────────── */
  const counters = $$('[data-count]');
  const animateCount = el => {
    const target = +el.dataset.count;
    const duration = 1400;
    const start = performance.now();
    const step = now => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = Math.round(target * eased).toString();
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const countObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCount(e.target);
            countObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(c => countObs.observe(c));
  } else {
    counters.forEach(c => (c.textContent = c.dataset.count));
  }

  /* ─── Year auto-update in footer ───────────────────────────── */
  const yearSpan = $('.footer__row .mono');
  if (yearSpan && yearSpan.textContent.includes('©')) {
    yearSpan.textContent = `© ${new Date().getFullYear()} Bartholomew Richard`;
  }

  /* ─── Log ──────────────────────────────────────────────────── */
  console.log(
    '%c Bartholomew Richard ',
    'background:#E8753B;color:#0B0B0A;font-weight:700;padding:4px 8px;border-radius:2px;font-family:monospace;',
    '\n Research Assistant · IIT Palakkad\n Get in touch: barthukattu1998@gmail.com'
  );
})();
