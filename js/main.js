document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to Top Button
   document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) { // Check if button exists


        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
    
    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Course Carousel
    const courseTrack = document.querySelector('.course-track');
    const courseCards = document.querySelectorAll('.course-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentPosition = 0;
    const cardWidth = courseCards[0].offsetWidth + 24; // width + gap
    
    function updateCarousel() {
        courseTrack.style.transform = `translateX(-${currentPosition}px)`;
        
        // Disable prev button if at start
        prevBtn.disabled = currentPosition === 0;
        
        // Disable next button if at end
        const maxPosition = (courseCards.length - 3) * cardWidth;
        nextBtn.disabled = currentPosition >= maxPosition;
    }
    
    prevBtn.addEventListener('click', () => {
        currentPosition = Math.max(0, currentPosition - cardWidth);
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        const maxPosition = (courseCards.length - 3) * cardWidth;
        currentPosition = Math.min(maxPosition, currentPosition + cardWidth);
        updateCarousel();
    });
    
    // Initialize carousel buttons
    updateCarousel();
    
    // Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('.stars i');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const email = document.getElementById('reviewEmail').value;
        const course = document.getElementById('reviewCourse').value;
        const rating = ratingInput.value;
        const message = document.getElementById('reviewMessage').value;
        
        if (!name || !email || !course || rating === '0' || !message) {
            alert('Please fill all fields and provide a rating');
            return;
        }
        
        // Here you would typically send the data to a server
        console.log('Review Submitted:', { name, email, course, rating, message });
        
        alert('Thank you for your review!');
        reviewForm.reset();
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
        ratingInput.value = '0';
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        // Here you would typically send the data to a server
        console.log('Newsletter Subscription:', email);
        
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
    
    // Initialize animations when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .stat-item, .course-card, .partner-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});