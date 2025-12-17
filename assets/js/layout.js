
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
});

function loadHeader() {
  const headerHTML = `
  <header class="header">
    <div class="container header-content">
      <a href="index.html" class="logo-placeholder" style="display: flex; align-items: center;">
        <img src="./assets/logo.png" height="80px" alt="The Qatar Talks">
        <h2>The Qatar Talks</h2>
      </a>
      <div class="mobile-menu-toggle">
        <i class="fas fa-bars"></i>
      </div>
      <nav class="main-nav">
        <ul>
          <li><a href="index.html" class="nav-link" data-page="home">Home</a></li>
          <li><a href="about.html" class="nav-link" data-page="about">About Us</a></li>
          <li class="has-megamenu">
            <a href="#" class="nav-link" data-page="contest">2025 Contest</a>
            <div class="megamenu">
              <div class="megamenu-grid">
                <!-- Column 1 -->
                <div class="megamenu-col">
                  <h4 class="megamenu-title">Participate</h4>
                  <a href="about.html#join">How to Join</a>
                  <a href="about.html#categories">Contest Categories</a>
                </div>
                <!-- Column 2 -->
                <div class="megamenu-col">
                  <h4 class="megamenu-title">Explore</h4>
                  <a href="contest-2025.html">2025 Finalists</a>
                  <a href="contest-2025.html#champions">2025 Champions</a>
                  <a href="past-contests.html">Past Champions</a>
                </div>
              </div>
            </div>
          </li>
          <li><a href="past-contests.html" class="nav-link" data-page="past-champions">Past Champions</a></li>
          <li><a href="news.html" class="nav-link" data-page="news">News & Media</a></li>
          <li><a href="contact.html" class="nav-link" data-page="contact">Contact Us</a></li>
          <div class="header-actions">
            <a href="contact.html#register" class="btn btn-primary" style="color: white;">Login / Registration</a>
          </div>
        </ul>
      </nav>
    </div>
  </header>
  `;

  document.getElementById('header-container').innerHTML = headerHTML;

  // Re-initialize sticky header logic
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Re-initialize Mobile Menu Logic
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const menuIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      if (mainNav.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
  }

  // Mobile Dropdown Logic
  const hasMegamenu = document.querySelectorAll('.has-megamenu');
  hasMegamenu.forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (e.target.closest('.megamenu')) return;

        if (!item.classList.contains('active')) {
          e.preventDefault();
          item.classList.add('active');
        } else {
          e.preventDefault();
          item.classList.remove('active');
        }
      }
    });
  });

  // Highlight active link
  highlightActiveLink();
}

function loadFooter() {
  const footerHTML = `
  <footer class="footer" id="contact">
    <div class="container footer-content">
      <div class="footer-col">
        <h5>The Qatar Talks</h5>
        <p>Empowering voices, inspiring change.</p>
      </div>
      <div class="footer-col">
        <h5>Quick Links</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Register</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <p>info@theqatartalks.com</p>
        <p>+974 1234 5678</p>
      </div>
      <div class="footer-col">
        <h5>Follow Us</h5>
        <div class="social-links">
          <span class="social-icon"><i class="fab fa-facebook-f"></i></span>
          <span class="social-icon"><i class="fab fa-instagram"></i></span>
          <span class="social-icon"><i class="fab fa-twitter"></i></span>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2025 The Qatar Talks. All rights reserved.</p>
    </div>
  </footer>
  `;
  document.getElementById('footer-container').innerHTML = footerHTML;
}

function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
    // Specific case for index
    if (page === '' || page === 'index.html') {
      if (link.getAttribute('href') === 'index.html') link.classList.add('active');
    }
  });
}
