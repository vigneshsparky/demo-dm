document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const track = document.querySelector('.course-track');
    const cards = document.querySelectorAll('.course-card');
    const nextBtn = document.querySelector('.next-btn-cr');
    const prevBtn = document.querySelector('.prev-btn-cr');
    const cardWidth = cards[0].offsetWidth + 24; // width + gap
    
    let currentPosition = 0;
    const maxPosition = -((cards.length - 3) * cardWidth);
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (currentPosition > maxPosition) {
            currentPosition -= cardWidth;
            track.style.transform = `translateX(${currentPosition}px)`;
            animateCards('next');
        }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentPosition < 0) {
            currentPosition += cardWidth;
            track.style.transform = `translateX(${currentPosition}px)`;
            animateCards('prev');
        }
    });
    
    // Card animation for carousel
    function animateCards(direction) {
        const visibleCards = Array.from(cards).filter(card => {
            const rect = card.getBoundingClientRect();
            return rect.right > 0 && rect.left < window.innerWidth;
        });
        
        visibleCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = direction === 'next' ? 'translateX(20px)' : 'translateX(-20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
                
                // Remove transition after animation completes
                setTimeout(() => {
                    card.style.transition = '';
                }, 300);
            }, index * 100);
        });
    }
    
    // Category filtering
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            const category = this.dataset.category;
            filterCourses(category);
        });
    });
    
    function filterCourses(category) {
        const cards = document.querySelectorAll('.course-card');
        
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                // Add animation
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Reset carousel position when filtering
        currentPosition = 0;
        track.style.transform = 'translateX(0)';
    }
    
    // Add keyframe animation for filtering
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize carousel buttons visibility
    updateCarouselButtons();
    
    // Update carousel buttons on resize
    window.addEventListener('resize', function() {
        updateCarouselButtons();
    });
    
    function updateCarouselButtons() {
        if (window.innerWidth < 992) {
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
            prevBtn.style.display = 'flex';
        }
    }
});