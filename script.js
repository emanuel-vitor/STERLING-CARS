const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value;

  document.getElementById("mensagem").textContent =
    "Obrigado, " + nome + "! O Bat-sinal foi aceso e entraremos em contato em breve.";

  formulario.reset();
});
