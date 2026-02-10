// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }

    // Optional: Hide navbar on scroll down, show on scroll up
    // if (currentScroll > lastScroll && currentScroll > 100) {
    //     navbar.style.transform = 'translateY(-100%)';
    // } else {
    //     navbar.style.transform = 'translateY(0)';
    // }

    lastScroll = currentScroll;
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Observe section headers
document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Observe cards and items
document.querySelectorAll('.stat-card, .skill-category, .education-card, .contact-card, .timeline-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== TYPING EFFECT FOR HERO (Optional Enhancement) =====
// Uncomment if you want a typing effect
/*
const heroTitle = document.querySelector('.hero-title-accent');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
}
*/

// ===== PARALLAX EFFECT FOR HERO BACKGROUND =====
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
    });
}

// ===== COUNTER ANIMATION FOR STATS =====
const stats = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isNumber = !isNaN(target.replace(/[^0-9]/g, ''));
    
    if (isNumber) {
        const number = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < number) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ===== CURSOR EFFECT (Optional Enhancement) =====
// Uncomment for custom cursor
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    cursorX += (mouseX - cursorX) * 0.9;
    cursorY += (mouseY - cursorY) * 0.9;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animate);
}

animate();

// Add styles for custom cursor
const style = document.createElement('style');
style.textContent = `
    .custom-cursor, .cursor-follower {
        position: fixed;
        pointer-events: none;
        z-index: 10000;
    }
    
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: var(--hover-accent);
        border-radius: 50%;
        margin: -5px 0 0 -5px;
    }
    
    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid var(--stone-grey);
        border-radius: 50%;
        margin: -20px 0 0 -20px;
    }
    
    * {
        cursor: none !important;
    }
`;
document.head.appendChild(style);
*/

// ===== PREVENT FLASH OF UNSTYLED CONTENT =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== LOG FOR DEBUGGING =====
console.log('%c Portfolio Loaded Successfully ', 'background: #2b2d2e; color: #e8e8e8; padding: 10px; font-size: 14px; font-weight: bold;');
console.log('%c Fayiz Mujeeb - Finance Professional ', 'background: #7d7d7d; color: #1a1a1a; padding: 5px; font-size: 12px;');