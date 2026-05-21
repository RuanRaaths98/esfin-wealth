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

  // ---- Sub-Tab Selector switching (Pegasus Style) ----
  const subTabButtons = document.querySelectorAll('.sub-tab-btn');
  const subTabPanels = document.querySelectorAll('.sub-tab-content');

  if (subTabButtons.length > 0 && subTabPanels.length > 0) {
    subTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSubtab = btn.getAttribute('data-subtab');

        // Remove active class from all buttons and panels
        subTabButtons.forEach(b => b.classList.remove('active'));
        subTabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and target panel
        btn.classList.add('active');
        const targetPanel = document.getElementById(`subtab-content-${targetSubtab}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
});
