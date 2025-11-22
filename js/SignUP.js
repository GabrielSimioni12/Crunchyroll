// Captura o formulário
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("newEmail").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    // Puxa usuários já existentes
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Validar se email já existe
    const exists = users.some(user => user.email === email);

    if (exists) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Criar novo usuário
    const newUser = {
        email: email,
        password: password
    };

    users.push(newUser);

    // Salvar novamente no localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Conta criada com sucesso!");

    // Redireciona para login
    window.location.href = "login.html";
});
