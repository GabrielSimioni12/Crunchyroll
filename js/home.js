document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.querySelector('.search-box');
  const searchToggleBtn = document.querySelector('.search-toggle-btn'); 
  const searchInput = document.querySelector('.search-input');

  if (searchToggleBtn && searchBox) {
    searchToggleBtn.addEventListener('click', () => {
      const isActive = searchBox.classList.toggle('active');

      if (isActive) {
        // Pequeno delay para dar tempo da animação abrir antes do foco
        setTimeout(() => searchInput.focus(), 200);
      } else {
        // Remove o foco ao fechar
        searchInput.blur();
      }
    });
  }
});
