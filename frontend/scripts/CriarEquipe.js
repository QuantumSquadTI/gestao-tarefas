const teamForm = document.getElementById('teamForm');

const nome = document.getElementById('teamName');
const desc = document.getElementById('teamDescription');
const img = document.getElementById('teamImage');

let idU;

teamForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeValue = nome.value;
  const descValue = desc.value;
  const imgFile = img.files[0];

  const formData = new FormData();
  formData.append('nome', nomeValue);
  formData.append('descricao', descValue);
  formData.append('fotoEquipe', imgFile);

  try{
    const token = localStorage.getItem("token");
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = JSON.parse(atob(payloadBase64));
      idU = payloadDecoded.idU;
    }

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    

    const response = await axios.post(
      `http://localhost:3001/equipe/${idU}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
    
    console.log(response)
    window.location.href = "/frontend/views/principal.html";

  }catch(error){
    console.error(error)
    alert(`Erro ao criar equipe: ${error.response.data.message}`)
  }
})