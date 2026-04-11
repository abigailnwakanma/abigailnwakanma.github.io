// ── DARK MODE (default light) ─────────────────────────
function setThemeIcon(isDark) {
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = isDark ? '☀️' : '🌙';
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  setThemeIcon(isDark);
}

// Apply saved theme or default to light (no automatic dark)
(function () {
  const saved = localStorage.getItem('theme');
  // Only apply dark if user explicitly saved dark; otherwise light
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
    document.addEventListener('DOMContentLoaded', () => setThemeIcon(true));
  } else {
    // ensure light mode (remove dark if any)
    document.documentElement.classList.remove('dark');
    document.addEventListener('DOMContentLoaded', () => setThemeIcon(false));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.removeAttribute('onclick');
      btn.addEventListener('click', toggleTheme);
    }
  });
})();

// ── STICKY NAV ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ────────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const toggleBtn = document.querySelector('.nav-toggle');
  if (menu && menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      toggleBtn && !toggleBtn.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ── SMOOTH SCROLL + FADE-IN ────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    });
  });

  // Scroll fade-in
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.07 });
    fadeElements.forEach(el => observer.observe(el));
  }
});