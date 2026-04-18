/* ========================================
   TATVA BY TRADEPROP - PREMIUM JAVASCRIPT
   Interactive Features & Animations
   ======================================== */

// Global Variables
let isLoading = true;
let currentAmenityTab = 'clubhouse';
let currentGalleryFilter = 'all';

// Bootstrapped by js/bootstrap.js after partial includes load.

// Initialize Application
function initializeApp() {
    initLoadingScreen();
    initNavigation();
    initHeroAnimations();
    initCounterAnimations();
    initAmenitiesTabs();
    initAmenityScrollShowcase();
    initGalleryFilters();
    initClubResort();
    initContactForm();
    initContactMethods();
    initPropertyCards();
    initFloatingActions();
    // initScrollEffects(); // Redundant, handled in initNavigation
    initAOS();
    initResponsiveFeatures();
    initTitleSparkle();
    initVisualJourneyCinematics();
    // initStackedCardsAutoRotate(); // Function not defined, commented out to prevent crash.
    initAccessibility();
    initEmailProtection();
}

// Recompute floating layout on resize (debounced), bind only once

// ===== VISUAL JOURNEY - Cinematic Interactions =====
function initVisualJourneyCinematics() {
    const gallery = document.querySelector('.immersive-gallery');
    if (!gallery) return;

    // Spotlight overlay element
    let spotlight = gallery.querySelector('.gallery-spotlight');
    if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.className = 'gallery-spotlight';
        gallery.appendChild(spotlight);
    }

    // Spotlight follow
    const onPointerMove = (e) => {
        const rect = gallery.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        gallery.style.setProperty('--gx', x + 'px');
        gallery.style.setProperty('--gy', y + 'px');
        gallery.classList.add('spotlight-active');
    };
    const onPointerLeave = () => {
        gallery.classList.remove('spotlight-active');
    };
    gallery.addEventListener('pointermove', onPointerMove);
    gallery.addEventListener('pointerleave', onPointerLeave);

    // Parallax tilt on gallery pieces if they exist
    const pieces = gallery.querySelectorAll('.gallery-piece .piece-image, .visual-hub .video-frame');
    pieces.forEach(piece => {
        piece.addEventListener('mousemove', (e) => {
            const r = piece.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            const rx = (py - 0.5) * -6;
            const ry = (px - 0.5) * 6;
            piece.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        piece.addEventListener('mouseleave', () => {
            piece.style.transform = 'none';
        });
    });

    // Filmstrip creation (uses images 1..15)
    let filmstrip = gallery.querySelector('.gallery-filmstrip');
    if (!filmstrip) {
        filmstrip = document.createElement('div');
        filmstrip.className = 'gallery-filmstrip';
        const track = document.createElement('div');
        track.className = 'filmstrip-track';

        // Images were moved into a subfolder; encode the space for URL safety.
        const sources = Array.from({ length: 15 }, (_, i) => `./images/Resort%20Images/${i + 1}.jpg`);
        const loopSources = [...sources, ...sources];
        loopSources.forEach(src => {
            const item = document.createElement('div');
            item.className = 'filmstrip-item';
            const im = document.createElement('img');
            im.src = src;
            im.loading = 'lazy';
            item.appendChild(im);
            track.appendChild(item);
        });

        filmstrip.appendChild(track);
        gallery.querySelector('.container')?.appendChild(filmstrip);
    }
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loading-progress');

    if (!loadingScreen || !progressBar) {
        isLoading = false;
        startPageAnimations();
        return;
    }

    // Animate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            // Hide loading screen after delay
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    isLoading = false;
                    startPageAnimations();
                }, 500);
            }, 500);
        }

        progressBar.style.width = progress + '%';
    }, 100);
}

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.getElementById('premiumNav');
    if (!nav) return;

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const phoneButton = document.querySelector('.nav-phone');
    const bookVisitButton = document.querySelector('.nav-book');
    const sections = document.querySelectorAll('section[id]');

    const getHref = (link) => (link?.getAttribute('href') || '').trim();
    const isAnchorHref = (href) => href.startsWith('#');
    const anchorLinks = navLinks.filter(link => isAnchorHref(getHref(link)));

    const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const normalizePath = (href) => {
        const cleaned = href.split('#')[0].split('?')[0].trim();
        if (!cleaned || cleaned === '.') return 'index.html';
        return cleaned.toLowerCase();
    };

    const updateActivePageLink = () => {
        navLinks.forEach(link => {
            const href = getHref(link);
            if (!href || isAnchorHref(href)) {
                link.classList.remove('active');
                return;
            }
            const targetPath = normalizePath(href);
            if (targetPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const updateNavStyle = () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 253, 240, 0.95)';
            nav.style.backdropFilter = 'blur(25px)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 253, 240, 0.9)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    };

    const updateActiveSection = () => {
        if (anchorLinks.length === 0) {
            updateActivePageLink();
            return;
        }

        const scrollPosition = window.scrollY + 120;

        let currentSectionId = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });

        anchorLinks.forEach(link => {
            const href = getHref(link);
            const targetId = href.substring(1);
            if (targetId === currentSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const closeMobileMenu = () => {
        const toggle = document.querySelector('.mobile-toggle');

        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
        if (toggle && toggle.classList.contains('active')) {
            toggle.classList.remove('active');
        }
    };

    window.addEventListener('scroll', () => {
        updateNavStyle();
        updateActiveSection();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = getHref(link);
            if (isAnchorHref(href)) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // If we're not on index.html, redirect back to home with the hash
                    window.location.href = 'index.html' + href;
                }

                updateActiveNavLink(link);
                closeMobileMenu();
                return;
            }

            // Multi-page navigation: allow normal navigation and just close the menu.
            closeMobileMenu();
        });
    });

    if (phoneButton) {
        phoneButton.addEventListener('click', () => {
            window.open('tel:+919099662234', '_self');
        });
    }

    if (bookVisitButton) {
        bookVisitButton.addEventListener('click', () => {
            openBookingModal();
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            toggleMobileMenu();
        });
    }

    updateNavStyle();
    updateActiveSection();
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function toggleMobileMenu() {
    const nav = document.getElementById('premiumNav');
    const toggle = document.querySelector('.mobile-toggle');

    if (nav) nav.classList.toggle('active');
    if (toggle) toggle.classList.toggle('active');
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const bg = document.querySelector('.bg-image');
        if (bg) {
            bg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Hero CTA buttons
    const heroButtons = document.querySelectorAll('.hero-cta');
    heroButtons.forEach(button => {
        button.addEventListener('click', handleHeroCTA);
    });
}

function handleHeroCTA(e) {
    const button = e.currentTarget;
    const buttonText = button.querySelector('span').textContent.toUpperCase();

    if (buttonText.includes('DOWNLOAD BROCHURE')) {
        openBrochureModal();
    } else if (button.classList.contains('primary')) {
        openBookingModal();
    } else if (buttonText.includes('EXPLORE PROPERTIES')) {
        const propertiesSection = document.getElementById('properties');
        if (propertiesSection) {
            const offsetTop = propertiesSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            window.location.href = 'properties.html';
        }
    } else {
        playVideoExperience();
    }
}

// ===== HERO TITLE SPARKLE EFFECT =====
function initTitleSparkle() {
    const title = document.querySelector('.art-title');
    if (!title) return;
    // Update CSS variables --mx and --my relative to the text for the radial gradient
    title.addEventListener('mousemove', (e) => {
        const rect = title.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        title.style.setProperty('--mx', x + 'px');
        title.style.setProperty('--my', y + 'px');
    });
    // Reset to center when mouse leaves
    title.addEventListener('mouseleave', () => {
        title.style.setProperty('--mx', '50%');
        title.style.setProperty('--my', '50%');
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== AMENITIES TABS =====
function initAmenitiesTabs() {
    const amenityTabs = document.querySelectorAll('.nav-item');
    const amenityContents = document.querySelectorAll('.showcase-content');
    const amenityCards = document.querySelectorAll('.amenity-card');

    if (amenityTabs.length === 0 || amenityContents.length === 0) {
        amenityCards.forEach(card => {
            card.addEventListener('click', () => {
                openGalleryLightbox(card);
            });
        });
        return;
    }

    amenityTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetCategory = tab.getAttribute('data-category');
            switchAmenityTab(targetCategory);
        });
    });

    function switchAmenityTab(targetCategory) {
        // Update active tab
        amenityTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-category') === targetCategory) {
                tab.classList.add('active');
            }
        });

        // Update active content
        amenityContents.forEach(content => {
            content.classList.remove('active');
            if (content.getAttribute('data-category') === targetCategory) {
                content.classList.add('active');
            }
        });

        currentAmenityTab = targetCategory;
    }
}

// ===== AMENITIES SCROLL SHOWCASE (one-at-a-time) =====
function initAmenityScrollShowcase() {
    const container = document.querySelector('.amenities-grid.showcase-scroll');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.amenity-card'));
    if (cards.length === 0) return;

    // Assign random offsets/rotation/size/scale so images don't align perfectly
    cards.forEach((card, idx) => {
        const vw = Math.max(320, window.innerWidth);
        const vh = Math.max(480, window.innerHeight);

        // Offsets
        const amp = Math.max(16, Math.min(36, Math.round(vw / 48))); // responsive amplitude
        const randX = ((Math.random() * 2) - 1) * amp; // +/- amp px
        const randY = ((Math.random() * 2) - 1) * (amp * 0.9); // vertical slightly smaller

        // Rotation and scale
        const randR = ((Math.random() * 2) - 1) * 3.2; // +/- 3.2 degrees
        const randS = 0.94 + Math.random() * 0.12; // 0.94 - 1.06

        // Size variability (px), clamped (slightly smaller)
        const wTarget = Math.min(Math.max(vw * (0.54 + Math.random() * 0.24), 480), 860); // 54%-78% vw, clamp 480-860
        const hTarget = Math.min(Math.max(vh * (0.50 + Math.random() * 0.22), 380), 640); // 50%-72% vh, clamp 380-640

        card.style.setProperty('--randX', `${Math.round(randX)}px`);
        card.style.setProperty('--randY', `${Math.round(randY)}px`);
        card.style.setProperty('--randR', `${randR.toFixed(2)}deg`);
        card.style.setProperty('--randS', randS.toFixed(3));
        card.style.setProperty('--imgW', `${Math.round(wTarget)}px`);
        card.style.setProperty('--imgH', `${Math.round(hTarget)}px`);

        // Ensure later cards overlap earlier as you scroll down
        card.style.zIndex = String(100 + idx);
    });

    let lastActive = -1;

    const activateClosestToCenter = () => {
        const viewportCenter = window.innerHeight / 2;
        let bestIdx = 0;
        let bestDist = Infinity;

        cards.forEach((card, idx) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const dist = Math.abs(cardCenter - viewportCenter);
            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = idx;
            }
        });

        if (bestIdx !== lastActive) {
            cards.forEach((c, i) => c.classList.toggle('is-active', i === bestIdx));
            lastActive = bestIdx;
        }
    };

    // Observe cards entering viewport to trigger updates efficiently
    const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            activateClosestToCenter();
        }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    cards.forEach(card => io.observe(card));

    // Debounced listeners for scroll/resize
    const onScroll = debounce(activateClosestToCenter, 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Initial activation
    activateClosestToCenter();
}

// ===== ENHANCED GALLERY FILTERS =====
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-pill');
    const galleryItems = document.querySelectorAll('.gallery-piece');
    const featuredItem = document.querySelector('.gallery-featured');
    const onlyVideoLayout = document.querySelector('.gallery-showcase.only-video');
    const videoFrame = document.querySelector('.visual-hub .video-frame');

    if (galleryItems.length === 0 && !featuredItem && videoFrame) {
        videoFrame.addEventListener('click', openVideoFullscreen);
        return;
    }

    // If only video layout, hide filters and grid behavior entirely
    if (onlyVideoLayout) {
        const filtersBar = document.querySelector('.gallery-filters');
        if (filtersBar) filtersBar.style.display = 'none';
        // No filtering needed
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterGalleryItems(filter);
            updateActiveFilter(button);
        });
    });

    function filterGalleryItems(filter) {
        // Filter gallery pieces
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filter === 'all' || itemCategory === filter) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.transition = 'all 0.3s ease';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Filter featured item
        if (featuredItem) {
            const featuredCategory = featuredItem.getAttribute('data-category');

            if (filter === 'all' || featuredCategory === filter) {
                featuredItem.style.display = 'block';
                featuredItem.style.opacity = '1';
                featuredItem.style.transform = 'scale(1)';
            } else {
                featuredItem.style.opacity = '0';
                featuredItem.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    featuredItem.style.display = 'none';
                }, 300);
            }
        }

        currentGalleryFilter = filter;
    }

    function updateActiveFilter(activeButton) {
        filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Gallery item click handlers
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            openGalleryLightbox(item);
        });
    });

    // Featured item click handler
    if (featuredItem) {
        featuredItem.addEventListener('click', () => {
            openGalleryLightbox(featuredItem);
        });
    }

    // Featured action buttons
    const featuredActions = document.querySelectorAll('.featured-actions button');
    featuredActions.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (button.classList.contains('play-video')) {
                playVideoExperience();
            } else {
                openGalleryLightbox(featuredItem);
            }
        });
    });
}

// ===== VIDEO FUNCTIONALITY =====
function playVideo() {
    const videoContainer = document.querySelector('.video-container iframe');
    const videoOverlay = document.querySelector('.video-overlay');

    if (videoContainer && videoOverlay) {
        // Hide overlay to reveal video
        videoOverlay.style.opacity = '0';
        videoOverlay.style.pointerEvents = 'none';

        // Add autoplay parameter to video URL
        const currentSrc = videoContainer.src;
        if (!currentSrc.includes('autoplay=1')) {
            const separator = currentSrc.includes('?') ? '&' : '?';
            videoContainer.src = currentSrc + separator + 'autoplay=1';
        }

        // Show overlay again after 3 seconds for controls
        setTimeout(() => {
            videoOverlay.style.opacity = '0.1';
            videoOverlay.style.pointerEvents = 'auto';
        }, 3000);
    }
}

function openVideoFullscreen() {
    const videoContainer = document.querySelector('.visual-hub .video-frame iframe') || document.querySelector('.video-container iframe');
    if (videoContainer) {
        // Request fullscreen for the video container
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) {
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) {
            videoContainer.msRequestFullscreen();
        }
    }
}

function openGalleryLightbox(item) {
    const img = item.querySelector('img');
    const lightbox = createLightbox(img.src, img.alt);
    document.body.appendChild(lightbox);
}

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;

    // Close lightbox handlers
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        closeLightbox(lightbox);
    });

    lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => {
        closeLightbox(lightbox);
    });

    return lightbox;
}

function closeLightbox(lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.remove();
    }, 300);
}

// ===== CONTACT FORM =====
// ===== FORM SYSTEM - Robust & Professional =====
function initContactForm() {
    // Select all potential forms on the page
    const forms = document.querySelectorAll('.consultation-form, .lead-form, .contact-new__form');

    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);

        // Form field focus animations
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('focused');
            });

            field.addEventListener('blur', () => {
                if (!field.value) {
                    field.parentElement.classList.remove('focused');
                }
            });

            // Initial check for pre-filled fields
            if (field.value) {
                field.parentElement.classList.add('focused');
            }
        });
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'SUBMIT';

    // 1. Gather fields generically (handle different field names across pages)
    const data = {
        name: formData.get('fullName') || formData.get('name') || 'Guest',
        phone: formData.get('phoneNumber') || formData.get('phone') || 'Not provided',
        email: formData.get('emailAddress') || formData.get('email') || 'Not provided',
        interest: formData.get('propertyInterest') || formData.get('budget') || 'General Interest',
        message: formData.get('message') || formData.get('requirement') || 'No additional message',
        context: form.getAttribute('data-context') || 'Website Consultation'
    };

    // 2. Format WhatsApp Message
    const details = [
        `*${data.context.toUpperCase()}*`,
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Interest/Budget: ${data.interest}`,
        `Message: ${data.message}`
    ];
    const whatsappMessage = encodeURIComponent(`Tatva Real Estate Enquiry\n\n${details.join('\n')}`);
    const whatsappUrl = `https://wa.me/919099662234?text=${whatsappMessage}`;

    // 1. Mark as loading
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SECURING...';
        submitBtn.disabled = true;
    }

    // 2. Duplicate Detection
    const lastLead = JSON.parse(localStorage.getItem('last_tatva_lead') || '{}');
    const currentTime = new Date().getTime();
    const isDuplicate = lastLead.name === data.name && 
                        lastLead.phone === data.phone && 
                        (currentTime - lastLead.time < 86400000); // 24 hours

    if (isDuplicate) {
        setTimeout(() => {
            showFormSuccessMessage(data.name, whatsappUrl, form.hasAttribute('data-brochure'));
            form.reset();
            if (submitBtn) {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
            }
        }, 500);
        return;
    }

    // 4. Submit to Email (Formspree) & Redirect logic
    // We send to email first, then show the "Choice" modal.
    const emailEndpoint = "https://formspree.io/f/mdaygjlv"; 

    fetch(emailEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Cache this submission to prevent duplicates for 24 hours
            localStorage.setItem('last_tatva_lead', JSON.stringify({
                name: data.name,
                phone: data.phone,
                time: new Date().getTime()
            }));
        } else {
            console.error("Email capture failed. Ensure your Formspree ID is correct.");
        }
    })
    .catch(error => {
        console.error("Network error during lead capture:", error);
    })
    .finally(() => {
        // Show the "Luxury Choice" Modal
        showFormSuccessMessage(data.name, whatsappUrl, form.hasAttribute('data-brochure'));
        
        // Reset Form
        form.reset();
        if (submitBtn) {
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;
        }
    });
}

function showFormSuccessMessage(name, whatsappUrl, isBrochure = false) {
    const modal = document.createElement('div');
    modal.className = 'form-success-message';
    
    // Customize messaging based on type
    const title = isBrochure ? 'Brochure Ready' : 'Enquiry Received';
    const subtext = isBrochure 
        ? `Thank you, ${name}. Your brochure request has been logged.`
        : `Thank you, ${name}. Our team has received your details and will get back to you shortly.`;
    const ctaText = isBrochure ? 'Download via WhatsApp' : 'Chat via WhatsApp';
    const brochureBtn = isBrochure 
        ? `<a href="TATVA Brochure.pdf" download="TATVA_Brochure.pdf" class="success-btn brochure-btn" style="background: var(--luxury-black); color: white;">
                <i class="fas fa-file-download"></i>
                <span>Download Brochure (PDF)</span>
           </a>`
        : '';

    modal.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>${title}</h4>
            <p>${subtext}</p>
            <div class="success-actions">
                ${brochureBtn}
                <a href="${whatsappUrl}" target="_blank" class="success-btn whatsapp-btn">
                    <i class="fab fa-whatsapp"></i>
                    <span>${ctaText}</span>
                </a>
                <button class="success-btn close-btn">
                    <span>Back to Website</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger entrance transition
    setTimeout(() => modal.classList.add('active'), 10);
    
    // WhatsApp button click handler (just to close modal after if they want)
    modal.querySelector('.whatsapp-btn').addEventListener('click', () => {
        setTimeout(() => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 500);
        }, 1000);
    });

    // Close button handler
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 500);
    });
}


// ===== FLOATING ACTIONS =====
function initFloatingActions() {
    const whatsappButton = document.querySelector('.luxury-fab.whatsapp');
    const callButton = document.querySelector('.luxury-fab.call');
    const scrollTopButton = document.querySelector('.luxury-fab.scroll-top');

    if (whatsappButton) {
        whatsappButton.addEventListener('click', () => {
            window.open('https://wa.me/919099662234?text=Hi, I am interested in Tatva by Tradeprop properties.', '_blank');
        });
    }

    if (callButton) {
        callButton.addEventListener('click', () => {
            window.open('tel:+919099662234', '_self');
        });
    }

    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Show/hide scroll top button
    window.addEventListener('scroll', () => {
        if (scrollTopButton) {
            if (window.scrollY > 500) {
                scrollTopButton.style.opacity = '1';
                scrollTopButton.style.visibility = 'visible';
            } else {
                scrollTopButton.style.opacity = '0';
                scrollTopButton.style.visibility = 'hidden';
            }
        }
    });
}

// Removed initScrollEffects to avoid redundancy with initNavigation logic.

// ===== AOS INITIALIZATION =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 100,
            disable: 'mobile'
        });
    }
}

// ===== RESPONSIVE FEATURES =====
function initResponsiveFeatures() {
    // Mobile menu handling
    const handleResize = () => {
        const isMobile = window.innerWidth <= 968;
        const navCenter = document.querySelector('.nav-center');

        if (!isMobile && navCenter) {
            navCenter.classList.remove('mobile-active');
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

// ===== PAGE ANIMATIONS =====
function startPageAnimations() {
    // Trigger entrance animations after loading
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('aos-animate');
        }, index * 100);
    });

    // Initialize typography animations
    initTypographyAnimations();
}

// ===== TYPOGRAPHY ANIMATIONS =====
function initTypographyAnimations() {
    // Text reveal animations
    const textRevealElements = document.querySelectorAll('.text-reveal');
    const textFadeElements = document.querySelectorAll('.text-fade-in');
    const textSlideElements = document.querySelectorAll('.text-slide-in');

    // Intersection Observer for typography animations
    const typographyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                if (element.classList.contains('text-reveal')) {
                    element.style.animationDelay = '0.2s';
                    element.classList.add('animate');
                } else if (element.classList.contains('text-fade-in')) {
                    element.style.animationDelay = '0.4s';
                    element.classList.add('animate');
                } else if (element.classList.contains('text-slide-in')) {
                    element.style.animationDelay = '0.6s';
                    element.classList.add('animate');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all typography animation elements
    [...textRevealElements, ...textFadeElements, ...textSlideElements].forEach(el => {
        typographyObserver.observe(el);
    });

    // Typography hover effects
    const typographyHoverElements = document.querySelectorAll('.typography-hover');
    typographyHoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-2px)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
        });
    });

    // Button text animations
    const buttonAnimateElements = document.querySelectorAll('.btn-text-animate');
    buttonAnimateElements.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

function openBrochureModal() {
    if (document.querySelector('.brochure-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'property-modal brochure-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-header-content">
                    <i class="fas fa-file-download" style="font-size: 3.5rem; color: var(--golden-accent); margin-bottom: 20px; display: block;"></i>
                    <h2>Download Brochure</h2>
                    <p class="sub-text">Please provide your contact details to start the download instantly.</p>
                </div>
                <form class="lead-form consultation-form" data-context="Brochure Download" data-brochure="true">
                    <div class="form-field">
                        <label for="modal-name">Full Name</label>
                        <input id="modal-name" name="name" type="text" placeholder="Your Name" required>
                    </div>
                    <div class="form-field">
                        <label for="modal-phone">Mobile Number</label>
                        <input id="modal-phone" name="phone" type="tel" placeholder="Your Number" required>
                    </div>
                    <!-- Hidden field to identify brochure requests -->
                    <input type="hidden" name="requirement" value="Brochure Download">
                    
                    <button type="submit" class="form-submit">
                        <span>START DOWNLOAD NOW</span>
                        <i class="fas fa-file-download"></i>
                    </button>
                    <p class="form-disclaimer">By clicking, you will receive the brochure via WhatsApp & Email.</p>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    // Initialize fields
    const newFields = modal.querySelectorAll('input');
    newFields.forEach(field => {
        field.addEventListener('focus', () => field.parentElement.classList.add('focused'));
        field.addEventListener('blur', () => {
            if (!field.value) field.parentElement.classList.remove('focused');
        });
    });

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        // 1. Start the lead capture process
        handleFormSubmission(e);
        
        // 2. Trigger the actual file download immediately
        const link = document.createElement('a');
        link.href = 'TATVA Brochure.pdf';
        link.download = 'TATVA_Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 3. Close the modal after a short delay
        setTimeout(() => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 500);
        }, 3000);
    });

    // Close handlers
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 500);
    });
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 500);
    });
}

function openBookingModal() {
    // Scroll to contact section
    const contactSection = document.getElementById('contact') || document.querySelector('.luxury-contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Focus on first form field
        setTimeout(() => {
            const firstInput = contactSection.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 1000);
    }
}

function playVideoExperience() {
    // Create video modal
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-overlay"></div>
        <div class="video-container">
            <button class="video-close">&times;</button>
            <div class="video-placeholder">
                <i class="fas fa-play"></i>
                <h3>Property Experience Video</h3>
                <p>Coming Soon - Virtual tour of Tatva luxury properties</p>
            </div>
        </div>
    `;

    document.body.appendChild(videoModal);

    // Close video modal
    videoModal.querySelector('.video-close').addEventListener('click', () => {
        videoModal.remove();
    });

    videoModal.querySelector('.video-overlay').addEventListener('click', () => {
        videoModal.remove();
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function (e) {
    console.warn('Script error caught:', e.error);
});

// ===== CONTACT METHODS =====
function initContactMethods() {
    const contactMethods = document.querySelectorAll('.contact-new__card');

    contactMethods.forEach(method => {
        method.addEventListener('click', () => {
            const card = method.closest('.contact-new__card') || method;
            const icon = card.querySelector('i');

            if (icon.classList.contains('fa-phone')) {
                window.open('tel:+919099662234', '_self');
            } else if (icon.classList.contains('fa-envelope')) {
                window.open('mailto:tatvabytradeprop@gmail.com', '_self');
            } else if (icon.classList.contains('fa-location-dot') || icon.classList.contains('fa-map-marker-alt')) {
                window.open('https://maps.google.com/?q=Sanand-Nal+Sarovar+Road+Gujarat', '_blank');
            }
        });
    });
}

// ===== PROPERTY INTERACTION =====
function initPropertyCards() {
    const propertyCards = document.querySelectorAll('.property-masterpiece');

    propertyCards.forEach(card => {
        const exploreBtn = card.querySelector('.explore-btn');

        if (exploreBtn) {
            exploreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openPropertyDetails(card);
            });
        }

        // Card click handler
        card.addEventListener('click', () => {
            openPropertyDetails(card);
        });
    });
}

function openPropertyDetails(card) {
    const propertyType = card.querySelector('h3').textContent;

    // Create property details modal
    const modal = document.createElement('div');
    modal.className = 'property-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h2>${propertyType}</h2>
                <div class="modal-badge">Premium Collection</div>
            </div>
            <div class="modal-body">
                <p>Detailed information about ${propertyType} coming soon. Contact us for exclusive preview.</p>
                <div class="modal-actions">
                    <button class="modal-cta primary" onclick="openBookingModal()">Schedule Visit</button>
                    <button class="modal-cta secondary" onclick="window.open('tel:+919099662234', '_self')">Call Now</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal handlers
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.remove();
    });
}


/* function normalizePageContent() {
    const replacements = [
        ['â‚¹', '₹'],
        ['â€¢', '•']
    ];

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
        let content = node.nodeValue;
        replacements.forEach(([from, to]) => {
            if (content.includes(from)) {
                content = content.replaceAll(from, to);
            }
        });
        node.nodeValue = content;
    });

    const propertyInterest = document.getElementById('propertyInterest');
    if (propertyInterest) {
        propertyInterest.options[1].value = 'Premium Plots (₹11 Lakhs)';
        propertyInterest.options[1].text = 'Premium Plots (₹11L)';
        propertyInterest.options[2].value = 'Signature Villas (₹35 Lakhs)';
        propertyInterest.options[2].text = 'Signature Villas (₹35L)';
        propertyInterest.options[3].value = 'All Properties';
    }

    const investmentBudget = document.getElementById('investmentBudget');
    if (investmentBudget) {
        const budgets = ['₹10-20 Lakhs', '₹20-35 Lakhs', '₹35-50 Lakhs', '₹50 Lakhs+'];
        budgets.forEach((budget, index) => {
            const option = investmentBudget.options[index + 1];
            if (option) {
                option.value = budget;
                option.text = budget;
            }
        });
    }
} */

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Scroll-related operations
}, 16); // 60fps

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY FEATURES =====
function initAccessibility() {
    // Focus management for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.property-modal, .gallery-lightbox, .video-modal');
            modals.forEach(modal => modal.remove());
        }
    });

    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-gold);
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 10001;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features


// ===== CLUB RESORT FUNCTIONALITY =====
function initClubResort() {
    // Resort buttons functionality
    const resortButtons = document.querySelectorAll('.resort-btn');
    resortButtons.forEach(button => {
        button.addEventListener('click', handleResortCTA);
    });

    // Resort play button functionality
    const playButton = document.querySelector('.resort-play-btn');
    if (playButton) {
        playButton.addEventListener('click', () => {
            playVideoExperience();
        });
    }

    // Resort feature cards hover effects
    const featureCards = document.querySelectorAll('.resort-feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            showFeatureModal(title);
        });
    });
}

function handleResortCTA(e) {
    const button = e.currentTarget;
    const buttonText = button.querySelector('span').textContent;

    if (buttonText.includes('Book Resort Tour')) {
        openBookingModal();
    } else if (buttonText.includes('View Gallery')) {
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            const offsetTop = gallerySection.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        } else {
            window.location.href = 'gallery.html';
        }
    }
}

function showFeatureModal(featureTitle) {
    const modal = document.createElement('div');
    modal.className = 'feature-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h2>${featureTitle}</h2>
                <div class="modal-badge">Club Resort Feature</div>
            </div>
            <div class="modal-body">
                <p>Experience the luxury of ${featureTitle} at Tatva Club Resort. Contact us for more details and booking.</p>
                <div class="modal-actions">
                    <button class="modal-cta primary" onclick="openBookingModal()">Book Experience</button>
                    <button class="modal-cta secondary" onclick="window.open('tel:+919099662234', '_self')">Call Now</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal handlers
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.remove();
    });
}

// ===== FINAL INITIALIZATION =====
console.log('Tatva Premium Script Loaded Successfully ✨');
function initEmailProtection() {
    const protectedElements = document.querySelectorAll('.email-protect');
    protectedElements.forEach(el => {
        const user = el.getAttribute('data-user');
        const domain = el.getAttribute('data-domain');
        const subject = el.getAttribute('data-subject');
        
        if (user && domain) {
            const email = `${user}@${domain}`;
            
            // If it's a link, update href
            if (el.tagName === 'A') {
                let href = `mailto:${email}`;
                if (subject) href += `?subject=${encodeURIComponent(subject)}`;
                el.href = href;
            }
            
            // Update text content if it's currently placeholder text
            if (el.textContent.includes('[at]')) {
                el.textContent = email;
            }
            
            // Handle hover/click to ensure it's functional
            el.addEventListener('mouseover', () => {
                 el.title = `Send email to ${email}`;
            });
        }
    });
}
