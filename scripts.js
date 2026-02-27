/* ================================================================
   PORTFOLIO WEBSITE - CUSTOM JAVASCRIPT & JQUERY
   Created for Vishal Kumar - Full Stack .NET Developer
   ================================================================ */

$(document).ready(function() {
    
    // ================================================================
    // 1. SMOOTH SCROLL NAVIGATION
    // ================================================================
    
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        const offset = -70; // Account for fixed navbar
        
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top + offset
            }, 1000, 'easeInOutQuad');
        }
    });

    // ================================================================
    // 2. NAVBAR ACTIVE LINK HIGHLIGHTING
    // ================================================================
    
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('nav a').each(function() {
            const link = $(this);
            const href = link.attr('href');
            
            if(href.charAt(0) === '#') {
                const section = $(href);
                
                if(section.length) {
                    if(section.offset().top <= scrollPos && section.offset().top + section.height() > scrollPos) {
                        $('nav a').removeClass('active');
                        link.addClass('active');
                    }
                }
            }
        });
    });

    // ================================================================
    // 3. SCROLL TO TOP BUTTON
    // ================================================================
    
    const scrollToTopBtn = $('#scrollToTop');
    
    $(window).on('scroll', function() {
        if($(this).scrollTop() > 300) {
            scrollToTopBtn.addClass('show');
        } else {
            scrollToTopBtn.removeClass('show');
        }
    });
    
    scrollToTopBtn.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutQuad');
    });

    // ================================================================
    // 4. TECHNOLOGY CAROUSEL - Auto Slide Transition
    // ================================================================
    
    let currentSlide = 0;
    const slides = $('.tech-slide');
    const totalSlides = slides.length;
    let autoSlideTimer;
    
    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
        resetAutoSlide();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
        resetAutoSlide();
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(nextSlide, 2000);
    }
    
    // Button click handlers
    $('#nextSlide').on('click', nextSlide);
    $('#prevSlide').on('click', prevSlide);
    
    // Auto-advance slides every 2 seconds
    autoSlideTimer = setInterval(nextSlide, 2000);

    // ================================================================
    // 5. ANIMATED PROGRESS BARS ON SCROLL
    // ================================================================
    
    let progressBarsAnimated = false;
    
    function animateProgressBars() {
        if(!progressBarsAnimated) {
            const skillSection = $('#skills');
            
            if(skillSection.length && isElementInViewport(skillSection)) {
                $('.progress-fill').each(function(index) {
                    const $this = $(this);
                    const percentage = $this.data('percentage');
                    
                    setTimeout(function() {
                        $this.css('width', percentage + '%');
                        $this.closest('.progress-bar-custom').prev().append(
                            '<span style="float: right; font-weight: 600; color: #0d6efd;">' + percentage + '%</span>'
                        );
                    }, index * 100);
                });
                
                progressBarsAnimated = true;
            }
        }
    }
    
    function isElementInViewport(el) {
        const rect = el[0].getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    $(window).on('scroll', animateProgressBars);
    animateProgressBars();

    // ================================================================
    // 5. SKILL CARDS ANIMATION ON HOVER
    // ================================================================
    
    $('.skill-card').on('mouseenter', function() {
        $(this).find('.skill-icon').css({
            'animation': 'none'
        });
        
        setTimeout(() => {
            $(this).find('.skill-icon').css({
                'animation': 'none'
            });
        }, 10);
    });

    // ================================================================
    // 6. PROJECT CARDS ANIMATION
    // ================================================================
    
    let projectsAnimated = false;
    
    function animateProjects() {
        if(!projectsAnimated) {
            const projectsSection = $('#projects');
            
            if(projectsSection.length && isElementInViewport(projectsSection)) {
                $('.project-card').each(function(index) {
                    $(this).delay(index * 150).fadeIn(600);
                });
                
                projectsAnimated = true;
            }
        }
    }
    
    $(window).on('scroll', animateProjects);
    animateProjects();

    // ================================================================
    // 7. EXPERIENCE TIMELINE ANIMATION
    // ================================================================
    
    let timelineAnimated = false;
    
    function animateTimeline() {
        if(!timelineAnimated) {
            const experienceSection = $('#experience');
            
            if(experienceSection.length && isElementInViewport(experienceSection)) {
                $('.timeline-item').each(function(index) {
                    $(this).delay(index * 150).animate({
                        opacity: 1,
                        marginTop: 0
                    }, 600);
                });
                
                timelineAnimated = true;
            }
        }
    }
    
    // Initialize timeline items
    $('.timeline-item').css({
        'opacity': 0,
        'marginTop': '20px'
    });
    
    $(window).on('scroll', animateTimeline);
    animateTimeline();

    // ================================================================
    // 8. CONTACT FORM HANDLING
    // ================================================================
    
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        const formMessage = $('#formMessage');
        
        // Validation
        if(!name || !email || !subject || !message) {
            showFormMessage('Please fill all the fields.', 'error');
            return;
        }
        
        if(!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();
        
        submitBtn.text('Sending...').prop('disabled', true);
        
        // Simulate API call delay
        setTimeout(function() {
            showFormMessage('Thank you for reaching out! I will get back to you soon.', 'success');
            form[0].reset();
            submitBtn.text(originalText).prop('disabled', false);
        }, 1500);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormMessage(message, type) {
        const formMessage = $('#formMessage');
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        formMessage.html(
            '<div class="alert ' + alertClass + ' alert-dismissible fade show" role="alert">' +
                '<i class="fas ' + icon + '"></i> ' + message +
                '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
            '</div>'
        );
        
        // Auto-close success message after 5 seconds
        if(type === 'success') {
            setTimeout(function() {
                formMessage.find('.alert').fadeOut(500, function() {
                    $(this).remove();
                });
            }, 5000);
        }
    }

    // ================================================================
    // 9. COUNTER ANIMATION FOR STATS
    // ================================================================
    
    let statsAnimated = false;
    
    $.fn.animateNumber = function() {
        this.each(function() {
            const $this = $(this);
            const finalValue = parseInt($this.text().replace(/\D/g, ''));
            let currentValue = 0;
            const increment = finalValue / 30; // Animate over 30 steps
            
            const timer = setInterval(function() {
                currentValue += increment;
                
                if(currentValue >= finalValue) {
                    $this.text($this.text());
                    clearInterval(timer);
                } else {
                    $this.text(Math.floor(currentValue) + (finalValue > 100 ? '+' : ''));
                }
            }, 30);
        });
    };
    
    function animateStats() {
        if(!statsAnimated) {
            const experienceSection = $('#experience');
            
            if(experienceSection.length && isElementInViewport(experienceSection)) {
                $('.stat-number').animateNumber();
                statsAnimated = true;
            }
        }
    }
    
    $(window).on('scroll', animateStats);
    animateStats();

    // ================================================================
    // 10. PARALLAX SCROLL EFFECT
    // ================================================================
    
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        
        // Parallax effect on hero section
        if(scrollTop < window.innerHeight) {
            $('.hero-section').css({
                'background-position': '0% ' + (scrollTop * 0.5) + 'px'
            });
        }
    });

    // ================================================================
    // 11. TEXT ANIMATION ON SECTIONS
    // ================================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if(entry.isIntersecting) {
                $(entry.target).addClass('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    $('.about-content, .skill-card, .project-card').each(function() {
        observer.observe(this);
    });

    // ================================================================
    // 12. MOBILE MENU CLOSE ON LINK CLICK
    // ================================================================
    
    $('.navbar-nav a').on('click', function() {
        const navbarToggler = $('.navbar-toggler');
        
        if(navbarToggler.is(':visible')) {
            navbarToggler.click();
        }
    });

    // ================================================================
    // 13. TYPED TEXT EFFECT FOR HERO SECTION
    // ================================================================
    
    function typeText(element, text, speed = 100) {
        let index = 0;
        $(element).text('');
        
        function type() {
            if(index < text.length) {
                $(element).append(text.charAt(index++));
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ================================================================
    // 14. SKILL ICONS ANIMATION
    // ================================================================
    
    $('.skill-icon').each(function(index) {
        $(this).css({
            'animation-delay': (index * 0.1) + 's'
        });
    });

    // ================================================================
    // 15. SECTION TITLE UNDERLINE ANIMATION
    // ================================================================
    
    let titleUnderlineAnimated = false;
    
    function animateTitleUnderlines() {
        const titles = $('.section-title');
        
        titles.each(function() {
            if(!$(this).hasClass('animated')) {
                $(this).addClass('animated');
                const underline = $(this).find('::after');
                
                // Trigger CSS animation
                $(this).css({
                    'animation': 'fadeIn 0.8s ease'
                });
            }
        });
    }
    
    $(window).on('scroll', animateTitleUnderlines);

    // ================================================================
    // 16. RESPONSIVE BEHAVIOR
    // ================================================================
    
    $(window).on('resize', function() {
        // Reset animations on resize if needed
        const windowWidth = $(window).width();
        
        if(windowWidth < 768) {
            // Mobile specific adjustments
            $('.navbar').css('padding', '10px 15px');
        } else {
            $('.navbar').css('padding', '');
        }
    });

    // ================================================================
    // 17. CUSTOM EASING FUNCTION
    // ================================================================
    
    $.easing.easeInOutQuad = function(x, t, b, c, d) {
        if((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };

    // ================================================================
    // 18. INITIALIZE TOOLTIPS (Bootstrap Tooltips)
    // ================================================================
    
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ================================================================
    // 19. SCROLL REVEAL FOR ELEMENTS
    // ================================================================
    
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
        
        reveals.forEach(function(element) {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if(elementTop < windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);

    // ================================================================
    // 20. PAGE LOAD ANIMATIONS
    // ================================================================
    
    $(window).on('load', function() {
        // Fade in hero content
        $('.hero-content').fadeIn(800);
        
        // Add loaded class to body
        $('body').addClass('loaded');
    });

    // ================================================================
    // 21. LIGHT/DARK MODE TOGGLE (Optional)
    // ================================================================
    
    // Uncomment this section if you want to add light/dark mode toggle
    /*
    const toggleTheme = function() {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    */

    // ================================================================
    // 22. KEYBOARD NAVIGATION
    // ================================================================
    
    $(document).on('keydown', function(e) {
        // Press 'h' to scroll to home
        if(e.key === 'h' || e.key === 'H') {
            $('html, body').animate({ scrollTop: 0 }, 800);
        }
        
        // Press 'c' to scroll to contact
        if(e.key === 'c' || e.key === 'C') {
            const contactSection = $('#contact');
            if(contactSection.length) {
                $('html, body').animate({
                    scrollTop: contactSection.offset().top - 70
                }, 800);
            }
        }
    });

    // ================================================================
    // 23. AUTO-HIDE NAVBAR ON SCROLL DOWN, SHOW ON SCROLL UP - DISABLED
    // (Navbar now stays visible at all times for better UX)
    // ================================================================
    
    // Feature disabled - navbar remains visible during scrolling

    // ================================================================
    // 24. CONSOLE LOG EASTER EGG
    // ================================================================
    
    console.log('%c Welcome to Vishal Kumar\'s Portfolio!', 'color: #fd7e14; font-size: 20px; font-weight: bold;');
    console.log('%c 6+ Years of .NET Development Experience', 'color: #0d6efd; font-size: 16px;');
    console.log('%c Full Stack Developer | Problem Solver | Cloud Enthusiast', 'color: #20c997; font-size: 14px;');
    console.log('%c Get in touch: vishal.kumar@statusneo.com', 'color: #6c757d; font-size: 12px;');

    // ================================================================
    // 25. INITIALIZATION COMPLETE
    // ================================================================
    
    console.log('Portfolio Scripts Initialized Successfully! ✨');
});

// ================================================================
// DOCUMENT READY COMPLETE
// ================================================================
