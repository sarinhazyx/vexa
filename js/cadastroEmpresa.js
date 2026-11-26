 const parametros = new URLSearchParams(window.location.search);
    const perfilInicial = parametros.get("tipo");

    const camposPerfil = document.getElementById("camposPerfil");
    const linkLogin = document.getElementById("linkLogin");
    const formulario = document.getElementById("formCadastro");
    const botaoFreelancer = document.getElementById("perfilFreelancer");
    const botaoEmpresa = document.getElementById("perfilEmpresa");

    let tipoAtual =
      perfilInicial === "empresa" ? "empresa" : "freelancer";

    const icones = {
      pessoa: `
        <svg class="campo-icone" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="7.5" r="4" stroke="currentColor" stroke-width="1.8"/>
          <path d="M3.5 21v-2.5a6 6 0 0 1 6-6h5a6 6 0 0 1 6 6V21Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        </svg>`,
      email: `
        <svg class="campo-icone" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/>
          <path d="m3 6 9 7 9-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
      senha: `
        <svg class="campo-icone" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="10" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/>
          <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M12 14v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`
    };

    function campoTexto(id, label, placeholder, tipo = "text", icone = "pessoa", autocomplete = "") {
      return `
        <div class="campo">
          <label for="${id}">${label}</label>
          <div class="campo-controle">
            ${icones[icone]}
            <input
              type="${tipo}"
              id="${id}"
              name="${id}"
              placeholder="${placeholder}"
              ${autocomplete ? `autocomplete="${autocomplete}"` : ""}
              required
            >
            ${tipo === "password" ? `
              <button
                type="button"
                class="alternar-senha"
                data-alternar="${id}"
                aria-label="Mostrar senha"
                title="Mostrar senha"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 3 21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.7 4.2 10 7-.5 1.1-1.3 2.3-2.3 3.4M6.2 6.2C3.9 7.7 2.5 10 2 12c1.3 2.8 4.8 7 10 7 1.4 0 2.7-.3 3.8-.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            ` : ""}
          </div>
        </div>
      `;
    }

    function atualizarFormulario() {
      const ehEmpresa = tipoAtual === "empresa";

      botaoFreelancer.setAttribute("aria-pressed", String(!ehEmpresa));
      botaoEmpresa.setAttribute("aria-pressed", String(ehEmpresa));
      linkLogin.href = `login.html?tipo=${tipoAtual}`;

      if (ehEmpresa) {
        camposPerfil.innerHTML =
          campoTexto("nomeEmpresa", "Nome da empresa", "Digite o nome da empresa", "text", "pessoa") +
          campoTexto("responsavel", "Nome do responsável", "Nome completo do responsável", "text", "pessoa") +
          campoTexto("cnpj", "CNPJ", "00.000.000/0000-00", "text", "pessoa") +
          campoTexto("email", "E-mail corporativo", "contato@empresa.com", "email", "email", "email") +
          campoTexto("senha", "Senha", "Crie uma senha", "password", "senha", "new-password") +
          campoTexto("confirmarSenha", "Confirmar senha", "Repita sua senha", "password", "senha", "new-password");
      } else {
        camposPerfil.innerHTML =
          campoTexto("nome", "Nome completo", "Digite seu nome completo", "text", "pessoa", "name") +
          campoTexto("email", "E-mail", "seuemail@exemplo.com", "email", "email", "email") +
          campoTexto("senha", "Senha", "Crie uma senha", "password", "senha", "new-password") +
          campoTexto("confirmarSenha", "Confirmar senha", "Repita sua senha", "password", "senha", "new-password");
      }

      document.querySelectorAll("[data-alternar]").forEach(function(botao) {
        botao.addEventListener("click", function() {
          const campoSenha = document.getElementById(botao.dataset.alternar);
          const mostrar = campoSenha.type === "password";

          campoSenha.type = mostrar ? "text" : "password";
          botao.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
          botao.setAttribute("title", mostrar ? "Ocultar senha" : "Mostrar senha");
        });
      });
    }

    botaoFreelancer.addEventListener("click", function() {
      tipoAtual = "freelancer";
      atualizarFormulario();
    });

    botaoEmpresa.addEventListener("click", function() {
      tipoAtual = "empresa";
      atualizarFormulario();
    });

    atualizarFormulario();

    formulario.addEventListener("submit", function(evento) {
      evento.preventDefault();

      const senha = document.getElementById("senha").value;
      const confirmarSenha = document.getElementById("confirmarSenha").value;

      if (senha !== confirmarSenha) {
        alert("As senhas não são iguais. Confira e tente novamente.");
        return;
      }

      alert(
        "Cadastro demonstrativo concluído! " +
        "A criação de contas real será integrada depois."
      );
    });