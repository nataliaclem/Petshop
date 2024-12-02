// Abrir o modal
function openModal() {
    document.getElementById("modal").style.display = "flex";
  }
  
  // Fechar o modal
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }
  
  // Submeter o formulário e salvar no localStorage
  document.getElementById("addPetForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Coletar os dados do formulário
    const petName = document.getElementById("petName").value;
    const petAge = document.getElementById("petAge").value;
    const donorName = document.getElementById("donorName").value;
    const photoUrl = document.getElementById("photoUrl").value;
    const petInfo = document.getElementById("petInfo").value;
    const category = document.getElementById("category").value; // Corrigido: coleta do valor da categoria
  
    // Verificar se todos os campos obrigatórios estão preenchidos
    if (petName && petAge && donorName && photoUrl && category) {
      // Criar objeto com os dados do pet
      const newPet = {
        nome: petName,
        idade: petAge,
        doador: donorName,
        foto: photoUrl,
        categoria: category, // Adicionando a categoria corretamente
        informacoes: petInfo,
      };
  
      // Recuperar os pets existentes no localStorage (ou criar uma lista nova se não houver nada salvo)
      let pets = JSON.parse(localStorage.getItem("pets")) || [];
  
      // Adicionar o novo pet à lista
      pets.push(newPet);
  
      // Salvar a lista atualizada no localStorage
      localStorage.setItem("pets", JSON.stringify(pets));
  
      alert("Pet adicionado com sucesso!");
  
      // Fechar o modal e resetar o formulário
      closeModal();
      this.reset();
    } else {
      alert("Por favor, preencha todos os campos obrigatórios!");
    }
  });