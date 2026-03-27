// ── SHARED NAV & FOOTER INJECTOR ──
// Sets active link and injects nav/footer into every page

function getActivePage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path;
}

function injectNav(containerId) {
  const active = getActivePage();
  const isActive = (page) => active === page ? 'active' : '';

  const html = `
  <nav class="navbar" id="mainNav">
    <div class="nav-inner">
      <a href="index.html" class="nav-brand">
        <img src="assets/images/final-logo.png" alt="UPS Logo" class="nav-logo-icon" style="width:45px;height:45px;object-fit:contain;background:none;box-shadow:none;border-radius:0;border:none;"/>
        <div class="nav-logo-text">
          <div class="name">Unique Public School</div>
          <div class="place">Bidar, Karnataka</div>
        </div>
      </a>
      <div class="nav-links">
        <a href="index.html" class="${isActive('index.html')}">Home</a>
        <a href="about.html" class="${isActive('about.html')}">About</a>
        <a href="features.html" class="${isActive('features.html')}">Features</a>
        <div class="nav-dropdown">
          <div class="dropdown-btn">
            Events
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="dropdown-menu-custom">
            <a href="events.html">📸 Photo Gallery</a>
            <a href="videos.html">🎬 Videos</a>
          </div>
        </div>
        <a href="newbranch.html" class="${isActive('newbranch.html')}">New Branch</a>
        <div class="nav-dropdown">
          <div class="dropdown-btn">
            Contact
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="dropdown-menu-custom">
            <a href="mailto:uniquepublicandhighschool@gmail.com">✉️ Email Us</a>
            <a href="https://wa.me/919449303699?text=Hello,%20I%20need%20school%20info" target="_blank">💬 WhatsApp</a>
            <a href="index.html#contact">📍 Visit Us</a>
          </div>
        </div>
        <a href="index.html#contact" class="nav-cta">Admissions →</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="features.html">Features</a>
    <a href="events.html">Gallery</a>
    <a href="videos.html">Videos</a>
    <a href="newbranch.html">New Branch</a>
    <a href="mailto:uniquepublicandhighschool@gmail.com">Email Us</a>
    <a href="https://wa.me/919449303699" target="_blank">WhatsApp</a>
    <a href="index.html#contact" class="nav-cta" style="margin-top:8px;display:block;text-align:center;border-radius:10px;padding:12px;">Admissions →</a>
  </div>`;

  document.getElementById(containerId).innerHTML = html;
  initNav();
}

function injectFooter(containerId) {
  const html = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-logo">
            <div class="logo-icon">UPS</div>
            <div>
              <div class="brand-name">Unique Public School</div>
              <div class="brand-city">Bidar, Karnataka</div>
            </div>
          </div>
          <p class="footer-tagline">Empowering young minds since 1995. Nurturing knowledge, character, and excellence in the heart of Bidar.</p>
          <div class="footer-social">
            <a href="https://www.facebook.com/profile.php?id=61562278511710" target="_blank" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/uniquepublicedu" target="_blank" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://youtube.com/@uniquepublichighschoolshivnaga" target="_blank" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
            </a>
            <a href="https://wa.me/919449303699" target="_blank" aria-label="WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.533 5.855L.054 23.5l5.79-1.517A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.68-.495-5.23-1.364l-.375-.218-3.877 1.016 1.035-3.783-.241-.389A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="index.html">→ Home</a></li>
            <li><a href="about.html">→ About Us</a></li>
            <li><a href="features.html">→ Features</a></li>
            <li><a href="events.html">→ Photo Gallery</a></li>
            <li><a href="videos.html">→ Videos</a></li>
            <li><a href="newbranch.html">→ New Branch</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Message</h5>
          <p style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.7;">
            "I take immense pride in witnessing our students excel in academics and achieve prestigious positions in their careers."
          </p>
          <p style="color:var(--gold-lt);font-size:12px;margin-top:10px;font-weight:600;">— Mrs. Rajeshree M. Bhalke, Principal</p>
        </div>
        <div class="footer-col">
          <h5>Contact</h5>
          <div class="footer-contact-item">
            <span class="icon">📍</span>
            <p>19-6-20, Shivnagar (N), Bidar, Karnataka – 585401</p>
          </div>
          <div class="footer-contact-item">
            <span class="icon">📞</span>
            <p>+91 70196 36947<br>+91 94498 17169<br>+91 81475 21888</p>
          </div>
          <div class="footer-contact-item">
            <span class="icon">✉️</span>
            <p>uniquepublicandhighschool@gmail.com</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Unique Public School, Bidar. All rights reserved.</p>
        <p>Designed with ❤️ by <a href="mailto:pavanpatil9104@gmail.com">Anveshak Team</a></p>
      </div>
    </div>
  </footer>`;

  document.getElementById(containerId).innerHTML = html;
}

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mainNav   = document.getElementById('mainNav');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  window.addEventListener('scroll', () => {
    mainNav?.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Dropdown fix for touch/click reliability
  const dropdowns = document.querySelectorAll('.dropdown-btn');
  dropdowns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = btn.parentElement;
      parent.classList.toggle('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown.open').forEach(dd => dd.classList.remove('open'));
  });

  // Force dropdown visibility when 'open'
  const style = document.createElement('style');
  style.innerHTML = `
    .nav-dropdown.open .dropdown-menu-custom {
      display: flex !important;
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
      pointer-events: auto !important;
    }
  `;
  document.head.appendChild(style);
}

// Scroll reveal
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);
