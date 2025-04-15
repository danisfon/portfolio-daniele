const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aparecendo');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.secoes > div, .card, .habilidade').forEach(el => {
    el.classList.add('invisivel');
    observer.observe(el);
});

