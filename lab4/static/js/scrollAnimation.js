function scrollAnimationMain() {
    const articles = document.querySelectorAll('article');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            } else {
                entry.target.classList.remove('fade-in');
            }
        });
    }, {threshold: 0.2});

    articles.forEach((article) => {
        observer.observe(article);
        article.classList.add('fade-out');
    });
}

scrollAnimationMain();