 const parametros = new URLSearchParams(window.location.search);
    const tipo = parametros.get("tipo") === "empresa" ? "empresa" : "freelancer";

    const tituloLogin = document.getElementById("tituloLogin");
    const subtituloLogin = document.getElementById("subtituloLogin");
    const tituloApresentacao = document.getElementById("tituloApresentacao");
    const descricaoApresentacao = document.getElementById("descricaoApresentacao");
    const labelEmail = document.getElementById("labelEmail");
    const email = document.getElementById("email");
    const linkCadastro = document.getElementById("linkCadastro");
    const linkEsqueciSenha = document.getElementById("esqueciSenha");

    if (tipo === "empresa") {
      tituloLogin.textContent = "Login Empresa";
      subtituloLogin.textContent =
        "Acesse sua conta para encontrar talentos e gerenciar seus projetos.";
      tituloApresentacao.innerHTML =
        'Encontre os <span>profissionais certos.</span>';
      descricaoApresentacao.textContent =
        "Publique projetos, monte sua equipe e transforme ideias em resultados com a VEXA.";
      labelEmail.textContent = "E-mail corporativo";
      email.placeholder = "seuemail@empresa.com";
    } else {
      tituloLogin.textContent = "Login Freelancer";
      subtituloLogin.textContent =
        "Acesse sua conta para encontrar novas oportunidades.";
      tituloApresentacao.innerHTML =
        'Encontre <span>novas oportunidades.</span>';
      descricaoApresentacao.textContent =
        "Mostre seu talento, encontre projetos e conecte-se a empresas que valorizam suas ideias.";
      labelEmail.textContent = "E-mail";
      email.placeholder = "seuemail@exemplo.com";
    }

    linkCadastro.href = `cadastro.html?tipo=${tipo}`;

    linkEsqueciSenha.addEventListener("click", function(event) {
      event.preventDefault();
      window.location.href = `esqueci-senha.html?tipo=${tipo}`;
    });

    document.getElementById("alternarSenha").addEventListener("click", function() {
      const senha = document.getElementById("senha");
      const mostrar = senha.type === "password";

      senha.type = mostrar ? "text" : "password";
      this.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
      this.setAttribute("title", mostrar ? "Ocultar senha" : "Mostrar senha");
    });

    document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault();
      alert("Login de demonstração concluído! Ainda não há autenticação real.");
    });

    document.querySelectorAll("[data-social]").forEach(function(botao) {
      botao.addEventListener("click", function() {
        alert("O login com " + botao.dataset.social + " ainda não está conectado.");
      });
    });