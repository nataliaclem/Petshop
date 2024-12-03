document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado");

    // Recuperar o pet salvo no localStorage com a chave "adotar"
    const adoptedPet = localStorage.getItem('adotar');
    console.log("Dados recuperados do localStorage:", adoptedPet);

    if (adoptedPet) {
        try {
            // Parse para obter o objeto do localStorage
            const pet = JSON.parse(adoptedPet);
            console.log("Pet parseado:", pet);

            if (pet) {
                // Atualizar a imagem, se existir
                if (pet.image) {
                    const imageElement = document.getElementById('image');
                    imageElement.src = pet.image;  // Definir nova imagem
                    console.log("Imagem atualizada com sucesso.");
                }

                // Atualizar o texto do div com o nome do pet
                if (pet.name) {
                    const adoptionTextElement = document.querySelector('.mx-auto.w-48.text-gray-500.text-xs.text-center.mt-1');
                    adoptionTextElement.textContent += ` ${pet.name}`;
                    console.log("Nome adicionado com sucesso.");
                }
            } else {
                console.log("Pet não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao fazer o parse do JSON:", error);
        }
    } else {
        console.log("Nenhum dado encontrado no localStorage com a chave 'adotar'.");
    }
});

// Número de Telefone
document.getElementById('phoneNumber').addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Formata o número com (XX) DDD
    if (input.length > 0) {
        input = input.replace(/^(\d{2})(\d)/, '($1) $2');
    }

    // Adiciona espaço após o DDD e formata os próximos dígitos
    if (input.length > 9) {
        input = input.replace(/(\d{5})(\d{4})$/, '$1-$2');
    } else if (input.length > 8) {
        input = input.replace(/(\d{4})(\d{4})$/, '$1-$2');
    }

    e.target.value = input;
});

// Remover dados de "adotar" ao fechar a página
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('adotar');
    console.log("Dados de 'adotar' removidos do localStorage.");
});