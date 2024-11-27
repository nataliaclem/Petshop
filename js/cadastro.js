document.addEventListener("DOMContentLoaded", () => {
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const container = document.querySelector(".container");
  const formsContainer = document.querySelector(".forms-container");

  // Inicialize a posição do formsContainer no modo de login
  if (!container.classList.contains("sign-up-mode") && window.innerWidth <= 870) {
    formsContainer.style.transform = "translateY(-9vh)"; // Modo de login inicial
  }

  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    
    // Animação de transição para o modo de cadastro
    if (window.innerWidth <= 870) {
      formsContainer.style.transform = "translateY(5vh)"; // Descer para o cadastro
    }
  });

  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    
    // Animação de transição para o modo de login
    if (window.innerWidth <= 870) {
      formsContainer.style.transform = "translateY(-9vh)"; // Subir para o login
    }
  });
});

// Referências aos formulários
const signUpForm = document.querySelector(".sign-up-form");
const signInForm = document.querySelector(".sign-in-form");

// Função para salvar um usuário no localStorage
function saveUser(username, email, password) {
  // Obter os usuários já cadastrados
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Verificar se o usuário já existe
  if (users.some(user => user.username === username)) {
    alert("Esse usuário já está cadastrado!");
    return false;
  }

  // Adicionar o novo usuário
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Conta criada com sucesso!");
  return true;
}

// Função para validar login
function loginUser(username, password) {
  // Obter os usuários cadastrados
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Procurar um usuário correspondente
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    alert("Login realizado com sucesso!");
    // Aqui você pode redirecionar para outra página
    window.location.href = "dashboard.html"; // Exemplo
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

// Evento de cadastro
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = signUpForm.querySelector("input[placeholder='Usuário']").value;
  const email = signUpForm.querySelector("input[placeholder='Email']").value;
  const password = signUpForm.querySelector("input[placeholder='Senha']").value;

  if (username && password) {
    saveUser(username, email, password);
  } else {
    alert("Por favor, preencha todos os campos obrigatórios!");
  }
});

// Evento de login
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = signInForm.querySelector("input[placeholder='Usuário']").value;
  const password = signInForm.querySelector("input[placeholder='Senha']").value;

  if (username && password) {
    loginUser(username, password);
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});