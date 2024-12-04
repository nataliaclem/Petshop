// adocoes.js - Lógica específica para a página de adoções

document.addEventListener('DOMContentLoaded', function() {
  updateUI();  // Atualiza a interface com base no estado de login
});


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