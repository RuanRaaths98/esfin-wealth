/* Service page shared JS */
document.addEventListener('DOMContentLoaded', () => {
  // Fade-up animations
  const fadeEls = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.08 });
  fadeEls.forEach(el => obs.observe(el));

  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      links.style.display = open ? 'flex' : '';
    });
  }

  // Services dropdown — mobile
  const ddItem = document.querySelector('.nav-item-dropdown');
  const ddLink = ddItem ? ddItem.querySelector('.nav-link-dropdown') : null;
  if (ddLink) {
    ddLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) { e.preventDefault(); ddItem.classList.toggle('active-mobile'); }
    });
  }
});
