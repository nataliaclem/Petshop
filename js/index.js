
// Menu

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    hamburger.classList.toggle("toggle");

    if (navLinks.classList.contains("open")) {
        document.body.style.overflow = "hidden"; 
    } else {
        document.body.style.overflow = ""; 
    }
});

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        if (navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            hamburger.classList.remove("toggle");

            document.body.style.overflow = "";
        }

        links.forEach(link => {
            link.classList.remove("fade");
        });
    }
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