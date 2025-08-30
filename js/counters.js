document.addEventListener('DOMContentLoaded', function() {
    // Animated Counters
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the faster
    
    function animateCounters() {
        statNumbers.forEach(statNumber => {
            const target = +statNumber.getAttribute('data-count');
            const count = +statNumber.innerText;
            const increment = target / speed;
            
            if (count < target) {
                statNumber.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                statNumber.innerText = target;
            }
        });
    }
    
    // Start counters when stats section is in view
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
});