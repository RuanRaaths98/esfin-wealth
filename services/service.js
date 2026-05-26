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

  // ---- Dynamic Lead Capture Modal ----
  const modalHTML = `
    <div class="lead-modal-overlay" id="leadModalOverlay">
      <div class="lead-modal">
        <div class="lead-modal-header">
          <button class="lead-modal-close" id="leadModalClose">&times;</button>
          <h3>Book a Consultation</h3>
          <p>Please share your details to secure your strategy session.</p>
        </div>
        <div class="lead-modal-body">
          <form class="lead-modal-form" id="leadModalForm">
            <div class="lead-form-group">
              <label for="leadName">Full Name</label>
              <input type="text" id="leadName" class="lead-form-input" required placeholder="e.g. John Doe">
            </div>
            <div class="lead-form-group">
              <label for="leadEmail">Email Address</label>
              <input type="email" id="leadEmail" class="lead-form-input" required placeholder="e.g. john@example.com">
            </div>
            <div class="lead-form-group">
              <label for="leadPhone">Phone Number</label>
              <input type="tel" id="leadPhone" class="lead-form-input" required placeholder="e.g. 012 345 6789">
            </div>
            <div class="lead-form-group">
              <label for="leadService">Service of Interest</label>
              <select id="leadService" class="lead-form-select">
                <option value="accounting">Accounting</option>
                <option value="tax">Tax</option>
                <option value="estate-planning">Estate Planning</option>
                <option value="fiduciary">Fiduciary</option>
                <option value="foreign-exchange">Foreign Exchange</option>
                <option value="investment-management">Investment Management</option>
                <option value="retirement-planning">Retirement Planning</option>
                <option value="trust-services">Trust Services</option>
                <option value="other">Other Advisory</option>
              </select>
            </div>
            <button type="submit" class="lead-form-submit">Request Consultation</button>
          </form>
          <div class="lead-success-state" id="leadSuccessState">
            <div class="lead-success-icon">✓</div>
            <h4>Consultation Requested!</h4>
            <p>Thank you! Our advisory team will contact you shortly to schedule your strategy session.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inject modal into the body
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const overlay = document.getElementById('leadModalOverlay');
  const closeBtn = document.getElementById('leadModalClose');
  const leadForm = document.getElementById('leadModalForm');
  const successState = document.getElementById('leadSuccessState');
  const ctaButtons = document.querySelectorAll('.btn-gold');

  // Auto-select the current service option based on page title
  const selectEl = document.getElementById('leadService');
  if (selectEl) {
    const pageTitle = document.title.toLowerCase();
    if (pageTitle.includes('accounting')) selectEl.value = 'accounting';
    else if (pageTitle.includes('tax')) selectEl.value = 'tax';
    else if (pageTitle.includes('estate')) selectEl.value = 'estate-planning';
    else if (pageTitle.includes('fiduciary')) selectEl.value = 'fiduciary';
    else if (pageTitle.includes('foreign')) selectEl.value = 'foreign-exchange';
    else if (pageTitle.includes('investment')) selectEl.value = 'investment-management';
    else if (pageTitle.includes('retirement')) selectEl.value = 'retirement-planning';
    else if (pageTitle.includes('trust')) selectEl.value = 'trust-services';
  }

  // Open modal
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal functions
  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    // Reset form and state after transition
    setTimeout(() => {
      leadForm.style.display = 'flex';
      successState.style.display = 'none';
      leadForm.reset();
    }, 300);
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Form submission
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = leadForm.querySelector('.lead-form-submit');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Simulate lead capture API call
    setTimeout(() => {
      leadForm.style.display = 'none';
      successState.style.display = 'flex';
      submitBtn.textContent = 'Request Consultation';
      submitBtn.disabled = false;
    }, 1000);
  });
});
