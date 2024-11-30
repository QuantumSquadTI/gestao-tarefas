document.addEventListener('DOMContentLoaded', async () => {
  let idU;
  const teamList = document.getElementById('teams');

  try{
    const token = localStorage.getItem("token");

    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = JSON.parse(atob(payloadBase64));
      idU = payloadDecoded.idU;
    }

    const response = await axios.get(
      `http://localhost:3001/equipe/${idU}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

    const listaEquipes = response.data.data;
    console.log(listaEquipes);
    

    const renderTeams = () => {
      teamList.innerHTML = '';
      listaEquipes.forEach(team => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = `http://127.0.0.1:3000/${team.fotoEquipe}`;
        img.alt = `Imagem de ${team.nome}`;
        img.style.width = '50px';
        img.style.height = '50px';
        li.appendChild(img);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = team.nome;
        nameSpan.style.fontSize = '18px'
        li.appendChild(nameSpan);

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Detalhes';
        detailsButton.onclick = () => window.location.href = "/frontend/views/tarefas.html";
        li.appendChild(detailsButton);

        teamList.appendChild(li);
      });
    };
  
    renderTeams();
    console.log(response.data)
  }catch(error){
    console.error(error)
    alert(`Erro ao listar equipes: ${error.response.data.message}`)
  }

  document.getElementById('add-team-btn').addEventListener('click', () => {
    window.location.href = '/frontend/views/CriarEquipe.html';
  });
});