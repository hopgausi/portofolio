// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('nav-active');
        });
    }

    // Scroll animations for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.about-text, .skill-card, .project-card, .contact-form');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Create particles for hero section
    createParticles();

    // Initialize skill percentage animations
    initSkillPercentages();

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

// Function to create particles in the hero section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        // Random size
        const size = Math.random() * 3 + 1;

        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3;

        // Set styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;

        // Add animation
        particle.style.animation = `float ${Math.random() * 6 + 3}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}

// Function to initialize skill percentage animations
function initSkillPercentages() {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        const percent = card.getAttribute('data-percent');
        if (percent) {
            const percentBar = card.querySelector('.skill-percent');
            if (percentBar) {
                setTimeout(() => {
                    percentBar.style.width = `${percent}%`;
                }, 500);
            }
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        }
    });
});

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const replyTo = document.getElementById('reply-to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate form (simple validation)
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    // Here you would typically send the data to a server
    // For demo purposes, we'll just show a success message
    console.log(`Message details:
        From: ${name} (${email})
        To: ${replyTo}
        Subject: ${subject}
        Message: ${message}
    `);

    // Clear form but keep the reply-to field
    const replyToValue = document.getElementById('reply-to').value;
    document.getElementById('contactForm').reset();
    document.getElementById('reply-to').value = replyToValue;

    // Show success message
    showFormMessage(`Your message has been sent successfully to ${replyTo}!`, 'success');
}

// Show form message (success or error)
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Add to form
    const form = document.getElementById('contactForm');
    form.appendChild(messageElement);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}
