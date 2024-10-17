const images = [
  'https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png',
  'https://a-static.mlcdn.com.br/450x450/coleira-para-cachorro-em-couro-ajustavel-reforcada-caes-pet-n-7-crepardi/123wepet1/2899/65509c8c57cdce4c99c5893134b12b7a.jpeg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLLlv0gvUZBmDEskEM_DC2HNUO9I2UeCSXQ&s '
];

let currentIndex = 0;
const bannerElement = document.querySelector('.banner');

function updateBackgroundImage() {
  bannerElement.style.backgroundImage = `url(${images[currentIndex]})`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateBackgroundImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateBackgroundImage();
}

// Inicializa com a primeira imagem
updateBackgroundImage();

// Se quiser mudar automaticamente as imagens a cada 5 segundos:
setInterval(nextImage, 5000);


/* ---------------------------------------------------------------- */

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