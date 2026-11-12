// Quando o formulário for enviado, mostra uma mensagem na tela
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar

  const nome = document.getElementById("nome").value;
  const carro = document.getElementById("carro").value;

  document.getElementById("mensagem").textContent =
    "Obrigado, " + nome + "! O Bat-sinal foi aceso e entraremos em contato sobre o " + carro + ".";

  formulario.reset(); // limpa os campos
});