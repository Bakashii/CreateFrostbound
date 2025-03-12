// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize background circles
    createBackgroundCircles();
    
    // Initialize snowfall with randomized initial positions
    createNaturalSnowfall();
    
    // Initialize animations
    initAnimations();
    
    // Track mouse movement for card glow effect
    trackMouseForGlow();
    
    // Gallery interaction
    initGallery();
    
    // Ensure page is responsive
    ensureResponsiveness();
});

// Create floating background circles with improved positioning
function createBackgroundCircles() {
    const colors = ['#88c0d0', '#81a1c1', '#5e81ac', '#b48ead'];
    const circlesContainer = document.getElementById('bg-circles');
    
    // Clear any existing circles
    circlesContainer.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        const circle = document.createElement('div');
        circle.classList.add('bg-circle');
        
        // More controlled random properties for professional appearance
        const size = 200 + (i * 50) % 300; // More consistent sizing
        const color = colors[i % colors.length]; // Cycle through colors
        
        // Position circles more strategically across the screen
        const positions = [
            {x: '10%', y: '20%'}, 
            {x: '70%', y: '15%'}, 
            {x: '20%', y: '70%'}, 
            {x: '80%', y: '60%'},
            {x: '40%', y: '30%'},
            {x: '60%', y: '80%'}
        ];
        
        // Set styles
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = positions[i].x;
        circle.style.top = positions[i].y;
        circle.style.backgroundColor = color;
        
        circlesContainer.appendChild(circle);
        
        // Animate with anime.js - more subtle, professional movement
        anime({
            targets: circle,
            translateX: () => anime.random(-40, 40),
            translateY: () => anime.random(-40, 40),
            scale: [
                {value: 0.9, duration: 20000, easing: 'easeInOutSine'},
                {value: 1.05, duration: 20000, easing: 'easeInOutSine'}
            ],
            opacity: [
                {value: 0.2, duration: 20000, easing: 'easeInOutSine'},
                {value: 0.4, duration: 20000, easing: 'easeInOutSine'}
            ],
            duration: 40000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }
}

// Create natural snowfall effect with improved performance
function createNaturalSnowfall() {
    const snowfallContainer = document.getElementById('snowfall');
    const snowflakeCount = Math.min(window.innerWidth / 10, 100); // Responsive snowflake count
    
    // Clear any existing snowflakes
    snowfallContainer.innerHTML = '';
    
    // Create initial snowflakes with random positions throughout the screen
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(snowfallContainer, true);
    }
}

// Create a snowflake element
function createSnowflake(container, isInitial = false) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Random properties
    const size = Math.random() * 3 + 1; // Smaller snowflakes for more professional look
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const startPositionX = Math.random() * windowWidth;
    
    // If initial creation, position randomly throughout screen, otherwise at top
    const startPositionY = isInitial ? Math.random() * windowHeight : Math.random() * -20 - 10;
    
    const startOpacity = 0.5 + Math.random() * 0.5;
    const duration = Math.random() * 15000 + 15000;
    const remainingDuration = isInitial 
        ? (1 - (startPositionY / windowHeight)) * duration
        : duration;
    
    // Set initial styles
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${startPositionX}px`;
    snowflake.style.top = `${startPositionY}px`;
    snowflake.style.opacity = startOpacity.toString();
    
    container.appendChild(snowflake);
    
    // Animate with anime.js - more subtle, controlled drift
    anime({
        targets: snowflake,
        translateY: windowHeight - startPositionY + 10,
        translateX: () => {
            const drift = size * 20; // Smaller snowflakes drift less
            return anime.random(-drift, drift);
        },
        opacity: [
            { value: startOpacity, duration: 0 },
            { value: startOpacity, duration: remainingDuration * 0.8 },
            { value: 0, duration: remainingDuration * 0.2 }
        ],
        duration: remainingDuration,
        easing: 'linear',
        complete: function() {
            snowflake.remove();
            createSnowflake(container);
        }
    });
}

// Initialize entrance animations with more professional timing and effects
function initAnimations() {
    // Staggered animation sequence for professional reveal
    const timeline = anime.timeline({
        easing: 'cubicBezier(0.16, 1, 0.3, 1)'
    });
    
    // Logo animation
    timeline.add({
        targets: '#logo',
        scale: [0, 1],
        opacity: [0, 1],
        rotate: [20, 0],
        duration: 800,
    });
    
    // Title animation
    timeline.add({
        targets: '.title-section',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 700,
    }, '-=400');
    
    // Download button animation
    timeline.add({
        targets: '.download-section',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 700,
    }, '-=400');
    
    // Card animation
    timeline.add({
        targets: '#divider',
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 600,
    }, '-=200');
    
    // Feature animations with staggered effect
    timeline.add({
        targets: '.feature',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(100)
    }, '-=300');
    
    // Gallery section animation
    timeline.add({
        targets: '#gallery-section',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=200');
    
    // Gallery items with staggered effect
    timeline.add({
        targets: '.gallery-item',
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(150)
    }, '-=500');
}

// Improved mouse tracking for smoother, more professional glow effect
function trackMouseForGlow() {
    const card = document.getElementById('main-card');
    const cardGlow = document.querySelector('.card-glow');
    
    let previousX = 0;
    let previousY = 0;
    const easingFactor = 0.15; // For smoother transitions
    
    document.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        // Calculate distance from mouse to card center (normalized)
        const distanceX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
        const distanceY = (e.clientY - cardCenterY) / (window.innerHeight / 2);
        
        // Apply easing for smoother effect
        const targetX = distanceX * 0.5; // Control the glow movement amount
        const targetY = distanceY * 0.5;
        
        // Interpolate between previous and target positions for smoothing
        const newX = previousX + (targetX - previousX) * easingFactor;
        const newY = previousY + (targetY - previousY) * easingFactor;
        
        // Update the glow position
        cardGlow.style.transform = `translate(${-50 + newX * 50}%, ${-50 + newY * 50}%)`;
        
        // Store for next frame
        previousX = newX;
        previousY = newY;
    });
    
    // Reset when mouse leaves the document
    document.addEventListener('mouseleave', () => {
        anime({
            targets: cardGlow,
            translateX: '-50%',
            translateY: '-50%',
            duration: 1000,
            easing: 'easeOutExpo'
        });
        previousX = 0;
        previousY = 0;
    });
}

// Initialize gallery interaction
function initGallery() {
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Set up dot navigation
    galleryDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            galleryDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to current dot
            dot.classList.add('active');
            
            // If there were multiple gallery pages, this would handle switching
            // In a real implementation, you would slide to different gallery views
            // For now, we'll just keep it simple
            
            // Simple visual feedback
            anime({
                targets: galleryItems,
                scale: [1, 0.95, 1],
                opacity: [1, 0.8, 1],
                duration: 800,
                easing: 'easeInOutSine'
            });
        });
    });
    
    // Add hover effects to gallery items
    galleryItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Ensure the page is responsive with proper adjustments
function ensureResponsiveness() {
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recreate snowfall with appropriate density
        createNaturalSnowfall();
        
        // Adjust any other responsive elements as needed
        // For example, we might need to adjust animations or layouts
        
        // Update background circles positioning
        const circles = document.querySelectorAll('.bg-circle');
        circles.forEach((circle, index) => {
            // Scale size based on window width
            const baseSize = 200 + (index * 50) % 300;
            const scaleFactor = Math.min(1, window.innerWidth / 1200);
            const size = baseSize * scaleFactor;
            
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
        });
    });
    
    // Handle download button click
// Handle download button click
const downloadBtn = document.getElementById('download-btn');
const modal = document.getElementById('download-modal');
const modalClose = document.getElementById('modal-close');
const manualDownload = document.getElementById('manual-download');

if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Add download animation
        anime({
            targets: downloadBtn,
            scale: [1, 0.95, 1],
            duration: 400,
            easing: 'easeInOutQuad'
        });
        
        // Show the modal
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // In a real application, you would start the actual download here
        // For example: window.location.href = 'your-download-file.zip';
    });
}

// Close modal when clicking X button
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
}

// Handle manual download click
if (manualDownload) {
    manualDownload.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real application, you would trigger the download here
        console.log('Manual download clicked');
        // For example: window.location.href = 'your-download-file.zip';
    });
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});
}
// Add glow effect to download button
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-btn');
    
    downloadBtn.addEventListener('mouseenter', () => {
        anime({
            targets: downloadBtn,
            boxShadow: '0 0 20px rgba(136, 192, 208, 0.5)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    downloadBtn.addEventListener('mouseleave', () => {
        anime({
            targets: downloadBtn,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    // Click animation
    downloadBtn.addEventListener('click', (e) => {
        // Prevent default button behavior
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.pointerEvents = 'none';
        
        const rect = downloadBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        downloadBtn.appendChild(ripple);
        
        anime({
            targets: ripple,
            scale: 3,
            opacity: [0.7, 0],
            duration: 800,
            easing: 'easeOutExpo',
            complete: function() {
                ripple.remove();
                // Simulate download action
                window.location.href = '#download';
            }
        });
    });
});