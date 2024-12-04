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

// Remover dados de "adoptionEmail" ao fechar a página
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('adoptionEmail');
    console.log("Dados de 'adoptionEmail' removidos do localStorage.");
});




// //

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona evento ao botão "Avançar"
    const avancarButton = document.querySelector('button[x-show="step < 3"]');

    if (avancarButton) {
        avancarButton.addEventListener('click', (e) => {
            // Captura os campos de entrada
            const nameInput = document.querySelector('input[type="text"]');
            const emailInput = document.querySelector('input[type="email"]');
            const phoneInput = document.getElementById('phoneNumber');
            const errorDiv = document.getElementById('step1-error');
            const emailErrorDiv = document.getElementById('email-error');
            const phoneErrorDiv = document.getElementById('phone-error');
            let isValid = true;

            // Inicializa as mensagens de erro: Esconde todas inicialmente
            errorDiv.style.display = 'none';
            emailErrorDiv.style.display = 'none';
            phoneErrorDiv.style.display = 'none';

            // Verifica se todos os campos estão preenchidos corretamente
            if (!nameInput.value || !emailInput.value || !phoneInput.value) {
                errorDiv.style.display = 'block'; // Exibe mensagem genérica se algum campo estiver vazio
                isValid = false;
            }

            // Valida o e-mail
            if (emailInput.value && !emailInput.value.includes('@')) {
                emailErrorDiv.style.display = 'block'; // Exibe mensagem de erro para e-mail se não contiver '@'
                isValid = false;
            }

            // Valida o número de telefone
            const phoneDigits = phoneInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
            if (phoneInput.value && phoneDigits.length !== 11) {
                phoneErrorDiv.style.display = 'block'; // Exibe mensagem de erro para telefone se não tiver 11 dígitos
                isValid = false;
            }

            // Se todas as validações passaram, avança para a próxima etapa
            if (isValid) {
                // Captura o valor do email digitado
                const email = emailInput.value;

                // Salva o email no localStorage
                localStorage.setItem('adoptionEmail', email);
                console.log("Email salvo:", email);

                // Atualiza o conteúdo da div de forma dinâmica com o email
                const stepCompleteDiv = document.querySelector('div.bg-white.p-10'); // Localiza a div da etapa de conclusão
                const savedEmail = localStorage.getItem('adoptionEmail'); // Recupera o email salvo

                if (stepCompleteDiv) {
                    const emailPlaceholder = stepCompleteDiv.querySelector('.text-gray-600');
                    if (emailPlaceholder) {
                        // Substitui [EMAIL] pelo email salvo em negrito
                        emailPlaceholder.innerHTML = emailPlaceholder.innerHTML.replace(
                            '[EMAIL]',
                            `<b>${savedEmail}</b>`
                        );
                    }
                }

                const alpineData = document.querySelector('[x-data="app()"]').__x.$data;
                if (alpineData.step < 3) {
                    alpineData.step++; // Avança para a próxima etapa
                }
            }
        });
    } else {
        console.error("O botão 'Avançar' não foi encontrado!");
    }

    // Exibe o nome na etapa de conclusão
    const adoptedPetData = localStorage.getItem('adotar'); // Recupera os dados do pet

    if (adoptedPetData) {
        const stepCompleteDiv = document.querySelector('div.bg-white.p-10'); // Localiza a div da etapa de conclusão
        const petData = JSON.parse(adoptedPetData);
        const petName = petData.name || 'seu pet';

        if (stepCompleteDiv) {
            const namePlaceholder = stepCompleteDiv.querySelector('.text-gray-600');
            if (namePlaceholder) {
                // Substitui [NOME] pelo nome salvo no objeto "adotar"
                namePlaceholder.innerHTML = namePlaceholder.innerHTML.replace(
                    '[NOME]',
                    `<b>${petName}</b>`
                );
            }
        }
    }
});