/* =============================================
   MARBLE COLLECTION — Interactive Effects
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }, 2000);
    });
    // Fallback if load already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }, 2000);
    }

    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .product-card, .category-card, .advantage-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });

    // --- Header Scroll ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    });

    // --- Mobile Menu ---
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Hero Slider ---
    const heroSlides = document.querySelectorAll('.hero__slide');
    const heroDots = document.querySelectorAll('.hero__slider-dot');
    let currentHeroSlide = 0;
    let heroInterval;

    function showHeroSlide(index) {
        heroSlides.forEach(s => s.classList.remove('active'));
        heroDots.forEach(d => d.classList.remove('active'));
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentHeroSlide = index;
    }

    function nextHeroSlide() {
        const next = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(next);
    }

    function startHeroSlider() {
        heroInterval = setInterval(nextHeroSlide, 5000);
    }

    heroDots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(heroInterval);
            showHeroSlide(parseInt(dot.dataset.slide));
            startHeroSlider();
        });
    });

    startHeroSlider();

    // --- Products Carousel ---
    const productsTrack = document.querySelector('.products__track');
    const productCards = document.querySelectorAll('.product-card');
    const prevBtn = document.getElementById('prevProduct');
    const nextBtn = document.getElementById('nextProduct');
    const currentSlideEl = document.getElementById('currentSlide');
    let productIndex = 0;

    function getVisibleCards() {
        const w = window.innerWidth;
        if (w <= 640) return 1;
        if (w <= 960) return 2;
        if (w <= 1200) return 3;
        return 4;
    }

    function updateProductsCarousel() {
        const visible = getVisibleCards();
        const maxIndex = Math.max(0, productCards.length - visible);
        if (productIndex > maxIndex) productIndex = maxIndex;
        if (productIndex < 0) productIndex = 0;

        const card = productCards[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const offset = productIndex * (cardWidth + gap);
        productsTrack.style.transform = `translateX(-${offset}px)`;
        currentSlideEl.textContent = String(productIndex + 1).padStart(2, '0');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const visible = getVisibleCards();
            const maxIndex = productCards.length - visible;
            if (productIndex < maxIndex) {
                productIndex++;
                updateProductsCarousel();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (productIndex > 0) {
                productIndex--;
                updateProductsCarousel();
            }
        });
    }

    // Touch swipe for products
    let touchStartX = 0;
    let touchEndX = 0;

    if (productsTrack) {
        productsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        productsTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextBtn.click();
                else prevBtn.click();
            }
        }, { passive: true });
    }

    window.addEventListener('resize', updateProductsCarousel);

    // --- Reviews Carousel ---
    const reviewsTrack = document.querySelector('.reviews__track');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevReview = document.getElementById('prevReview');
    const nextReview = document.getElementById('nextReview');
    let reviewIndex = 0;

    function getVisibleReviews() {
        const w = window.innerWidth;
        if (w <= 640) return 1;
        if (w <= 960) return 2;
        return 3;
    }

    function updateReviewsCarousel() {
        const visible = getVisibleReviews();
        const maxIndex = Math.max(0, reviewCards.length - visible);
        if (reviewIndex > maxIndex) reviewIndex = maxIndex;
        if (reviewIndex < 0) reviewIndex = 0;

        const card = reviewCards[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const offset = reviewIndex * (cardWidth + gap);
        reviewsTrack.style.transform = `translateX(-${offset}px)`;
    }

    if (nextReview) {
        nextReview.addEventListener('click', () => {
            const visible = getVisibleReviews();
            const maxIndex = reviewCards.length - visible;
            if (reviewIndex < maxIndex) {
                reviewIndex++;
                updateReviewsCarousel();
            }
        });
    }

    if (prevReview) {
        prevReview.addEventListener('click', () => {
            if (reviewIndex > 0) {
                reviewIndex--;
                updateReviewsCarousel();
            }
        });
    }

    // Touch swipe for reviews
    if (reviewsTrack) {
        reviewsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        reviewsTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextReview.click();
                else prevReview.click();
            }
        }, { passive: true });
    }

    window.addEventListener('resize', updateReviewsCarousel);

    // --- Scroll Animations (Intersection Observer) ---
    function initAnimations() {
        const animateElements = document.querySelectorAll('[data-animate]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    }

    // --- Parallax Effect ---
    const parallaxBg = document.querySelector('.parallax-banner__bg');

    function updateParallax() {
        if (!parallaxBg) return;
        const rect = parallaxBg.parentElement.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        if (rect.top < viewHeight && rect.bottom > 0) {
            const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
            const offset = (progress - 0.5) * 80;
            parallaxBg.style.transform = `translateY(${offset}px)`;
        }
    }

    window.addEventListener('scroll', updateParallax, { passive: true });

    // --- Counter Animation ---
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const start = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quad
                const eased = 1 - (1 - progress) * (1 - progress);
                const current = Math.floor(eased * target);
                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Trigger counters when stats section is visible
    const statsSection = document.querySelector('.about__stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // --- Back to Top ---
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Smooth Anchor Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // --- Form Submit ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Отправлено!';
            btn.style.background = '#c9a96e';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Magnetic Button Effect ---
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // --- Image Tilt Effect on Product Cards ---
    document.querySelectorAll('.product-card__image-wrap').forEach(wrap => {
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -8;
            const rotateY = (x - 0.5) * 8;
            wrap.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        wrap.addEventListener('mouseleave', () => {
            wrap.style.transform = '';
            wrap.style.transition = 'transform 0.5s ease';
            setTimeout(() => { wrap.style.transition = ''; }, 500);
        });
    });

    // --- Category Card Parallax on Hover ---
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = `scale(1.08) translate(${x * -10}px, ${y * -10}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = '';
            }
        });
    });

    // --- Smooth Reveal on Scroll for text sections ---
    const textSections = document.querySelectorAll('.about__text p, .custom-order__desc, .delivery__item p');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    textSections.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        textObserver.observe(el);
    });

    // --- Header hide on scroll down, show on scroll up ---
    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos > 300) {
            if (prevScrollPos > currentScrollPos) {
                header.style.transform = 'translateY(0)';
            } else {
                header.style.transform = 'translateY(-100%)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        header.style.transition = 'transform 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease';
        prevScrollPos = currentScrollPos;
    });
});
