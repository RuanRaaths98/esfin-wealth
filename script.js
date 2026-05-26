/* ============================================
   ESFIN — JavaScript
   Navigation, Scroll Animations, Form Handling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  const handleScroll = () => {
    const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 0;
    const pastHero = window.scrollY > heroBottom - 100;

    if (pastHero) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('on-hero');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('on-hero');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');

    // Animate hamburger lines
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // ---- Mobile Services Dropdown Toggle ----
  const servicesDropdown = document.getElementById('servicesDropdown');
  const servicesLink = servicesDropdown.querySelector('.nav-link-dropdown');

  servicesLink.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      servicesDropdown.classList.toggle('active-mobile');
    }
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links .nav-link:not(.nav-link-dropdown), .nav-links .nav-cta, .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link:not(.nav-link-dropdown)');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ---- Scroll Fade-In Animations ----
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ---- Animated Stat Counter ----
  const statValues = document.querySelectorAll('.stat-value');
  let statsAnimated = false;

  const animateCounter = (el) => {
    const text = el.textContent;
    const suffix = text.replace(/[\d.]/g, '');
    const target = parseFloat(text.replace(/[^\d.]/g, ''));
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      current = target * eased;

      if (target >= 100) {
        el.textContent = Math.round(current).toLocaleString() + suffix;
      } else {
        el.textContent = Math.round(current) + suffix;
      }

      if (step >= steps) {
        el.textContent = text;
        clearInterval(timer);
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statValues.forEach(el => animateCounter(el));
      }
    });
  }, { threshold: 0.3 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);

  // ---- Contact Form Handling ----
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate submission
    setTimeout(() => {
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = '#16a34a';
      submitBtn.style.opacity = '1';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2500);
    }, 1200);
  });

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Services Tab Swapping (Pegasus Style) ----
  // ---- Dynamic Service Details Modal ----
  const detailsModalHTML = `
    <div class="detail-modal-overlay" id="detailModalOverlay">
      <div class="detail-modal-container">
        <button class="detail-modal-close-btn" id="detailModalCloseBtn">&times;</button>
        <div class="detail-modal-content" id="detailModalContent">
          <!-- Injected service panel content -->
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', detailsModalHTML);

  const detailOverlay = document.getElementById('detailModalOverlay');
  const detailCloseBtn = document.getElementById('detailModalCloseBtn');
  const detailContent = document.getElementById('detailModalContent');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.getAttribute('data-service');
      const sourcePanel = document.getElementById(`tab-panel-${serviceId}`);
      if (sourcePanel) {
        // Clone the panel content
        const clonedPanel = sourcePanel.cloneNode(true);
        // Make sure it is active/visible
        clonedPanel.classList.add('active');
        
        // Inject into modal content
        detailContent.innerHTML = '';
        detailContent.appendChild(clonedPanel);
        
        // Open modal
        detailOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Bind the consult button inside the cloned modal
        const consultBtn = clonedPanel.querySelector('.btn-gold-plus');
        if (consultBtn) {
          consultBtn.addEventListener('click', (e) => {
            e.preventDefault();
            detailOverlay.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => {
              const targetEl = document.querySelector('#contact');
              if (targetEl) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }, 300);
          });
        }
      }
    });
  });

  const closeDetailsModal = () => {
    detailOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  detailCloseBtn.addEventListener('click', closeDetailsModal);
  detailOverlay.addEventListener('click', (e) => {
    if (e.target === detailOverlay) closeDetailsModal();
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailsModal();
    }
  });

});
