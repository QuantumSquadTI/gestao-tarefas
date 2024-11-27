// Seleção dos elementos do DOM
let btn = document.querySelector('.fa-eye');
let inputSenha = document.querySelector('#senha');
let email = document.querySelector('#email');
let senha = document.querySelector('#senha');
let confirmSenha = document.querySelector('#confirmSenha');
let labelEmail = document.querySelector('#labelEmail');
let labelSenha = document.querySelector('#labelSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validEmail = false;
let validSenha = false;
let validConfirmSenha = false;


// faz o olho de acultar fechar e abrir  

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

// Validação do e-mail, faz o campo mudar de cor 

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

// Validação da senha, faz o campo mudar de cor 

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

// Validação de confirmação da senha, faz o campo mudar de cor se as senhas foram diferantes 

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

// Função para enviar o formulário ao backend
// Enviar os dados para o backend
const formularioCadastro = document.querySelector('#formCadastro');
formularioCadastro.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    if (validEmail && validSenha && validConfirmSenha) {
        const dadosCadastro = {
            email: email.value,
            senha: senha.value,
        };

        try {
            const response = await fetch('http://seu-backend-url/usuarios/cadastrar', { //colocar a url certa 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosCadastro),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                // Redirecionar ou fazer outras ações após o sucesso
            } else {
                alert('Erro ao cadastrar: ' + data.message);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao tentar cadastrar. Tente novamente mais tarde.');
        }
    } 
});