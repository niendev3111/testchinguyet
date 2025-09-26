// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-mode', currentTheme === 'dark');
    
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update icon
        const icon = darkModeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
    
    // Update icon on page load
    const icon = darkModeToggle.querySelector('i');
    icon.className = body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .integration-card, .testimonial-content, .cta-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Testimonial navigation
    const testimonialNav = document.querySelectorAll('.nav-arrow');
    const testimonials = [
        {
            quote: "The accuracy of the transcriptions is impressive, and the ability to search through meetings",
            author: "Brandon Jackson",
            title: "CEO at Zoom"
        },
        {
            quote: "Metcord has revolutionized how we document our meetings. The AI insights are game-changing.",
            author: "Sarah Chen",
            title: "Product Manager at Google"
        },
        {
            quote: "We've seen a 40% increase in meeting productivity since implementing Metcord.",
            author: "Michael Rodriguez",
            title: "CTO at Microsoft"
        }
    ];

    let currentTestimonial = 0;

    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        const blockquote = document.querySelector('.testimonial-text blockquote');
        const authorInfo = document.querySelector('.author-info');
        
        if (blockquote && authorInfo) {
            blockquote.textContent = `"${testimonial.quote}"`;
            authorInfo.innerHTML = `
                <strong>${testimonial.author}</strong>
                <span>${testimonial.title}</span>
            `;
        }
    }

    testimonialNav.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            if (index === 0) {
                // Previous
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            } else {
                // Next
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            }
            updateTestimonial(currentTestimonial);
        });
    });

    // Button click animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Video call demo interactions
    const recordingBtn = document.querySelector('.recording-btn');
    if (recordingBtn) {
        recordingBtn.addEventListener('click', function() {
            if (this.textContent === 'Start recording...') {
                this.textContent = 'Stop recording';
                this.style.background = '#10b981';
                this.style.animation = 'pulse 2s infinite';
            } else {
                this.textContent = 'Start recording...';
                this.style.background = '#ef4444';
                this.style.animation = 'none';
            }
        });
    }

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Chat interface tab switching
    const chatTabs = document.querySelectorAll('.tab');
    chatTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            chatTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const header = document.querySelector('.header .container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileToggle.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #8B5CF6;
                cursor: pointer;
            `;
            
            header.appendChild(mobileToggle);
            
            mobileToggle.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Stats counter animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        statsObserver.observe(statsSection);
    }

    // Form validation for demo buttons
    const demoButtons = document.querySelectorAll('button[class*="btn"]');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Start for free') || this.textContent.includes('Watch demo')) {
                e.preventDefault();
                alert('This is a demo. In a real application, this would redirect to the signup page or open a demo video.');
            }
        });
    });

    // Add loading states for buttons
    const addLoadingState = (button, text) => {
        const originalText = button.textContent;
        button.textContent = text;
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    };

    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.video-call-demo, .hero-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add typing animation to hero title
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '3px solid #8B5CF6';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        });
    });

    // Add particle effect to hero section
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #8B5CF6;
                border-radius: 50%;
                opacity: 0.3;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
            `;
            hero.appendChild(particle);
        }
    };

    // Add particle animation styles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(particleStyle);

    // Initialize particles
    createParticles();

    // Apply loading states to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Start for free')) {
                addLoadingState(this, 'Creating account...');
            } else if (this.textContent.includes('Watch demo')) {
                addLoadingState(this, 'Loading demo...');
            }
        });
    });
});
