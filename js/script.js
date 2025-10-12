// document.addEventListener('DOMContentLoaded', function () {
//           // -------------------------
//           // 1) Navbar dropdown behavior
//           // -------------------------
//           document.querySelectorAll('.dropdown-toggle').forEach(dropdown => {
//             dropdown.addEventListener('click', function (e) {
//               if (window.innerWidth < 768) e.stopPropagation();
//             });
//           });

//           document.querySelectorAll('.dropdown-link').forEach(item => {
//             item.addEventListener('click', () => {
//               const navbar = document.querySelector('.navbar-collapse');
//               if (navbar) {
//                 const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
//                 bsCollapse.hide();
//               }
//             });
//           });

//           // -------------------------
//           // 2) Lazy-loading images
//           // -------------------------
//           const lazyImages = document.querySelectorAll('img[data-src]');
//           if ('IntersectionObserver' in window && lazyImages.length) {
//             const imgObserver = new IntersectionObserver((entries, observer) => {
//               entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                   const img = entry.target;
//                   img.src = img.dataset.src;
//                   img.removeAttribute('data-src');
//                   img.classList.remove('lazy-img');
//                   observer.unobserve(img);
//                 }
//               });
//             }, { rootMargin: '200px 0px' });

//             lazyImages.forEach(img => imgObserver.observe(img));
//           } else {
//             lazyImages.forEach(img => {
//               img.src = img.dataset.src;
//               img.removeAttribute('data-src');
//               img.classList.remove('lazy-img');
//             });
//           }

//           // -------------------------
//           // 3) Ensure carousel active slide image loads
//           // ------------------------
//           // -------------------------
//           // 4) Keyboard UX for dropdowns
//           // -------------------------
//           document.querySelectorAll('.dropdown').forEach(drop => {
//             drop.addEventListener('keydown', (e) => {
//               if (e.key === 'Escape') {
//                 const toggle = drop.querySelector('[data-bs-toggle="dropdown"]');
//                 if (toggle) toggle.focus();
//               }
//             });
//           });

//           // -------------------------
//           // 5) Booking Modal UX
//           // -------------------------
//           const cancelBtn = document.getElementById("cancelBooking");
//           if (cancelBtn) {
//             cancelBtn.addEventListener("click", function () {
//               const bookingModal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
//               bookingModal.hide();
//             });
//           }

//           const bookingForm = document.getElementById("bookingForm");
//           if (bookingForm) {
//             bookingForm.addEventListener("submit", function (e) {
//               e.preventDefault();
//               const bookingModal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
//               bookingModal.hide();

//               const successModal = new bootstrap.Modal(document.getElementById("successModal"));
//               successModal.show();
//               setTimeout(() => successModal.hide(), 3000);
//             });
//           }


// //=======================================================================================================================
//           // 7) Custom Card Carousel (infinite loop + drag/swipe + autoplay + clickable buttons)
//           // const track = document.querySelector('.carousel-track');
//           // if (track) {
//           //   function getGap() {
//           //     const gapStr = getComputedStyle(track).gap || getComputedStyle(track).columnGap || '';
//           //     return parseFloat(gapStr) || 20;
//           //   }

//           //   let originals = Array.from(track.children);
//           //   if (!originals.length) return;

//           //   const card = track.querySelector('.service-card');
//           //   const step = card.getBoundingClientRect().width + getGap();

//           //   // Clone cards for infinite loop
//           //   const repeatCount = 3;
//           //   for (let i = 0; i < repeatCount; i++) {
//           //     originals.forEach(node => {
//           //       track.appendChild(node.cloneNode(true));
//           //     });
//           //   }

//           //   const singleBlockWidth = originals.length * step;
//           //   track.scrollLeft = singleBlockWidth; // start in middle

//           //   // Infinite correction
//           //   track.addEventListener('scroll', () => {
//           //     if (track.scrollLeft <= 0) {
//           //       track.scrollLeft += singleBlockWidth;
//           //     } else if (track.scrollLeft >= singleBlockWidth * 2) {
//           //       track.scrollLeft -= singleBlockWidth;
//           //     }
//           //   });

//           //   // Pointer drag/swipe
//           //   let isDown = false, startX = 0, startScroll = 0, pointerId = null;

//           //   function onPointerDown(e) {
//           //     if (e.target.closest('a, button')) return; // ✅ Ignore buttons/links
//           //     isDown = true;
//           //     pointerId = e.pointerId;
//           //     track.setPointerCapture(pointerId);
//           //     startX = e.clientX;
//           //     startScroll = track.scrollLeft;
//           //     stopAutoScroll();
//           //   }

//           //   function onPointerMove(e) {
//           //     if (!isDown) return;
//           //     const walk = (e.clientX - startX) * 1.5;
//           //     track.scrollLeft = startScroll - walk;
//           //   }

//           //   function onPointerUp() {
//           //     if (!isDown) return;
//           //     isDown = false;
//           //     try { track.releasePointerCapture(pointerId); } catch {}
//           //     pointerId = null;
//           //     startAutoScroll();
//           //   }

//           //   track.addEventListener('pointerdown', onPointerDown, { passive: true });
//           //   track.addEventListener('pointermove', onPointerMove, { passive: true });
//           //   track.addEventListener('pointerup', onPointerUp);
//           //   track.addEventListener('pointercancel', onPointerUp);
//           //   track.addEventListener('pointerleave', onPointerUp);

//           //   // Ensure buttons are clickable
//           //   document.querySelectorAll('.service-card .view-btn').forEach(btn => {
//           //     btn.addEventListener('click', e => {
//           //       e.stopPropagation(); // prevent carousel drag interference
//           //     });
//           //   });

//           //   // Autoplay
//           //   let autoScrollInterval = null;
//           //   function startAutoScroll() {
//           //     if (autoScrollInterval) return;
//           //     autoScrollInterval = setInterval(() => {
//           //       track.scrollBy({ left: step, behavior: 'smooth' });
//           //     }, 2000);
//           //   }

//           //   function stopAutoScroll() {
//           //     clearInterval(autoScrollInterval);
//           //     autoScrollInterval = null;
//           //   }
//           //   startAutoScroll();

//           //   // Pause on hover
//           //   track.addEventListener('mouseenter', stopAutoScroll);
//           //   track.addEventListener('mouseleave', startAutoScroll);

//           //   // Keyboard support
//           //   window.addEventListener('keydown', (e) => {
//           //     if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
//           //     if (e.key === 'ArrowRight') {
//           //       stopAutoScroll();
//           //       track.scrollBy({ left: step, behavior: 'smooth' });
//           //       startAutoScroll();
//           //     } else if (e.key === 'ArrowLeft') {
//           //       stopAutoScroll();
//           //       track.scrollBy({ left: -step, behavior: 'smooth' });
//           //       startAutoScroll();
//           //     }
//           //   });
//           // }

//           // // -------------------------
//           // // 8) Service Cards Enhancements
//           // // -------------------------
          
//           // // Lazy loading effect for service card images
//           // // const serviceCardImages = document.querySelectorAll('.service-card .lazy-img');
//           // // if (serviceCardImages.length > 0) {
//           // //   serviceCardImages.forEach(img => {
//           // //     // Simulate loading delay for demo purposes
//           // //     setTimeout(() => {
//           // //       img.classList.add('loaded');
//           // //     }, 500);
//           // //   });
//           // // }
          
//           // // Add hover effect to service cards
//           // const serviceCards = document.querySelectorAll('.service-card');
//           // if (serviceCards.length > 0) {
//           //   serviceCards.forEach(card => {
//           //     card.addEventListener('mouseenter', function() {
//           //       const icon = this.querySelector('.service-icon');
//           //       if (icon) {
//           //         icon.style.transform = 'scale(1.1) rotate(5deg)';
//           //       }
//           //     });
              
//           //     card.addEventListener('mouseleave', function() {
//           //       const icon = this.querySelector('.service-icon');
//           //       if (icon) {
//           //         icon.style.transform = 'scale(1)';
//           //       }
//           //     });
//           //   });
            
//           //   // Add animation on scroll for service cards
//           //   const observerOptions = {
//           //     root: null,
//           //     rootMargin: '0px',
//           //     threshold: 0.1
//           //   };
            
//           //   const observer = new IntersectionObserver((entries) => {
//           //     entries.forEach(entry => {
//           //       if (entry.isIntersecting) {
//           //         entry.target.style.opacity = 1;
//           //         entry.target.style.transform = 'translateY(0)';
//           //       }
//           //     });
//           //   }, observerOptions);
            
//           //   // Apply animation to service cards
//           //   serviceCards.forEach(card => {
//           //     card.style.opacity = 0;
//           //     card.style.transform = 'translateY(20px)';
//           //     card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//           //     observer.observe(card);
//           //   });
//           // }
// //===============================================newwwwwwwwwwwwwwww===================================================
//           const track = document.querySelector('.carousel-track');
//             if (!track) return;

//             function getGap() {
//                 const gapStr = getComputedStyle(track).gap || getComputedStyle(track).columnGap || '';
//                 return parseFloat(gapStr) || 20;
//             }

//             // Get all original cards
//             const originals = Array.from(track.children);
//             if (!originals.length) return;

//             const card = track.querySelector('.service-card');
//             const step = card.getBoundingClientRect().width + getGap();

//             // Clone cards for infinite loop - we need enough clones to create a seamless loop
//             const repeatCount = 3; // We'll create 3 sets of clones for smooth looping
//             for (let i = 0; i < repeatCount; i++) {
//                 originals.forEach(node => {
//                     track.appendChild(node.cloneNode(true));
//                 });
//             }

//             const totalCards = originals.length;
//             const singleBlockWidth = totalCards * step;
            
//             // Start in the middle of the cloned section
//             track.scrollLeft = singleBlockWidth;

//             // Infinite scroll correction
//             track.addEventListener('scroll', () => {
//                 // If we're at the beginning, jump to the middle
//                 if (track.scrollLeft <= 0) {
//                     track.scrollLeft += singleBlockWidth;
//                 } 
//                 // If we're at the end, jump back to the middle
//                 else if (track.scrollLeft >= singleBlockWidth * 2) {
//                     track.scrollLeft -= singleBlockWidth;
//                 }
//             });

//             // Pointer drag/swipe functionality
//             let isDown = false, startX = 0, startScroll = 0, pointerId = null;

//             function onPointerDown(e) {
//                 if (e.target.closest('a, button')) return; // Ignore buttons/links
//                 isDown = true;
//                 pointerId = e.pointerId;
//                 track.setPointerCapture(pointerId);
//                 startX = e.clientX;
//                 startScroll = track.scrollLeft;
//                 stopAutoScroll();
//             }

//             function onPointerMove(e) {
//                 if (!isDown) return;
//                 const walk = (e.clientX - startX) * 1.5;
//                 track.scrollLeft = startScroll - walk;
//             }

//             function onPointerUp() {
//                 if (!isDown) return;
//                 isDown = false;
//                 try { track.releasePointerCapture(pointerId); } catch {}
//                 pointerId = null;
//                 startAutoScroll();
//             }

//             track.addEventListener('pointerdown', onPointerDown, { passive: true });
//             track.addEventListener('pointermove', onPointerMove, { passive: true });
//             track.addEventListener('pointerup', onPointerUp);
//             track.addEventListener('pointercancel', onPointerUp);
//             track.addEventListener('pointerleave', onPointerUp);

//             // Ensure buttons are clickable
//             document.querySelectorAll('.service-card .view-btn').forEach(btn => {
//                 btn.addEventListener('click', e => {
//                     e.stopPropagation(); // prevent carousel drag interference
//                 });
//             });

//             // Autoplay functionality
//             let autoScrollInterval = null;
//             function startAutoScroll() {
//                 if (autoScrollInterval) return;
//                 autoScrollInterval = setInterval(() => {
//                     track.scrollBy({ left: step, behavior: 'smooth' });
//                 }, 3000);
//             }

//             function stopAutoScroll() {
//                 clearInterval(autoScrollInterval);
//                 autoScrollInterval = null;
//             }
//             startAutoScroll();

//             // Pause on hover
//             track.addEventListener('mouseenter', stopAutoScroll);
//             track.addEventListener('mouseleave', startAutoScroll);

//             // Keyboard support
//             window.addEventListener('keydown', (e) => {
//                 if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
//                 if (e.key === 'ArrowRight') {
//                     stopAutoScroll();
//                     track.scrollBy({ left: step, behavior: 'smooth' });
//                     startAutoScroll();
//                 } else if (e.key === 'ArrowLeft') {
//                     stopAutoScroll();
//                     track.scrollBy({ left: -step, behavior: 'smooth' });
//                     startAutoScroll();
//                 }
//             });

//             // Add animation on scroll for service cards
//             const serviceCards = document.querySelectorAll('.service-card');
//             if (serviceCards.length > 0) {
//                 const observerOptions = {
//                     root: null,
//                     rootMargin: '0px',
//                     threshold: 0.1
//                 };
                
//                 const observer = new IntersectionObserver((entries) => {
//                     entries.forEach(entry => {
//                         if (entry.isIntersecting) {
//                             entry.target.style.opacity = 1;
//                             entry.target.style.transform = 'translateY(0)';
//                         }
//                     });
//                 }, observerOptions);
                
//                 // Apply animation to service cards
//                 serviceCards.forEach(card => {
//                     card.style.opacity = 0;
//                     card.style.transform = 'translateY(20px)';
//                     card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//                     observer.observe(card);
//                 });
//             }
//           // -------------------------
//           // 9) Initialize AOS Animation
//           // -------------------------
//           if (typeof AOS !== "undefined") {
//             AOS.init({
//               duration: 1300,
//               once: true
//             });
//           }

//             initAnimations();
                    
//                     // Set up intersection observer for scroll animations
//                     if ('IntersectionObserver' in window) {
//                         const animatedElements = document.querySelectorAll('.feature-card, .img-container');
                        
//                         const observer = new IntersectionObserver((entries) => {
//                             entries.forEach(entry => {
//                                 if (entry.isIntersecting) {
//                                     // Add animation class when element is in viewport
//                                     if (entry.target.classList.contains('fade-in-up') || 
//                                         entry.target.classList.contains('fade-in-right')) {
//                                         entry.target.style.animationPlayState = 'running';
//                                     }
//                                     observer.unobserve(entry.target);
//                                 }
//                             });
//                         }, { threshold: 0.1 });
                        
//                         animatedElements.forEach(el => {
//                             observer.observe(el);
//                         });
//                     }


//                     // contact session

//                     const form = document.querySelector('.contact-form form');
//             const inputs = form.querySelectorAll('input, textarea');
            
//             // Add focus effect to form inputs
//             inputs.forEach(input => {
//                 input.addEventListener('focus', function() {
//                     this.parentElement.classList.add('focused');
//                 });
                
//                 input.addEventListener('blur', function() {
//                     if (this.value === '') {
//                         this.parentElement.classList.remove('focused');
//                     }
//                 });
//             });
            
//             // Form submission handling
//             form.addEventListener('submit', function(e) {
//                 e.preventDefault();
                
//                 // Simple validation
//                 let isValid = true;
//                 inputs.forEach(input => {
//                     if (!input.value.trim()) {
//                         isValid = false;
//                         input.style.borderColor = 'red';
//                     } else {
//                         input.style.borderColor = '';
//                     }
//                 });
                
//                 if (isValid) {
//                     // In a real implementation, you would send the form data to a server here
//                     alert('Thank you for your message! We will contact you soon.');
//                     form.reset();
//                 } else {
//                     alert('Please fill in all required fields.');
//                 }
//             });

// // ========================================================navbar new js=============================================================================
//             const navLinks = document.querySelectorAll('.nav-link');
            
//             // Set active class based on current page
//             const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
//             navLinks.forEach(link => {
//                 const linkPage = link.getAttribute('href');
                
//                 // Remove active class from all links
//                 link.classList.remove('active');
                
//                 // Add active class to current page link
//                 if (linkPage === currentPage || 
//                    (currentPage === 'index.html' && linkPage === 'index.html') ||
//                    (currentPage !== 'index.html' && linkPage.includes(currentPage))) {
//                     link.classList.add('active');
//                 }
                
//                 // Smooth scroll for anchor links
//                 if (link.getAttribute('href').startsWith('#')) {
//                     link.addEventListener('click', function(e) {
//                         e.preventDefault();
//                         const targetId = this.getAttribute('href');
//                         const targetElement = document.querySelector(targetId);
                        
//                         if (targetElement) {
//                             window.scrollTo({
//                                 top: targetElement.offsetTop - 80,
//                                 behavior: 'smooth'
//                             });
//                         }
//                     });
//                 }
//             });
            
//             // Close mobile menu when clicking on a link
//             const navbarCollapse = document.getElementById('navbarNav');
//             const navItems = document.querySelectorAll('.nav-item');
            
//             navItems.forEach(item => {
//                 item.addEventListener('click', function() {
//                     if (window.innerWidth < 992) {
//                         const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
//                             toggle: false
//                         });
//                         bsCollapse.hide();
//                     }
//                 });
//             });
            

//             // hero section new scripts -----------------------------------------------------------

//              // Add scroll-triggered animation for elements if needed
//             const observerOptions = {
//                 root: null,
//                 rootMargin: '0px',
//                 threshold: 0.1
//             };

//             const observer = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('animated');
//                     }
//                 });
//             }, observerOptions);

//             // Observe elements that should animate on scroll
//             const elementsToAnimate = document.querySelectorAll('.hero-title, .hero-subtitle, .highlight-box, .cta-buttons');
//             elementsToAnimate.forEach(el => observer.observe(el));


// //  ----------------------------------------------  FAQ section scripts  -----------------------------------------------------------
//             const faqItems = document.querySelectorAll('.faq-item');
            
//             faqItems.forEach(item => {
//                 const question = item.querySelector('.faq-question');
                
//                 question.addEventListener('click', () => {
//                     // Close all other FAQ items
//                     faqItems.forEach(otherItem => {
//                         if (otherItem !== item) {
//                             otherItem.classList.remove('active');
//                         }
//                     });
                    
//                     // Toggle current item
//                     item.classList.toggle('active');
//                 });
//             });

//             // free inspection script form with current location 

//             const toggleAlternativeNumber = document.getElementById('toggleAlternativeNumber');
//             const alternativeNumberContainer = document.getElementById('alternativeNumberContainer');
            
//             toggleAlternativeNumber.addEventListener('click', function() {
//                 if (alternativeNumberContainer.style.display === 'none') {
//                     alternativeNumberContainer.style.display = 'block';
//                     this.innerHTML = '<i class="bi bi-dash-circle"></i> Remove Alternative Number';
//                 } else {
//                     alternativeNumberContainer.style.display = 'none';
//                     this.innerHTML = '<i class="bi bi-plus-circle"></i> Add Alternative Number';
//                 }
//             });
            
//             // Use current location checkbox
//             const useCurrentLocation = document.getElementById('useCurrentLocation');
//             const addressTextarea = document.getElementById('address');
            
//             useCurrentLocation.addEventListener('change', function() {
//                 if (this.checked) {
//                     if (navigator.geolocation) {
//                         navigator.geolocation.getCurrentPosition(function(position) {
//                             const latitude = position.coords.latitude;
//                             const longitude = position.coords.longitude;
//                             addressTextarea.value = `Current Location: ${latitude}, ${longitude}`;
//                         }, function(error) {
//                             console.error("Error getting location: ", error);
//                             addressTextarea.value = "Unable to retrieve current location";
//                         });
//                     } else {
//                         addressTextarea.value = "Geolocation is not supported by this browser";
//                     }
//                 } else {
//                     addressTextarea.value = "";
//                 }
//             });
            
//             // Form submission
//             document.getElementById('freeInspectionForm').addEventListener('submit', function(e) {
//                 e.preventDefault();
                
//                 // Validate service selection
//                 const pestControl = document.getElementById('pestControl').checked;
//                 const buildingCleaning = document.getElementById('buildingCleaning').checked;
                
//                 if (!pestControl && !buildingCleaning) {
//                     alert('Please select at least one service');
//                     return;
//                 }
                
//                 // If we get here, form is valid
//                 alert('Thank you! Your free inspection request has been submitted.');
//                 // In a real application, you would submit the form data to a server here
                
//                 // Close the modal
//                 const modal = bootstrap.Modal.getInstance(document.getElementById('freeInspectionModal'));
//                 modal.hide();
//             });
            
//             // Cancel button
//             document.getElementById('cancelInspection').addEventListener('click', function() {
//                 const modal = bootstrap.Modal.getInstance(document.getElementById('freeInspectionModal'));
//                 modal.hide();
//             });

// // =========================================== service booking with pricing plan integrated =========================================            
             // Plan selection functionality
//         const planCards = document.querySelectorAll('.service-plan-card');
//         let selectedPlan = null;
        
//         // planCards.forEach(card => {
//         //     card.addEventListener('click', function() {
//         //         // Remove selected class from all cards
//         //         planCards.forEach(c => {
//         //             c.classList.remove('selected');
//         //             c.classList.add('muted');
//         //         });
                
//         //         // Add selected class to clicked card
//         //         this.classList.add('selected');
//         //         this.classList.remove('muted');
                
//         //         // Store selected plan
//         //         selectedPlan = this.getAttribute('data-plan');
//         //     });
//         // });

//         planCards.forEach(card => {
//     card.addEventListener('click', function() {
//         const isCurrentlySelected = this.classList.contains('selected');
        
//         // Remove selected class from all cards and remove muted class
//         planCards.forEach(c => {
//             c.classList.remove('selected');
//             c.classList.remove('muted');
//         });
        
//         // If the clicked card wasn't already selected, select it
//         if (!isCurrentlySelected) {
//             this.classList.add('selected');
//             // Add muted class to other cards
//             planCards.forEach(c => {
//                 if (c !== this) {
//                     c.classList.add('muted');
//                 }
//             });
//             // Store selected plan
//             selectedPlan = this.getAttribute('data-plan');
//         } else {
//             // If it was already selected and clicked again, deselect it
//             selectedPlan = null;
//         }
//     });
// });

//         // Alternative number toggle for service modal
//         const toggleAlternativeNumberService = document.getElementById('toggleAlternativeNumberService');
//         const alternativeNumberContainerService = document.getElementById('alternativeNumberContainerService');
        
//         toggleAlternativeNumberService.addEventListener('click', function() {
//             if (alternativeNumberContainerService.style.display === 'none') {
//                 alternativeNumberContainerService.style.display = 'block';
//                 this.innerHTML = '<i class="bi bi-dash-circle"></i> Remove Alternative Number';
//             } else {
//                 alternativeNumberContainerService.style.display = 'none';
//                 this.innerHTML = '<i class="bi bi-plus-circle"></i> Add Alternative Number';
//             }
//         });
        
//         // Use current location checkbox for service modal
//         const useCurrentLocationService = document.getElementById('useCurrentLocationService');
//         const addressTextareaService = document.getElementById('address');
        
//         useCurrentLocationService.addEventListener('change', function() {
//             if (this.checked) {
//                 if (navigator.geolocation) {
//                     navigator.geolocation.getCurrentPosition(function(position) {
//                         const latitude = position.coords.latitude;
//                         const longitude = position.coords.longitude;
//                         addressTextareaService.value = `Current Location: ${latitude}, ${longitude}`;
//                     }, function(error) {
//                         console.error("Error getting location: ", error);
//                         addressTextareaService.value = "Unable to retrieve current location";
//                     });
//                 } else {
//                     addressTextareaService.value = "Geolocation is not supported by this browser";
//                 }
//             } else {
//                 addressTextareaService.value = "";
//             }
//         });
        
//         // Form submission for service booking
//         document.getElementById('serviceBookingForm').addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             // Validate service selection
//             const pestControl = document.getElementById('pestControlService').checked;
//             const buildingCleaning = document.getElementById('buildingCleaningService').checked;
            
//             if (!pestControl && !buildingCleaning) {
//                 alert('Please select at least one service');
//                 return;
//             }
            
//             // Validate plan selection
//             // if (!selectedPlan) {
//             //     alert('Please select a plan');
//             //     return;
//             // }
            
//             // If we get here, form is valid
//             alert(`Thank you! Your ${selectedPlan || ""} plan booking has been submitted.`);
//             // In a real application, you would submit the form data to a server here
            
//             // Close the modal
//             const modal = bootstrap.Modal.getInstance(document.getElementById('serviceBookingModal'));
//             modal.hide();
            
//             // Reset form
//             this.reset();
//             planCards.forEach(card => {
//                 card.classList.remove('selected', 'muted');
//             });
//             selectedPlan = null;
//         });
        
//         // Cancel button for service modal
//         document.getElementById('cancelServiceBooking').addEventListener('click', function() {
//             const modal = bootstrap.Modal.getInstance(document.getElementById('serviceBookingModal'));
//             modal.hide();
            
//             // Reset form
//             document.getElementById('serviceBookingForm').reset();
//             planCards.forEach(card => {
//                 card.classList.remove('selected', 'muted');
//             });
//             selectedPlan = null;
//         });

// //         // Pricing card integration
//         document.querySelectorAll('.pricing-card-custom button, .combo-card-custom button').forEach(button => {
//             button.addEventListener('click', function() {
//                 const plan = this.getAttribute('data-plan');
                
//                 // Show the service booking modal
//                 const modal = new bootstrap.Modal(document.getElementById('serviceBookingModal'));
//                 modal.show();
                
//                 // Select the corresponding plan in the modal
//                 setTimeout(() => {
//                     const planCard = document.querySelector(`.service-plan-card[data-plan="${plan}"]`);
//                     if (planCard) {
//                         planCards.forEach(c => {
//                             c.classList.remove('selected');
//                             c.classList.add('muted');
//                         });
                        
//                         planCard.classList.add('selected');
//                         planCard.classList.remove('muted');
//                         selectedPlan = plan;
//                     }
//                 }, 500);
//             });
//         });
        // });

//         function initAnimations() {
//                     // Pause animations initially for scroll-triggering
//                     const animatedElements = document.querySelectorAll('.feature-card, .img-container');
//                     animatedElements.forEach(el => {
//                         el.style.animationPlayState = 'paused';
//                     });
//                 }

//                 document.querySelectorAll('.highlight-box').forEach(box => {
//             box.addEventListener('mousemove', function(e) {
//                 const rect = this.getBoundingClientRect();
//                 const x = e.clientX - rect.left;
//                 const y = e.clientY - rect.top;
                
//                 this.style.setProperty('--mouse-x', `${x}px`);
//                 this.style.setProperty('--mouse-y', `${y}px`);
//             });
//         });

//          // Scroll detection for navbar transparency and button visibility--------------------------------------------
//         window.addEventListener('scroll', function() {
//             const navbar = document.querySelector('.navbar');
//             const scrollButtons = document.querySelector('.scroll-buttons');
//             const scrollPosition = window.scrollY;
//             const viewportHeight = window.innerHeight;
//             const triggerPoint = viewportHeight * 0.8; // 80vh
            
//             // Toggle navbar transparency
//             if (scrollPosition > triggerPoint) {
//                 navbar.classList.add('scrolled');
//             } else {
//                 navbar.classList.remove('scrolled');
//             }
            
//             // Toggle scroll buttons visibility
//             if (scrollPosition > triggerPoint) {
//                 scrollButtons.classList.add('visible');
//             } else {
//                 scrollButtons.classList.remove('visible');
//             }
//         });
        
//         // Back to top functionality
//         document.querySelector('.back-to-top').addEventListener('click', function(e) {
//             e.preventDefault();
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth'
//             });
//         });
        
document.addEventListener('DOMContentLoaded', function () {

    // ==========================
    // 1) Navbar & Menu Handling
    // ==========================
    const initNavbar = () => {
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', e => {
                if (window.innerWidth < 768) e.stopPropagation();
            });
        });

        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                const navbar = document.querySelector('.navbar-collapse');
                if (navbar) {
                    new bootstrap.Collapse(navbar, { toggle: false }).hide();
                }
            });
        });

        // Close mobile menu on nav item click
        const navbarCollapse = document.getElementById('navbarNav');
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
                }
            });
        });

        // Set active link & smooth scroll
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }

            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    };

    // ==========================
    // 2) Lazy Loading Images
    // ==========================
    const initLazyImages = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window && lazyImages.length) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy-img');
                        obs.unobserve(img);
                    }
                });
            }, { rootMargin: '200px 0px' });

            lazyImages.forEach(img => observer.observe(img));
        } else {
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.remove('lazy-img');
            });
        }
    };

    // ==========================
    // 3) Carousel / Service Cards
    // ==========================
    // const initServiceCarousel = () => {
    //     const track = document.querySelector('.carousel-track');
    //     if (!track) return;

    //     const getGap = () => parseFloat(getComputedStyle(track).gap || 20);
    //     const originals = Array.from(track.children);
    //     if (!originals.length) return;

    //     const card = track.querySelector('.service-card');
    //     const step = card.getBoundingClientRect().width + getGap();
    //     const repeatCount = 3;

    //     // Clone cards for seamless infinite loop
    //     for (let i = 0; i < repeatCount; i++) {
    //         originals.forEach(node => track.appendChild(node.cloneNode(true)));
    //     }

    //     const singleBlockWidth = originals.length * step;
    //     track.scrollLeft = singleBlockWidth;

    //     // Infinite scroll adjustment
    //     track.addEventListener('scroll', () => {
    //         if (track.scrollLeft <= 0) track.scrollLeft += singleBlockWidth;
    //         else if (track.scrollLeft >= singleBlockWidth * 2) track.scrollLeft -= singleBlockWidth;
    //     });

    //     // Pointer drag/swipe
    //     let isDown = false, startX = 0, startScroll = 0, pointerId = null;

    //     const onPointerDown = e => {
    //         if (e.target.closest('a, button')) return;
    //         isDown = true;
    //         pointerId = e.pointerId;
    //         track.setPointerCapture(pointerId);
    //         startX = e.clientX;
    //         startScroll = track.scrollLeft;
    //         stopAutoScroll();
    //     };

    //     const onPointerMove = e => {
    //         if (!isDown) return;
    //         const walk = (e.clientX - startX) * 1.5;
    //         track.scrollLeft = startScroll - walk;
    //     };

    //     const onPointerUp = () => {
    //         if (!isDown) return;
    //         isDown = false;
    //         try { track.releasePointerCapture(pointerId); } catch {}
    //         pointerId = null;
    //         startAutoScroll();
    //     };

    //     track.addEventListener('pointerdown', onPointerDown, { passive: true });
    //     track.addEventListener('pointermove', onPointerMove, { passive: true });
    //     track.addEventListener('pointerup', onPointerUp);
    //     track.addEventListener('pointercancel', onPointerUp);
    //     track.addEventListener('pointerleave', onPointerUp);

    //     // Prevent buttons from triggering drag
    //     document.querySelectorAll('.service-card .view-btn').forEach(btn => {
    //         btn.addEventListener('click', e => e.stopPropagation());
    //     });

    //     // Autoplay
    //     let autoScrollInterval;
    //     const startAutoScroll = () => {
    //         if (autoScrollInterval) return;
    //         autoScrollInterval = setInterval(() => track.scrollBy({ left: step, behavior: 'smooth' }), 3000);
    //     };
    //     const stopAutoScroll = () => {
    //         clearInterval(autoScrollInterval);
    //         autoScrollInterval = null;
    //     };
    //     startAutoScroll();
    //     track.addEventListener('mouseenter', stopAutoScroll);
    //     track.addEventListener('mouseleave', startAutoScroll);

    //     // Keyboard support
    //     window.addEventListener('keydown', e => {
    //         if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
    //         if (e.key === 'ArrowRight') { stopAutoScroll(); track.scrollBy({ left: step, behavior: 'smooth' }); startAutoScroll(); }
    //         else if (e.key === 'ArrowLeft') { stopAutoScroll(); track.scrollBy({ left: -step, behavior: 'smooth' }); startAutoScroll(); }
    //     });

    //     // Scroll animation for cards
    //     const serviceCards = document.querySelectorAll('.service-card');
    //     if (serviceCards.length > 0) {
    //         const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    //         const observer = new IntersectionObserver(entries => {
    //             entries.forEach(entry => {
    //                 if (entry.isIntersecting) {
    //                     entry.target.style.opacity = 1;
    //                     entry.target.style.transform = 'translateY(0)';
    //                 }
    //             });
    //         }, observerOptions);

    //         serviceCards.forEach(card => {
    //             card.style.opacity = 0;
    //             card.style.transform = 'translateY(20px)';
    //             card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    //             observer.observe(card);
    //         });
    //     }
    // };
    const initServiceCarousel = () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const getGap = () => parseFloat(getComputedStyle(track).gap || 20);
    const cards = Array.from(track.children);
    if (!cards.length) return;

    const card = track.querySelector('.service-card');
    const step = card.getBoundingClientRect().width + getGap();
    const totalWidth = step * cards.length - getGap(); // Total scrollable width

    // Pointer drag/swipe
    let isDown = false, startX = 0, startScroll = 0, pointerId = null;

    const onPointerDown = e => {
        if (e.target.closest('a, button')) return;
        isDown = true;
        pointerId = e.pointerId;
        track.setPointerCapture(pointerId);
        startX = e.clientX;
        startScroll = track.scrollLeft;
        stopAutoScroll();
    };

    const onPointerMove = e => {
        if (!isDown) return;
        const walk = (e.clientX - startX) * 1.5;
        let newScroll = startScroll - walk;
        // Stop at ends
        if (newScroll < 0) newScroll = 0;
        if (newScroll > totalWidth - track.clientWidth) newScroll = totalWidth - track.clientWidth;
        track.scrollLeft = newScroll;
    };

    const onPointerUp = () => {
        if (!isDown) return;
        isDown = false;
        try { track.releasePointerCapture(pointerId); } catch {}
        pointerId = null;
        startAutoScroll();
    };

    track.addEventListener('pointerdown', onPointerDown, { passive: true });
    track.addEventListener('pointermove', onPointerMove, { passive: true });
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', onPointerUp);
    track.addEventListener('pointerleave', onPointerUp);

    // Prevent buttons from triggering drag
    document.querySelectorAll('.service-card .view-btn').forEach(btn => {
        btn.addEventListener('click', e => e.stopPropagation());
    });

    // Autoplay
    let autoScrollInterval;
    const startAutoScroll = () => {
        if (autoScrollInterval) return;
        autoScrollInterval = setInterval(() => {
            let nextScroll = track.scrollLeft + step;
            if (nextScroll >= totalWidth - track.clientWidth) {
                // Smooth rewind to start
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: step, behavior: 'smooth' });
            }
        }, 3000);
    };
    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    };
    startAutoScroll();
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    // Keyboard support
    window.addEventListener('keydown', e => {
        if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
        if (e.key === 'ArrowRight') {
            stopAutoScroll();
            let nextScroll = track.scrollLeft + step;
            if (nextScroll >= totalWidth - track.clientWidth) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: step, behavior: 'smooth' });
            }
            startAutoScroll();
        }
        else if (e.key === 'ArrowLeft') {
            stopAutoScroll();
            let nextScroll = track.scrollLeft - step;
            if (nextScroll < 0) nextScroll = 0;
            track.scrollTo({ left: nextScroll, behavior: 'smooth' });
            startAutoScroll();
        }
    });

    // Intersection animation
    cards.forEach(c => {
        c.style.opacity = 0;
        c.style.transform = 'translateY(20px)';
        c.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    cards.forEach(card => observer.observe(card));
};

    // ==========================
    // 4) Forms: Free Inspection & Service Booking
    // ==========================
    // const initForms = () => {
    //     const handleAlternativeNumberToggle = (toggleId, containerId) => {
    //         const toggleBtn = document.getElementById(toggleId);
    //         const container = document.getElementById(containerId);
    //         toggleBtn?.addEventListener('click', () => {
    //             if (container.style.display === 'none') {
    //                 container.style.display = 'block';
    //                 toggleBtn.innerHTML = '<i class="bi bi-dash-circle"></i> Remove Alternative Number';
    //             } else {
    //                 container.style.display = 'none';
    //                 toggleBtn.innerHTML = '<i class="bi bi-plus-circle"></i> Add Alternative Number';
    //             }
    //         });
    //     };

    //     handleAlternativeNumberToggle('toggleAlternativeNumber', 'alternativeNumberContainer');
    //     handleAlternativeNumberToggle('toggleAlternativeNumberService', 'alternativeNumberContainerService');

    //     const handleCurrentLocation = (checkboxId, textareaId) => {
    //         const checkbox = document.getElementById(checkboxId);
    //         const textarea = document.getElementById(textareaId);
    //         checkbox?.addEventListener('change', function() {
    //             if (this.checked) {
    //                 if (navigator.geolocation) {
    //                     navigator.geolocation.getCurrentPosition(pos => {
    //                         textarea.value = `Current Location: ${pos.coords.latitude}, ${pos.coords.longitude}`;
    //                     }, () => {
    //                         textarea.value = "Unable to retrieve current location";
    //                     });
    //                 } else {
    //                     textarea.value = "Geolocation not supported";
    //                 }
    //             } else textarea.value = "";
    //         });
    //     };

    //     handleCurrentLocation('useCurrentLocation', 'address');
    //     handleCurrentLocation('useCurrentLocationService', 'address');

    //     // Form submission templates
    //     const submitForm = (formId, modalId, alertMsg, resetFields = []) => {
    //         const form = document.getElementById(formId);
    //         form?.addEventListener('submit', e => {
    //             e.preventDefault();
    //             alert(alertMsg);
    //             const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    //             modal?.hide();
    //             form.reset();
    //             resetFields.forEach(field => field());
    //         });
    //     };

    //     submitForm('freeInspectionForm', 'freeInspectionModal', 'Thank you! Your free inspection request has been submitted.');
    //     submitForm('serviceBookingForm', 'serviceBookingModal', 'Thank you! Your booking has been submitted.', [
    //         () => document.querySelectorAll('.service-plan-card').forEach(c => c.classList.remove('selected','muted'))
    //     ]);

    //     // Cancel buttons
    //     ['cancelInspection', 'cancelServiceBooking'].forEach(id => {
    //         document.getElementById(id)?.addEventListener('click', () => {
    //             const modal = bootstrap.Modal.getInstance(document.getElementById(id.replace('cancel','').toLowerCase()+'Modal'));
    //             modal?.hide();
    //         });
    //     });
    // };

    // ================================
// 🌟 ALL-IN-ONE SERVICE FORM SCRIPT
// Handles: Plan selection, toggles, location, and form submission
// Shows success modal instead of alert()
// ================================

    // ------------------------------
    // 🔹 Initialize All Forms & Toggles
    // ------------------------------
    const initForms = () => {

        // =============================
        // 1️⃣ Alternative Number Toggle
        // =============================
        const handleAlternativeNumberToggle = (toggleId, containerId) => {
            const toggleBtn = document.getElementById(toggleId);
            const container = document.getElementById(containerId);

            toggleBtn?.addEventListener("click", () => {
                const isHidden = container.style.display === "none" || !container.style.display;
                container.style.display = isHidden ? "block" : "none";
                toggleBtn.innerHTML = isHidden
                    ? '<i class="bi bi-dash-circle"></i> Remove Alternative Number'
                    : '<i class="bi bi-plus-circle"></i> Add Alternative Number';
            });
        };

        // Initialize both inspection and service modals
        handleAlternativeNumberToggle("toggleAlternativeNumber", "alternativeNumberContainer");
        handleAlternativeNumberToggle("toggleAlternativeNumberService", "alternativeNumberContainerService");

        // =============================
        // 2️⃣ Current Location Autofill
        // =============================
        const handleCurrentLocation = (checkboxId, textareaId) => {
            const checkbox = document.getElementById(checkboxId);
            const textarea = document.getElementById(textareaId);

            checkbox?.addEventListener("change", function () {
                if (this.checked) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            pos => {
                                textarea.value = `Current Location: ${pos.coords.latitude}, ${pos.coords.longitude}`;
                            },
                            () => {
                                textarea.value = "Unable to retrieve current location";
                            }
                        );
                    } else {
                        textarea.value = "Geolocation not supported by this browser";
                    }
                } else {
                    textarea.value = "";
                }
            });
        };

        // Initialize location checkbox for both modals
        handleCurrentLocation("useCurrentLocation", "address");
        handleCurrentLocation("useCurrentLocationService", "address");

        // =============================
        // 3️⃣ Generic Form Submission Handler
        // =============================
        const submitForm = (formId, modalId, resetExtras = []) => {
            const form = document.getElementById(formId);
            form?.addEventListener("submit", e => {
                e.preventDefault();

                // Hide the current form modal
                const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
                modal?.hide();

                // Show the success modal instead of alert
                const successModal = new bootstrap.Modal(document.getElementById("successModal"));
                successModal.show();

                // Reset the form
                form.reset();

                // Run extra cleanup (like unselecting cards)
                resetExtras.forEach(fn => fn());
            });
        };

        // Free Inspection form
        submitForm("freeInspectionForm", "freeInspectionModal");

        // Service Booking form (custom reset for plan cards)
        submitForm("serviceBookingForm", "serviceBookingModal", [
            () => planCards.forEach(c => c.classList.remove("selected", "muted"))
        ]);

        // =============================
        // 4️⃣ Cancel Buttons
        // =============================
       (() => {
  const cancelToModal = {
    cancelInspection: 'freeInspectionModal',
    cancelServiceBooking: 'serviceBookingModal'
  };

  Object.keys(cancelToModal).forEach(cancelId => {
    const btn = document.getElementById(cancelId);
    if (!btn) return;

    btn.addEventListener('click', () => {
      const modalEl = document.getElementById(cancelToModal[cancelId]);
      if (!modalEl) return;
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.hide();

      if (cancelId === 'cancelServiceBooking') {
        document.getElementById('serviceBookingForm')?.reset();
        document.querySelectorAll('.service-plan-card')?.forEach(c => c.classList.remove('selected','muted'));
        selectedPlan = null;
      }

      if (cancelId === 'cancelInspection') {
        document.getElementById('freeInspectionForm')?.reset();
      }
    });
  });
})();

    };

    // ------------------------------
    // 🔹 Service Plan Card Selection
    // ------------------------------
    const planCards = document.querySelectorAll(".service-plan-card");
    let selectedPlan = null;

    planCards.forEach(card => {
        card.addEventListener("click", function () {
            const isCurrentlySelected = this.classList.contains("selected");

            // Clear previous selection
            planCards.forEach(c => c.classList.remove("selected", "muted"));

            // Select or deselect clicked card
            if (!isCurrentlySelected) {
                this.classList.add("selected");
                planCards.forEach(c => c !== this && c.classList.add("muted"));
                selectedPlan = this.getAttribute("data-plan");
            } else {
                selectedPlan = null;
            }
        });
    });

    // ------------------------------
    // 🔹 Service Booking Form Logic (Validation)
    // ------------------------------
    const serviceBookingForm = document.getElementById("serviceBookingForm");
    serviceBookingForm?.addEventListener("submit", e => {
        e.preventDefault();

        const pestControl = document.getElementById("pestControlService")?.checked;
        const buildingCleaning = document.getElementById("buildingCleaningService")?.checked;

        if (!pestControl && !buildingCleaning) {
            alert("Please select at least one service");
            return;
        }

        // Hide booking modal and show success
        const modal = bootstrap.Modal.getInstance(document.getElementById("serviceBookingModal"));
        modal?.hide();

        const successModal = new bootstrap.Modal(document.getElementById("successModal"));
        successModal.show();

        // Reset form and UI
        serviceBookingForm.reset();
        planCards.forEach(c => c.classList.remove("selected", "muted"));
        selectedPlan = null;
    });

    // ------------------------------
    // 🔹 Cancel Button (Service Modal)
    // ------------------------------
    // const cancelServiceBooking = document.getElementById("cancelServiceBooking");
    // cancelServiceBooking?.addEventListener("click", () => {
    //     const modal = bootstrap.Modal.getInstance(document.getElementById("serviceBookingModal"));
    //     modal?.hide();
    //     serviceBookingForm.reset();
    //     planCards.forEach(c => c.classList.remove("selected", "muted"));
    //     selectedPlan = null;
    // });

    // ------------------------------
    // 🔹 Pricing Card → Modal Integration
    // ------------------------------
    document.querySelectorAll(".pricing-card-custom button, .combo-card-custom button").forEach(button => {
        button.addEventListener("click", function () {
            const plan = this.getAttribute("data-plan");

            // Show the service booking modal
            const modal = new bootstrap.Modal(document.getElementById("serviceBookingModal"));
            modal.show();

            // Auto-select corresponding plan after modal loads
            setTimeout(() => {
                const planCard = document.querySelector(`.service-plan-card[data-plan="${plan}"]`);
                if (planCard) {
                    planCards.forEach(c => c.classList.remove("selected", "muted"));
                    planCard.classList.add("selected");
                    selectedPlan = plan;
                }
            }, 400);
        });
    });




    // ==========================
    // 5) FAQ Accordion
    // ==========================
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question?.addEventListener('click', () => {
                faqItems.forEach(other => { if(other !== item) other.classList.remove('active'); });
                item.classList.toggle('active');
            });
        });
    };

    // ==========================
    // 6) Hero Section Animations
    // ==========================
    const initHeroAnimations = () => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('animated'); });
        }, { root:null, threshold:0.1 });

        document.querySelectorAll('.hero-title, .hero-subtitle, .highlight-box, .cta-buttons').forEach(el => observer.observe(el));

        // Mouse move effect on highlight boxes
        document.querySelectorAll('.highlight-box').forEach(box => {
            box.addEventListener('mousemove', e => {
                const rect = box.getBoundingClientRect();
                box.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                box.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
    };

    // ==========================
    // 7) Scroll Detection & Back-to-Top
    // ==========================
    const initScrollDetection = () => {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const scrollButtons = document.querySelector('.scroll-buttons');
            const triggerPoint = window.innerHeight * 0.8;
            const scrolled = window.scrollY > triggerPoint;

            navbar?.classList.toggle('scrolled', scrolled);
            scrollButtons?.classList.toggle('visible', scrolled);
        });

        document.querySelector('.back-to-top')?.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // ==========================
    // 8) AOS Animations
    // ==========================
    const initAOS = () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 1300, once: true });
        }
    };

    // ==========================
    // 9) Initialize Everything
    // ==========================
    initNavbar();
    initLazyImages();
    initServiceCarousel();
    initForms();
    initFAQ();
    initHeroAnimations();
    initScrollDetection();
    initAOS();

});
