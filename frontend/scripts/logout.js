let timeout;

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(logout, 15 /** 60*/ * 1000); // 15 segundos
}

async function logout() {
    const token = localStorage.getItem("token");
    if (!token) return;

    
    const response = await axios.post("http://localhost:3000/usuario/login")

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
            window.location.href = "/login";
        })
        .catch(console.error);
}

window.addEventListener("mousemove", resetTimer);
window.addEventListener("keydown", resetTimer);
resetTimer();