const teamForm = document.getElementById('teamForm');
const maxTeams = 3; // Número máximo de equipes por usuário
let createdTeams = 0; // Contador de equipes criadas

teamForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (createdTeams >= maxTeams) {
    alert('Você já atingiu o limite máximo de equipes.');
    return;
  }

  const teamName = document.getElementById('teamName').value.trim();
  const teamDescription = document.getElementById('teamDescription').value.trim();
  const teamImage = document.getElementById('teamImage').files[0];

  if (!teamName || !teamDescription) {
    alert('Todos os campos são obrigatórios.');
    return;
  }

  createdTeams++;
  alert(`Equipe "${teamName}" criada com sucesso!`);
  teamForm.reset();
});