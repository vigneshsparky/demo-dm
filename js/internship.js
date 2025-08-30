 $(document).ready(function(){
            // Initialize carousel
            $('.internship-carousel').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            // Simple fade-in animation on scroll
            function checkCards() {
                $('.internship-card').each(function(){
                    var cardTop = $(this).offset().top;
                    var windowBottom = $(window).scrollTop() + $(window).height();
                    
                    if(cardTop < windowBottom - 100){
                        $(this).css({
                            'opacity': '1',
                            'transform': 'translateY(0)'
                        });
                    }
                });
            }

            // Set initial state
            $('.internship-card').css({
                'opacity': '0',
                'transform': 'translateY(20px)',
                'transition': 'all 0.5s ease'
            });

            // Run on load and scroll
            checkCards();
            $(window).scroll(checkCards);
        });