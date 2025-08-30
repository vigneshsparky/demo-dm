// js/modules/admin/reviewmanagement.js

document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.review-list').forEach(list => {
                list.style.display = 'none';
            });
            
            document.getElementById(`${this.dataset.tab}Reviews`).style.display = 'block';
        });
    });
});

function loadReviews() {
    // Simulate API calls
    setTimeout(() => {
        const pendingReviews = [
            {
                id: 1,
                student: {
                    name: "Rahul Sharma",
                    avatar: "../images/students/student1.jpg",
                    course: "Full Stack Development"
                },
                rating: 4,
                comment: "The course was very comprehensive and covered all the topics I expected. The instructor was knowledgeable.",
                date: "2023-06-15",
                status: "pending"
            }
        ];
        
        const approvedReviews = [
            {
                id: 2,
                student: {
                    name: "Priya Patel",
                    avatar: "../images/students/student2.jpg",
                    course: "Data Science"
                },
                rating: 5,
                comment: "Excellent course! The hands-on projects really helped me understand the concepts better.",
                date: "2023-05-20",
                status: "approved"
            }
        ];
        
        const testimonials = [
            {
                id: 3,
                student: {
                    name: "Amit Kumar",
                    avatar: "../images/students/student3.jpg",
                    course: "Digital Marketing",
                    company: "Tech Solutions Inc."
                },
                rating: 5,
                comment: "This course completely transformed my career. I got promoted within 3 months of completion!",
                date: "2023-04-10",
                status: "testimonial",
                video: "../videos/testimonial1.mp4"
            }
        ];
        
        renderReviews(pendingReviews, 'pendingReviews');
        renderReviews(approvedReviews, 'approvedReviews');
        renderTestimonials(testimonials, 'testimonials');
    }, 800);
}

function renderReviews(reviews, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = reviews.map(review => `
        <div class="review-item" data-id="${review.id}">
            <div class="review-header">
                <div class="review-user">
                    <img src="${review.student.avatar}" alt="${review.student.name}">
                    <div>
                        <h4>${review.student.name}</h4>
                        <div class="rating">
                            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                            ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                        </div>
                        <small>${review.student.course}</small>
                    </div>
                </div>
                <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
            ${review.status === 'pending' ? `
            <div class="review-actions">
                <button class="btn btn-small btn-success approve-btn">
                    <i class="fas fa-check"></i> Approve
                </button>
                <button class="btn btn-small btn-danger reject-btn">
                    <i class="fas fa-times"></i> Reject
                </button>
                <button class="btn btn-small btn-primary edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
            ` : ''}
        </div>
    `).join('');
    
    // Add event listeners
    if (review.status === 'pending') {
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', () => approveReview(btn.closest('.review-item').dataset.id));
        });
        
        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', () => rejectReview(btn.closest('.review-item').dataset.id));
        });
    }
}

function renderTestimonials(testimonials, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = testimonials.map(testimonial => `
        <div class="review-item" data-id="${testimonial.id}">
            <div class="review-header">
                <div class="review-user">
                    <img src="${testimonial.student.avatar}" alt="${testimonial.student.name}">
                    <div>
                        <h4>${testimonial.student.name}</h4>
                        <div class="rating">
                            ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                        </div>
                        <small>${testimonial.student.course} | ${testimonial.student.company}</small>
                    </div>
                </div>
                <span class="review-date">${new Date(testimonial.date).toLocaleDateString()}</span>
            </div>
            <div class="review-content">
                <p>${testimonial.comment}</p>
                ${testimonial.video ? `
                <div class="video-review">
                    <video controls>
                        <source src="${testimonial.video}" type="video/mp4">
                    </video>
                </div>
                ` : ''}
            </div>
            <div class="review-actions">
                <button class="btn btn-small btn-primary feature-btn">
                    <i class="fas fa-home"></i> Feature on Homepage
                </button>
                <button class="btn btn-small btn-danger remove-btn">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
}

function approveReview(id) {
    // Simulate API call
    setTimeout(() => {
        alert(`Review #${id} approved!`);
        loadReviews();
    }, 800);
}

function rejectReview(id) {
    if (confirm('Are you sure you want to reject this review?')) {
        // Simulate API call
        setTimeout(() => {
            alert(`Review #${id} rejected!`);
            loadReviews();
        }, 800);
    }
}