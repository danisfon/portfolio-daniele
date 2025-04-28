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
    let totalCommits = 0;
    let totalPRs = 0;

    fetch(`https://api.github.com/users/danisfon/repos?sort=updated`)
        .then(response => response.json())
        .then(async repos => {

            githubContainer.innerHTML = "";
            const limitedRepos = repos.slice(0, 4);
            document.getElementById("repo-count").textContent = limitedRepos.length;

            for (const repo of limitedRepos) {

                const repoDiv = document.createElement("div");
                repoDiv.classList.add("repo_card");

                repoDiv.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <small>Atualizado em: ${new Date(repo.updated_at).toLocaleDateString()}</small>
                `;
                githubContainer.appendChild(repoDiv);

                const [commits, pulls] = await Promise.all([
                    fetch(repo.commits_url.replace("{/sha}", "")).then(r => r.json()).then(c => c.length).catch(() => 0),
                    fetch(`https://api.github.com/repos/danisfon/${repo.name}/pulls?state=all`).then(r => r.json()).then(p => p.length).catch(() => 0)
                ]);

                totalCommits += commits;
                totalPRs += pulls;

            }

            document.getElementById("commit-count").textContent = totalCommits;
            document.getElementById("pr-count").textContent = totalPRs;

        })
        .catch(error => {
            githubContainer.innerHTML = "<p>Erro ao carregar repositórios.</p>";
            console.error("Erro na API do GitHub:", error);
        });
});









