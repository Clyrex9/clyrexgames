// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 60);
}, { passive: true });

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Image fallbacks (moved from inline onerror to avoid CSP issues)
const fallbackEmoji = { db: '⚽', mct: '💰' };
const fallbackClass = { db: 'db-fallback', mct: 'mct-fallback' };

document.querySelectorAll('img[data-fallback]').forEach((img) => {
  img.addEventListener('error', function () {
    const key = this.dataset.fallback;
    const div = document.createElement('div');
    div.className = `icon-fallback ${fallbackClass[key]}`;
    div.textContent = fallbackEmoji[key];
    this.parentElement.replaceChild(div, this);
  });
});

document.querySelectorAll('.phone-img').forEach((img) => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
  });
});
