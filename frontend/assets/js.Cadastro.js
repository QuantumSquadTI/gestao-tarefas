// alterado

// faz o olho de acultar fechar e abrir  
let btn = document.querySelector('.fa-eye')
let inputSenha = document.querySelector('#senha');

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