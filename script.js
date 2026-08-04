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

        // Clone slides: Append one full set to end, prepend one set to start
        originalSlides.forEach(slide => track.appendChild(slide.cloneNode(true)));
        originalSlides.slice().reverse().forEach(slide => track.insertBefore(slide.cloneNode(true), track.firstChild));

        const getStep = () => {
            const firstSlide = track.querySelector('.carousel-slide');
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            return firstSlide.offsetWidth + gap;
        };

        let currentIndex = count; // Start at first slide of original middle set

        // Instant jump with no animation
        const jumpToIndex = (index) => {
            track.style.scrollBehavior = 'auto';
            track.scrollLeft = index * getStep();
        };

        // Smooth scroll for button presses
        const animateToIndex = (index) => {
            track.style.scrollBehavior = 'smooth';
            track.scrollLeft = index * getStep();
        };

        // Initialize position
        setTimeout(() => jumpToIndex(currentIndex), 50);
        window.addEventListener('resize', () => jumpToIndex(currentIndex));

        let isAnimating = false;

        // Reset position silently once smooth scroll finishes
        const handleScrollEnd = () => {
            if (!isAnimating) return;

            if (currentIndex >= count * 2) {
                currentIndex -= count;
                jumpToIndex(currentIndex);
            } else if (currentIndex < count) {
                currentIndex += count;
                jumpToIndex(currentIndex);
            }
            isAnimating = false;
        };

        if ('onscrollend' in window) {
            track.addEventListener('scrollend', handleScrollEnd);
        } else {
            let timer;
            track.addEventListener('scroll', () => {
                if (!isAnimating) return;
                clearTimeout(timer);
                timer = setTimeout(handleScrollEnd, 150);
            });
        }

        nextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            currentIndex++;
            animateToIndex(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            currentIndex--;
            animateToIndex(currentIndex);
        });
    });
});
