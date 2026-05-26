// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Glitch Effect Animation
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    const text = glitchText.textContent;
    
    glitchText.addEventListener('mouseover', () => {
        glitchText.textContent = '';
        let index = 0;
        
        const interval = setInterval(() => {
            glitchText.textContent += text[index];
            index++;
            
            if (index === text.length) {
                clearInterval(interval);
            }
        }, 50);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and skill categories
const cards = document.querySelectorAll('.project-card, .skill-category, .stat, .about-content');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Cursor Glow Effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create subtle background effect (optional)
    const elements = document.querySelectorAll('a, button');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const distance = Math.hypot(x - (rect.left + rect.width / 2), y - (rect.top + rect.height / 2));
        
        if (distance < 100) {
            el.style.boxShadow = `0 0 ${Math.max(20, 100 - distance)}px rgba(0, 255, 136, 0.5)`;
        } else {
            el.style.boxShadow = '';
        }
    });
});

// CTA Button Animation
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        ctaButton.style.animation = 'none';
        setTimeout(() => {
            ctaButton.style.animation = '';
        }, 10);
        
        // Show a toast message
        showNotification('Welcome to the game!');
    });
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.9), rgba(128, 0, 255, 0.9));
        color: #050811;
        padding: 1rem 2rem;
        border-radius: 5px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
        animation: slideIn 0.3s ease-out;
        letter-spacing: 1px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Project Cards Interaction
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const projectName = card.querySelector('.project-info h3').textContent;
        showNotification(`${projectName} - Coming Soon!`);
    });
});

// Navigation active state
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary)';
            link.style.textShadow = '0 0 10px var(--primary)';
        } else {
            link.style.color = '';
            link.style.textShadow = '';
        }
    });
});

// Parallax Effect (subtle)
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const neounBorder = document.querySelector('.neon-border');
    
    if (neounBorder) {
        neounBorder.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'H' to go home
    if (e.key.toLowerCase() === 'h') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'C' to go to contact
    if (e.key.toLowerCase() === 'c') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add some interactivity to skills
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    const skills = category.querySelectorAll('li');
    
    skills.forEach((skill, index) => {
        skill.style.animation = `fadeInLeft ${0.3 + index * 0.1}s ease-out forwards`;
        skill.style.opacity = '0';
    });
});

// Add fade-in-left animation to stylesheet
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(styleSheet);

// Logger for debugging (can be removed in production)
console.log('%c🎮 GAMER CYBER 🎮', 'color: #00ff88; font-size: 20px; text-shadow: 0 0 10px #00ff88; font-weight: bold;');
console.log('%cWelcome to GamerCyber Portfolio!', 'color: #ff006e; font-size: 14px; font-weight: bold;');
console.log('%cTip: Press H to go home, C to go to contact', 'color: #8000ff; font-size: 12px;');
