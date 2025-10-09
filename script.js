/* ========================================
   TATVA BY TRADEPROP - PREMIUM JAVASCRIPT
   Interactive Features & Animations
   ======================================== */

// Global Variables
let isLoading = true;
let currentAmenityTab = 'clubhouse';
let currentGalleryFilter = 'all';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initLoadingScreen();
    initCustomCursor();
    initNavigation();
    initHeroAnimations();
    initCounterAnimations();
    initAmenitiesTabs();
    initAmenityScrollShowcase();
    initGalleryFilters();
    initContactForm();
    initFloatingActions();
    initScrollEffects();
    initAOS();
    initResponsiveFeatures();
    initTitleSparkle();
    initVisualJourneyCinematics();
    initStackedCardsAutoRotate();
}

// Recompute floating layout on resize (debounced), bind only once
if (!window.__visualHubResizeBound) {
    const hasCluster = document.querySelector('.visual-hub .floating-cluster');
    if (hasCluster) {
        window.addEventListener('resize', debounce(() => {
            setTimeout(() => initVisualHub(), 50);
        }, 200));
        window.__visualHubResizeBound = true;
    }
}

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
    const pieces = gallery.querySelectorAll('.gallery-piece .piece-image');
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

        const sources = Array.from({ length: 15 }, (_, i) => `./images/${i + 1}.jpg`);
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

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        if (isLoading) return;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth cursor outline animation
    function animateCursorOutline() {
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursorOutline);
    }
    
    animateCursorOutline();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .property-masterpiece, .gallery-item, .amenity-tab, .resort-btn, .resort-feature-card, .resort-play-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.getElementById('premiumNav');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const phoneButton = document.querySelector('.nav-phone');
    const bookVisitButton = document.querySelector('.premium-cta:not(.nav-phone)');
    
    // Navigation scroll effect - Maintain yellowish-white theme on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 253, 240, 0.95)';
            nav.style.backdropFilter = 'blur(25px)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 253, 240, 0.9)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(link);
            }
        });
    });
    
    // Phone button functionality
    if (phoneButton) {
        phoneButton.addEventListener('click', () => {
            window.open('tel:+919099662234', '_self');
        });
    }
    
    // Book Visit button functionality
    if (bookVisitButton) {
        bookVisitButton.addEventListener('click', () => {
            openBookingModal();
        });
    }
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function toggleMobileMenu() {
    const navCenter = document.querySelector('.nav-center');
    const toggle = document.querySelector('.mobile-toggle');
    
    navCenter.classList.toggle('mobile-active');
    toggle.classList.toggle('active');
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
    const buttonText = button.querySelector('span').textContent;
    
    if (button.classList.contains('primary')) {
        openBookingModal();
    } else if (buttonText.includes('EXPLORE PROPERTIES')) {
        // Redirect to Curated Properties section
        const propertiesSection = document.getElementById('properties');
        if (propertiesSection) {
            propertiesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link if navigation exists
            const navLink = document.querySelector('.nav-link[href="#properties"]');
            if (navLink) {
                updateActiveNavLink(navLink);
            }
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
    const videoContainer = document.querySelector('.video-container iframe');
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

function playVideoExperience() {
    // Alternative video experience function
    playVideo();
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
function initContactForm() {
    const contactForm = document.querySelector('.consultation-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Form field animations
    const formFields = document.querySelectorAll('.form-field input, .form-field select, .form-field textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('focused');
            }
        });
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitButton = e.target.querySelector('.form-submit');
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SUBMITTING...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showFormSuccessMessage();
        e.target.reset();
        
        // Reset button state
        submitButton.innerHTML = '<span>SCHEDULE CONSULTATION</span><i class="fas fa-arrow-right"></i>';
        submitButton.disabled = false;
    }, 2000);
}

function showFormSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'form-success-message';
    message.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>Thank You!</h4>
            <p>Your consultation request has been submitted. We'll contact you within 24 hours.</p>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
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

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Navbar active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

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
            el.style.textShadow = '0 4px 8px rgba(212, 175, 55, 0.3)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
            el.style.textShadow = 'none';
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

// ===== UTILITY FUNCTIONS =====
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
window.addEventListener('error', function(e) {
    console.warn('Script error caught:', e.error);
});

// ===== CONTACT METHODS =====
function initContactMethods() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', () => {
            const icon = method.querySelector('i');
            
            if (icon.classList.contains('fa-phone')) {
                window.open('tel:+919099662234', '_self');
            } else if (icon.classList.contains('fa-envelope')) {
                window.open('mailto:tradeprop.info@gmail.com', '_self');
            } else if (icon.classList.contains('fa-map-marker-alt')) {
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

// ===== INITIALIZATION CALLS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features after DOM is ready
    setTimeout(() => {
        initContactMethods();
        initPropertyCards();
    }, 100);
});

// ===== VISUAL HUB (Video + Floating Images) =====
function initVisualHub() {
    const cluster = document.querySelector('.visual-hub .floating-cluster');
    if (!cluster) return;

    // Clear any existing items (in case of re-init)
    cluster.innerHTML = '';

    // Build 15 floating items from ./images/1.jpg ... ./images/15.jpg
    const total = 15;
    const shapes = ['shape-circle', 'shape-soft', 'shape-squircle', 'shape-diamond', 'shape-hex', 'shape-triangle', 'shape-blob'];
    const rand = (min, max) => Math.random() * (max - min) + min;

    // Layout measurements to avoid overlapping the video frame
    const hub = document.querySelector('.visual-hub');
    const videoFrame = document.querySelector('.visual-hub .video-frame');
    if (!hub || !videoFrame) return;
    const hubRect = hub.getBoundingClientRect();
    const vfRect = videoFrame.getBoundingClientRect();
    // Convert video frame rect to hub-local coordinates
    const vf = {
        left: vfRect.left - hubRect.left,
        top: vfRect.top - hubRect.top,
        right: vfRect.right - hubRect.left,
        bottom: vfRect.bottom - hubRect.top,
        width: vfRect.width,
        height: vfRect.height
    };

    // Helper: check if a circle intersects the video frame plus margin
    const circleIntersectsRect = (cx, cy, r, rect, margin) => {
        const m = margin || 20;
        const rx1 = rect.left - m;
        const ry1 = rect.top - m;
        const rx2 = rect.right + m;
        const ry2 = rect.bottom + m;
        // Find closest point on rect to circle center
        const closestX = Math.max(rx1, Math.min(cx, rx2));
        const closestY = Math.max(ry1, Math.min(cy, ry2));
        const dx = cx - closestX;
        const dy = cy - closestY;
        return (dx * dx + dy * dy) < (r * r);
    };

    const placed = [];
    for (let i = 1; i <= total; i++) {
        const item = document.createElement('div');
        const shapeClass = shapes[i % shapes.length];
        item.className = `float-item ${shapeClass}`;

        // Random size (smaller near mobile sizes)
        const vw = Math.max(320, window.innerWidth);
        const vh = Math.max(480, window.innerHeight);
        const minSize = vw < 768 ? 72 : 90;
        const maxSize = vw < 768 ? 120 : 160;
        const size = Math.round(rand(minSize, maxSize));

        // Random motion deltas and animation timing
        const dx = Math.round(rand(-20, 20));
        const dy = Math.round(rand(-24, 16));
        const drot = rand(-4, 6).toFixed(2);
        const dur = (rand(8, 16)).toFixed(2) + 's';
        const delay = (rand(-2, 3)).toFixed(2) + 's';

        // Rotation base
        const rot = rand(-8, 10).toFixed(2) + 'deg';

        // Find a position that does not intersect the video frame and not overlap others
        let attempts = 0;
        let x = 0, y = 0;
        const radiusMargin = Math.max(18, size * 0.6); // buffer to keep away from frame
        const minGap = Math.max(12, size * 0.35);      // minimum gap between items
        while (attempts < 120) {
            // Uniformly sample across hub (with 6% padding inside edges)
            const padX = hubRect.width * 0.06;
            const padY = hubRect.height * 0.06;
            x = rand(padX, hubRect.width - padX);
            y = rand(padY, hubRect.height - padY);
            // Reject if collides with video frame
            if (circleIntersectsRect(x, y, radiusMargin, vf, 36)) {
                attempts++; continue;
            }
            // Reject if overlaps previously placed items
            let overlaps = false;
            for (const p of placed) {
                const dxp = x - p.x;
                const dyp = y - p.y;
                const dist2 = dxp * dxp + dyp * dyp;
                const req = (p.r + radiusMargin) + minGap * 0.5;
                if (dist2 < req * req) { overlaps = true; break; }
            }
            if (!overlaps) break;
            attempts++;
        }

        // Fallback: if still intersecting, push outside by moving away from frame center
        if (circleIntersectsRect(x, y, radiusMargin, vf, 28)) {
            const vfx = vf.left + vf.width / 2;
            const vfy = vf.top + vf.height / 2;
            const vx = x - vfx;
            const vy = y - vfy;
            const len = Math.max(1, Math.hypot(vx, vy));
            const scale = (Math.max(vf.width, vf.height) * 0.75 + radiusMargin) / len;
            x = vfx + vx * scale;
            y = vfy + vy * scale;
        }

        // Bound within hub
        x = Math.max(size / 2, Math.min(hubRect.width - size / 2, x));
        y = Math.max(size / 2, Math.min(hubRect.height - size / 2, y));

        // Convert back to % for responsive positioning
        const centerX = (x / hubRect.width) * 100;
        const centerY = (y / hubRect.height) * 100;

        // Apply CSS vars and absolute position in percent space
        item.style.left = centerX + '%';
        item.style.top = centerY + '%';
        item.style.setProperty('--x', '0');
        item.style.setProperty('--y', '0');
        item.style.setProperty('--dx', dx + 'px');
        item.style.setProperty('--dy', dy + 'px');
        item.style.setProperty('--rot', rot);
        item.style.setProperty('--drot', drot + 'deg');
        item.style.setProperty('--dur', dur);
        item.style.setProperty('--delay', delay);
        item.style.width = size + 'px';
        item.style.height = size + 'px';

        const img = document.createElement('img');
        img.src = `./images/${i}.jpg`;
        img.alt = `Visual ${i}`;
        img.loading = 'lazy';

        // Tone variations to stand out from background
        const bright = (rand(0.92, 1.06)).toFixed(2);
        const sat = (rand(0.9, 1.15)).toFixed(2);
        item.style.setProperty('--bright', bright);
        item.style.setProperty('--sat', sat);

        item.appendChild(img);
        cluster.appendChild(item);

        // Remember placement (store effective radius ~ size/2)
        placed.push({ x, y, r: radiusMargin });
    }
}

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
    skipLink.textContent = 'Skip to main content';
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
document.addEventListener('DOMContentLoaded', initAccessibility);

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
        // Redirect to gallery section
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            gallerySection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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

// Initialize club resort functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initClubResort();
    }, 100);
});

// ===== FINAL INITIALIZATION =====
console.log('Tatva Premium Script Loaded Successfully ✨');
