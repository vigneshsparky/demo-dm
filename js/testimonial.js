document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const testimonialDots = document.querySelector('.testimonial-dots');
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize dots
    function initDots() {
        testimonialDots.innerHTML = '';
        const slides = document.querySelectorAll('.testimonial-slide');
        
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            testimonialDots.appendChild(dot);
        });
    }
    
    // Show specific slide
    function showSlide(index) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        
        // Reset all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Set new active slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        
        // Reset auto-rotation timer
        resetInterval();
    }
    
    // Auto-rotate testimonials
    function startInterval() {
        const slides = document.querySelectorAll('.testimonial-slide');
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Star rating in form
    const stars = document.querySelectorAll('.stars-outline i');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        // Hover effect
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach((s, i) => {
                if (i < hoverRating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
    
    // Image preview
    const imageInput = document.getElementById('reviewImage');
    const imagePreview = document.createElement('div');
    imagePreview.classList.add('image-preview');
    imageInput.parentNode.appendChild(imagePreview);
    
    imageInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            imagePreview.style.display = 'none';
        }
    });
    
    // Form submission
    const reviewForm = document.getElementById('reviewForm');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('reviewName').value;
        const email = document.getElementById('reviewEmail').value;
        const position = document.getElementById('reviewPosition').value;
        const location = document.getElementById('reviewLocation').value;
        const course = document.getElementById('reviewCourse').value;
        const rating = parseInt(document.getElementById('reviewRating').value);
        const message = document.getElementById('reviewMessage').value;
        const imageFile = document.getElementById('reviewImage').files[0];
        
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        
        // Create new testimonial slide
        const newTestimonial = document.createElement('div');
        newTestimonial.classList.add('testimonial-slide', 'new-testimonial');
        
        // Generate star rating HTML
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        
        // Handle image
        let imageSrc = 'images/student-default.png';
        if (imageFile) {
            imageSrc = URL.createObjectURL(imageFile);
        }
        
        // Set testimonial content
        newTestimonial.innerHTML = `
            <div class="testimonial-text">"${message}"</div>
            <div class="testimonial-author">
                <div class="author-img">
                    <img src="${imageSrc}" alt="${name}">
                </div>
                <div class="author-info">
                    <h4>${name}</h4>
                    <p>${position}, ${location}</p>
                    <div class="course-badge">${getCourseName(course)}</div>
                    <div class="rating">
                        ${starsHtml}
                    </div>
                </div>
            </div>
        `;
        
        // Add to carousel
        testimonialCarousel.appendChild(newTestimonial);
        
        // Reset form
        reviewForm.reset();
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
        ratingInput.value = '0';
        imagePreview.style.display = 'none';
        imagePreview.innerHTML = '';
        
        // Reinitialize dots and show the new testimonial
        initDots();
        showSlide(document.querySelectorAll('.testimonial-slide').length - 1);
        
        // Show success message
        alert('Thank you for your review! Your testimonial has been added.');
    });
    
    // Helper function to get course name
    function getCourseName(value) {
        const courses = {
            'web': 'Web Development',
            'python': 'Python & AI',
            'mobile': 'Mobile App Development',
            'design': 'Graphic Design',
            'marketing': 'Digital Marketing'
        };
        return courses[value] || '';
    }
    
    // Initialize
    initDots();
    startInterval();
});