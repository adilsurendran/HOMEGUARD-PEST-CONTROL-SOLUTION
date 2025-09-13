document.addEventListener('DOMContentLoaded', function () {
  // 1) Close navbar on link click (mobile)
  const navCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  navLinks.forEach(link => link.addEventListener('click', () => {
    // if the collapse is shown and toggle button is visible (mobile), hide it
    const bsCollapse = bootstrap && bootstrap.Collapse ? bootstrap.Collapse.getInstance(navCollapse) : null;
    if (bsCollapse && window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
      bsCollapse.hide();
    }
  }));
  // Enable hover dropdowns on desktop
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 768) { // desktop only
    document.querySelectorAll('.navbar .dropdown').forEach(function (dropdown) {
      dropdown.addEventListener('mouseenter', function () {
        let menu = this.querySelector('.dropdown-menu');
        menu.classList.add('show');
      });
      dropdown.addEventListener('mouseleave', function () {
        let menu = this.querySelector('.dropdown-menu');
        menu.classList.remove('show');
      });
    });
  }
});


  // 2) Lazy-loading images
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window && lazyImages.length) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy-img');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  } else {
    // Fallback: load images immediately
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.classList.remove('lazy-img');
    });
  }

  // 3) Ensure carousel active slide image is loaded (if data-src used inside carousel)
  const pestCarousel = document.querySelector('#pestCarousel');
  if (pestCarousel) {
    pestCarousel.addEventListener('slid.bs.carousel', function () {
      const activeImg = pestCarousel.querySelector('.carousel-item.active img[data-src]');
      if (activeImg) {
        activeImg.src = activeImg.dataset.src;
        activeImg.removeAttribute('data-src');
        activeImg.classList.remove('lazy-img');
      }
    });
    // load the initial active image immediately if present
    const firstImg = pestCarousel.querySelector('.carousel-item.active img[data-src]');
    if (firstImg) {
      firstImg.src = firstImg.dataset.src;
      firstImg.removeAttribute('data-src');
      firstImg.classList.remove('lazy-img');
    }
  }

  // Additional micro-UX: keyboard support for dropdown hover menus (for desktop users)
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(drop => {
    drop.addEventListener('keydown', (e) => {
      // close dropdown on Escape
      if (e.key === 'Escape') {
        const toggle = drop.querySelector('[data-bs-toggle="dropdown"]');
        if (toggle) toggle.focus();
      }
    });
  });

  // new booking js

   // Cancel button → just close the form
  document.getElementById("cancelBooking").addEventListener("click", function () {
    const bookingModal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
    bookingModal.hide();
  });
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Close booking modal
    const bookingModal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
    bookingModal.hide();

    // Show success modal
    const successModal = new bootstrap.Modal(document.getElementById("successModal"));
    successModal.show();

    // Auto-hide after 2 seconds
    setTimeout(() => successModal.hide(), 3000);
  });
});

// new carousel with swipe in desktop


  const carousel = document.querySelector('#pestCarousel');
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 1500,   // normal auto-slide interval
    pause: 'hover'    // pause when hovering (Bootstrap default)
  });




 

  // Book Now (form submit) → show success popup



