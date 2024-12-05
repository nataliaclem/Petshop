document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll(".carousel-open");
    let currentIndex = 0;

    function autoSlide() {
        // Desmarca o atual
        radioButtons[currentIndex].checked = false;

        // Incrementa o índice (com ciclo)
        currentIndex = (currentIndex + 1) % radioButtons.length;

        // Marca o próximo
        radioButtons[currentIndex].checked = true;
    }

    // Configura a troca automática a cada 4 segundos
    setInterval(autoSlide, 4000);
});