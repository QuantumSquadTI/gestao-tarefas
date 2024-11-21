const teamForm = document.getElementById('teamForm');
const nome = document.getElementById('teamName');
const desc = document.getElementById('teamDescription');
const img = document.getElementById('teamImage');

const body = {
  nome: nome,
  descricao: desc,
  fotoEquipe: img
}

teamForm.addEventListener('submit', (e) => {
  e.preventDefault();

  axios.post('http://localhost:3000/equipe/1', body)
    .then(response =>{
      console.log('Dados enviados com sucesso:', response.data)
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error)
    });

    //ver como add token




  // const jsonDados = JSON.stringify(dados)

  // console.log(jsonDados);
  

  // axios.post('http://localhost:3000/equipe', )


  // if (createdTeams >= maxTeams) {
  //   alert('Você já atingiu o limite máximo de equipes.');
  //   return;
  // }
})


// teamForm.addEventListener('submit', (e) => {
//   e.preventDefault();

  

//   const teamName = document.getElementById('teamName').value.trim();
//   const teamDescription = document.getElementById('teamDescription').value.trim();
//   const teamImage = document.getElementById('teamImage').files[0];

//   if (!teamName || !teamDescription) {
//     alert('Todos os campos são obrigatórios.');
//     return;
//   }

//   createdTeams++;
//   alert(`Equipe "${teamName}" criada com sucesso!`);
//   teamForm.reset();
// });