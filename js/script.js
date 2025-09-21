document.addEventListener('DOMContentLoaded', function () {
          // -------------------------
          // 1) Navbar dropdown behavior
          // -------------------------
          document.querySelectorAll('.dropdown-toggle').forEach(dropdown => {
            dropdown.addEventListener('click', function (e) {
              if (window.innerWidth < 768) e.stopPropagation();
            });
          });

          document.querySelectorAll('.dropdown-link').forEach(item => {
            item.addEventListener('click', () => {
              const navbar = document.querySelector('.navbar-collapse');
              if (navbar) {
                const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
                bsCollapse.hide();
              }
            });
          });

          // -------------------------
          // 2) Lazy-loading images
          // -------------------------
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
            lazyImages.forEach(img => {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy-img');
            });
          }

          // -------------------------
          // 3) Ensure carousel active slide image loads
          // ------------------------
          // -------------------------
          // 4) Keyboard UX for dropdowns
          // -------------------------
          document.querySelectorAll('.dropdown').forEach(drop => {
            drop.addEventListener('keydown', (e) => {
              if (e.key === 'Escape') {
                const toggle = drop.querySelector('[data-bs-toggle="dropdown"]');
                if (toggle) toggle.focus();
              }
            });
          });

          // -------------------------
          // 5) Booking Modal UX
          // -------------------------
          const cancelBtn = document.getElementById("cancelBooking");
          if (cancelBtn) {
            cancelBtn.addEventListener("click", function () {
              const bookingModal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
              bookingModal.hide();
            });
          }

          const bookingForm = document.getElementById("bookingForm");
          if (bookingForm) {
            bookingForm.addEventListener("submit", function (e) {
              e.preventDefault();
              const bookingModal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
              bookingModal.hide();

              const successModal = new bootstrap.Modal(document.getElementById("successModal"));
              successModal.show();
              setTimeout(() => successModal.hide(), 3000);
            });
          }

          // -------------------------
          // 6) Bootstrap Carousel (swipe + auto)
          // -------------------------

          // -------------------------
          // 7) Custom Card Carousel (infinite loop + drag/swipe + autoplay + clickable buttons)
          // -------------------------
          const track = document.querySelector('.carousel-track');
          if (track) {
            function getGap() {
              const gapStr = getComputedStyle(track).gap || getComputedStyle(track).columnGap || '';
              return parseFloat(gapStr) || 20;
            }

            let originals = Array.from(track.children);
            if (!originals.length) return;

            const card = track.querySelector('.service-card');
            const step = card.getBoundingClientRect().width + getGap();

            // Clone cards for infinite loop
            const repeatCount = 3;
            for (let i = 0; i < repeatCount; i++) {
              originals.forEach(node => {
                track.appendChild(node.cloneNode(true));
              });
            }

            const singleBlockWidth = originals.length * step;
            track.scrollLeft = singleBlockWidth; // start in middle

            // Infinite correction
            track.addEventListener('scroll', () => {
              if (track.scrollLeft <= 0) {
                track.scrollLeft += singleBlockWidth;
              } else if (track.scrollLeft >= singleBlockWidth * 2) {
                track.scrollLeft -= singleBlockWidth;
              }
            });

            // Pointer drag/swipe
            let isDown = false, startX = 0, startScroll = 0, pointerId = null;

            function onPointerDown(e) {
              if (e.target.closest('a, button')) return; // ✅ Ignore buttons/links
              isDown = true;
              pointerId = e.pointerId;
              track.setPointerCapture(pointerId);
              startX = e.clientX;
              startScroll = track.scrollLeft;
              stopAutoScroll();
            }

            function onPointerMove(e) {
              if (!isDown) return;
              const walk = (e.clientX - startX) * 1.5;
              track.scrollLeft = startScroll - walk;
            }

            function onPointerUp() {
              if (!isDown) return;
              isDown = false;
              try { track.releasePointerCapture(pointerId); } catch {}
              pointerId = null;
              startAutoScroll();
            }

            track.addEventListener('pointerdown', onPointerDown, { passive: true });
            track.addEventListener('pointermove', onPointerMove, { passive: true });
            track.addEventListener('pointerup', onPointerUp);
            track.addEventListener('pointercancel', onPointerUp);
            track.addEventListener('pointerleave', onPointerUp);

            // Ensure buttons are clickable
            document.querySelectorAll('.service-card .view-btn').forEach(btn => {
              btn.addEventListener('click', e => {
                e.stopPropagation(); // prevent carousel drag interference
              });
            });

            // Autoplay
            let autoScrollInterval = null;
            function startAutoScroll() {
              if (autoScrollInterval) return;
              autoScrollInterval = setInterval(() => {
                track.scrollBy({ left: step, behavior: 'smooth' });
              }, 2000);
            }

            function stopAutoScroll() {
              clearInterval(autoScrollInterval);
              autoScrollInterval = null;
            }
            startAutoScroll();

            // Pause on hover
            track.addEventListener('mouseenter', stopAutoScroll);
            track.addEventListener('mouseleave', startAutoScroll);

            // Keyboard support
            window.addEventListener('keydown', (e) => {
              if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
              if (e.key === 'ArrowRight') {
                stopAutoScroll();
                track.scrollBy({ left: step, behavior: 'smooth' });
                startAutoScroll();
              } else if (e.key === 'ArrowLeft') {
                stopAutoScroll();
                track.scrollBy({ left: -step, behavior: 'smooth' });
                startAutoScroll();
              }
            });
          }

          // -------------------------
          // 8) Service Cards Enhancements
          // -------------------------
          
          // Lazy loading effect for service card images
          const serviceCardImages = document.querySelectorAll('.service-card .lazy-img');
          if (serviceCardImages.length > 0) {
            serviceCardImages.forEach(img => {
              // Simulate loading delay for demo purposes
              setTimeout(() => {
                img.classList.add('loaded');
              }, 500);
            });
          }
          
          // Add hover effect to service cards
          const serviceCards = document.querySelectorAll('.service-card');
          if (serviceCards.length > 0) {
            serviceCards.forEach(card => {
              card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                  icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
              });
              
              card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                  icon.style.transform = 'scale(1)';
                }
              });
            });
            
            // Add animation on scroll for service cards
            const observerOptions = {
              root: null,
              rootMargin: '0px',
              threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.style.opacity = 1;
                  entry.target.style.transform = 'translateY(0)';
                }
              });
            }, observerOptions);
            
            // Apply animation to service cards
            serviceCards.forEach(card => {
              card.style.opacity = 0;
              card.style.transform = 'translateY(20px)';
              card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              observer.observe(card);
            });
          }

          // -------------------------
          // 9) Initialize AOS Animation
          // -------------------------
          if (typeof AOS !== "undefined") {
            AOS.init({
              duration: 1500,
              once: true
            });
          }

            initAnimations();
                    
                    // Set up intersection observer for scroll animations
                    if ('IntersectionObserver' in window) {
                        const animatedElements = document.querySelectorAll('.feature-card, .img-container');
                        
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    // Add animation class when element is in viewport
                                    if (entry.target.classList.contains('fade-in-up') || 
                                        entry.target.classList.contains('fade-in-right')) {
                                        entry.target.style.animationPlayState = 'running';
                                    }
                                    observer.unobserve(entry.target);
                                }
                            });
                        }, { threshold: 0.1 });
                        
                        animatedElements.forEach(el => {
                            observer.observe(el);
                        });
                    }


                    // contact session

                    const form = document.querySelector('.contact-form form');
            const inputs = form.querySelectorAll('input, textarea');
            
            // Add focus effect to form inputs
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (this.value === '') {
                        this.parentElement.classList.remove('focused');
                    }
                });
            });
            
            // Form submission handling
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple validation
                let isValid = true;
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (isValid) {
                    // In a real implementation, you would send the form data to a server here
                    alert('Thank you for your message! We will contact you soon.');
                    form.reset();
                } else {
                    alert('Please fill in all required fields.');
                }
            });

            // navbar new js=============================================================================
            const navLinks = document.querySelectorAll('.nav-link');
            
            // Set active class based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href');
                
                // Remove active class from all links
                link.classList.remove('active');
                
                // Add active class to current page link
                if (linkPage === currentPage || 
                   (currentPage === 'index.html' && linkPage === 'index.html') ||
                   (currentPage !== 'index.html' && linkPage.includes(currentPage))) {
                    link.classList.add('active');
                }
                
                // Smooth scroll for anchor links
                if (link.getAttribute('href').startsWith('#')) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    });
                }
            });
            
            // Close mobile menu when clicking on a link
            const navbarCollapse = document.getElementById('navbarNav');
            const navItems = document.querySelectorAll('.nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth < 992) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    }
                });
            });

        });

        function initAnimations() {
                    // Pause animations initially for scroll-triggering
                    const animatedElements = document.querySelectorAll('.feature-card, .img-container');
                    animatedElements.forEach(el => {
                        el.style.animationPlayState = 'paused';
                    });
                }