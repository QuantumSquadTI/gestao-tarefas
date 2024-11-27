const formLogin = document.getElementById("formLogin");


formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const body = {
        email: email,
        senha: senha
    }
    
    try{
        const response = await axios.post("http://localhost:3000/usuario/login", body)
        
        console.log(response);
        // window.location.href = *;
    }catch(error){
        console.error("Erro ao cadastrar usuário:", error);
    }
})

const btn = document.getElementById("verSenha");

// Função para mostrar/ocultar senha
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