const images = [
  'https://via.placeholder.com/800x400?text=Imagem+1',
  'https://via.placeholder.com/800x400?text=Imagem+2',
  'https://via.placeholder.com/800x400?text=Imagem+3'
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
