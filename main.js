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

// Performance optimization variables
let ticking = false;
let lastScrollY = window.scrollY;

// Loading Screen - OPTIMIZED (removed artificial delays)
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');
    
    // Show navbar immediately after loading
    document.getElementById('navbar').classList.add('visible');
    
    // Start typing animation immediately
    typeTitle();
});

// Visitor Counter - Deferred for better performance
requestIdleCallback(() => {
    counterRef.transaction(current => {
        return (current || 0) + 1;
    });
    
    counterRef.on('value', (snapshot) => {
        const count = snapshot.val();
        animateCounter('visitor-count', count);
    });
});

// Counter Animation - Optimized
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const duration = 1500; // Reduced from 2000ms
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

// Animate stats on scroll - Optimized
function animateStats() {
    const stats = document.querySelectorAll('.stat-number[data-count]');
    
    stats.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-count'));
        const id = stat.id || 'stat-' + Math.random().toString(36).substr(2, 9);
        animateCounter(id, targetValue);
    });
}

// Typing Animation - Optimized
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
    if (!typingElement) return;
    
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 30 : 80; // Faster typing
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 1500; // Reduced pause
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 300; // Faster transition
    }
    
    setTimeout(typeTitle, typeSpeed);
}

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
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

// OPTIMIZED SINGLE SCROLL HANDLER
function handleOptimizedScroll() {
    const currentScrollY = window.scrollY;
    
    // Navbar scroll effect
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.remove('visible');
    } else {
        navbar.classList.add('visible');
    }
    lastScrollY = currentScrollY;
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Parallax effect for hero section
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = currentScrollY * 0.3; // Reduced for smoother effect
        parallax.style.transform = `translate3d(0, ${speed}px, 0)`; // Use translate3d for GPU acceleration
    }
    
    ticking = false;
}

// Throttled scroll event
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(handleOptimizedScroll);
        ticking = true;
    }
});

// Contact Popup
const contactBtn = document.getElementById('contactBtn');
const contactPopup = document.getElementById('contactPopup');
const popupClose = document.getElementById('popupClose');

contactBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    contactPopup.classList.add('visible');
    document.body.style.overflow = 'hidden';
});

popupClose?.addEventListener('click', () => {
    contactPopup.classList.remove('visible');
    document.body.style.overflow = 'auto';
});

contactPopup?.addEventListener('click', (e) => {
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

// Initialize AOS (Animate On Scroll) - Optimized settings
AOS.init({
    duration: 600, // Faster animations
    easing: 'ease-out-cubic',
    once: true,
    offset: 50, // Reduced offset for earlier triggers
    disable: 'mobile' // Disable on mobile for better performance
});

// Gallery lightbox effect - Optimized
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        
        // Create optimized lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <img src="${img.src}" alt="${img.alt || ''}" class="lightbox-image">
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Add to CSS for smooth animations
        requestAnimationFrame(() => {
            lightbox.classList.add('visible');
        });
        
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('visible');
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });
});

// OPTIMIZED Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px' // Reduced margin for earlier triggers
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animations for skill tags
            if (entry.target.classList.contains('skill-category')) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.classList.add('visible'); // Use CSS class instead of inline styles
                    }, index * 50); // Faster stagger
                });
            }
            
            // Trigger counter animations
            if (entry.target.classList.contains('hero-stats')) {
                animateStats();
            }
            
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-category, .hero-stats').forEach(el => {
    observer.observe(el);
});

// DOMContentLoaded optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize skill tag animations with CSS classes
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.classList.add('skill-tag-hidden'); // Use CSS class
    });
    
    // Preload critical animations
    requestIdleCallback(() => {
        // Any non-critical initializations go here
        console.log(`
🎉 Welcome to Arulmohan P's Portfolio!
🚀 Built with modern web technologies
💼 DevOps Engineer & Cloud Architect
📧 Contact: iamarulmohan333@gmail.com
        `);
    });
});
