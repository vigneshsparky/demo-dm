
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.close-modal');
    
    // Get all view sample buttons
    const viewButtons = document.querySelectorAll('.btn.btn-small');
    
    // Add click event to each button
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.certificate-card');
            const imgSrc = card.querySelector('.certificate-img img').src;
            const title = card.querySelector('h3').textContent;
            
            modal.style.display = "block";
            modalImg.src = imgSrc;
            captionText.textContent = title;
            
            // Disable body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
});
