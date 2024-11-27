// alterado

// faz o olho de acultar se mecher 
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


// faz a os campos mudarem de cor 
    
let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;


senha.addEventListener('keyup', () => {
const regex = /[!@#$%^&*(),.?":{}|<>]/;
let valid = true;
if (senha.value.length < 6 || !regex.test(senha.value)) {
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = '<strong> Senha *Insira no mínimo 6 caracteres e um especial </strong>';
    senha.setAttribute('style', 'border-color: red'); 
    validSenha = false;
} else {
    labelSenha.setAttribute('style', 'color: green');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color: green');
    validSenha = true;
}
});