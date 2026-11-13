let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const mensagensOcupado = [
  "A linha da Sterling Cars está ocupada: o Coringa invadiu o salão e a equipe está negociando a saída dele. Tente de novo mais tarde!",
  "O Bat-sinal acendeu no meio do atendimento e todos os vendedores saíram correndo. Tente novamente em alguns minutos.",
  "Blecaute em Gotham! O WhatsApp da concessionária está fora do ar. Tente novamente mais tarde."
];

function dinheiro(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

document.querySelector("nav").insertAdjacentHTML("beforeend",
  '<button type="button" id="btn-carrinho" class="btn-carrinho">🛒 Carrinho <span id="contador">0</span></button>');

document.body.insertAdjacentHTML("beforeend", `
  <div id="fundo-carrinho"></div>
  <aside id="carrinho">
    <div class="carrinho-topo">
      <h2>Seu carrinho</h2>
      <button type="button" id="fechar-carrinho" aria-label="Fechar carrinho">✕</button>
    </div>
    <div id="itens-carrinho"></div>
    <div class="carrinho-rodape">
      <p class="carrinho-total">Total: <strong id="total-carrinho"></strong></p>
      <button type="button" id="enviar-pedido" class="botao">Enviar pedido pelo WhatsApp</button>
      <p id="msg-carrinho"></p>
    </div>
  </aside>`);

function abrir() {
  document.getElementById("carrinho").classList.add("aberto");
  document.getElementById("fundo-carrinho").classList.add("aberto");
}

function fechar() {
  document.getElementById("carrinho").classList.remove("aberto");
  document.getElementById("fundo-carrinho").classList.remove("aberto");
}

function desenhar() {
  let total = 0;
  let quantidade = 0;
  let html = "";

  carrinho.forEach(function (item, posicao) {
    total += item.preco * item.qtd;
    quantidade += item.qtd;
    html += `
      <div class="item-carrinho">
        <div class="item-info">
          <h3>${item.nome}</h3>
          <p>${dinheiro(item.preco)}</p>
          <div class="item-qtd">
            <button type="button" data-posicao="${posicao}" data-valor="-1">−</button>
            <span>${item.qtd}</span>
            <button type="button" data-posicao="${posicao}" data-valor="1" ${item.qtd >= item.estoque ? "disabled" : ""}>+</button>
            <small>máx. ${item.estoque}</small>
          </div>
        </div>
      </div>`;
  });

  if (carrinho.length === 0) {
    html = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
  }

  document.getElementById("itens-carrinho").innerHTML = html;
  document.getElementById("total-carrinho").textContent = dinheiro(total);
  document.getElementById("contador").textContent = quantidade;
}

document.querySelectorAll(".botao-comprar").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const card = botao.closest(".card");
    const nome = card.dataset.nome;
    const estoque = Number(card.dataset.estoque);
    const msg = document.getElementById("msg-carrinho");
    msg.textContent = "";

    const item = carrinho.find(function (i) { return i.nome === nome; });

    if (!item) {
      carrinho.push({ nome: nome, preco: Number(card.dataset.preco), estoque: estoque, qtd: 1 });
    } else if (item.qtd < estoque) {
      item.qtd++;
    } else {
      msg.textContent = "Você já pegou todas as unidades em estoque deste carro.";
    }

    salvar();
    desenhar();
    abrir();
  });
});

document.getElementById("itens-carrinho").addEventListener("click", function (evento) {
  const botao = evento.target.closest("button");
  if (!botao) return;

  const item = carrinho[botao.dataset.posicao];
  item.qtd += Number(botao.dataset.valor);

  if (item.qtd <= 0) {
    carrinho.splice(botao.dataset.posicao, 1); // chegou a zero: tira do carrinho
  }

  salvar();
  desenhar();
});

document.getElementById("enviar-pedido").addEventListener("click", function () {
  const msg = document.getElementById("msg-carrinho");

  if (carrinho.length === 0) {
    msg.textContent = "Adicione um carro antes de enviar o pedido.";
  } else {
    const sorteio = Math.floor(Math.random() * mensagensOcupado.length);
    msg.textContent = mensagensOcupado[sorteio];
  }
});

document.getElementById("btn-carrinho").addEventListener("click", function () {
  document.getElementById("msg-carrinho").textContent = "";
  abrir();
});
document.getElementById("fechar-carrinho").addEventListener("click", fechar);
document.getElementById("fundo-carrinho").addEventListener("click", fechar);

desenhar();
