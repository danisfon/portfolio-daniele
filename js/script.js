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


document.addEventListener("DOMContentLoaded", () => {
    const githubContainer = document.getElementById("github_container");

    fetch(`https://api.github.com/users/danisfon/repos?sort=updated`)
        .then(response => response.json())
        .then(async repos => {
            githubContainer.innerHTML = "";

            const limitedRepos = repos.slice(0, 4);

            for (const repo of limitedRepos) {

                const repoDiv = document.createElement("div");
                repoDiv.classList.add("repo_card");

                repoDiv.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <small>Atualizado em: ${new Date(repo.updated_at).toLocaleDateString()}</small>
                `;
                githubContainer.appendChild(repoDiv);

            }

        })
        .catch(error => {
            githubContainer.innerHTML = "<p>Erro ao carregar repositórios.</p>";
        });
});