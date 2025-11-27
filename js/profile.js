// ===================================
// LÓGICA DE SELEÇÃO E TROCA DE AVATAR 
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar Elementos Chave
    const avatarOptions = document.querySelectorAll('.avatar-option');
    const currentAvatar = document.getElementById('current-avatar');
    const saveButton = document.querySelector('.btn-primary');
    
    // Variável para armazenar o URL do avatar selecionado
    let selectedAvatarUrl = currentAvatar.src; 
    
    // Chave única para o localStorage. Vamos usar 'userAvatarUrl'
    const STORAGE_KEY = 'userAvatarUrl';

    // NOVO: Função para marcar o avatar que está em uso
    function markInUseAvatar() {
        avatarOptions.forEach(img => {
            img.classList.remove('in-use'); 
            if (img.getAttribute('data-avatar-url') === currentAvatar.src) {
                img.classList.add('in-use'); 
            }
        });
    }
    
    // ⚠️ NOVO: Carrega o avatar salvo na home para exibir na área de pré-visualização
    const savedAvatarUrl = localStorage.getItem(STORAGE_KEY);
    if (savedAvatarUrl) {
        currentAvatar.src = savedAvatarUrl;
        selectedAvatarUrl = savedAvatarUrl;
    }
    
    // Inicializa marcando o avatar que está em uso quando a página carrega
    markInUseAvatar(); 

    // 2. Adicionar Listener de Clique em CADA Opção de Avatar
    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            avatarOptions.forEach(img => {
                img.classList.remove('selected');
            });
            option.classList.add('selected');
            selectedAvatarUrl = option.getAttribute('data-avatar-url');
        });
    });

    // 3. Adicionar Listener para o Botão Salvar
    saveButton.addEventListener('click', () => {
        if (selectedAvatarUrl && selectedAvatarUrl !== currentAvatar.src) {
            
            // 1. Atualiza a imagem principal do perfil
            currentAvatar.src = selectedAvatarUrl;
            
            // 🚨 CORREÇÃO ESSENCIAL: SALVAR NO LOCALSTORAGE 🚨
            localStorage.setItem(STORAGE_KEY, selectedAvatarUrl); 
            
            // 2. Transfere o destaque de 'em uso' para o novo avatar
            markInUseAvatar(); 

            alert('Seu novo avatar foi salvo com sucesso! A alteração será visível na Home.');
        } else {
            alert('Nenhuma alteração feita ou o avatar já está em uso.');
        }
        
        // 3. Remove a seleção temporária (borda branca)
        avatarOptions.forEach(img => {
            img.classList.remove('selected');
        });
    });
});