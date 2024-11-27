
// Elementos do DOM
let btn = document.querySelector('.fa-eye');
let inputSenha = document.querySelector('#senha');
let inputEmail = document.querySelector('#email'); // Email do usuário
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;
let token = '';
let senha = document.querySelector('#senha');
// faz o olho de acultar se mecher 


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


// faz a os campos mudarem de cor 
    
const usuarioLogado = JSON.parse(localStorage.getItem("userLogado"));

senha.addEventListener('keyup', () => {
const regex = /[!@#$%^&*(),.?":{}|<>]/;
let valid = true;
if (senha.value.length < 6 || !regex.test(senha.value)) {
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = '<strong> Senha *Insira no mínimo 6 caracteres e um especial </strong>';
    senha.setAttribute('style', 'border-color: red'); 
    validSenha = false;
} else {
    // Compara a senha inserida com a senha cadastrada
    if (usuarioLogado && usuarioLogado.senha === senha.value) {
        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = 'Senha';
        senha.setAttribute('style', 'border-color: green');
        validSenha = true;
    } else {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = '<strong> Senha incorreta. Verifique e tente novamente.</strong>';
        senha.setAttribute('style', 'border-color: red');
        validSenha = false;
    }
}
});

async  function login() {
    const email = inputEmail.value;
    const senha = inputSenha.value;

    // Verificação básica do email e senha
    if (!email || !senha) {
        alert('Por favor, insira o e-mail e a senha');
        return;
    }

    try {
        const response = await fetch('http://seu-backend-url/usuarios/login', { //colocar a url certa 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }), // Envia os dados ao backend
        });

        if (!response.ok) {
            throw new Error('Usuário ou senha incorretos');
        }

        const data = await response.json(); // Dados retornados do backend

        token = data.token; // Recupera o token JWT retornado
        localStorage.setItem("token", token); // Armazena o token
        localStorage.setItem("userLogado", JSON.stringify(data.user)); // Armazena dados do usuário

        // Redireciona ou faz outras ações, como redirecionar para a página principal
        
        window.location.href = '/pagina-principal'; //alterar para a pagina home

    } catch (error) {
        alert(error.message); // Mensagem de erro
    }
}

// Adiciona evento ao botão de login
document.querySelector('#btnLogin').addEventListener('click', login);