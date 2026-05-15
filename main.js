// Apex Web Solutions - main.js

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);

  const initMobileMenu = () => {
    const drawerEl = document.querySelector('#apxMobileDrawer');
    if (!drawerEl || !window.bootstrap?.Offcanvas) return;

    const toggleBtn = document.querySelector('[data-mobile-toggle]');
    if (!toggleBtn) return;

    const closeBtn = document.querySelector('[data-close-drawer]');

    const offcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(drawerEl, {
      backdrop: true,
      scroll: true,
    });

    const open = () => offcanvas.show();
    const close = () => offcanvas.hide();

    const setExpanded = (val) => toggleBtn.setAttribute('aria-expanded', String(val));

    // Keep aria in sync
    offcanvas._element?.addEventListener('shown.bs.offcanvas', () => setExpanded(true));
    offcanvas._element?.addEventListener('hidden.bs.offcanvas', () => setExpanded(false));

    toggleBtn.addEventListener('click', () => {
      // If already open, close
      if (drawerEl.classList.contains('show')) close();
      else open();
    });

    if (closeBtn) closeBtn.addEventListener('click', close);

    // Close when clicking a nav link (but keep dropdown behavior intact)
drawerEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".nova-drop-btn");
  if (btn) return; // allow dropdown toggle, don't close drawer

  const link = e.target.closest("a");
  if (!link) return;

  close();
});

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  };

  const initSmoothScroll = () => {
    // Delegate for internal anchors only
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"], a[data-scroll]');
      if (!a) return;

      const href = a.getAttribute('href');
      if (!href || href === '#') return;

      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const initPortfolioFilters = () => {
    const container = document.querySelector('[data-portfolio-grid]');
    const filterBar = document.querySelector('[data-portfolio-filters]');
    if (!container || !filterBar) return;

    const buttons = Array.from(filterBar.querySelectorAll('button[data-filter]'));
    const cards = Array.from(container.querySelectorAll('[data-portfolio-item]'));

    const apply = (filter) => {
      cards.forEach((card) => {
        const tags = (card.getAttribute('data-tags') || '').split(',').map((t) => t.trim());
        const show = filter === 'all' ? true : tags.includes(filter);
        card.classList.toggle('hidden', !show);
      });

      // active styles
      buttons.forEach((b) => {
        const isActive = b.getAttribute('data-filter') === filter;
        b.setAttribute('aria-pressed', String(isActive));
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        apply(filter);
      });
    });

    // initial
    apply('all');
  };

  const initScrollReveal = () => {
    const nodes = Array.from(document.querySelectorAll('.apx-reveal'));
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    nodes.forEach((n) => io.observe(n));
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initPortfolioFilters();
    initScrollReveal();
  });
})();

const mobileBtn = document.getElementById("mobileMenuBtn");
const drawer = document.getElementById("mobileDrawer");
const closeBtn = document.getElementById("drawerCloseBtn");

function openDrawer() {
  drawer.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeDrawer() {
  drawer.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

/* OPEN */
mobileBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  openDrawer();
});

/* CLOSE BUTTON */
closeBtn?.addEventListener("click", closeDrawer);

/* CLICK OUTSIDE TO CLOSE */
document.addEventListener("click", (e) => {
  if (
    drawer.classList.contains("active") &&
    !drawer.contains(e.target) &&
    e.target !== mobileBtn
  ) {
    closeDrawer();
  }
});


  const dropdownLis = Array.from(document.querySelectorAll('.nova-has-dropdown'));

  const closeAll = () => {
    dropdownLis.forEach((li) => li.classList.remove('open'));
  };

  dropdownLis.forEach((li) => {
    const btn = li.querySelector('.nova-drop-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Toggle the clicked dropdown only.
      // No outside-click close: menu stays open until its own button is clicked again.
      const isOpen = li.classList.contains('open');
      if (isOpen) {
        li.classList.remove('open');
        return;
      }

      closeAll();
      li.classList.add('open');
    });
  });


