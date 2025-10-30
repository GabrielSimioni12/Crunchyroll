// Lógica para a Barra de Busca
const searchBox = document.querySelector('.search-box');
const searchToggleBtn = document.querySelector('.search-toggle-btn'); // NOVO SELETOR
// const profileBtn = document.querySelector('.profile-btn'); // Não é necessário aqui

searchToggleBtn.addEventListener('click', () => {
    // Alterna a classe 'active' para expandir/retrair a caixa
    searchBox.classList.toggle('active');
    
    // Opcional: Coloca o foco no input quando a caixa expande
    if (searchBox.classList.contains('active')) {
        document.querySelector('.search-input').focus();
    }
});