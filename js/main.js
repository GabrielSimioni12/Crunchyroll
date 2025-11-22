// Cria usuário padrão se não existir
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
        { email: "admin@crunchy.com", password: "123456" }
    ]));
}

// Login
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
        window.location.href = "../../home.html";
    } else {
        alert("E-mail ou senha incorretos.");
    }
});
