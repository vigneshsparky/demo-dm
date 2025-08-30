// js/modules/carousel/carousel.js

class Carousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.options = {
            slidesToShow: 3,
            infinite: false,
            autoplay: false,
            autoplaySpeed: 3000,
            ...options
        };
        
        this.track = this.container.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.prevBtn = this.container.querySelector('.carousel-prev');
        this.nextBtn = this.container.querySelector('.carousel-next');
        this.dots = this.container.querySelectorAll('.carousel-dot');
        
        this.currentIndex = 0;
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Set slide positions
        this.setSlidePositions();
        
        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        if (this.dots.length > 0) {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.slideWidth = this.slides[0].getBoundingClientRect().width;
            this.setSlidePositions();
            this.goTo(this.currentIndex);
        });
        
        // Autoplay
        if (this.options.autoplay) {
            this.startAutoplay();
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }
    
    setSlidePositions() {
        this.slides.forEach((slide, index) => {
            slide.style.left = `${this.slideWidth * index}px`;
        });
    }
    
    updateCarousel() {
        this.track.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
        
        // Update dots
        if (this.dots.length > 0) {
            this.dots.forEach(dot => dot.classList.remove('active'));
            this.dots[this.currentIndex].classList.add('active');
        }
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0 && !this.options.infinite;
        }
        
        if (this.nextBtn) {
            const lastIndex = this.slides.length - this.options.slidesToShow;
            this.nextBtn.disabled = this.currentIndex >= lastIndex && !this.options.infinite;
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else if (this.options.infinite) {
            this.currentIndex = this.slides.length - this.options.slidesToShow;
        }
        this.updateCarousel();
    }
    
    next() {
        const lastIndex = this.slides.length - this.options.slidesToShow;
        if (this.currentIndex < lastIndex) {
            this.currentIndex++;
        } else if (this.options.infinite) {
            this.currentIndex = 0;
        }
        this.updateCarousel();
    }
    
    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    startAutoplay() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = setInterval(() => this.next(), this.options.autoplaySpeed);
    }
    
    stopAutoplay() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    }
}

// Initialize all carousels with data-carousel attribute
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-carousel]').forEach(container => {
        const options = JSON.parse(container.dataset.carouselOptions || '{}');
        new Carousel(`#${container.id}`, options);
    });
});