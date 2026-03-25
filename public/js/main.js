// ─── SCROLL FADE IN ───────────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)'));
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach((el) => observer.observe(el));

// ─── NAVBAR SCROLL STYLE ──────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(13, 13, 13, 0.97)';
  } else {
    navbar.style.background = 'rgba(13, 13, 13, 0.85)';
  }
});

// ─── MOBILE HAMBURGER ─────────────────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('nav-open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('nav-open');
  });
});

// ─── SMOOTH SCROLL (fallback for older browsers) ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── ACTIVE NAV HIGHLIGHT ─────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = '#a78bfa';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));
