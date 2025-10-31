document.addEventListener('DOMContentLoaded', () => {
    // ================================================================
    // 1. LÓGICA DO CARROSSEL DE DESTAQUE (HERO CAROUSEL)
    // ================================================================
    const carouselContainer = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentSlideIndex = 0;
    let autoAdvanceInterval;
    const slideDuration = 8000; 

    function moveToSlide(index) {
        // Garante que a lógica só rode se os elementos existirem
        if (slides.length === 0) return; 

        // Remove a classe 'current-slide' do slide e indicador atual (se existirem)
        if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.remove('current-slide');
        if (indicators[currentSlideIndex]) indicators[currentSlideIndex].classList.remove('current-slide');

        // Calcula o novo índice
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        // Adiciona a classe 'current-slide' ao novo slide e indicador
        slides[currentSlideIndex].classList.add('current-slide');
        indicators[currentSlideIndex].classList.add('current-slide');

        // Implementa a lógica de translação (movimento)
        const track = document.querySelector('.carousel-track');
        // Usa slides[0] pois a largura é sempre a mesma (100% da tela)
        const slideWidth = slides[0].getBoundingClientRect().width; 
        track.style.transform = 'translateX(-' + (slideWidth * currentSlideIndex) + 'px)';
    }

    function startAutoAdvance() {
        stopAutoAdvance(); // Limpa qualquer intervalo anterior
        autoAdvanceInterval = setInterval(() => {
            moveToSlide(currentSlideIndex + 1);
        }, slideDuration);
    }

    function stopAutoAdvance() {
        clearInterval(autoAdvanceInterval);
    }
    
    if (carouselContainer) {
        // Event Listeners
        nextButton.addEventListener('click', () => { stopAutoAdvance(); moveToSlide(currentSlideIndex + 1); startAutoAdvance(); });
        prevButton.addEventListener('click', () => { stopAutoAdvance(); moveToSlide(currentSlideIndex - 1); startAutoAdvance(); });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoAdvance();
                moveToSlide(index);
                startAutoAdvance();
            });
        });

        // Funcionalidade de Hover
        carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
        carouselContainer.addEventListener('mouseleave', startAutoAdvance);

        // Inicia e ajusta ao redimensionar
        startAutoAdvance();
        window.addEventListener('resize', () => {
            moveToSlide(currentSlideIndex);
        });
        // Garante que o primeiro slide esteja ativo no início
        moveToSlide(currentSlideIndex); 
    }


    // ================================================================
    // 2. LÓGICA DOS CARROSSÉIS DE LISTA (LIST CAROUSELS)
    // ================================================================
    const listCarouselButtons = document.querySelectorAll('.list-carousel-btn');
    const cardWidth = 200;
    const cardMargin = 16;
    const scrollAmount = (cardWidth + cardMargin) * 4; // Rola 4 cards de cada vez

    listCarouselButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const carousel = document.getElementById(targetId);
            
            if (!carousel) return;

            const direction = button.classList.contains('next') ? 1 : -1;
            
            carousel.scrollBy({
                left: scrollAmount * direction,
                behavior: 'smooth'
            });
        });
    });


    // ================================================================
    // 3. LÓGICA DA BUSCA (FILTRO DE CARDS)
    // ================================================================
    const searchInput = document.querySelector('.search-input'); 
    const allAnimeCards = document.querySelectorAll('.anime-card');

    // Função principal de filtro: LÊ data-title e data-id do HTML
    function filterAnimeCards(searchTerm) {
        const normalizedTerm = searchTerm.toLowerCase().trim();

        allAnimeCards.forEach(card => {
            // Verifica se os atributos existem para evitar erros
            const cardTitle = card.getAttribute('data-title')?.toLowerCase() || '';
            const cardId = card.getAttribute('data-id') || ''; 

            const matchesTitle = cardTitle.includes(normalizedTerm);
            const matchesId = cardId.includes(normalizedTerm);

            if (matchesTitle || matchesId || normalizedTerm === '') {
                card.style.display = 'block'; 
            } else {
                card.style.display = 'none'; 
            }
        });
    }

    if (searchInput) {
        // Adiciona o Event Listener para monitorar a digitação
        searchInput.addEventListener('input', (e) => {
            filterAnimeCards(e.target.value);
        });
    }


    // ================================================================
    // 4. LÓGICA DA BARRA DE BUSCA (Desktop e Mobile Toggle)
    // ================================================================
    const searchBox = document.querySelector('.search-box');
    const searchToggleBtn = document.querySelector('.search-toggle-btn'); 

    if (searchToggleBtn && searchBox && searchInput) {
        searchToggleBtn.addEventListener('click', () => {
            // Verifica a largura da tela
            if (window.innerWidth > 768) {
                // Lógica Desktop: Expande/Contrai
                searchBox.classList.toggle('active');
                if (searchBox.classList.contains('active')) {
                    searchInput.focus();
                } else {
                    searchInput.value = ''; // Limpa ao recolher
                    filterAnimeCards(''); // Mostra todos os cards novamente
                }
            } else {
                // Lógica Mobile: Exibe/Oculta em tela cheia (usando style.display)
                const isVisible = searchBox.style.display === 'flex';

                if (!isVisible) {
                    searchBox.style.display = 'flex'; 
                    searchInput.focus();
                } else {
                    searchBox.style.display = 'none'; 
                    searchInput.value = '';
                    filterAnimeCards(''); // Mostra todos os cards novamente
                }
            }
        });
        
        // Oculta/Limpa a busca mobile ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                searchBox.style.display = 'none';
                searchInput.value = '';
                filterAnimeCards('');
            }
        });
    }


    // ================================================================
    // 5. LÓGICA DA SIDEBAR MOBILE
    // ================================================================
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (menuToggleBtn && sidebar) {
        menuToggleBtn.addEventListener('click', openSidebar);
        closeSidebarBtn.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);

        // Fechar a sidebar ao redimensionar (se for para desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeSidebar();
            }
        });
    }

});