document.addEventListener('DOMContentLoaded', function() {
    // Hero Text Animation
    const heroTitle = document.querySelector('.hero-title');
    
    // Trigger animation after a short delay
    setTimeout(() => {
        heroTitle.classList.add('animate-text');
    }, 300);
    
    // Service Card Animations
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Set delay based on index for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Partner Logo Hover Effects
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.classList.remove('grayscale');
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.classList.add('grayscale');
        });
    });
    
    // Course Card Hover Effects
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-shadow');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-shadow');
        });
    });
    
    // Floating WhatsApp Button Animation
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    setTimeout(() => {
        whatsappBtn.classList.add('bounce-animation');
    }, 1000);
    
    // Scroll Reveal Animations
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.service-card, .course-card, .partner-item, .testimonial-slide', {
        interval: 200
    });
    
    // Gradient Animation for Hero Section
    const heroSection = document.querySelector('.hero');
    
    function updateGradient() {
        const scrollPosition = window.pageYOffset;
        const gradientPosition = scrollPosition / 3;
        heroSection.style.backgroundPosition = `center ${gradientPosition}px`;
    }
    
    window.addEventListener('scroll', updateGradient);
});