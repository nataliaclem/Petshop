// adocoes.js - Lógica específica para a página de adoções

document.addEventListener('DOMContentLoaded', function() {
    updateUI();  // Atualiza a interface com base no estado de login
  });

document.addEventListener("DOMContentLoaded", function () {
    const adoptedPetsContainer = document.getElementById("adoptedPets");
    const noPetsMessage = document.getElementById("noPetsMessage");

    // Configura o estilo da grade dinamicamente
    adoptedPetsContainer.style.display = "grid";
    adoptedPetsContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    adoptedPetsContainer.style.gap = "20px";
    adoptedPetsContainer.style.padding = "20px";

    // Atualiza a visibilidade da mensagem
    function updateNoPetsMessage() {
        const pets = JSON.parse(localStorage.getItem("adoptedPets")) || [];
        noPetsMessage.style.display = pets.length === 0 ? "block" : "none";
    }

    // Carrega os perfis do localStorage
    function loadAdoptedPets() {
        const pets = JSON.parse(localStorage.getItem("adoptedPets")) || [];
        adoptedPetsContainer.innerHTML = "";

        if (pets.length === 0) {
            updateNoPetsMessage();
            return;
        }

        pets.forEach((pet) => {
            const petCard = createPetCard(pet);
            adoptedPetsContainer.appendChild(petCard);
        });

        updateNoPetsMessage();
    }

    // Cria um card de perfil para cada animal
function createPetCard(pet) {
    const card = document.createElement("div");
    card.classList.add("profile");
    card.setAttribute("data-id", pet.id);

    card.style.backgroundColor = "white";
    card.style.borderRadius = "10px";
    card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    card.style.overflow = "hidden";
    card.style.display = "flex";
    card.style.flexDirection = "column";

    card.innerHTML = `
        <div class="profile__image">
            <img src="${pet.image || ''}" alt="${pet.name || 'Sem nome'}">
        </div>
        <div class="profile__info">
            <h3>${pet.name || 'Sem nome'}</h3>
            <p class="profile__info__extra">${pet.description || 'Sem informações'}</p>
        </div>
        <div class="profile__stats">
            <p class="profile__stats__title">Tipo</p>
            <h5 class="profile__stats__info">${pet.type || 'Sem categoria'}</h5>
        </div>
        <div class="profile__stats">
            <p class="profile__stats__title">Doador</p>
            <h5>${pet.donor || 'Sem doador'}</h5>
        </div>
        <div class="profile__stats">
            <p class="profile__stats__title">Idade</p>
            <h5>${pet.age || 'Sem idade'}</h5>
        </div>
        <div class="profile__cta">
            <a class="button">Adotar ${pet.name}</a>
            <a class="button2" data-id="${pet.id}"><i class="fa-solid fa-x"></i></a>
        </div>
    `;

    const adoptButton = card.querySelector(".button");
    adoptButton.addEventListener("click", function () {
        // Salvando os dados no localStorage com a chave "adotar"
        localStorage.setItem("adotar", JSON.stringify(pet));

        // Removendo o pet da lista de 'adoptedPets' no localStorage
        let pets = JSON.parse(localStorage.getItem("adoptedPets")) || [];
        pets = pets.filter((p) => String(p.id) !== String(pet.id));
        localStorage.setItem("adoptedPets", JSON.stringify(pets));

        // Remove o card do DOM
        const petCard = document.querySelector(`.profile[data-id="${pet.id}"]`);
        if (petCard) {
            petCard.remove();
        }

        // Atualiza a mensagem de 'sem pets' se necessário
        updateNoPetsMessage();

        // Redirecionar para outro link (substitua pela URL desejada)
        window.location.href = "https://nataliaclem.github.io/Petshop/adotar.html";
    });

    // Adicionando o ouvinte de evento para o botão de remoção
    const removeButton = card.querySelector(".button2");
    removeButton.addEventListener("click", function () {
        // Remover o pet do localStorage e da interface
        removePet(pet.id);
    });

    return card;
}

    // Remove um animal do localStorage e da interface
    function removePet(petId) {
        let pets = JSON.parse(localStorage.getItem("adoptedPets")) || [];
        pets = pets.filter((pet) => String(pet.id) !== String(petId));
        localStorage.setItem("adoptedPets", JSON.stringify(pets));

        const petCard = document.querySelector(`.profile[data-id="${petId}"]`);
        if (petCard) {
            petCard.remove();
        }

        updateNoPetsMessage(); // Atualiza a mensagem após remover
    }

    loadAdoptedPets();
});
