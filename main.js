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

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        
        // Show navbar after loading
        setTimeout(() => {
            document.getElementById('navbar').classList.add('visible');
        }, 500);
    }, 1500);
});

// Visitor Counter
counterRef.transaction(current => {
    return (current || 0) + 1;
});

counterRef.on('value', (snapshot) => {
    const count = snapshot.val();
    animateCounter('visitor-count', count);
});

// Counter Animation
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
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

// Easing function
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number[data-count]');
    
    stats.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-count'));
        animateCounter(stat.id || 'stat-' + Math.random().toString(36).substr(2, 9), targetValue);
    });
}

// Typing Animation
const titles = [
    "DevOps Engineer",
    "Cloud Architect",
    "AWS Certified Professional",
    "Automation Specialist",
    "Docker & Kubernetes Expert"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeTitle() {
    const typingElement = document.getElementById('typingText');
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeTitle, typeSpeed);
}

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.remove('visible');
    } else {
        navbar.classList.add('visible');
    }
    
    lastScrollY = currentScrollY;
    
    // Update active navigation link
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
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

// Contact Popup
const contactBtn = document.getElementById('contactBtn');
const contactPopup = document.getElementById('contactPopup');
const popupClose = document.getElementById('popupClose');

contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contactPopup.classList.add('visible');
    document.body.style.overflow = 'hidden';
});

popupClose.addEventListener('click', () => {
    contactPopup.classList.remove('visible');
    document.body.style.overflow = 'auto';
});

contactPopup.addEventListener('click', (e) => {
    if (e.target === contactPopup) {
        contactPopup.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Gallery lightbox effect (basic implementation)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Create a simple lightbox
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3000;
                cursor: pointer;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            lightbox.addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animations for skill tags
            if (entry.target.classList.contains('skill-category')) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(0)';
                        tag.style.opacity = '1';
                    }, index * 100);
                });
            }
            
            // Trigger counter animations
            if (entry.target.classList.contains('hero-stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-category, .hero-stats').forEach(el => {
    observer.observe(el);
});

// Initialize skill tag animations
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.style.transform = 'translateY(20px)';
    tag.style.opacity = '0';
    tag.style.transition = 'all 0.3s ease';
});

// Form submission prevention for demo
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(() => {
        typeTitle();
    }, 2000);
    
    // Add scroll-triggered animations
    const scrollElements = document.querySelectorAll('[data-aos]');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('aos-animate');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('aos-animate');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollAnimation);
});

// Performance optimization
let ticking = false;

function updateScrollAnimations() {
    // Your scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
});

// Console welcome message
console.log(`
🎉 Welcome to Arulmohan P's Portfolio!
🚀 Built with modern web technologies
💼 DevOps Engineer & Cloud Architect
📧 Contact: iamarulmohan333@gmail.com
`);
