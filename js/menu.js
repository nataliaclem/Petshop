// Menu

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', () => {
    const isMenuOpen = navLinks.classList.toggle("open");

    links.forEach(link => {
        if (isMenuOpen) {
            link.classList.add("fade"); // Adiciona a transição
            setTimeout(() => {
                link.classList.add("show"); // Adiciona a visibilidade com atraso
            }, 100); // Tempo suficiente para acionar a transição
        } else {
            link.classList.remove("show"); // Remove visibilidade
            setTimeout(() => {
                link.classList.remove("fade"); // Remove a transição após fechar
            }, 200); // Tempo correspondente à transição
        }
    });

    hamburger.classList.toggle("toggle");

    document.body.style.overflow = isMenuOpen ? "hidden" : "";
});

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        if (navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            hamburger.classList.remove("toggle");
            document.body.style.overflow = "";

            links.forEach(link => {
                link.classList.remove("show");
                setTimeout(() => {
                    link.classList.remove("fade");
                }, 300); // Tempo correspondente à transição
            });
        }
    }
});