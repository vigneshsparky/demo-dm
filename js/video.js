class VideoCarousel {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.track = this.container.querySelector('.video-track');
        this.videos = Array.from(this.container.querySelectorAll('.video-item'));
        this.prevBtn = this.container.querySelector('.video-prev');
        this.nextBtn = this.container.querySelector('.video-next');
        this.currentIndex = 0;
        this.videoWidth = this.videos[0].offsetWidth;
        this.gap = 30;
        
        this.init();
        this.updateButtonStates();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    init() {
        // Set up event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Initialize video elements
        this.videoElements = this.videos.map(video => video.querySelector('video'));
        
        // Handle video interactions
        this.videoElements.forEach(video => {
            if (video) {
                // Allow default controls to work
                video.addEventListener('click', (e) => {
                    // Don't prevent default behavior
                    e.stopPropagation();
                });
                
                // Pause other videos when one plays
                video.addEventListener('play', () => this.pauseOtherVideos(video));
                
                // Reset video when scrolling away
                video.addEventListener('pause', () => {
                    if (!document.contains(video)) return;
                    const videoItem = video.closest('.video-item');
                    const itemRect = videoItem.getBoundingClientRect();
                    const containerRect = this.container.getBoundingClientRect();
                    
                    // If video is not visible in the viewport
                    if (itemRect.right < containerRect.left || itemRect.left > containerRect.right) {
                        video.currentTime = 0;
                    }
                });
            }
        });
        
        // Initialize Intersection Observer to handle visibility
        this.initIntersectionObserver();
    }
    
    initIntersectionObserver() {
        const options = {
            root: this.container,
            threshold: 0.7
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (!video) return;
                
                if (!entry.isIntersecting) {
                    video.pause();
                }
            });
        }, options);
        
        this.videos.forEach(video => {
            this.observer.observe(video);
        });
    }
    
    handleResize() {
        this.videoWidth = this.videos[0].offsetWidth;
        this.scrollToCurrent();
    }
    
    scrollToCurrent() {
        const scrollPosition = this.currentIndex * (this.videoWidth + this.gap);
        this.track.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    updateButtonStates() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.videos.length - 1;
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.scrollToCurrent();
            this.updateButtonStates();
        }
    }
    
    next() {
        if (this.currentIndex < this.videos.length - 1) {
            this.currentIndex++;
            this.scrollToCurrent();
            this.updateButtonStates();
        }
    }
    
    pauseOtherVideos(currentVideo) {
        this.videoElements.forEach(video => {
            if (video && video !== currentVideo && !video.paused) {
                video.pause();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VideoCarousel('.video-carousel');
});