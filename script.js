document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');

        if (!track || !prevBtn || !nextBtn) return;

        const originalSlides = Array.from(track.children);
        const count = originalSlides.length;
        if (count === 0) return;

        // Clone slides: Append a set to the end, Prepend a set to the front
        originalSlides.forEach(slide => {
            track.appendChild(slide.cloneNode(true));
        });
        originalSlides.slice().reverse().forEach(slide => {
            track.insertBefore(slide.cloneNode(true), track.firstChild);
        });

        // Helper to get total step distance (slide width + gap)
        const getStep = () => {
            const firstSlide = track.querySelector('.carousel-slide');
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 0;
            return firstSlide.offsetWidth + gap;
        };

        let currentIndex = count; // Start at the first original slide
        let isAnimating = false;

        const scrollToIndex = (index, smooth = true) => {
            const step = getStep();
            track.scrollTo({
                left: index * step,
                behavior: smooth ? 'smooth' : 'auto'
            });
        };

        // Initialize starting position
        const init = () => {
            scrollToIndex(currentIndex, false);
        };

        setTimeout(init, 50);
        window.addEventListener('resize', init);

        // Seamless Jump Handler when reaching boundary
        const handleLoop = () => {
            if (currentIndex >= count * 2) {
                currentIndex -= count;
                scrollToIndex(currentIndex, false);
            } else if (currentIndex < count) {
                currentIndex += count;
                scrollToIndex(currentIndex, false);
            }
            isAnimating = false;
        };

        // Listen for scroll finish to silently reposition loop
        if ('onscrollend' in window) {
            track.addEventListener('scrollend', () => {
                if (isAnimating) handleLoop();
            });
        } else {
            let scrollTimeout;
            track.addEventListener('scroll', () => {
                if (!isAnimating) return;
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(handleLoop, 150);
            });
        }

        nextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            currentIndex++;
            scrollToIndex(currentIndex, true);
        });

        prevBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            currentIndex--;
            scrollToIndex(currentIndex, true);
        });
    });
});
