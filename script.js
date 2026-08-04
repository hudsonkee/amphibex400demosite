document.addEventListener('DOMContentLoaded', () => {
    // Select all carousel instances on the page
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');

        if (track && prevBtn && nextBtn) {
            // Click Next Button: Scroll right by 80% of current viewport width
            nextBtn.addEventListener('click', () => {
                const scrollAmount = track.clientWidth * 0.8;
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            // Click Prev Button: Scroll left by 80% of current viewport width
            prevBtn.addEventListener('click', () => {
                const scrollAmount = track.clientWidth * 0.8;
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
    });
});
