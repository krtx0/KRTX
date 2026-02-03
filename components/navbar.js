class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
  display: block;
  position: relative; /* REQUIRED */
  width: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(10, 10, 10, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}



        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(to right, #00f0ff, #bd00ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-decoration: none;
          z-index: 1001;
        }

        /* DESKTOP LINKS */
        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #f3f4f6;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: color 0.3s ease;
          z-index: 1001;
        }

        .nav-link:hover {
          color: #00f0ff;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #00f0ff, #bd00ff);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }
/* HAMBURGER — hidden by default (desktop) */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.5rem;
  z-index: 1001;
}

.mobile-menu-button svg {
  width: 28px;
  height: 28px;
  stroke: #ffffff;
}

/* MOBILE ONLY */
@media (max-width: 768px) {
  .mobile-menu-button {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;

    flex-direction: column;
    align-items: center;

    background: rgba(10, 10, 10, 0.98);
    padding: 2rem 1.5rem;
    gap: 1.5rem;

    z-index: 50;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  }

  .nav-links.open {
    display: flex;
  }
}

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      </style>

      <div class="navbar-container">
        <a href="index.html" class="logo">KRTX AGENCY</a>

        <nav class="nav-links">
          <a href="index.html" class="nav-link">Home</a>
          <a href="index.html#services" class="nav-link" onclick="this.closest('custom-navbar').shadowRoot.querySelector('.nav-links').classList.remove('open')">Services</a>
          <a href="portfolio.html" class="nav-link">Work</a>
          <a href="websites.html" class="nav-link">Websites</a>
          <a href="index.html#about" class="nav-link" onclick="this.closest('custom-navbar').shadowRoot.querySelector('.nav-links').classList.remove('open')">About</a>
          <a href="index.html#contact" class="nav-link" onclick="this.closest('custom-navbar').shadowRoot.querySelector('.nav-links').classList.remove('open')">Contact</a>
        </nav>

        <button class="mobile-menu-button" aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    `;

    // Get references to elements
    const btn = this.shadowRoot.querySelector('.mobile-menu-button');
    const links = this.shadowRoot.querySelector('.nav-links');
    const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
    
    // Toggle menu on button click
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      links.classList.toggle('open');
      
      // Change icon based on menu state
      const icon = btn.querySelector('svg');
      if (links.classList.contains('open')) {
        // Change to X icon
        icon.innerHTML = `
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        `;
      } else {
        // Change back to hamburger icon
        icon.innerHTML = `
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        `;
      }
    });

    // Close menu when clicking on a link (for mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          links.classList.remove('open');
          // Reset icon to hamburger
          const icon = btn.querySelector('svg');
          icon.innerHTML = `
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          `;
        }
      });
    });

    document.addEventListener('click', (e) => {
  if (window.innerWidth > 768) return;

  const path = e.composedPath();

  // If click happened inside this custom element, do nothing
  if (path.includes(this)) return;

  links.classList.remove('open');

  // Reset icon
  const icon = btn.querySelector('svg');
  icon.innerHTML = `
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  `;
});

  }
}

if (!customElements.get('custom-navbar')) {
  customElements.define('custom-navbar', CustomNavbar);

}
