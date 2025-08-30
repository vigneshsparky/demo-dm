// js/main.js

import { SmoothScroll } from './modules/ui/scroll.js';
import { FAQ } from './modules/ui/faq.js';
import { Carousel } from './modules/carousel/carousel.js';
import { TestimonialCarousel } from './modules/carousel/testimonial.js';
import { VideoCarousel } from './modules/carousel/video.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI components
    new SmoothScroll();
    new FAQ('.faq-container');
    
    // Initialize carousels
    new Carousel('.courses-carousel', {
        slidesToShow: 3,
        infinite: false
    });
    
    new TestimonialCarousel('.testimonial-carousel');
    new VideoCarousel('.video-carousel');
    
    // Admin-specific initializations
    if (document.body.classList.contains('admin-dashboard')) {
        import('./modules/admin/admindashboard.js');
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});