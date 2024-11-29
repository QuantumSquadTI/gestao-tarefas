




document.addEventListener('DOMContentLoaded', () => {
  const teams = [
    { id: 1, name: "Equipe Alpha" },
    { id: 2, name: "Equipe Beta" },
    { id: 3, name: "Equipe Gama" },
  ];

  const teamList = document.getElementById('teams');

  // Renderiza as equipes na tela

  const renderTeams = () => {
    teamList.innerHTML = ''; 
    teams.forEach(team => {
      const li = document.createElement('li');
      li.textContent = team.name;
      const detailsButton = document.createElement('button');
      detailsButton.textContent = 'Detalhes';
      detailsButton.onclick = () => alert(`Detalhes da ${team.name}`);
      li.appendChild(detailsButton);
      teamList.appendChild(li);
    });
  };

  renderTeams();

  // Redireciona para a tela de adicionar equipe

  document.getElementById('add-team-btn').addEventListener('click', () => {
    window.location.href = 'CriarEquipe.html'; // Substituair para link correto
  });
});
