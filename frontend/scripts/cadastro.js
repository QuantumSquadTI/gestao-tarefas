// Variáveis para os elementos

let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

let email = document.querySelector('#email');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

// Validação do e-mail

email.addEventListener('keyup', () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = '<strong>E-mail *Insira um e-mail válido</strong>';
        email.setAttribute('style', 'border-color: red');
        validEmail = false;
    } else {
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = 'E-mail';
        email.setAttribute('style', 'border-color: green');
        validEmail = true;
    }
});

// Validação da senha

senha.addEventListener('keyup', () => {
    if (senha.value.length < 6) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = '<strong>Senha *Insira no mínimo 8 caracteres</strong>';
        senha.setAttribute('style', 'border-color: red');
        validSenha = false;
    } else {
        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = 'Senha';
        senha.setAttribute('style', 'border-color: green');
        validSenha = true;
    }
});

// Validação de confirmação da senha

confirmSenha.addEventListener('keyup', () => {
    if (senha.value !== confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red');
        labelConfirmSenha.innerHTML = '<strong>Confirmar Senha *Senhas não são iguais</strong>';
        confirmSenha.setAttribute('style', 'border-color: red');
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green');
        labelConfirmSenha.innerHTML = 'Confirmar Senha';
        confirmSenha.setAttribute('style', 'border-color: green');
        validConfirmSenha = true;
    }
});

// Função para cadastrar

function cadastrar() {
    if (validEmail && validSenha && validConfirmSenha) {
        let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");

        listaUser.push({
            nomeCad: nome.value,
            emailCad: email.value,
            senhaCad: senha.value
        });

        localStorage.setItem("listaUser", JSON.stringify(listaUser));

        msgSuccess.setAttribute('style', 'display: block');
        msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
        msgError.setAttribute('style', 'display: none');

        setTimeout(() => {
            window.location.href = "../views/login.html";
        }, 1000);
    } else {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente</strong>';
        msgSuccess.setAttribute('style', 'display: none');
    }
}

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

// Função para mostrar/ocultar confirmação de senha

btnConfirm.addEventListener('click', () => {
    if (confirmSenha.type === 'password') {
        confirmSenha.type = 'text';
        btnConfirm.classList.add('fa-eye');
        btnConfirm.classList.remove('fa-eye-slash');
    } else {
        confirmSenha.type = 'password';
        btnConfirm.classList.add('fa-eye-slash');
        btnConfirm.classList.remove('fa-eye');
    }
});
