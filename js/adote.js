// adocoes.js - Lógica específica para a página de adoções

document.addEventListener('DOMContentLoaded', function() {
    updateUI();  // Atualiza a interface com base no estado de login
  });


  // Código Externo

  $("input.variation").on("input", function () { // "input" é mais responsivo que "click" para campos
    const value = parseInt($(this).val()); // Garante que o valor é um número
    if (value > 3) {
        $("body").css("background", "#111");
        $("footer").addClass("dark"); // Adiciona a classe sem sobrescrever
    } else {
        $("body").css("background", "#f9f9f9");
        $("footer").removeClass("dark"); // Remove a classe apenas se existir
    }
});

$(".option__button").on("click", function () {
    $(".option__button").removeClass("selected");
    $(this).addClass("selected");
    if ($(this).hasClass("option--grid")) {
        $(".results-section").removeClass("results--list").addClass("results--grid");
    } else if ($(this).hasClass("option--list")) {
        $(".results-section").removeClass("results--grid").addClass("results--list");
    }
});



document.addEventListener('DOMContentLoaded', function () {
    loadPetsFromStorage();
    addFilterListeners(); // Adiciona os listeners para os filtros
});

// Adiciona listeners aos checkboxes
function addFilterListeners() {
    const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
}

// Aplica os filtros ativos
function applyFilters() {
    const selectedFilters = {
        idade: [],
        tipo: []
    };

    // Coleta os filtros de idade
    if (document.getElementById('checkbox-1').checked) selectedFilters.idade.push('Filhote');
    if (document.getElementById('checkbox-2').checked) selectedFilters.idade.push('Jovem');
    if (document.getElementById('checkbox-3').checked) selectedFilters.idade.push('Adulto');
    if (document.getElementById('checkbox-4').checked) selectedFilters.idade.push('Idoso');

    // Coleta os filtros de tipo
    if (document.getElementById('checkbox-5').checked) selectedFilters.tipo.push('Cachorro');
    if (document.getElementById('checkbox-6').checked) selectedFilters.tipo.push('Gato');
    if (document.getElementById('checkbox-7').checked) selectedFilters.tipo.push('Coelho');

    filterPets(selectedFilters);
}

// Filtra os pets baseados nos filtros selecionados
function filterPets(filters) {
    const petCards = document.querySelectorAll('.profile');
    const isListView = document.querySelector('.results-section').classList.contains('results--list'); // Verifica se está no modo lista

    petCards.forEach(card => {
        const petTipo = card.querySelector('.profile__stats__info').textContent;
        const petIdadeTexto = card.querySelector('.profile__stats:nth-child(5) h5').textContent.trim();

        // Converte a idade textual para meses
        const petIdadeMeses = converterIdadeParaMeses(petIdadeTexto);

        // Determina se o pet corresponde aos filtros de tipo e idade
        const matchesTipo = filters.tipo.length === 0 || filters.tipo.includes(petTipo);
        const matchesIdade = filters.idade.length === 0 || filters.idade.some(idade => correspondeFaixaEtaria(idade, petIdadeMeses));

        if (matchesTipo && matchesIdade) {
            card.style.visibility = 'visible';  // Torna o card visível
            card.style.opacity = '1';  // Torna o card completamente visível
            card.style.height = 'auto'; // Garante que o card tenha altura automática
            card.style.margin = '20px'; // Restaura a margem do card

            // No modo lista, garantimos que o card ocupe o espaço corretamente na vertical
            if (isListView) {
                card.style.display = 'flex'; // No modo lista, usamos display flex
                card.style.flexDirection = 'column'; // Organiza o conteúdo verticalmente
            }
        } else {
            card.style.visibility = 'hidden';  // Torna o card invisível
            card.style.opacity = '0';  // Torna o card transparente
            card.style.height = '0'; // Remove o espaço do card do layout
            card.style.margin = '0';  // Remove a margem do card invisível

            // No modo lista, ocultamos completamente o card, removendo o espaço ocupado
            if (isListView) {
                card.style.visibility = 'hidden';  // Torna o card invisível
                card.style.height = '0';  // Remover a altura e espaço ocupado
                card.style.margin = '0';  // Remove a margem
            }
        }
    });

    // Se necessário, forçar o layout a recalcular após os filtros
    forceReflow();
}

// Filtra os pets baseados nos filtros selecionados
function filterPets(filters) {
    const petCards = document.querySelectorAll('.profile');
    const isListView = document.querySelector('.results-section').classList.contains('results--list'); // Verifica se está no modo lista

    petCards.forEach(card => {
        const petTipo = card.querySelector('.profile__stats__info').textContent;
        const petIdadeTexto = card.querySelector('.profile__stats:nth-child(5) h5').textContent.trim();

        // Converte a idade textual para meses
        const petIdadeMeses = converterIdadeParaMeses(petIdadeTexto);

        // Determina se o pet corresponde aos filtros de tipo e idade
        const matchesTipo = filters.tipo.length === 0 || filters.tipo.includes(petTipo);
        const matchesIdade = filters.idade.length === 0 || filters.idade.some(idade => correspondeFaixaEtaria(idade, petIdadeMeses));

        if (matchesTipo && matchesIdade) {
            card.style.visibility = 'visible';  // Torna o card visível
            card.style.opacity = '1';  // Torna o card completamente visível
            card.style.height = 'auto'; // Garante que o card tenha altura automática
            card.style.margin = '20px'; // Restaura a margem do card

            // No modo grid, garantimos que o card ocupe o espaço corretamente no grid
            if (!isListView) {
                card.style.gridRow = 'auto';  // No grid, ocupa o espaço correto na grade
                card.style.display = '';  // No grid, usa o comportamento padrão de grid
            }

            // Para o modo lista, garantimos que o card fique empilhado verticalmente
            if (isListView) {
                card.style.display = '';  // Usa o layout de bloco por padrão
                card.style.width = '100%';  // Garante que os cards ocupem toda a largura
                card.style.flexDirection = 'column'; // Empilha os cards verticalmente
            }
        } else {
            card.style.visibility = 'hidden';  // Torna o card invisível
            card.style.opacity = '0';  // Torna o card transparente
            card.style.height = '0'; // Remove o espaço do card do layout
            card.style.margin = '0';  // Remove a margem do card invisível

            // No modo lista, ocultamos completamente o card, removendo o espaço ocupado
            if (isListView) {
                card.style.visibility = 'hidden';  // Torna o card invisível
                card.style.height = '0';  // Remove a altura e o espaço ocupado
                card.style.margin = '0';  // Remove a margem
            } else {
                card.style.gridRow = 'none';  // No grid, remove o card da grade (evita lacunas)
                card.style.display = 'none';  // Garante que o card não ocupe espaço no grid
            }
        }
    });

    // Se necessário, forçar o layout a recalcular após os filtros
    // Removido forceReflow(), pois não é necessário
}

// Função para converter a idade textual para meses (Ex.: "1 ano", "2 anos", "6 meses")
function converterIdadeParaMeses(idadeTexto) {
    let meses = 0;

    idadeTexto = idadeTexto.toLowerCase().trim();

    // Verifica se contém "ano" e extrai o número de anos
    if (idadeTexto.includes('ano')) {
        const matchAnos = idadeTexto.match(/(\d+)\s*ano/);
        if (matchAnos) {
            meses += parseInt(matchAnos[1]) * 12; // Converte anos para meses
        }
    }

    // Verifica se contém "meses" e extrai o número de meses
    if (idadeTexto.includes('meses') || idadeTexto.includes('mês')) {
        const matchMeses = idadeTexto.match(/(\d+)\s*mês/);
        if (matchMeses) {
            meses += parseInt(matchMeses[1]); // Adiciona os meses ao total
        }
    }

    return meses;
}

// Função para verificar a faixa etária do pet
function correspondeFaixaEtaria(idadeFiltro, idadeMeses) {
    switch (idadeFiltro) {
        case 'Filhote':
            return idadeMeses < 18;
        case 'Jovem':
            return idadeMeses >= 12 && idadeMeses <= 24;
        case 'Adulto':
            return idadeMeses >= 36 && idadeMeses <= 48;
        case 'Idoso':
            return idadeMeses >= 60;
        default:
            return false;
    }
}



document.addEventListener('DOMContentLoaded', function () {
    updateBadgeCounts();  // Atualiza os badges com as contagens corretas
});

// Função para atualizar os badges com as contagens dos perfis
function updateBadgeCounts() {
    const petCards = document.querySelectorAll('.profile');  // Todos os perfis de pets no DOM
    let filhoteCount = 0, jovemCount = 0, adultoCount = 0, idosoCount = 0;
    let cachorroCount = 0, gatoCount = 0, coelhoCount = 0;

    // Percorre todos os cards de pet e conta por tipo e idade
    petCards.forEach(card => {
        const petTipo = card.querySelector('.profile__stats__info').textContent.trim();  // Tipo do pet
        const petIdadeTexto = card.querySelector('.profile__stats:nth-child(5) h5').textContent.trim();  // Idade do pet

        // Converte a idade textual para meses
        const petIdadeMeses = converterIdadeParaMeses(petIdadeTexto);

        // Contagem por idade
        if (petIdadeMeses < 18) filhoteCount++;
        else if (petIdadeMeses >= 12 && petIdadeMeses <= 24) jovemCount++;
        else if (petIdadeMeses >= 36 && petIdadeMeses <= 48) adultoCount++;
        else if (petIdadeMeses >= 60) idosoCount++;

        // Contagem por tipo
        if (petTipo === 'Cachorro') cachorroCount++;
        else if (petTipo === 'Gato') gatoCount++;
        else if (petTipo === 'Coelho') coelhoCount++;
    });

    // Atualizar os badges de idade
    updateBadge('#checkbox-1', filhoteCount); // Badge para Filhote
    updateBadge('#checkbox-2', jovemCount);   // Badge para Jovem
    updateBadge('#checkbox-3', adultoCount);  // Badge para Adulto
    updateBadge('#checkbox-4', idosoCount);   // Badge para Idoso

    // Atualizar os badges de tipo
    updateBadge('#checkbox-5', cachorroCount); // Badge para Cachorros
    updateBadge('#checkbox-6', gatoCount);    // Badge para Gatos
    updateBadge('#checkbox-7', coelhoCount);  // Badge para Coelhos
}

// Função para atualizar o conteúdo do badge, caso o elemento exista
function updateBadge(selector, count) {
    const checkbox = document.querySelector(selector);
    if (checkbox) {
        // Acessa o badge corretamente, que está depois do label, não do checkbox
        const badge = checkbox.closest('.filters__item').querySelector('.badge');
        if (badge) {
            badge.textContent = count;  // Atualiza o número no badge
        } else {
            console.log('Badge não encontrado para:', selector);
        }
    } else {
        console.log('Checkbox não encontrado para:', selector);
    }
}

// Função para converter a idade textual para meses (Ex.: "1 ano", "2 anos", "6 meses")
function converterIdadeParaMeses(idadeTexto) {
    let meses = 0;

    idadeTexto = idadeTexto.toLowerCase().trim();

    // Verifica se contém "ano" e extrai o número de anos
    if (idadeTexto.includes('ano')) {
        const matchAnos = idadeTexto.match(/(\d+)\s*ano/);
        if (matchAnos) {
            meses += parseInt(matchAnos[1]) * 12; // Converte anos para meses
        }
    }

    // Verifica se contém "meses" e extrai o número de meses
    if (idadeTexto.includes('meses') || idadeTexto.includes('mês')) {
        const matchMeses = idadeTexto.match(/(\d+)\s*mês/);
        if (matchMeses) {
            meses += parseInt(matchMeses[1]); // Adiciona os meses ao total
        }
    }

    return meses;
}



// Modal e Profile

// Exibe a pré-visualização da imagem ao selecionar o arquivo
document.getElementById('photoFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('previewImage');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result; // Exibe a imagem selecionada
            previewImage.style.display = 'block'; // Torna o preview visível
        };
        reader.readAsDataURL(file); // Converte o arquivo em URL de dados
    }
});

// Função para abrir o modal
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
    clearPreviewImage(); // Limpa a pré-visualização quando o modal fecha
}

// Limpa a pré-visualização da imagem
function clearPreviewImage() {
    const previewImage = document.getElementById("previewImage");
    previewImage.src = ""; // Remove a imagem do src
    previewImage.style.display = "none"; // Oculta o elemento
    document.getElementById("photoFile").value = ""; // Reseta o input de arquivo
}

// Evento de envio do formulário
document.getElementById("addPetForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const petName = document.getElementById("petName").value.trim();
    const petAge = document.getElementById("petAge").value.trim();
    const donorName = document.getElementById("donorName").value.trim();
    const photoFileInput = document.getElementById("photoFile");
    const category = document.getElementById("category").value.trim();
    const petInfo = document.getElementById("petInfo").value.trim();

    if (!petName || !petAge || !donorName || !photoFileInput.files.length || !category) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    const file = photoFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const photoUrl = e.target.result; // Base64 da imagem

        const newPet = {
            id: Date.now(),
            photoUrl, // Salva a imagem como base64
            petName,
            petAge,
            category,
            petInfo,
            donorName
        };

        let pets = JSON.parse(localStorage.getItem("pets")) || [];
        pets.push(newPet);
        localStorage.setItem("pets", JSON.stringify(pets));

        alert("Pet adicionado com sucesso!");

        addPetCard(newPet);
        updateBadgeCounts();

        closeModal(); // Fecha o modal e limpa o preview
        document.getElementById("addPetForm").reset(); // Reseta o formulário
    };

    reader.readAsDataURL(file); // Converte a imagem em base64
});

// Função para carregar pets do Local Storage ao carregar a página
function loadPetsFromStorage() {
    const pets = JSON.parse(localStorage.getItem('pets')) || [];  // Recupera os pets do Local Storage
    console.log("Pets carregados do Local Storage:", pets); // Verifica se os pets estão sendo carregados

    // Se existirem pets, chama a função addPetCard para cada um
    pets.forEach(pet => {
        addPetCard(pet);  // Adiciona o card de cada pet
    });
}

// Função para carregar pets do Local Storage ao carregar a página
function loadPetsFromStorage() {
    const pets = JSON.parse(localStorage.getItem('pets')) || [];  // Recupera os pets do Local Storage

    // Verifica se os pets estão sendo carregados corretamente
    console.log("Pets carregados do Local Storage:", pets);

    // Adiciona os cards dos pets que não estão ainda no DOM
    pets.forEach(pet => {
        if (!document.querySelector(`[data-id="${pet.id}"]`)) {  // Verifica se o card já foi adicionado
            addPetCard(pet);  // Adiciona o card de cada pet, se não estiver no DOM
        }
    });
}

// Função para criar e adicionar o card do pet
function addPetCard(pet) {
    const resultsSection = document.querySelector('.results-section');

    // Verifica se o card já existe no DOM
    if (document.querySelector(`[data-id="${pet.id}"]`)) {
        return;  // Se o card já existir, não adiciona novamente
    }

    // Criar o HTML do card com um ID único para o pet
    const petCard = document.createElement('div');
    petCard.classList.add('profile');
    petCard.setAttribute('data-id', pet.id); // Adiciona o ID ao data-id do card
    petCard.innerHTML = `
        <div class="profile__image">
            <img src="${pet.photoUrl}" alt="${pet.petName}" />
        </div>
        <div class="profile__info">
            <h3>${pet.petName}</h3>
            <p class="profile__info__extra">${pet.petInfo}</p>
        </div>
        <div class="profile__stats">
            <p class="profile__stats__title">Tipo</p>
            <h5 class="profile__stats__info">${pet.category}</h5>
        </div>
        <div class="profile__stats">
            <p class="profile__stats__title">Doador</p>
            <h5>${pet.donorName}</h5> <!-- Nome do Doador -->
        </div>
        <div class="profile__stats">
            <p class="profile__stats__title">Idade</p>
            <h5>${pet.petAge}</h5>
        </div>
        <div class="profile__cta">
            <a class="button">Adotar ${pet.petName}!</a>
            <a class="button2" data-id="${pet.id}"><i class="fa-solid fa-x"></i></a>
        </div>
    `;

    // Adicionar o card ao contêiner
    resultsSection.appendChild(petCard);

    // Adicionar o evento de clique no botão de remover
    const removeButton = petCard.querySelector('.button2');
    removeButton.addEventListener('click', function (e) {
        e.preventDefault();
        removePet(pet.id, petCard);  // Chama a função de remoção, passando o ID e o card
    });
}

// Função para remover o pet do Local Storage e do card
function removePet(petId, petCard) {
    // Recuperar pets do Local Storage
    let pets = JSON.parse(localStorage.getItem("pets")) || [];

    // Filtrar o pet a ser removido
    pets = pets.filter(pet => pet.id !== petId);

    // Se não houver mais pets, remover a chave "pets" do Local Storage
    if (pets.length === 0) {
        localStorage.removeItem("pets");
    } else {
        // Salvar a lista atualizada no Local Storage
        localStorage.setItem("pets", JSON.stringify(pets));
    }

    // Remover o card da interface
    petCard.remove();

    // Atualizar os badges com as contagens corretas
    updateBadgeCounts();

    alert("Pet removido com sucesso!");
}

// Carregar pets do Local Storage ao iniciar a página
document.addEventListener('DOMContentLoaded', loadPetsFromStorage);



// Adiciona o evento de clique nos botões "Adotar"
document.addEventListener('DOMContentLoaded', function () {
    const adoptButtons = document.querySelectorAll('.profile__cta .button');
    adoptButtons.forEach(button => {
        button.addEventListener('click', savePetToLocalStorage);
    });
});

function savePetToLocalStorage(event) {
    event.preventDefault(); // Previne comportamento padrão do link

    // Encontra o card pai do botão clicado
    const petCard = event.target.closest('.profile');

    // Coleta as informações do pet
    const imageSrc = petCard.querySelector('.profile__image img').src;
    const petName = petCard.querySelector('.profile__info h3').textContent.trim();
    const petDescription = petCard.querySelector('.profile__info__extra').textContent.trim();
    const petType = petCard.querySelector('.profile__stats__info').textContent.trim();
    const donorName = petCard.querySelector('.profile__stats:nth-child(4) h5').textContent.trim();
    const petAge = petCard.querySelector('.profile__stats:nth-child(5) h5').textContent.trim();

    // Cria um objeto com as informações do pet
    const petData = {
        id: generatePetId(), // Gera um ID único para o pet
        image: imageSrc,
        name: petName,
        description: petDescription,
        type: petType,
        donor: donorName,
        age: petAge
    };

    // Recupera os dados existentes do localStorage ou cria um array vazio
const adoptedPets = JSON.parse(localStorage.getItem('adoptedPets')) || [];

// Verifica se o pet já foi adicionado comparando as propriedades
const duplicate = adoptedPets.some(pet =>
    pet.name === petData.name &&
    pet.description === petData.description &&
    pet.type === petData.type &&
    pet.age === petData.age
);

if (duplicate) {
    alert(`O pet ${petName} já foi adicionado com essas mesmas informações.`);
    return; // Impede a adição do pet
}

// Adiciona o novo pet à lista
adoptedPets.push(petData);

// Salva a lista atualizada no localStorage
localStorage.setItem('adoptedPets', JSON.stringify(adoptedPets));

// Exibe uma mensagem de sucesso
alert(`Conclua a adoção de ${petName} na página de "Suas Adoções"!`);

// Redireciona para a página de adoções
window.location.href = "https://nataliaclem.github.io/Petshop/adocoes.html";
}

// Função para gerar um ID único para cada pet
function generatePetId() {
    const adoptedPets = JSON.parse(localStorage.getItem('adoptedPets')) || [];
    // Se não houver pets salvos, começa com o ID 1
    if (adoptedPets.length === 0) {
        return 1;
    } else {
        // Retorna o maior ID existente + 1
        const maxId = Math.max(...adoptedPets.map(pet => pet.id));
        return maxId + 1;
    }
}


