// Troca de Imagens do Botão de Carrinho

const carrinhoBotao = document.querySelector('.carrinho-botao');
const carrinhoImg = document.querySelector('.carrinho-img');

carrinhoBotao.addEventListener('mouseenter', () => {
  carrinhoImg.src = 'img/carrinho-hover.png';
});

carrinhoBotao.addEventListener('mouseleave', () => {
  carrinhoImg.src = 'img/carrinho.png';
});

/* ---------------------------------------------------------------- */