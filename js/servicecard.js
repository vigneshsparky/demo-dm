 document.addEventListener('DOMContentLoaded', function () {
            const carouselInner = document.getElementById('carouselInner');
            const prevBtn = document.getElementById('prevBtnS');
            const nextBtn = document.getElementById('nextBtnS');
            const carouselIndicators = document.getElementById('carouselIndicatorsS');

            const servicesData = [
                {
                    icon: 'fas fa-laptop-code',
                    title: 'Software Training',
                    description: 'Master web, mobile, AI, and cloud technologies with hands-on projects.',
                    link: '#courses'
                },
                {
                    icon: 'fas fa-briefcase',
                    title: 'Placement Training',
                    description: 'Get interview-ready with resume building and mock interviews.',
                    link: '#internships'
                },
                {
                    icon: 'fas fa-project-diagram',
                    title: 'Academic Projects',
                    description: 'Industry-standard projects for engineering students.',
                    link: '#projects'
                },
                {
                    icon: 'fas fa-film',
                    title: 'Media & Animation',
                    description: 'Professional training in graphic design and animation software.',
                    link: '#media'
                },
                {
                    icon: 'fas fa-chart-line',
                    title: 'Digital Marketing',
                    description: 'Master SEO, social media marketing, and content strategy.',
                    link: '#marketing'
                },
                {
                    icon: 'fas fa-user-tie',
                    title: 'Internship Program',
                    description: '6-month guaranteed internship with stipend.',
                    link: '#internships'
                }
            ];

            let currentPosition = 0;

            // Generate service cards
            function generateServiceCards() {
                carouselInner.innerHTML = '';
                carouselIndicators.innerHTML = '';

                servicesData.forEach((service, index) => {
                    // Create service card
                    const serviceCard = document.createElement('div');
                    serviceCard.className = 'carousel-card';
                    serviceCard.innerHTML = `
                        <div class="card-icon">
                            <i class="${service.icon}"></i>
                        </div>
                        <h3 class="card-title">${service.title}</h3>
                        <p class="card-desc">${service.description}</p>
                        <a href="${service.link}" class="card-link">Learn More <i class="fas fa-arrow-right"></i></a>
                    `;

                    // Append service card to carousel
                    carouselInner.appendChild(serviceCard);

                    // Create indicator
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator-dot';
                    if (index === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => navigateToIndex(index));
                    carouselIndicators.appendChild(indicator);
                });

                updateCarousel();
            }

            // Update carousel based on current position
            function updateCarousel() {
                const cards = document.querySelectorAll('.carousel-card');
                const indicators = document.querySelectorAll('.indicator-dot');

                cards.forEach((card, index) => {
                    const positionDiff = index - currentPosition;
                    const absPosition = Math.abs(positionDiff);

                    // Calculate transform values
                    let translateX = positionDiff * 320;
                    let translateZ = -absPosition * 100;
                    let rotateY = positionDiff * 15;
                    let scale = 1 - absPosition * 0.2;
                    let opacity = 1 - absPosition * 0.3;

                    // Center item
                    if (positionDiff === 0) {
                        translateZ = 0;
                        scale = 1;
                        opacity = 1;
                    }

                    // Apply transforms
                    card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
                    card.style.opacity = opacity;
                    card.style.zIndex = cards.length - absPosition;
                });

                // Update indicators
                indicators.forEach((indicator, index) => {
                    if (index === currentPosition) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });

                // Update button states
                prevBtn.disabled = currentPosition === 0;
                nextBtn.disabled = currentPosition === servicesData.length - 1;
            }

            // Navigate to specific index
            function navigateToIndex(index) {
                currentPosition = index;
                if (currentPosition < 0) currentPosition = servicesData.length - 1;
                if (currentPosition >= servicesData.length) currentPosition = 0;

                updateCarousel();
            }

            // Next service
            function nextService() {
                navigateToIndex(currentPosition + 1);
            }

            // Previous service
            function prevService() {
                navigateToIndex(currentPosition - 1);
            }

            // Event listeners
            prevBtn.addEventListener('click', prevService);
            nextBtn.addEventListener('click', nextService);

            // Initialize carousel
            generateServiceCards();

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') prevService();
                if (e.key === 'ArrowRight') nextService();
            });

            // Swipe support for touch devices
            let touchStartX = 0;
            let touchEndX = 0;

            carouselInner.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            carouselInner.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 50;

                if (touchStartX - touchEndX > swipeThreshold) {
                    nextService();
                }

                if (touchEndX - touchStartX > swipeThreshold) {
                    prevService();
                }
            }
        });