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
              duration: 1300,
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

// ========================================================navbar new js=============================================================================
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
            

            // hero section new scripts -----------------------------------------------------------

             // Add scroll-triggered animation for elements if needed
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, observerOptions);

            // Observe elements that should animate on scroll
            const elementsToAnimate = document.querySelectorAll('.hero-title, .hero-subtitle, .highlight-box, .cta-buttons');
            elementsToAnimate.forEach(el => observer.observe(el));


//  ----------------------------------------------  FAQ section scripts  -----------------------------------------------------------
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });

            // free inspection script form with current location 

            const toggleAlternativeNumber = document.getElementById('toggleAlternativeNumber');
            const alternativeNumberContainer = document.getElementById('alternativeNumberContainer');
            
            toggleAlternativeNumber.addEventListener('click', function() {
                if (alternativeNumberContainer.style.display === 'none') {
                    alternativeNumberContainer.style.display = 'block';
                    this.innerHTML = '<i class="bi bi-dash-circle"></i> Remove Alternative Number';
                } else {
                    alternativeNumberContainer.style.display = 'none';
                    this.innerHTML = '<i class="bi bi-plus-circle"></i> Add Alternative Number';
                }
            });
            
            // Use current location checkbox
            const useCurrentLocation = document.getElementById('useCurrentLocation');
            const addressTextarea = document.getElementById('address');
            
            useCurrentLocation.addEventListener('change', function() {
                if (this.checked) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;
                            addressTextarea.value = `Current Location: ${latitude}, ${longitude}`;
                        }, function(error) {
                            console.error("Error getting location: ", error);
                            addressTextarea.value = "Unable to retrieve current location";
                        });
                    } else {
                        addressTextarea.value = "Geolocation is not supported by this browser";
                    }
                } else {
                    addressTextarea.value = "";
                }
            });
            
            // Form submission
            document.getElementById('freeInspectionForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate service selection
                const pestControl = document.getElementById('pestControl').checked;
                const buildingCleaning = document.getElementById('buildingCleaning').checked;
                
                if (!pestControl && !buildingCleaning) {
                    alert('Please select at least one service');
                    return;
                }
                
                // If we get here, form is valid
                alert('Thank you! Your free inspection request has been submitted.');
                // In a real application, you would submit the form data to a server here
                
                // Close the modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('freeInspectionModal'));
                modal.hide();
            });
            
            // Cancel button
            document.getElementById('cancelInspection').addEventListener('click', function() {
                const modal = bootstrap.Modal.getInstance(document.getElementById('freeInspectionModal'));
                modal.hide();
            });

// =========================================== service booking with pricing plan integrated =========================================            
             // Plan selection functionality
        const planCards = document.querySelectorAll('.service-plan-card');
        let selectedPlan = null;
        
        // planCards.forEach(card => {
        //     card.addEventListener('click', function() {
        //         // Remove selected class from all cards
        //         planCards.forEach(c => {
        //             c.classList.remove('selected');
        //             c.classList.add('muted');
        //         });
                
        //         // Add selected class to clicked card
        //         this.classList.add('selected');
        //         this.classList.remove('muted');
                
        //         // Store selected plan
        //         selectedPlan = this.getAttribute('data-plan');
        //     });
        // });

        planCards.forEach(card => {
    card.addEventListener('click', function() {
        const isCurrentlySelected = this.classList.contains('selected');
        
        // Remove selected class from all cards and remove muted class
        planCards.forEach(c => {
            c.classList.remove('selected');
            c.classList.remove('muted');
        });
        
        // If the clicked card wasn't already selected, select it
        if (!isCurrentlySelected) {
            this.classList.add('selected');
            // Add muted class to other cards
            planCards.forEach(c => {
                if (c !== this) {
                    c.classList.add('muted');
                }
            });
            // Store selected plan
            selectedPlan = this.getAttribute('data-plan');
        } else {
            // If it was already selected and clicked again, deselect it
            selectedPlan = null;
        }
    });
});

        // Alternative number toggle for service modal
        const toggleAlternativeNumberService = document.getElementById('toggleAlternativeNumberService');
        const alternativeNumberContainerService = document.getElementById('alternativeNumberContainerService');
        
        toggleAlternativeNumberService.addEventListener('click', function() {
            if (alternativeNumberContainerService.style.display === 'none') {
                alternativeNumberContainerService.style.display = 'block';
                this.innerHTML = '<i class="bi bi-dash-circle"></i> Remove Alternative Number';
            } else {
                alternativeNumberContainerService.style.display = 'none';
                this.innerHTML = '<i class="bi bi-plus-circle"></i> Add Alternative Number';
            }
        });
        
        // Use current location checkbox for service modal
        const useCurrentLocationService = document.getElementById('useCurrentLocationService');
        const addressTextareaService = document.getElementById('address');
        
        useCurrentLocationService.addEventListener('change', function() {
            if (this.checked) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        addressTextareaService.value = `Current Location: ${latitude}, ${longitude}`;
                    }, function(error) {
                        console.error("Error getting location: ", error);
                        addressTextareaService.value = "Unable to retrieve current location";
                    });
                } else {
                    addressTextareaService.value = "Geolocation is not supported by this browser";
                }
            } else {
                addressTextareaService.value = "";
            }
        });
        
        // Form submission for service booking
        document.getElementById('serviceBookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate service selection
            const pestControl = document.getElementById('pestControlService').checked;
            const buildingCleaning = document.getElementById('buildingCleaningService').checked;
            
            if (!pestControl && !buildingCleaning) {
                alert('Please select at least one service');
                return;
            }
            
            // Validate plan selection
            // if (!selectedPlan) {
            //     alert('Please select a plan');
            //     return;
            // }
            
            // If we get here, form is valid
            alert(`Thank you! Your ${selectedPlan || ""} plan booking has been submitted.`);
            // In a real application, you would submit the form data to a server here
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('serviceBookingModal'));
            modal.hide();
            
            // Reset form
            this.reset();
            planCards.forEach(card => {
                card.classList.remove('selected', 'muted');
            });
            selectedPlan = null;
        });
        
        // Cancel button for service modal
        document.getElementById('cancelServiceBooking').addEventListener('click', function() {
            const modal = bootstrap.Modal.getInstance(document.getElementById('serviceBookingModal'));
            modal.hide();
            
            // Reset form
            document.getElementById('serviceBookingForm').reset();
            planCards.forEach(card => {
                card.classList.remove('selected', 'muted');
            });
            selectedPlan = null;
        });

        // Pricing card integration
        document.querySelectorAll('.pricing-card-custom button, .combo-card-custom button').forEach(button => {
            button.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                
                // Show the service booking modal
                const modal = new bootstrap.Modal(document.getElementById('serviceBookingModal'));
                modal.show();
                
                // Select the corresponding plan in the modal
                setTimeout(() => {
                    const planCard = document.querySelector(`.service-plan-card[data-plan="${plan}"]`);
                    if (planCard) {
                        planCards.forEach(c => {
                            c.classList.remove('selected');
                            c.classList.add('muted');
                        });
                        
                        planCard.classList.add('selected');
                        planCard.classList.remove('muted');
                        selectedPlan = plan;
                    }
                }, 500);
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

                document.querySelectorAll('.highlight-box').forEach(box => {
            box.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.setProperty('--mouse-x', `${x}px`);
                this.style.setProperty('--mouse-y', `${y}px`);
            });
        });

         // Scroll detection for navbar transparency and button visibility--------------------------------------------
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const scrollButtons = document.querySelector('.scroll-buttons');
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const triggerPoint = viewportHeight * 0.8; // 80vh
            
            // Toggle navbar transparency
            if (scrollPosition > triggerPoint) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Toggle scroll buttons visibility
            if (scrollPosition > triggerPoint) {
                scrollButtons.classList.add('visible');
            } else {
                scrollButtons.classList.remove('visible');
            }
        });
        
        // Back to top functionality
        document.querySelector('.back-to-top').addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        