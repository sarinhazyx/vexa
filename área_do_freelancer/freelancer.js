const opportunities = [
    { id: 1, title: "Identidade visual completa para startup", company: "TechNova", category: "Design", mode: "Remoto", type: "Projeto pontual", budget: 3500, date: "Hoje", description: "Criação de identidade visual completa para uma startup em fase de lançamento.", requirements: "Experiência em identidade visual e domínio de Adobe Illustrator ou Figma." },
    { id: 2, title: "Desenvolvimento de site institucional (React)", company: "CodeLab", category: "Desenvolvimento", mode: "Híbrido", type: "Projeto pontual", budget: 6000, date: "Ontem", description: "Desenvolvimento de um site institucional responsivo usando React.", requirements: "React, APIs REST, componentes acessíveis e experiência em performance web." },
    { id: 3, title: "Edição de vídeos para canal no YouTube", company: "ContentPlus", category: "Vídeo", mode: "Remoto", type: "Contrato recorrente", budget: 1200, date: "Há 2 dias", description: "Edição semanal de vídeos para um canal voltado a tecnologia e inovação.", requirements: "Premiere ou DaVinci Resolve, motion graphics e entrega dentro do prazo." },
    { id: 4, title: "Gestão de tráfego pago (Google Ads)", company: "Growth360", category: "Marketing", mode: "Remoto", type: "Contrato recorrente", budget: 4000, date: "Há 3 dias", description: "Gestão e otimização de campanhas do Google Ads para uma empresa de tecnologia.", requirements: "Experiência em campanhas de pesquisa, métricas, testes e relatórios." },
    { id: 5, title: "Landing page para startup", company: "GreenLab", category: "Desenvolvimento", mode: "Remoto", type: "Projeto pontual", budget: 2800, date: "Há 4 dias", description: "Landing page responsiva para lançamento de uma plataforma de sustentabilidade.", requirements: "HTML, CSS, JavaScript e conhecimento em SEO técnico." },
    { id: 6, title: "Campanha de conteúdo para redes sociais", company: "Aurora Café", category: "Marketing", mode: "Presencial", type: "Tempo parcial", budget: 3200, date: "Há 5 dias", description: "Planejamento e produção de conteúdo mensal para redes sociais.", requirements: "Planejamento editorial, criação visual e gestão de comunidade." },
    { id: 7, title: "Artigos para blog corporativo", company: "Atlas Consultoria", category: "Redação", mode: "Remoto", type: "Contrato recorrente", budget: 1800, date: "Há 6 dias", description: "Produção de artigos sobre gestão, inovação e transformação digital.", requirements: "Boa redação, experiência em SEO e adaptação ao público corporativo." },
    { id: 8, title: "Consultoria em design system", company: "Nova Saúde", category: "Consultoria", mode: "Híbrido", type: "Tempo parcial", budget: 5200, date: "Há 7 dias", description: "Estruturação de design system para produtos digitais de saúde.", requirements: "Experiência com design systems, acessibilidade e documentação." }
];

let applications = [
    { title: "Desenvolvimento de site institucional", company: "CodeLab", date: "22/11/2026", status: "Em análise", statusClass: "pending" },
    { title: "Landing page para startup", company: "GreenLab", date: "19/11/2026", status: "Aprovada", statusClass: "accepted" },
    { title: "Identidade visual", company: "Flora Studio", date: "15/11/2026", status: "Não selecionada", statusClass: "rejected" }
];

const grid = document.getElementById("projectGrid");
let activeCategory = "";

function renderProjects() {
    const search = document.getElementById("heroSearch").value.toLowerCase();
    const sort = document.getElementById("sortFilter").value;
    const budgetLimit = Number(document.getElementById("budgetRange").value);
    const selectedTypes = [...document.querySelectorAll('input[name="type"]:checked')].map(input => input.value);
    const selectedModes = [...document.querySelectorAll('input[name="mode"]:checked')].map(input => input.value);

    let items = opportunities.filter(item =>
        (!activeCategory || item.category === activeCategory) &&
        (!search || `${item.title} ${item.company} ${item.category}`.toLowerCase().includes(search)) &&
        item.budget <= budgetLimit &&
        (!selectedTypes.length || selectedTypes.includes(item.type)) &&
        (!selectedModes.length || selectedModes.includes(item.mode))
    );

    if (sort === "budget") items.sort((a, b) => b.budget - a.budget);

    grid.innerHTML = items.length ? items.map(item => `
        <article class="project-card">
            <div class="project-image">
                <span class="project-category">${item.category}</span>
                <button class="bookmark" aria-label="Salvar projeto">♡</button>
            </div>
            <div class="project-body">
                <h3>${item.title}</h3>
                <div class="project-meta"><span>▥ ${item.company}</span><span>⌖ ${item.mode}</span></div>
                <div class="project-footer">
                    <strong class="project-budget">R$ ${item.budget.toLocaleString("pt-BR")}</strong>
                    <button class="project-arrow" onclick="openDetails(${item.id})" aria-label="Ver detalhes">→</button>
                </div>
            </div>
        </article>`).join("") : `<div class="project-card"><div class="project-body"><h3>Nenhum projeto encontrado</h3><p>Tente ajustar os filtros.</p></div></div>`;
}

function renderApplications() {
    document.getElementById("applicationsBody").innerHTML = applications.map(app => `
        <tr><td><strong>${app.title}</strong></td><td>${app.company}</td><td>${app.date}</td><td><span class="status ${app.statusClass}">${app.status}</span></td></tr>`).join("");
    document.getElementById("totalApplications").textContent = applications.length;
    document.getElementById("pendingApplications").textContent = applications.filter(app => app.statusClass === "pending").length;
    document.getElementById("acceptedApplications").textContent = applications.filter(app => app.statusClass === "accepted").length;
}

function openDetails(id) {
    const item = opportunities.find(opportunity => opportunity.id === id);
    document.getElementById("modalCategory").textContent = item.category;
    document.getElementById("modalTitle").textContent = item.title;
    document.getElementById("modalCompany").textContent = item.company;
    document.getElementById("modalDescription").textContent = item.description + " " + item.requirements;
    document.getElementById("modalMode").textContent = item.mode;
    document.getElementById("modalBudget").textContent = `R$ ${item.budget.toLocaleString("pt-BR")}`;
    document.getElementById("applyButton").onclick = () => { closeDetails(); openApply(id); };
    document.getElementById("detailsModal").classList.add("open");
}

function closeDetails() {
    document.getElementById("detailsModal").classList.remove("open");
}

function openApply(id) {
    document.getElementById("applyOpportunityId").value = id;
    document.getElementById("applyModal").classList.add("open");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2600);
}

function showView(viewName) {
    document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));

    if (viewName === "explore") {
        document.getElementById("exploreView").classList.add("active");
    } else if (viewName === "applications") {
        document.getElementById("applicationsView").classList.add("active");
    } else if (viewName === "profile") {
        document.getElementById("profileView").classList.add("active");
    } else {
        document.getElementById("exploreView").classList.add("active");
    }

    const activeLink = document.querySelector(`[data-view="${viewName}"]`);
    if (activeLink) activeLink.classList.add("active");
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => showView(link.dataset.view));
});

document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".category-card").forEach(item => item.classList.remove("active"));
        card.classList.add("active");
        activeCategory = card.dataset.category;
        renderProjects();
    });
});

document.querySelectorAll('input[name="type"], input[name="mode"]').forEach(input => input.addEventListener("change", renderProjects));
document.getElementById("heroSearch").addEventListener("input", renderProjects);
document.getElementById("sortFilter").addEventListener("change", renderProjects);

document.getElementById("budgetRange").addEventListener("input", event => {
    document.getElementById("budgetLabel").textContent = `R$ ${Number(event.target.value).toLocaleString("pt-BR")}${Number(event.target.value) >= 20000 ? "+" : ""}`;
    renderProjects();
});

document.getElementById("clearFilters").addEventListener("click", () => {
    document.querySelectorAll('.filters input[type="checkbox"]').forEach(input => input.checked = false);
    document.getElementById("budgetRange").value = 20000;
    document.getElementById("budgetLabel").textContent = "R$ 20.000+";
    activeCategory = "";
    document.querySelectorAll(".category-card").forEach(card => card.classList.remove("active"));
    document.querySelector('.category-card[data-category=""]').classList.add("active");
    renderProjects();
});

document.getElementById("gridToggle").addEventListener("click", () => {
    grid.classList.remove("list-view");
    document.getElementById("gridToggle").classList.add("active");
    document.getElementById("listToggle").classList.remove("active");
});
document.getElementById("listToggle").addEventListener("click", () => {
    grid.classList.add("list-view");
    document.getElementById("listToggle").classList.add("active");
    document.getElementById("gridToggle").classList.remove("active");
});

document.getElementById("closeModal").addEventListener("click", closeDetails);
document.getElementById("closeApplyModal").addEventListener("click", () => document.getElementById("applyModal").classList.remove("open"));

document.getElementById("applicationForm").addEventListener("submit", event => {
    event.preventDefault();
    const id = Number(document.getElementById("applyOpportunityId").value);
    const item = opportunities.find(opportunity => opportunity.id === id);
    applications.unshift({ title: item.title, company: item.company, date: "25/11/2026", status: "Em análise", statusClass: "pending" });
    document.getElementById("applyModal").classList.remove("open");
    event.target.reset();
    renderApplications();
    showToast("Candidatura enviada com sucesso!");
});

document.getElementById("profileForm").addEventListener("submit", event => {
    event.preventDefault();
    showToast("Perfil atualizado com sucesso!");
});

renderProjects();
renderApplications();