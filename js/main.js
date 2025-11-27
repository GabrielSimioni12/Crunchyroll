document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // A chave que armazena o avatar selecionado no profile.html
    const AVATAR_STORAGE_KEY = 'userAvatarUrl';

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            // ⚠️ LÓGICA DE VALIDAÇÃO SIMULADA:
            // Aqui, o login é considerado bem-sucedido para qualquer entrada.
            // Se você tiver uma lógica de validação real, insira-a aqui.
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (email !== '' && password !== '') {
                
                
                localStorage.removeItem(AVATAR_STORAGE_KEY);
                
                
                window.location.href = '../home.html'; 

            } else {
                // Mensagem de erro caso a validação falhe (se você adicionar lógica mais complexa)
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
});