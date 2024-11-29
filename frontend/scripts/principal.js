document.addEventListener('DOMContentLoaded', async () => {

  let idU;

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
    console.log(response.data)
  }catch(error){
    console.error(error)
    alert(`Erro ao listar equipes: ${error.response.data.message}`)
  }

  document.getElementById('add-team-btn').addEventListener('click', () => {
    window.location.href = 'CriarEquipe.html'; // Substituair para link correto
  });
});