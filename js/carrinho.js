function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaCarrinho = document.getElementById('lista-carrinho');
    let total = 0;

    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    // Itera sobre os produtos no carrinho e exibe-os
    carrinho.forEach(produto => {
        const item = document.createElement('div');
        item.innerHTML = `<h3>${produto.nome}</h3><p>R$ ${produto.preco.toFixed(2)}</p>`;
        listaCarrinho.appendChild(item);
        total += produto.preco; // Calcula o total
    });

    // Atualiza o valor total no carrinho
    document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
    localStorage.removeItem('carrinho'); // Remove o carrinho do localStorage
    alert("Compra finalizada! Obrigado pela sua compra!");
    window.location.href = 'index.html'; // Redireciona para a página inicial após a compra
}

// Carrega o carrinho ao abrir a página
window.onload = carregarCarrinho;
