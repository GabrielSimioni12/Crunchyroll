document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // 1. LÓGICA DO CARROSSEL DE DESTAQUE (HERO CAROUSEL)
    // ================================================================
    const carouselContainer = document.querySelector('.hero-carousel');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    let currentSlideIndex = 0;
    let autoAdvanceInterval;
    const slideDuration = 7000; // 7 segundos

    function moveToSlide(index) {
        if (!slides.length || !track) return;

        // Remove slide atual
        slides[currentSlideIndex]?.classList.remove('current-slide');
        indicators[currentSlideIndex]?.classList.remove('current-slide');

        // Define o novo índice
        if (index >= slides.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = slides.length - 1;
        else currentSlideIndex = index;

        // Ativa o novo slide
        slides[currentSlideIndex].classList.add('current-slide');
        indicators[currentSlideIndex]?.classList.add('current-slide');

        // Move o track
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
    }

    function startAutoAdvance() {
        stopAutoAdvance(); // Limpa qualquer intervalo anterior
        autoAdvanceInterval = setInterval(() => {
            moveToSlide(currentSlideIndex + 1);
        }, slideDuration);
    }

    function stopAutoAdvance() {
        if (autoAdvanceInterval) clearInterval(autoAdvanceInterval);
    }

    if (carouselContainer && track) {
        // Botões de navegação
        nextButton?.addEventListener('click', () => {
            stopAutoAdvance();
            moveToSlide(currentSlideIndex + 1);
            startAutoAdvance();
        });

        prevButton?.addEventListener('click', () => {
            stopAutoAdvance();
            moveToSlide(currentSlideIndex - 1);
            startAutoAdvance();
        });

        // Indicadores (pontinhos)
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoAdvance();
                moveToSlide(index);
                startAutoAdvance();
            });
        });

        // Pausar ao passar o mouse e retomar ao sair
        carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
        carouselContainer.addEventListener('mouseleave', startAutoAdvance);

        // Atualiza o slide no redimensionamento da tela
        window.addEventListener('resize', () => moveToSlide(currentSlideIndex));

        // Inicialização
        moveToSlide(currentSlideIndex);
        startAutoAdvance();
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

    function filterAnimeCards(searchTerm) {
        const normalizedTerm = searchTerm.toLowerCase().trim();

        allAnimeCards.forEach(card => {
            const cardTitle = card.getAttribute('data-title')?.toLowerCase() || '';
            const cardId = card.getAttribute('data-id') || '';

            const matchesTitle = cardTitle.includes(normalizedTerm);
            const matchesId = cardId.includes(normalizedTerm);

            card.style.display = (matchesTitle || matchesId || normalizedTerm === '') ? 'block' : 'none';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', e => {
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
            if (window.innerWidth > 768) {
                // Desktop
                searchBox.classList.toggle('active');
                if (searchBox.classList.contains('active')) {
                    searchInput.focus();
                } else {
                    searchInput.value = '';
                    filterAnimeCards('');
                }
            } else {
                // Mobile
                const isVisible = searchBox.style.display === 'flex';
                searchBox.style.display = isVisible ? 'none' : 'flex';
                if (!isVisible) searchInput.focus();
                else {
                    searchInput.value = '';
                    filterAnimeCards('');
                }
            }
        });

        // Redimensionamento (reseta busca mobile)
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
        closeSidebarBtn?.addEventListener('click', closeSidebar);
        sidebarOverlay?.addEventListener('click', closeSidebar);

        // Fecha sidebar se redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeSidebar();
        });
    }


    // ================================================================
    // 6. LÓGICA DE CARREGAMENTO DO AVATAR NO HEADER (Integração Final)
    // ================================================================

    function loadAvatarOnHome() {
        const avatarImg = document.getElementById('user-avatar-home');
        // 🚨 CHAVE CORRETA: 'userAvatarUrl'
        const savedUrl = localStorage.getItem('userAvatarUrl'); 
        
        // Caminho da imagem de usuário padrão (usado quando não há seleção)
        const defaultAvatarUrl = '../Icons/Icone-Usuario-Padrao.jpg'; 

        if (avatarImg) {
            if (savedUrl) {
                // Se houver URL salva, usa ela
                avatarImg.src = savedUrl;
            } else {
                // Caso contrário, garante que o padrão correto está sendo exibido
                // (Seu HTML já define isso, mas é bom ter uma fallback aqui)
                avatarImg.src = defaultAvatarUrl; 
            }
        }
    }
    
    // Chama a função de carregamento do avatar ao final do DOMContentLoaded
    loadAvatarOnHome();

});