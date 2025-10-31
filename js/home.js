document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // Lógica da Barra de Busca (Que já implementamos)
    // ----------------------------------------------------------------
    const searchBox = document.querySelector('.search-box');
    const searchToggleBtn = document.querySelector('.search-toggle-btn'); 

    if (searchToggleBtn && searchBox) {
        searchToggleBtn.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            
            if (searchBox.classList.contains('active')) {
                document.querySelector('.search-input').focus();
            }
        });
    }

    // ----------------------------------------------------------------
    // Lógica do Carrossel de Destaque (NOVA IMPLEMENTAÇÃO)
    // ----------------------------------------------------------------
    const carouselContainer = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentSlideIndex = 0;
    let autoAdvanceInterval;
    const slideDuration = 8000; 

    // Função para mover o carrossel para um slide específico
    function moveToSlide(index) {
        // Remove a classe 'current-slide' do slide e indicador atual
        slides[currentSlideIndex].classList.remove('current-slide');
        indicators[currentSlideIndex].classList.remove('current-slide');

        // Calcula o novo índice
        if (index >= slides.length) {
            currentSlideIndex = 0; // Volta para o primeiro slide
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1; // Vai para o último slide
        } else {
            currentSlideIndex = index;
        }

        // Adiciona a classe 'current-slide' ao novo slide e indicador
        slides[currentSlideIndex].classList.add('current-slide');
        indicators[currentSlideIndex].classList.add('current-slide');

        // Implementa a lógica de translação (movimento) se você estiver usando CSS para isso.
        // Se a animação for apenas por opacidade (fade), esta parte pode ser opcional.
        // O HTML sugere um 'carousel-track', então vamos movê-lo:
        const track = document.querySelector('.carousel-track');
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (slideWidth * currentSlideIndex) + 'px)';
    }

    // Função para o avanço automático
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            moveToSlide(currentSlideIndex + 1);
        }, slideDuration);
    }

    // Função para parar o avanço automático
    function stopAutoAdvance() {
        clearInterval(autoAdvanceInterval);
    }
    
    // 1. Adiciona a funcionalidade de clique nos botões (próximo e anterior)
    nextButton.addEventListener('click', () => {
        stopAutoAdvance(); // Pausa ao interagir
        moveToSlide(currentSlideIndex + 1);
        startAutoAdvance(); // Reinicia após a interação
    });

    prevButton.addEventListener('click', () => {
        stopAutoAdvance(); // Pausa ao interagir
        moveToSlide(currentSlideIndex - 1);
        startAutoAdvance(); // Reinicia após a interação
    });
    
    // 2. Adiciona a funcionalidade de clique nos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoAdvance();
            moveToSlide(index);
            startAutoAdvance();
        });
    });

    // 3. Funcionalidade de Hover (Pausar ao passar o mouse)
    carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
    carouselContainer.addEventListener('mouseleave', startAutoAdvance);

    // Inicia o carrossel no carregamento da página
    startAutoAdvance();

    // Ajusta o carrossel ao redimensionar a tela
    window.addEventListener('resize', () => {
        moveToSlide(currentSlideIndex);
    });
});

// ... (Seu código existente da Navbar e do Carrossel de Destaque) ...

    // ----------------------------------------------------------------
    // Lógica dos Carrosséis de Lista (Novos Simulcasts, Populares)
    // ----------------------------------------------------------------

    const listCarouselButtons = document.querySelectorAll('.list-carousel-btn');
    const cardWidth = 200;
    const cardMargin = 16;
    const scrollAmount = (cardWidth + cardMargin) * 4; // Rola 4 cards de cada vez

    listCarouselButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Pega o ID do carrossel alvo (ex: 'simulcasts-carousel')
            const targetId = button.getAttribute('data-target');
            const carousel = document.getElementById(targetId);
            
            if (!carousel) return;

            // Define a direção da rolagem: 1 para 'next', -1 para 'prev'
            const direction = button.classList.contains('next') ? 1 : -1;
            
            // Realiza a rolagem horizontalmente
            carousel.scrollBy({
                left: scrollAmount * direction,
                behavior: 'smooth'
            });
        });
    });
