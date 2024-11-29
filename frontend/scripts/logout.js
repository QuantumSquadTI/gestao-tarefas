let timeout;
console.log("Script logout.js carregado com sucesso!");

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(logout, 15 * 60 * 1000); // 15 minutos
}

async function logout() {
    console.log("ola2");
    
    const token = localStorage.getItem("token");
    if (!token) return;

    const body = {
        token: token
    }

    try {
        const logoutResponse = await axios.post(
            "http://localhost:3001/usuario/logout", 
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        if (logoutResponse.status !== 200) {
            throw new Error("Erro ao realizar logout");
        }

        localStorage.removeItem("token");
        localStorage.removeItem("userLogado");

        window.location.href = "/frontend/views/login.html";
        console.log("Obrigado por deslogar");
        
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener("mousemove", resetTimer);
window.addEventListener("keydown", resetTimer);

window.addEventListener("DOMContentLoaded", function() {
    resetTimer();
    console.log("Script logout.js carregado com sucesso!asdasda");
});

function setupLogoutButton() {
    console.log("ola");
    
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
}

setupLogoutButton();