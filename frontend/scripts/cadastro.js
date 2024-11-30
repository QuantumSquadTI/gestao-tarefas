const formCadastro = document.getElementById("formCadastro");

formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const body = {
        nome: nome,
        email: email,
        senha: senha
    }
    
    try{
        const response = await axios.post("http://localhost:3001/usuario", body)
        
        console.log(response);
        window.location.href = "/frontend/views/login.html";
    }catch(error){
        console.log(error)
        alert(`Erro ao cadastrar usuário: ${error.response.data.message}`)
    }
})


const btn = document.getElementById("verSenha");

btn.addEventListener('click', () => {
    if (senha.type === 'password') {
        senha.type = 'text';
        btn.classList.add('fa-eye');
        btn.classList.remove('fa-eye-slash');
    } else {
        senha.type = 'password';
        btn.classList.add('fa-eye-slash');
        btn.classList.remove('fa-eye');
    }
});

