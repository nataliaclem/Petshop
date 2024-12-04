// auth.js - Arquivo para lidar com login/logout globalmente

// Função para verificar se o usuário está logado
function getCurrentUser() {
  try {
      return JSON.parse(localStorage.getItem("currentUser"));
  } catch (error) {
      console.error("Erro ao obter o usuário atual:", error);
      return null;
  }
}

// Função para atualizar a visibilidade dos elementos com base no estado de login
function updateUI() {
  const currentUser = getCurrentUser();

  // Seleciona os elementos relevantes
  const cadastroButton = document.querySelector(".cadastro-botao");
  const logoutButton = document.querySelector("#logout-action");
  const animaisSection = document.getElementById("animais");

  // Atualiza a visibilidade dos botões de cadastro e logout
  if (cadastroButton && logoutButton) {
      if (currentUser) {
          cadastroButton.style.display = "none";
          logoutButton.style.display = "block";
      } else {
          cadastroButton.style.display = "block";
          logoutButton.style.display = "none";
      }
  } else {
      console.warn("Elementos de UI (cadastro ou logout) não encontrados.");
  }

  // Atualiza a visibilidade da seção de adoções, se ela existir
  if (animaisSection) {
      animaisSection.style.display = currentUser ? "block" : "none";
  }
}

// Função de logout
function logout() {
  try {
      localStorage.removeItem("currentUser");
      updateUI();
  } catch (error) {
      console.error("Erro ao fazer logout:", error);
  }
}

// Adiciona event listeners após o DOM ser carregado
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector("#logout-link");

  if (logoutLink) {
      logoutLink.addEventListener("click", (event) => {
          event.preventDefault(); // Previne o comportamento padrão do link
          logout();
      });
  } else {
      console.warn("Botão de logout não encontrado.");
  }

  // Atualiza a interface com base no estado de login ao carregar a página
  updateUI();
});