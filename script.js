/* =========================================================================
   RevSageAI — Interactions
   ========================================================================= */

(function () {
  'use strict';

  /* --- Channel rewriting tabs ------------------------------------------ */
  const tabs = document.querySelectorAll('.rewrite__tab');
  const panels = document.querySelectorAll('.rewrite__panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
      });

      panels.forEach((p) => {
        p.classList.toggle('is-active', p.getAttribute('data-panel') === target);
      });
    });
  });

  /* --- Scroll-reveal --------------------------------------------------- */
  const animEls = document.querySelectorAll('[data-anim]');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animEls.forEach((el) => {
      // Trigger hero elements immediately on load (above the fold)
      if (el.closest('.hero')) {
        requestAnimationFrame(() => el.classList.add('is-in'));
      } else {
        io.observe(el);
      }
    });
  } else {
    // Fallback: just show everything
    animEls.forEach((el) => el.classList.add('is-in'));
  }

  /* --- Announcement bar dismiss --------------------------------------- */
  const announce = document.getElementById('announce');
  const ANNOUNCE_KEY = 'rs.announce.dismissed.v1';
  if (announce) {
    try {
      if (localStorage.getItem(ANNOUNCE_KEY) === '1') {
        announce.hidden = true;
      }
    } catch (_) {}
    const closeBtn = announce.querySelector('.announce__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        announce.hidden = true;
        try { localStorage.setItem(ANNOUNCE_KEY, '1'); } catch (_) {}
      });
    }
  }

  /* --- Mobile nav ------------------------------------------------------ */
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.getElementById('mobile-nav');

  function setNavOpen(open) {
    if (!nav || !navToggle || !navMobile) return;
    nav.classList.toggle('nav--open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navMobile.hidden = !open;
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('nav--open');
      setNavOpen(!isOpen);
    });
  }
  if (navMobile) {
    navMobile.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') setNavOpen(false);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('nav--open')) {
      setNavOpen(false);
      navToggle && navToggle.focus();
    }
  });

  /* --- Hero glow parallax (mouse-driven) ------------------------------- */
  const glows = document.querySelectorAll('.hero__glow');
  if (glows.length && window.matchMedia('(min-width: 980px)').matches) {
    const hero = document.querySelector('.hero');
    if (hero) {
      let raf = null;

      hero.addEventListener('mousemove', (e) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          glows.forEach((glow, i) => {
            const depth = i === 0 ? 30 : -22;
            glow.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
          });
        });
      });

      hero.addEventListener('mouseleave', () => {
        glows.forEach((glow) => {
          glow.style.transform = '';
        });
      });
    }
  }
})();
