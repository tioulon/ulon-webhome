const bg = document.getElementById('parallax-bg');
let ticking = false;

const maxMovimentPixels = 50;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // AMOUNT SCROLLED
            const currentScroll = window.scrollY;

            // MAX SCROLL
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
            // AVOID 0 DIVISION IN CASE OF NO SCROLL
            if (maxScroll > 0) {

                // DISCOVER SCROLL PERCENTAGE
                const scrollPercentage = currentScroll / maxScroll;

                // CALCULATE FINAL PIXEL MOVIMENT
                const movimentY = scrollPercentage * maxMovimentPixels
                
                // APPLY USING TRANSLATE3D
                bg.style.transform = `translate3d(0, ${-movimentY}px, 0)`
            }
        ticking = false;
        });
        ticking = true;
    }
});