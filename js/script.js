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
    const githubRepositoriosHtml = document.getElementById("github_repositorios");
    let totalCommits = 0;
    let totalPRs = 0;
    const repositorios = ["portfolio-daniele", "IFolha", "landing-page-evento-tech", "maven"];

    githubRepositoriosHtml.innerHTML = "";
    document.getElementById("repo_count").textContent = repositorios.length;

    repositorios.forEach(repoName => {
        fetch(`https://api.github.com/repos/danisfon/${repoName}`)
            .then(repoResponse => repoResponse.json())
            .then(repo => {
                const repoDiv = document.createElement("div");
                repoDiv.classList.add("repo_card");

                repoDiv.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>Atualizado em: ${new Date(repo.updated_at).toLocaleDateString()}</p>
                `;
                githubRepositoriosHtml.appendChild(repoDiv);

                fetch(repo.commits_url.replace("{/sha}", ""))
                    .then(r => r.json())
                    .then(commits => {
                        totalCommits += commits.length;
                        document.getElementById("commit_count").textContent = totalCommits;
                    })
                    .catch(() => {
                        console.error(`Erro ao buscar commits do repositório ${repo.name}`);
                    });

                fetch(`https://api.github.com/repos/danisfon/${repo.name}/pulls?state=all`)
                    .then(r => r.json())
                    .then(pulls => {
                        totalPRs += pulls.length;
                        document.getElementById("pr_count").textContent = totalPRs;
                    })
                    .catch(() => {
                        console.error(`Erro ao buscar PRs do repositório ${repo.name}`);
                    });
            })
            .catch(error => {
                console.error(`Erro ao buscar dados do repositório ${repoName}:`, error);
            });
    });
});









