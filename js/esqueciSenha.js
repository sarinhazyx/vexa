 const formulario = document.getElementById("formRecuperacao");
    const linkLogin = document.getElementById("linkLogin");

    const parametros = new URLSearchParams(window.location.search);
    const perfil = parametros.get("tipo");

    if (perfil === "empresa" || perfil === "freelancer") {
      linkLogin.href = `login.html?tipo=${perfil}`;
    }

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      alert(
        "Esta é uma demonstração. O envio real do e-mail de recuperação será integrado depois."
      );
    });