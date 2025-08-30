class FAQ {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.items = Array.from(this.container.querySelectorAll('.faq-item'));
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        // Close all FAQs by default
        this.closeAll();
    }
    
    setupEventListeners() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            const icon = item.querySelector('.faq-icon');
            
            // Click on question or icon
            question.addEventListener('click', (e) => this.toggleItem(item, e));
            icon.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent double trigger from question click
                this.toggleItem(item, e);
            });
            
            // Keyboard accessibility
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleItem(item, e);
                }
            });
        });
    }
    
    toggleItem(item, event) {
        event.preventDefault();
        const isOpening = !item.classList.contains('active');
        
        // Close all items if we're opening this one
        if (isOpening) {
            this.closeAll();
        }
        
        // Toggle current item
        item.classList.toggle('active');
        
        // Smooth scroll to keep item in view when opening
        if (isOpening) {
            setTimeout(() => {
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }
    
    closeAll() {
        this.items.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    openItem(item) {
        this.closeAll();
        item.classList.add('active');
    }
}

// Initialize FAQ sections
document.addEventListener('DOMContentLoaded', () => {
    const faq = new FAQ('.faq-container');
    
    // Optional: Open a specific FAQ if URL has hash
    if (window.location.hash) {
        const targetItem = document.querySelector(window.location.hash);
        if (targetItem && targetItem.classList.contains('faq-item')) {
            faq.openItem(targetItem);
        }
    }
});