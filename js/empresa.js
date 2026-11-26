
/* ==================================================
   VEXA BUSINESS — JAVASCRIPT
   ================================================== */


/* ==================================================
   01. ELEMENTOS PRINCIPAIS
   ================================================== */

const workspace = document.getElementById("workspace");

const navigation = document.querySelectorAll(".nav-link");

const chatWindow = document.getElementById("chat-window");

const chatToggle = document.getElementById("chat-toggle");

const chatContent = document.getElementById("chat-content");

const closeChat = document.getElementById("close-chat");

const profileAvatar = document.querySelector(".profile-avatar");



/* ==================================================
   02. ARMAZENAMENTO LOCAL
   ================================================== */

function carregarDados(chave, padrao) {

    try {

        const dados = localStorage.getItem(chave);

        return dados ? JSON.parse(dados) : padrao;

    } catch {

        return padrao;

    }

}


function salvarDados() {

    try {

        localStorage.setItem(
            "vexa_projetos",
            JSON.stringify(projetos)
        );

        localStorage.setItem(
            "vexa_empresa",
            JSON.stringify(empresa)
        );

        localStorage.setItem(
            "vexa_mensagens",
            JSON.stringify(mensagens)
        );

    } catch (erro) {

        console.warn("Não foi possível salvar os dados.", erro);

    }

}



/* ==================================================
   03. DADOS DA EMPRESA
   ================================================== */

let empresa = carregarDados("vexa_empresa", {

    nome: "Empresa",

    email: "",

    segmento: "",

    descricao: ""

});



/* ==================================================
   04. PROJETOS DEMONSTRATIVOS
   ================================================== */

let projetos = carregarDados("vexa_projetos", [

    {
        id: 1,
        nome: "Identidade visual",
        categoria: "Design & Branding",
        descricao: "Desenvolvimento de uma identidade visual moderna para nossa empresa.",
        propostas: 8,
        status: "Ativo",
        icone: "diamond"
    },

    {
        id: 2,
        nome: "Website institucional",
        categoria: "Desenvolvimento",
        descricao: "Criação de um website institucional moderno e responsivo.",
        propostas: 4,
        status: "Ativo",
        icone: "code-2"
    },

    {
        id: 3,
        nome: "Estratégia de conteúdo",
        categoria: "Marketing digital",
        descricao: "Planejamento estratégico de conteúdo para redes sociais.",
        propostas: 3,
        status: "Em análise",
        icone: "chart-no-axes-column"
    }

]);



/* ==================================================
   05. FREELANCERS DEMONSTRATIVOS
   ================================================== */

const freelancers = [

    {
        id: 1,
        nome: "Mariana Costa",
        especialidade: "UI/UX Designer",
        iniciais: "MC",
        avaliacao: "4.9",
        projetos: 12,
        habilidades: ["Figma", "UI Design", "UX"],
        descricao: "Especialista em interfaces digitais modernas, intuitivas e centradas no usuário."
    },

    {
        id: 2,
        nome: "Lucas Almeida",
        especialidade: "Desenvolvedor Front-end",
        iniciais: "LA",
        avaliacao: "4.8",
        projetos: 18,
        habilidades: ["HTML", "CSS", "JavaScript"],
        descricao: "Desenvolvedor focado na criação de experiências digitais modernas e responsivas."
    },

    {
        id: 3,
        nome: "Julia Martins",
        especialidade: "Social Media",
        iniciais: "JM",
        avaliacao: "5.0",
        projetos: 9,
        habilidades: ["Marketing", "Conteúdo", "Social Media"],
        descricao: "Especialista em estratégias de conteúdo, comunicação e redes sociais."
    },

    {
        id: 4,
        nome: "Rafael Lima",
        especialidade: "Designer de marca",
        iniciais: "RL",
        avaliacao: "4.9",
        projetos: 15,
        habilidades: ["Branding", "Illustrator", "Design"],
        descricao: "Criação de identidades visuais e posicionamento estratégico de marcas."
    }

];



/* ==================================================
   06. MENSAGENS DEMONSTRATIVAS
   ================================================== */

let mensagens = carregarDados("vexa_mensagens", {

    1: [

        {
            texto: "Olá! Tenho interesse no projeto.",
            enviada: false
        }

    ]

});


const respostasAutomaticas = [

    "Claro! Podemos alinhar os detalhes do projeto.",

    "Ótimo! Tenho disponibilidade para começar.",

    "Gostei da proposta. Podemos conversar melhor?",

    "Perfeito! Vou analisar os detalhes.",

    "Obrigado pelo contato! Fico à disposição."

];



/* ==================================================
   07. FUNÇÕES AUXILIARES
   ================================================== */

function atualizarIcones() {

    if (window.lucide) {

        window.lucide.createIcons();

    }

}


function formatarNumero(numero) {

    return String(numero).padStart(2, "0");

}


function protegerTexto(valor) {

    const elemento = document.createElement("div");

    elemento.textContent = String(valor ?? "");

    return elemento.innerHTML
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

}


function normalizarTexto(texto) {

    return String(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


function atualizarAvatar() {

    if (!profileAvatar) return;

    profileAvatar.textContent =
        (empresa.nome || "Empresa")[0].toUpperCase();

}


function animarTela() {

    if (!workspace.animate) return;

    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) return;


    workspace.getAnimations().forEach(animacao => {

        animacao.cancel();

    });


    workspace.animate(

        [
            {
                opacity: 0,
                transform: "translateY(8px)"
            },

            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],

        {
            duration: 280,
            easing: "ease-out"
        }

    );

}



/* ==================================================
   08. NAVEGAÇÃO PRINCIPAL
   ================================================== */

function selecionarAba(pagina) {

    navigation.forEach(botao => {

        const ativo = botao.dataset.page === pagina;

        botao.classList.toggle("active", ativo);

        if (ativo) {

            botao.setAttribute("aria-current", "page");

        } else {

            botao.removeAttribute("aria-current");

        }

    });

}


function navegar(pagina) {

    selecionarAba(pagina);


    switch (pagina) {

        case "inicio":

            renderizarInicio();

            break;


        case "projetos":

            renderizarProjetos();

            break;


        case "freelancers":

            renderizarFreelancers();

            break;


        case "perfil":

            renderizarPerfil();

            break;


        default:

            selecionarAba("inicio");

            renderizarInicio();

    }


    atualizarIcones();

    animarTela();

    window.scrollTo(0, 0);

}


navigation.forEach(botao => {

    botao.addEventListener("click", evento => {

        evento.preventDefault();

        navegar(botao.dataset.page);

    });

});


profileAvatar?.addEventListener("click", () => {

    navegar("perfil");

});


document.querySelector(".logo")?.addEventListener(
    "click",
    evento => {

        evento.preventDefault();

        navegar("inicio");

    }
);



/* ==================================================
   09. TABELA DE PROJETOS
   ================================================== */

function criarTabela(lista) {

    if (!lista.length) {

        return `

            <div class="proposal-empty">

                <i data-lucide="folder-open"></i>

                <h3>Nenhum projeto cadastrado</h3>

                <p>Publique seu primeiro projeto na VEXA.</p>

            </div>

        `;

    }


    return `

        <div class="projects-table">

            <div class="table-header">

                <span>Nome do projeto</span>

                <span>Status</span>

                <span>Propostas</span>

            </div>


            ${lista.map(projeto => `

                <button
                    class="project-row project-button"
                    data-project="${projeto.id}"
                    type="button"
                >

                    <div class="project-info">

                        <div class="project-icon">

                            <i data-lucide="${protegerTexto(projeto.icone)}"></i>

                        </div>


                        <div>

                            <h3>${protegerTexto(projeto.nome)}</h3>

                            <p>${protegerTexto(projeto.categoria)}</p>

                        </div>

                    </div>


                    <span class="status">

                        <span class="indicator"></span>

                        ${protegerTexto(projeto.status)}

                    </span>


                    <span class="proposal-count">

                        ${formatarNumero(projeto.propostas)}

                    </span>

                </button>

            `).join("")}

        </div>

    `;

}



/* ==================================================
   10. DASHBOARD EMPRESARIAL
   ================================================== */

function renderizarInicio() {

    const ativos = projetos.filter(projeto =>

        projeto.status === "Ativo" ||

        projeto.status === "Em andamento"

    ).length;


    const propostas = projetos.reduce(

        (total, projeto) => total + Number(projeto.propostas || 0),

        0

    );


    const contratacoes = 1 + projetos.filter(

        projeto => projeto.contratado

    ).length;


    workspace.innerHTML = `

        <section class="welcome">

            <div class="welcome-text">

                <span class="eyebrow">

                    <span class="indicator"></span>

                    SEU WORKSPACE

                </span>


                <h1>Olá, ${protegerTexto(empresa.nome)}.</h1>


                <p>

                    Tudo o que sua empresa precisa,
                    em um só lugar.

                </p>

            </div>


            <button class="btn-primary" id="new-project">

                <i data-lucide="plus"></i>

                Novo projeto

            </button>

        </section>



        <section class="overview">

            <article class="metric">

                <span>Projetos ativos</span>

                <strong>${formatarNumero(ativos)}</strong>

                <small>Em andamento</small>

            </article>


            <article class="metric">

                <span>Propostas recebidas</span>

                <strong>${formatarNumero(propostas)}</strong>

                <small>Novas possibilidades</small>

            </article>


            <article class="metric">

                <span>Contratações</span>

                <strong>${formatarNumero(contratacoes)}</strong>

                <small>Talentos selecionados</small>

            </article>

        </section>



        <section class="projects-section">

            <div class="section-header">

                <h2>Projetos recentes</h2>


                <button class="btn-text" id="view-projects">

                    Ver todos

                    <i data-lucide="arrow-up-right"></i>

                </button>

            </div>


            ${criarTabela(projetos.slice(0, 3))}

        </section>



        <footer class="workspace-footer">

            VEXA / Workspace empresarial

        </footer>

    `;

}



/* ==================================================
   11. PÁGINA DE PROJETOS
   ================================================== */

function renderizarProjetos() {

    workspace.innerHTML = `

        <section class="welcome">

            <div>

                <span class="eyebrow">

                    GERENCIAMENTO

                </span>


                <h1>Meus projetos.</h1>


                <p>

                    Acompanhe e gerencie suas oportunidades.

                </p>

            </div>


            <button class="btn-primary" id="new-project">

                <i data-lucide="plus"></i>

                Novo projeto

            </button>

        </section>


        ${criarTabela(projetos)}

    `;

}



/* ==================================================
   12. CADASTRO DE PROJETOS
   ================================================== */

function renderizarNovoProjeto() {

    selecionarAba("projetos");


    workspace.innerHTML = `

        <button
            class="btn-text back-button"
            data-navigate="projetos"
        >

            <i data-lucide="arrow-left"></i>

            Voltar aos projetos

        </button>



        <section class="welcome">

            <div>

                <span class="eyebrow">

                    NOVA OPORTUNIDADE

                </span>


                <h1>Novo projeto.</h1>


                <p>

                    Encontre os talentos certos para sua ideia.

                </p>

            </div>

        </section>



        <form class="form-panel" id="project-form">

            <div class="form-group">

                <label for="project-name">

                    Nome do projeto

                </label>


                <input
                    id="project-name"
                    name="nome"
                    placeholder="Ex.: Criação de um website"
                    required
                >

            </div>



            <div class="form-group">

                <label for="project-category">

                    Categoria

                </label>


                <select
                    id="project-category"
                    name="categoria"
                    required
                >

                    <option value="">Selecione uma categoria</option>

                    <option>Design</option>

                    <option>Desenvolvimento</option>

                    <option>Marketing</option>

                    <option>Redação</option>

                    <option>Outros</option>

                </select>

            </div>



            <div class="form-group">

                <label for="project-description">

                    Descrição do projeto

                </label>


                <textarea
                    id="project-description"
                    name="descricao"
                    placeholder="Descreva o que sua empresa precisa..."
                    required
                ></textarea>

            </div>



            <div class="form-actions">

                <button class="btn-primary" type="submit">

                    <i data-lucide="check"></i>

                    Publicar projeto

                </button>


                <button
                    class="btn-text"
                    type="button"
                    data-navigate="projetos"
                >

                    Cancelar

                </button>

            </div>

        </form>

    `;


    atualizarIcones();

    animarTela();

    window.scrollTo(0, 0);

}



/* ==================================================
   13. CANDIDATOS DOS PROJETOS
   ================================================== */

function obterCandidatos(projeto) {

    if (!projeto.propostas) return [];


    const categoria = normalizarTexto(projeto.categoria);


    let ids = [1, 2, 3, 4];


    if (categoria.includes("design")) {

        ids = [1, 4, 2, 3];

    } else if (categoria.includes("desenvolvimento")) {

        ids = [2, 1, 4, 3];

    } else if (categoria.includes("marketing")) {

        ids = [3, 4, 1, 2];

    }


    return ids
        .map(id => freelancers.find(f => f.id === id))
        .filter(Boolean)
        .slice(0, Math.min(2, projeto.propostas));

}



/* ==================================================
   14. DETALHES E PROPOSTAS DO PROJETO
   ================================================== */

function abrirProjeto(id) {

    const projeto = projetos.find(

        item => item.id === id

    );


    if (!projeto) return;


    selecionarAba("projetos");


    const candidatos = obterCandidatos(projeto);


    workspace.innerHTML = `

        <button
            class="btn-text back-button"
            data-navigate="projetos"
        >

            <i data-lucide="arrow-left"></i>

            Voltar aos projetos

        </button>



        <section class="welcome">

            <div>

                <span class="eyebrow">

                    ${protegerTexto(projeto.categoria)}

                </span>


                <h1>${protegerTexto(projeto.nome)}</h1>


                <p>

                    <span class="indicator"></span>

                    ${protegerTexto(projeto.status)}

                </p>

            </div>

        </section>



        <section class="project-description">

            <h2>Sobre o projeto</h2>

            <p>${protegerTexto(projeto.descricao)}</p>

        </section>



        <div class="section-header">

            <h2>Propostas recebidas</h2>


            <span class="proposal-label">

                ${projeto.propostas} propostas

            </span>

        </div>



        <div class="proposal-list">

            ${candidatos.map((freelancer, index) => `

                <article class="proposal-card">

                    <div class="proposal-top">

                        <div class="proposal-person">

                            <div class="freelancer-avatar">

                                ${freelancer.iniciais}

                            </div>


                            <div>

                                <h3>${freelancer.nome}</h3>

                                <p>${freelancer.especialidade}</p>


                                <div class="proposal-rating">

                                    <i data-lucide="star"></i>

                                    ${freelancer.avaliacao}

                                </div>

                            </div>

                        </div>



                        <div class="proposal-price">

                            <strong>

                                ${index === 0
                                    ? "R$ 850,00"
                                    : "R$ 1.200,00"}

                            </strong>


                            <span>

                                Entrega em ${index === 0 ? 7 : 10} dias

                            </span>

                        </div>

                    </div>



                    <div class="proposal-actions">

                        <button
                            class="btn-text"
                            data-freelancer="${freelancer.id}"
                            data-return-project="${projeto.id}"
                        >

                            Ver perfil

                            <i data-lucide="arrow-up-right"></i>

                        </button>



                        <div class="proposal-buttons">

                            <button
                                class="btn-icon"
                                data-conversation="${freelancer.id}"
                                title="Enviar mensagem"
                                aria-label="Enviar mensagem"
                            >

                                <i data-lucide="message-circle"></i>

                            </button>



                            <button
                                class="btn-primary"
                                data-accept-project="${projeto.id}"
                                data-accept-freelancer="${freelancer.id}"
                                ${projeto.contratado ? "disabled" : ""}
                            >

                                <i data-lucide="check"></i>


                                ${projeto.contratado === freelancer.id

                                    ? "Proposta aceita"

                                    : projeto.contratado

                                        ? "Projeto contratado"

                                        : "Aceitar proposta"}

                            </button>

                        </div>

                    </div>

                </article>

            `).join("")}



            ${!candidatos.length ? `

                <div class="proposal-empty">

                    <i data-lucide="inbox"></i>

                    <h3>Nenhuma proposta recebida</h3>

                    <p>

                        As propostas dos freelancers aparecerão aqui.

                    </p>

                </div>

            ` : ""}

        </div>

    `;


    atualizarIcones();

    animarTela();

    window.scrollTo(0, 0);

}



/* ==================================================
   15. EXPLORAR TALENTOS
   ================================================== */

function renderizarFreelancers() {

    workspace.innerHTML = `

        <section class="welcome">

            <div>

                <span class="eyebrow">

                    TALENTOS VEXA

                </span>


                <h1>Encontre o talento certo.</h1>


                <p>

                    Conecte-se com profissionais que
                    transformam ideias em realidade.

                </p>

            </div>

        </section>



        <div class="search-container">

            <i data-lucide="search"></i>


            <input
                id="freelancer-search"
                aria-label="Buscar freelancers"
                placeholder="Buscar por nome, especialidade ou habilidade..."
                autocomplete="off"
            >

        </div>



        <div
            class="freelancer-grid"
            id="freelancer-grid"
        ></div>

    `;


    listarFreelancers(freelancers);

}



/* ==================================================
   16. CARDS DOS FREELANCERS
   ================================================== */

function listarFreelancers(lista) {

    const grid = document.getElementById("freelancer-grid");


    if (!grid) return;


    grid.innerHTML = lista.map(freelancer => `

        <article class="freelancer-card">

            <div class="talent-header">

                <div class="freelancer-avatar">

                    ${freelancer.iniciais}

                </div>


                <span class="availability">

                    <span class="indicator"></span>

                    Disponível

                </span>

            </div>



            <h2>${freelancer.nome}</h2>

            <p>${freelancer.especialidade}</p>



            <div class="talent-rating">

                <i data-lucide="star"></i>

                <strong>${freelancer.avaliacao}</strong>

                <span>· ${freelancer.projetos} projetos</span>

            </div>



            <div class="skills">

                ${freelancer.habilidades.map(habilidade => `

                    <span class="skill-tag">

                        ${habilidade}

                    </span>

                `).join("")}

            </div>



            <div class="talent-actions">

                <button
                    class="btn-primary"
                    data-freelancer="${freelancer.id}"
                >

                    Ver perfil

                    <i data-lucide="arrow-up-right"></i>

                </button>



                <button
                    class="btn-icon"
                    data-conversation="${freelancer.id}"
                    title="Enviar mensagem"
                    aria-label="Enviar mensagem"
                >

                    <i data-lucide="message-circle"></i>

                </button>

            </div>

        </article>

    `).join("");



    if (!lista.length) {

        grid.innerHTML = `

            <div class="proposal-empty">

                <i data-lucide="search"></i>

                <h3>Nenhum profissional encontrado</h3>

                <p>Tente pesquisar por outro termo.</p>

            </div>

        `;

    }


    atualizarIcones();

}



/* ==================================================
   17. PERFIL INDIVIDUAL DO FREELANCER
   ================================================== */

function abrirPerfilFreelancer(id, projetoOrigem = null) {

    const freelancer = freelancers.find(

        item => item.id === id

    );


    if (!freelancer) return;


    selecionarAba(projetoOrigem ? "projetos" : "freelancers");


    workspace.innerHTML = `

        <button
            class="btn-text back-button"
            ${projetoOrigem
                ? `data-project="${projetoOrigem}"`
                : 'data-navigate="freelancers"'}
        >

            <i data-lucide="arrow-left"></i>

            ${projetoOrigem
                ? "Voltar ao projeto"
                : "Voltar aos talentos"}

        </button>



        <section class="form-panel talent-profile">

            <div class="freelancer-avatar large-avatar">

                ${freelancer.iniciais}

            </div>



            <h1>${freelancer.nome}</h1>

            <p>${freelancer.especialidade}</p>



            <div class="talent-rating">

                <i data-lucide="star"></i>

                <strong>${freelancer.avaliacao}</strong>

                <span>· ${freelancer.projetos} projetos</span>

            </div>



            <div class="profile-section">

                <h2>Sobre o profissional</h2>

                <p>${freelancer.descricao}</p>

            </div>



            <div class="profile-section">

                <h2>Habilidades</h2>


                <div class="skills">

                    ${freelancer.habilidades.map(habilidade => `

                        <span class="skill-tag">

                            ${habilidade}

                        </span>

                    `).join("")}

                </div>

            </div>



            <button
                class="btn-primary"
                data-conversation="${freelancer.id}"
            >

                <i data-lucide="message-circle"></i>

                Entrar em contato

            </button>

        </section>

    `;


    atualizarIcones();

    animarTela();

    window.scrollTo(0, 0);

}



/* ==================================================
   18. PERFIL EMPRESARIAL
   ================================================== */

function renderizarPerfil() {

    workspace.innerHTML = `

        <section class="welcome">

            <div>

                <span class="eyebrow">

                    CONFIGURAÇÕES

                </span>


                <h1>Minha empresa.</h1>


                <p>

                    Personalize seu perfil na VEXA.

                </p>

            </div>

        </section>



        <form class="form-panel" id="company-form">

            <div class="freelancer-avatar large-avatar">

                ${protegerTexto(
                    (empresa.nome || "Empresa")[0].toUpperCase()
                )}

            </div>



            <div class="form-group">

                <label for="company-name">

                    Nome da empresa

                </label>


                <input
                    id="company-name"
                    name="nome"
                    value="${protegerTexto(empresa.nome)}"
                    required
                >

            </div>



            <div class="form-group">

                <label for="company-email">

                    E-mail empresarial

                </label>


                <input
                    id="company-email"
                    name="email"
                    type="email"
                    placeholder="contato@empresa.com"
                    value="${protegerTexto(empresa.email)}"
                >

            </div>



            <div class="form-group">

                <label for="company-sector">

                    Segmento

                </label>


                <input
                    id="company-sector"
                    name="segmento"
                    placeholder="Ex.: Tecnologia"
                    value="${protegerTexto(empresa.segmento)}"
                >

            </div>



            <div class="form-group">

                <label for="company-description">

                    Sobre a empresa

                </label>


                <textarea
                    id="company-description"
                    name="descricao"
                    placeholder="Conte um pouco sobre sua empresa..."
                >${protegerTexto(empresa.descricao)}</textarea>

            </div>



            <button class="btn-primary" type="submit">

                <i data-lucide="save"></i>

                Salvar alterações

            </button>



            <p
                class="feedback"
                id="profile-feedback"
                role="status"
            ></p>

        </form>

    `;

}



/* ==================================================
   19. CHAT FLUTUANTE
   ================================================== */

function definirChat(aberto) {

    if (!chatWindow || !chatToggle) return;


    chatWindow.hidden = !aberto;


    chatToggle.setAttribute(

        "aria-expanded",

        String(aberto)

    );


    if (aberto) {

        const notificacao = document.querySelector(
            ".notification-dot"
        );

        if (notificacao) {

            notificacao.hidden = true;

        }

    }

}


chatToggle?.addEventListener("click", () => {

    definirChat(chatWindow.hidden);


    if (!chatWindow.hidden) {

        listarConversas();

    }

});


closeChat?.addEventListener("click", () => {

    definirChat(false);

});



/* ==================================================
   20. LISTA DE CONVERSAS
   ================================================== */

function listarConversas() {

    if (!chatContent) return;


    const contatos = freelancers.filter(

        freelancer => mensagens[freelancer.id]

    );


    chatContent.innerHTML = contatos.map(freelancer => {

        const historico = mensagens[freelancer.id];

        const ultima = historico[historico.length - 1];


        return `

            <button
                class="conversation"
                data-conversation="${freelancer.id}"
            >

                <div class="freelancer-avatar">

                    ${freelancer.iniciais}

                </div>


                <div>

                    <strong>${freelancer.nome}</strong>


                    <p>

                        ${protegerTexto(
                            ultima?.texto || "Nova conversa"
                        )}

                    </p>

                </div>

            </button>

        `;

    }).join("");



    if (!contatos.length) {

        chatContent.innerHTML = `

            <div class="chat-empty">

                <i data-lucide="message-circle"></i>

                <h3>Nenhuma conversa</h3>

                <p>

                    Encontre um talento e inicie uma conversa.

                </p>

            </div>

        `;

    }


    atualizarIcones();

}



/* ==================================================
   21. CONVERSA INDIVIDUAL
   ================================================== */

function abrirConversa(id) {

    const freelancer = freelancers.find(

        item => item.id === id

    );


    if (!freelancer || !chatContent) return;


    if (!mensagens[id]) {

        mensagens[id] = [];

    }


    definirChat(true);



    chatContent.innerHTML = `

        <button class="btn-text" id="back-chat">

            <i data-lucide="arrow-left"></i>

            Conversas

        </button>



        <h3 class="conversation-name">

            ${freelancer.nome}

        </h3>



        <div class="message-list">

            ${mensagens[id].map(mensagem => `

                <div class="message ${mensagem.enviada
                    ? "sent"
                    : "received"}">

                    ${protegerTexto(mensagem.texto)}

                </div>

            `).join("")}

        </div>



        <form class="message-form" data-chat="${id}">

            <input
                name="mensagem"
                aria-label="Mensagem"
                placeholder="Escreva uma mensagem..."
                autocomplete="off"
                required
            >


            <button
                class="btn-primary"
                type="submit"
                aria-label="Enviar mensagem"
            >

                <i data-lucide="send"></i>

            </button>

        </form>

    `;


    atualizarIcones();


    chatContent.scrollTop = chatContent.scrollHeight;

}



/* ==================================================
   22. RESPOSTAS AUTOMÁTICAS
   ================================================== */

function responderAutomaticamente(id) {

    setTimeout(() => {

        const resposta = respostasAutomaticas[

            Math.floor(
                Math.random() * respostasAutomaticas.length
            )

        ];


        if (!mensagens[id]) {

            mensagens[id] = [];

        }


        mensagens[id].push({

            texto: resposta,

            enviada: false

        });


        salvarDados();



        const conversaAtual = chatContent?.querySelector(

            ".message-form"

        );



        if (
            chatWindow &&
            !chatWindow.hidden &&
            Number(conversaAtual?.dataset.chat) === id
        ) {

            const campo = conversaAtual.querySelector("input");

            const rascunho = campo.value;

            const estavaFocado =
                document.activeElement === campo;


            abrirConversa(id);


            const novoCampo = chatContent.querySelector("input");

            novoCampo.value = rascunho;


            if (estavaFocado) {

                novoCampo.focus();

            }

        } else if (chatWindow && !chatWindow.hidden && !conversaAtual) {

            listarConversas();

        } else {

            const notificacao = document.querySelector(

                ".notification-dot"

            );


            if (notificacao) {

                notificacao.hidden = false;

            }

        }

    }, 1800);

}



/* ==================================================
   23. NOTIFICAÇÕES PERSONALIZADAS
   ================================================== */

function mostrarNotificacao(texto) {

    document.querySelector(".toast")?.remove();


    const notificacao = document.createElement("div");

    notificacao.className = "toast";

    notificacao.setAttribute("role", "status");


    notificacao.innerHTML = `

        <i data-lucide="check-circle"></i>

        <span>${protegerTexto(texto)}</span>

    `;


    document.body.appendChild(notificacao);


    atualizarIcones();


    setTimeout(() => {

        notificacao.remove();

    }, 4000);

}



/* ==================================================
   24. MODAL DE CONFIRMAÇÃO
   ================================================== */

function abrirModal(titulo, descricao, detalhes, confirmar) {

    if (document.querySelector(".modal-overlay")) return;


    const focoAnterior = document.activeElement;


    const modal = document.createElement("div");

    modal.className = "modal-overlay";


    modal.innerHTML = `

        <section
            class="vexa-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >

            <div class="modal-icon">

                <i data-lucide="handshake"></i>

            </div>



            <h2 id="modal-title">

                ${protegerTexto(titulo)}

            </h2>



            <p>

                ${protegerTexto(descricao)}

            </p>



            <div class="modal-details">

                <span>Projeto selecionado</span>

                <strong>${protegerTexto(detalhes)}</strong>

            </div>



            <div class="modal-actions">

                <button
                    class="btn-secondary"
                    id="cancel-modal"
                >

                    Cancelar

                </button>



                <button
                    class="btn-primary"
                    id="confirm-modal"
                >

                    Confirmar

                </button>

            </div>

        </section>

    `;


    document.body.appendChild(modal);


    atualizarIcones();


    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";



    function fecharModal() {

        document.removeEventListener("keydown", controlarTeclado);

        document.body.style.overflow = overflowAnterior;

        modal.remove();


        if (focoAnterior?.isConnected) {

            focoAnterior.focus();

        }

    }



    function controlarTeclado(evento) {

        if (evento.key === "Escape") {

            fecharModal();

        }


        if (evento.key === "Tab") {

            const primeiro = modal.querySelector("#cancel-modal");

            const ultimo = modal.querySelector("#confirm-modal");


            if (evento.shiftKey && document.activeElement === primeiro) {

                evento.preventDefault();

                ultimo.focus();

            } else if (!evento.shiftKey && document.activeElement === ultimo) {

                evento.preventDefault();

                primeiro.focus();

            }

        }

    }



    document.addEventListener("keydown", controlarTeclado);



    modal.querySelector("#cancel-modal").onclick = fecharModal;



    modal.querySelector("#confirm-modal").onclick = () => {

        fecharModal();

        confirmar();

    };



    modal.addEventListener("click", evento => {

        if (evento.target === modal) {

            fecharModal();

        }

    });



    modal.querySelector("#cancel-modal").focus();

}



/* ==================================================
   25. CONTRATAÇÃO DEMONSTRATIVA
   ================================================== */

function aceitarProposta(projetoId, freelancerId) {

    const projeto = projetos.find(

        item => item.id === projetoId

    );


    const freelancer = freelancers.find(

        item => item.id === freelancerId

    );


    if (!projeto || !freelancer || projeto.contratado) return;



    abrirModal(

        "Aceitar proposta?",

        "Você está prestes a aceitar a proposta de " +
        freelancer.nome + ".",

        projeto.nome,

        () => {

            projeto.status = "Em andamento";

            projeto.contratado = freelancerId;


            salvarDados();


            abrirProjeto(projetoId);


            mostrarNotificacao(

                "Proposta aceita com sucesso!"

            );

        }

    );

}



/* ==================================================
   26. EVENTOS DOS BOTÕES
   ================================================== */

document.addEventListener("click", evento => {

    const botao = evento.target.closest("button");


    if (!botao || botao.disabled) return;



    if (botao.id === "new-project") {

        renderizarNovoProjeto();

        return;

    }



    if (botao.id === "view-projects") {

        navegar("projetos");

        return;

    }



    if (botao.dataset.navigate) {

        navegar(botao.dataset.navigate);

        return;

    }



    if (botao.dataset.project) {

        abrirProjeto(Number(botao.dataset.project));

        return;

    }



    if (botao.dataset.freelancer) {

        abrirPerfilFreelancer(

            Number(botao.dataset.freelancer),

            Number(botao.dataset.returnProject) || null

        );

        return;

    }



    if (botao.dataset.conversation) {

        abrirConversa(Number(botao.dataset.conversation));

        return;

    }



    if (botao.dataset.acceptProject) {

        aceitarProposta(

            Number(botao.dataset.acceptProject),

            Number(botao.dataset.acceptFreelancer)

        );

        return;

    }



    if (botao.id === "back-chat") {

        listarConversas();

    }

});



/* ==================================================
   27. EVENTOS DOS FORMULÁRIOS
   ================================================== */

document.addEventListener("submit", evento => {

    const formulario = evento.target;



    /* CADASTRO DE PROJETOS */

    if (formulario.id === "project-form") {

        evento.preventDefault();


        const dados = new FormData(formulario);

        const nome = dados.get("nome").trim();

        const descricao = dados.get("descricao").trim();

        const categoria = dados.get("categoria");


        if (!nome || !descricao || !categoria) return;



        projetos.unshift({

            id: Date.now(),

            nome: nome,

            categoria: categoria,

            descricao: descricao,

            propostas: 0,

            status: "Ativo",

            icone: "briefcase-business"

        });



        salvarDados();


        navegar("projetos");


        mostrarNotificacao(

            "Projeto publicado com sucesso!"

        );


        return;

    }



    /* PERFIL EMPRESARIAL */

    if (formulario.id === "company-form") {

        evento.preventDefault();


        const dados = new FormData(formulario);


        empresa = Object.fromEntries(dados);


        empresa.nome = empresa.nome.trim() || "Empresa";


        salvarDados();


        atualizarAvatar();


        const avatar = formulario.querySelector(".large-avatar");

        if (avatar) {

            avatar.textContent = empresa.nome[0].toUpperCase();

        }


        document.getElementById("profile-feedback").textContent =

            "Alterações salvas com sucesso!";



        mostrarNotificacao(

            "Perfil empresarial atualizado!"

        );


        return;

    }



    /* ENVIO DE MENSAGENS */

    if (formulario.dataset.chat) {

        evento.preventDefault();


        const dados = new FormData(formulario);


        const id = Number(formulario.dataset.chat);


        const texto = dados.get("mensagem").trim();


        if (!texto) return;


        if (!mensagens[id]) {

            mensagens[id] = [];

        }



        mensagens[id].push({

            texto: texto,

            enviada: true

        });



        salvarDados();


        abrirConversa(id);


        chatContent.querySelector("input")?.focus();


        responderAutomaticamente(id);

    }

});



/* ==================================================
   28. PESQUISA DE FREELANCERS
   ================================================== */

document.addEventListener("input", evento => {

    if (evento.target.id !== "freelancer-search") return;


    const busca = normalizarTexto(

        evento.target.value.trim()

    );



    const resultado = freelancers.filter(freelancer =>

        normalizarTexto(freelancer.nome).includes(busca) ||

        normalizarTexto(freelancer.especialidade).includes(busca) ||

        freelancer.habilidades.some(habilidade =>

            normalizarTexto(habilidade).includes(busca)

        )

    );



    listarFreelancers(resultado);

});



/* ==================================================
   29. ATALHOS DE TECLADO
   ================================================== */

document.addEventListener("keydown", evento => {

    if (document.querySelector(".modal-overlay")) return;


    if (evento.key === "Escape") {

        definirChat(false);

    }

});



/* ==================================================
   30. INICIALIZAÇÃO DA VEXA
   ================================================== */

atualizarAvatar();

definirChat(false);

navegar("inicio");
    


/* ==================================================
   FIM DO JAVASCRIPT — VEXA BUSINESS
   ================================================== */
