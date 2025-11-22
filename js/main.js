// Simula banco de dados de usuários
// Caso nenhuma conta exista, cria um usuário padrão:
if (!localStorage.getItem("users")) {
    const defaultUser = [
        {
            email: "admin@crunchy.com",
            password: "123456"
        }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUser));
}

// Lógica de Login
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(
        user => user.email === email && user.password === password
    );

    if (userFound) {
        alert("Login realizado com sucesso!");
        window.location.href = "home.html";
    } else {
        alert("E-mail ou senha incorretos.");
    }
});

