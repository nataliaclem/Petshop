// auth.js - Arquivo para lidar com login/logout globalmente

// Função para verificar se o usuário está logado
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// Função para atualizar a visibilidade dos elementos com base no estado de login
function updateUI() {
  const currentUser = getCurrentUser();
  
  // Atualiza visibilidade no menu.js
  const cadastroButton = document.querySelector(".cadastro-botao");
  const logoutButton = document.querySelector("#logout-action");
  
  if (currentUser) {
    cadastroButton.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    cadastroButton.style.display = "block";
    logoutButton.style.display = "none";
  }
  
  // Atualiza visibilidade na página de adoções (adocoes.js)
  const animaisSection = document.getElementById("animais");
  if (animaisSection) {
    animaisSection.style.display = currentUser ? "block" : "none";
  }
}

// Função de logout
function logout() {
  localStorage.removeItem("currentUser");
  updateUI();
}