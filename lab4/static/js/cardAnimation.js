function applyParallax(card) {
    const onMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const cardRect = card.getBoundingClientRect();
        const cardX = cardRect.left + cardRect.width / 2;
        const cardY = cardRect.top + cardRect.height / 2;

        const deltaX = (mouseX - cardX) / 20; // Adjust the divisor to control the effect
        const deltaY = (mouseY - cardY) / 20;

        card.style.transform = `rotateY(${deltaX * 2}deg) rotateX(${deltaY * 2}deg) translate3d(${deltaX}px, ${deltaY}px, 0px) scale3d(1.05,1.05,1)`;
    };

    card.addEventListener('mousemove', onMouseMove);

    card.onmouseleave = () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.style.transform = 'translate(0, 0)';
    };
}

function cardsAnimationMain() {
    const cards = document.querySelectorAll('.article-card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => applyParallax(card));

    });
}

cardsAnimationMain();
