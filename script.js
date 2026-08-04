document.addEventListener('DOMContentLoaded', () => {
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
