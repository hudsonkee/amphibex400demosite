document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');

        if (!track || !prevBtn || !nextBtn) return;

        const originalSlides = Array.from(track.children);
        if (originalSlides.length === 0) return;

        // Clone slides to front and back for seamless infinite scrolling
        originalSlides.forEach(slide => {
            const cloneEnd = slide.cloneNode(true);
            const cloneStart = slide.cloneNode(true);
            track.appendChild(cloneEnd);
            track.insertBefore(cloneStart, track.firstChild);
        });

        // Helper to get total width of one slide + gap
        const getSlideStep = () => {
            const singleSlide = track.querySelector('.carousel-slide');
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            return singleSlide.offsetWidth + gap;
        };

        // Set initial scroll position past the prepended clones
        const setInitialPosition = () => {
            const step = getSlideStep();
            track.style.scrollBehavior = 'auto';
            track.scrollLeft = step * originalSlides.length;
            track.style.scrollBehavior = 'smooth';
        };

        // Delay position initialization slightly to ensure accurate layout rendering
        setTimeout(setInitialPosition, 50);

        // Next Button Click
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getSlideStep(), behavior: 'smooth' });
        });

        // Prev Button Click
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getSlideStep(), behavior: 'smooth' });
        });

        // Seamless Jump Handler on Scroll Boundary
        let isAdjusting = false;
        track.addEventListener('scroll', () => {
            if (isAdjusting) return;

            const step = getSlideStep();
            const setWidth = step * originalSlides.length;

            // Scrolled into prepended clones (left limit)
            if (track.scrollLeft <= step / 2) {
                isAdjusting = true;
                track.style.scrollBehavior = 'auto';
                track.scrollLeft += setWidth;
                track.style.scrollBehavior = 'smooth';
                isAdjusting = false;
            } 
            // Scrolled into appended clones (right limit)
            else if (track.scrollLeft >= setWidth * 2 - step / 2) {
                isAdjusting = true;
                track.style.scrollBehavior = 'auto';
                track.scrollLeft -= setWidth;
                track.style.scrollBehavior = 'smooth';
                isAdjusting = false;
            }
        });
    });
});document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');

        if (track && prevBtn && nextBtn) {
            // Next Button Click
            nextBtn.addEventListener('click', () => {
                const firstSlide = track.querySelector('.carousel-slide');
                const scrollAmount = firstSlide ? firstSlide.offsetWidth : track.clientWidth;
                
                // If near the end of the scroll container, loop back to start
                const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 15;
                
                if (isAtEnd) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });

            // Previous Button Click
            prevBtn.addEventListener('click', () => {
                const firstSlide = track.querySelector('.carousel-slide');
                const scrollAmount = firstSlide ? firstSlide.offsetWidth : track.clientWidth;
                
                // If at the start, loop around to the end
                const isAtStart = track.scrollLeft <= 15;
                
                if (isAtStart) {
                    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            });
        }
    });
});
