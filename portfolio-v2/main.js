// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPkPKL0HjwOkscBr1ORQW7VzxZwkwDXwo",
    authDomain: "visitorscount-c6a2e.firebaseapp.com",
    databaseURL: "https://visitorscount-c6a2e-default-rtdb.firebaseio.com",
    projectId: "visitorscount-c6a2e",
    storageBucket: "visitorscount-c6a2e.firebasestorage.app",
    messagingSenderId: "1002328964638",
    appId: "1:1002328964638:web:7194d49e8531046d69780f",
    measurementId: "G-X7MJDE02C6"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const counterRef = database.ref('visitorCount');

// Matrix Rain Effect
function createMatrixRain() {
    const matrixBg = document.getElementById('matrixBg');
    const chars = '01';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        matrixBg.style.background = 'rgba(2, 6, 23, 0.05)';
        matrixBg.innerHTML = '';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            const span = document.createElement('span');
            span.textContent = text;
            span.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                color: rgba(0, 255, 65, 0.3);
                font-family: monospace;
                font-size: ${fontSize}px;
                pointer-events: none;
            `;
            
            matrixBg.appendChild(span);
            
            if (y > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 100);
}

// Loading Screen Management
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        
        // Show navbar after loading
        setTimeout(() => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.classList.add('visible');
            }
        }, 500);
        
        // Start matrix effect
        createMatrixRain();
        
        // Initialize skill level animations
        animateSkillLevels();
        
        // Start typing animation
        setTimeout(() => {
            startTypingAnimation();
        }, 1000);
        
    }, 2000);
});

// Visitor Counter with Animation
counterRef.transaction(current => {
    return (current || 0) + 1;
});

counterRef.on('value', (snapshot) => {
    const count = snapshot.val();
    animateCounter('visitor-count', count);
    
    // Update footer counter too
    const footerCounter = document.getElementById('footer-visitor-count');
    if (footerCounter) {
        footerCounter.textContent = count.toLocaleString();
    }
});

// Enhanced Counter Animation
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart(progress));
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Easing Functions
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Typing Animation for Hero Section
const commands = [
    "whoami",
    "cat /etc/devops-skills",
    "docker ps -a",
    "kubectl get pods",
    "aws sts get-caller-identity",
    "terraform plan",
    "jenkins --version",
    "git status"
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    typeCommand();
}

function typeCommand() {
    const typingElement = document.getElementById('typingText');
    const currentCommand = commands[commandIndex];
    
    if (isWaiting) {
        setTimeout(() => {
            isWaiting = false;
            isDeleting = true;
            typeCommand();
        }, 2000);
        return;
    }
    
    if (isDeleting) {
        typingElement.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentCommand.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 150;
    
    if (!isDeleting && charIndex === currentCommand.length) {
        isWaiting = true;
        typeSpeed = 100;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeCommand, typeSpeed);
}

// Navigation Enhancement
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        // Reset hamburger
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
});

// Advanced Navbar Scroll Effect
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.remove('visible');
        } else {
            navbar.classList.add('visible');
        }
        
        // Add background blur effect on scroll
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
    
    lastScrollY = currentScrollY;
    updateActiveNavLink();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Active Navigation Link Updates
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Contact Popup Management
const contactBtn = document.getElementById('contactBtn');
const contactPopup = document.getElementById('contactPopup');
const popupClose = document.getElementById('popupClose');

if (contactBtn && contactPopup) {
    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactPopup.classList.add('visible');
        document.body.style.overflow = 'hidden';
        
        // Add terminal startup effect
        const popupTerminal = contactPopup.querySelector('.popup-terminal');
        if (popupTerminal) {
            popupTerminal.style.transform = 'scale(0.8) rotateX(10deg)';
            setTimeout(() => {
                popupTerminal.style.transform = 'scale(1) rotateX(0deg)';
            }, 100);
        }
    });
}

if (popupClose) {
    popupClose.addEventListener('click', closeContactPopup);
}

if (contactPopup) {
    contactPopup.addEventListener('click', (e) => {
        if (e.target === contactPopup) {
            closeContactPopup();
        }
    });
}

function closeContactPopup() {
    if (contactPopup) {
        contactPopup.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }
}

// Escape key to close popup
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactPopup?.classList.contains('visible')) {
        closeContactPopup();
    }
});

// Skills Button Animation
const skillsBtn = document.getElementById('skillsBtn');
if (skillsBtn) {
    skillsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Scroll to skills section with offset
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const offsetTop = skillsSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Trigger skill level animations after scroll
            setTimeout(() => {
                animateSkillLevels();
            }, 1000);
        }
    });
}

// Skill Level Animations
function animateSkillLevels() {
    const skillBars = document.querySelectorAll('.level-fill');
    
    skillBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        if (level) {
            setTimeout(() => {
                bar.style.width = level + '%';
            }, index * 200);
        }
    });
}

// Metrics Animation on Scroll
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value[data-count]');
    
    metrics.forEach((metric, index) => {
        const targetValue = parseInt(metric.getAttribute('data-count'));
        if (targetValue) {
            setTimeout(() => {
                animateCounter(metric.id || `metric-${index}`, targetValue);
            }, index * 100);
        }
    });
}

// Smooth Scrolling Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            // Add smooth scroll with custom easing
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed / duration) * distance + startPosition;
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Initialize AOS with custom settings
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 0,
    anchorPlacement: 'top-bottom'
});

// Advanced Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            createLightbox(img, index);
        }
    });
});

function createLightbox(img, currentIndex) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    const lightboxContent = document.createElement('div');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.transform = 'scale(1)';
    });
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.8)';
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (lightbox.parentNode) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(closeBtn);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 10);
}

// Intersection Observer for Advanced Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            
            // Skill level bars animation
            if (target.classList.contains('skill-category')) {
                const levelFill = target.querySelector('.level-fill');
                if (levelFill) {
                    const level = levelFill.getAttribute('data-level');
                    setTimeout(() => {
                        levelFill.style.width = level + '%';
                    }, 300);
                }
            }
            
            // Metrics animation
            if (target.classList.contains('hero-metrics')) {
                animateMetrics();
            }
            
            // Certificate cards stagger animation
            if (target.classList.contains('certifications-grid')) {
                const cards = target.querySelectorAll('.cert-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transform = 'translateY(0)';
                        card.style.opacity = '1';
                    }, index * 100);
                });
            }
            
            // Project cards hover preparation
            if (target.classList.contains('project-card')) {
                target.addEventListener('mouseenter', () => {
                    target.style.transform = 'translateY(-15px) rotateX(5deg)';
                });
                
                target.addEventListener('mouseleave', () => {
                    target.style.transform = 'translateY(0) rotateX(0deg)';
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.skill-category, .hero-metrics, .certifications-grid, .project-card');
    elementsToObserve.forEach(el => {
        animationObserver.observe(el);
    });
    
    // Initialize certificate cards for stagger animation
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-grid');
    
    parallaxElements.forEach(element => {
        const speed = scrolled * 0.2;
        element.style.transform = `translateY(${speed}px)`;
    });
});

// Terminal Command Simulation
function simulateTerminalCommand(command, element) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function typeChar() {
        if (i < command.length) {
            element.textContent += command.charAt(i);
            i++;
            setTimeout(typeChar, 50 + Math.random() * 50);
        }
    }
    
    typeChar();
}

// Add terminal-like hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
        btn.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
        btn.style.transform = '';
    });
});

// Add glitch effect to hero name on hover
const heroName = document.querySelector('.hero-name');
if (heroName) {
    heroName.addEventListener('mouseenter', () => {
        heroName.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    heroName.addEventListener('animationend', () => {
        heroName.style.animation = '';
    });
}

// Add CSS for glitch effect
const glitchCSS = `
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = glitchCSS;
document.head.appendChild(styleSheet);

// Console Art and Welcome Message
const consoleArt = `
    ╔══════════════════════════════════════════════════════════════╗
    ║                    🚀 ARULMOHAN P PORTFOLIO 🚀                ║
    ║                   DevOps Engineer & Cloud Architect          ║
    ║                                                              ║
    ║  $ whoami                                                    ║
    ║  > DevOps Engineer specializing in AWS & Kubernetes         ║
    ║                                                              ║
    ║  $ cat skills.txt                                            ║
    ║  > AWS, Docker, Kubernetes, Jenkins, Terraform              ║
    ║                                                              ║
    ║  $ echo "Thanks for visiting my portfolio!"                  ║
    ║  > Ready to collaborate on your next project! 🔥             ║
    ║                                                              ║
    ║  📧 Contact: iamarulmohan333@gmail.com                       ║
    ║  🔗 LinkedIn: linkedin.com/in/arulmohanp27                   ║
    ║  🐙 GitHub: github.com/Arulrot                               ║
    ╚══════════════════════════════════════════════════════════════╝
`;

console.log(consoleArt);

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
            console.log(`⚡ First Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
        }
    });
});

performanceObserver.observe({ entryTypes: ['paint'] });

// Error handling
window.addEventListener('error', (e) => {
    console.error('💥 JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('💥 Unhandled Promise Rejection:', e.reason);
});

// Service Worker registration (if you want to add PWA features later)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below if you create a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('🔧 SW registered'))
        //     .catch(registrationError => console.log('❌ SW registration failed'));
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Portfolio initialized successfully!');
    
    // Add loading states to async operations
    const loadingElements = document.querySelectorAll('[data-loading]');
    loadingElements.forEach(el => {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
    });
    
    // Remove loading states after initialization
    setTimeout(() => {
        loadingElements.forEach(el => {
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
        });
    }, 1000);
});
