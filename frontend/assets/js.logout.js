// alterado


let timeout;

// Reinicia o timer ao detectar atividade do usuário
function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(logout, 15 * 60 * 1000); // 15 minutos
}

// Função de logout
function logout() {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/usuarios/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao realizar logout");
            }
            localStorage.removeItem("token");
            localStorage.removeItem("userLogado");
            window.location.href = "/login"; // Redireciona para a página de login
        })
        .catch(console.error);
}

// Eventos de detecção de atividade
window.addEventListener("mousemove", resetTimer);
window.addEventListener("keydown", resetTimer);
resetTimer(); // Inicia o timer
