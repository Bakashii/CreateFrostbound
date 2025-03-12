document.addEventListener('DOMContentLoaded', function() {
    // Create snowflakes
    createSnowflakes();
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Download button functionality
    setupDownloadButton();
    
    // Add animation classes to elements
    setupAnimations();
});

// Create snowflakes in the background
function createSnowflakes() {
    const snowfall = document.querySelector('.snowfall');
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Random properties for each snowflake
        const size = Math.random() * 5 + 3;
        const posX = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${posX}%`;
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.animationDuration = `${duration}s`;
        
        snowflake.style.position = 'absolute';
        snowflake.style.top = '-10px';
        snowflake.style.borderRadius = '50%';
        snowflake.style.background = 'white';
        snowflake.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.animation = `fall ${duration}s linear infinite`;
        
        snowfall.appendChild(snowflake);
    }
    
    // Add the CSS animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Animate elements when they come into view
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    // Add animation classes to elements
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    document.querySelectorAll('.feature').forEach((feature, index) => {
        if (index % 2 === 0) {
            feature.classList.add('slide-in-left');
        } else {
            feature.classList.add('slide-in-right');
        }
        feature.style.transitionDelay = `${index * 0.1 + 0.3}s`;
        observer.observe(feature);
    });
    
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.add('slide-in-left');
        step.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(step);
    });
}

// Setup download button functionality
function setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', function() {
        // Change this URL to your actual download link
        const downloadUrl = 'https://github.com/yourusername/frozen-gears/releases/latest/download/frozen-gears.zip';
        
        // Add frost effect animation
        this.classList.add('frost-effect');
        this.textContent = 'Downloading...';
        
        // Create frost particles
        createFrostParticles(this);
        
        setTimeout(() => {
            window.location.href = downloadUrl;
            this.classList.remove('frost-effect');
            this.textContent = 'Download Modpack';
        }, 1200);
    });
}

// Create frost particles when button is clicked
function createFrostParticles(button) {
    const particleCount = 20;
    const buttonRect = button.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random properties for each particle
        const size = Math.random() * 8 + 4;
        const posX = buttonRect.left + Math.random() * buttonRect.width;
        const posY = buttonRect.top + Math.random() * buttonRect.height;
        const duration = Math.random() * 1.5 + 0.5;
        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.position = 'fixed';
        particle.style.top = `${posY}px`;
        particle.style.left = `${posX}px`;
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        // Animation properties
        particle.style.animation = `frostParticle ${duration}s ease-out forwards`;
        particle.style.transform = `translate(0, 0) scale(0)`;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            document.body.removeChild(particle);
        }, duration * 1000);
    }
    
    // Add the CSS animation
    if (!document.querySelector('#frost-particles-keyframes')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'frost-particles-keyframes';
        styleSheet.textContent = `
            @keyframes frostParticle {
                0% {
                    transform: translate(0, 0) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(cos(var(--angle)) * var(--distance)), calc(sin(var(--angle)) * var(--distance))) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Add initial animations
function setupAnimations() {
    // Delay the header animation for a smoother initial load
    setTimeout(() => {
        document.querySelector('header').classList.add('fade-in', 'active');
    }, 200);
    
    // Stagger the animation of features
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.style.transitionDelay = `${index * 0.2}s`;
    });
}