/* ===========================
   DIBIAX HEALTH TECHNOLOGIES — MAIN SCRIPTS
   =========================== */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

function openMenu() {
  navLinks.classList.add('open');
  navBackdrop.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  navBackdrop.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

navBackdrop.addEventListener('click', closeMenu);

navLinks.querySelectorAll('a').forEach(link => {
  if (link.classList.contains('nav-dropdown-toggle')) return;
  link.addEventListener('click', closeMenu);
});

// Product dropdown (tap-to-toggle on mobile, hover on desktop via CSS)
const productDropdown = document.getElementById('productDropdown');
const productToggle   = productDropdown.querySelector('.nav-dropdown-toggle');

productToggle.addEventListener('click', e => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    e.preventDefault();
    productDropdown.classList.toggle('open');
  }
});

document.addEventListener('click', e => {
  if (!productDropdown.contains(e.target)) {
    productDropdown.classList.remove('open');
  }
});

// Scroll-reveal for service cards
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = `opacity .5s ease ${i * 80}ms, transform .5s ease ${i * 80}ms`;
  observer.observe(card);
});

// Card demo: tap to preview on touch devices
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    if (!isTouchDevice()) return;
    const isOpen = card.classList.toggle('demo-open');
    if (isOpen) {
      document.querySelectorAll('.service-card.demo-open').forEach(c => {
        if (c !== card) c.classList.remove('demo-open');
      });
    }
  });
});
