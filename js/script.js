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


let idiomaAtual = "pt";

function carregarIdioma(idioma) {
    fetch(`json/${idioma}.json`)
        .then(response => response.json())
        .then(data => {
            traduzirPagina(data);
        });
}

function traduzirPagina(linguagem) {
    document.querySelectorAll("[data-i18n]").forEach(elemento => {
        const chave = elemento.getAttribute("data-i18n");
        const valor = chave.split('.').reduce((obj, i) => obj[i], linguagem);
        if (valor) {
            elemento.textContent = valor;
        }
    });
}

function alterarIdioma() {
    idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
    carregarIdioma(idiomaAtual);
}