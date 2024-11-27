const params = new URLSearchParams(window.location.search);
const token = params.get("token");

document.addEventListener("DOMContentLoaded", async () => {
  try{
    const response = axios.put(
      `http://localhost:3000/usuario/confirmar-cadastro?token=${token}`,
    )

    console.log("Resposta do backend:", response.data);
  }catch(error){
    console.error("Erro ao enviar token:", error);
  }
});