document.addEventListener("DOMContentLoaded", async () => {
  const hash = window.location.hash;
  const token = new URLSearchParams(hash.replace("#", "")).get("token");

  try{
    const response = axios.put(
      `http://localhost:3001/usuario/confirmar-cadastro?token=${token}`,
    )

    console.log("Resposta do backend:", response.data);
  }catch(error){
    console.error("Erro ao enviar token:", error);
  }
});