// ===================================
// LÓGICA DE SELEÇÃO E TROCA DE AVATAR (ATUALIZADA)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar Elementos Chave
    const avatarOptions = document.querySelectorAll('.avatar-option');
    const currentAvatar = document.getElementById('current-avatar');
    const saveButton = document.querySelector('.btn-primary');
    
    // Variável para armazenar o URL do avatar selecionado
    let selectedAvatarUrl = currentAvatar.src; 

    // NOVO: Função para marcar o avatar que está em uso
    function markInUseAvatar() {
        avatarOptions.forEach(img => {
            img.classList.remove('in-use'); // Remove de todos primeiro

            // Se o src (caminho) da opção for igual ao src da foto atual
            if (img.getAttribute('data-avatar-url') === currentAvatar.src) {
                img.classList.add('in-use'); // Adiciona a classe de destaque
            }
        });
    }

    // Inicializa marcando o avatar que está em uso quando a página carrega
    markInUseAvatar(); 

    // 2. Adicionar Listener de Clique em CADA Opção de Avatar
    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            
            // A. Remover a classe 'selected' de todos os outros avatares
            avatarOptions.forEach(img => {
                img.classList.remove('selected');
            });

            // B. Adicionar a classe 'selected' ao avatar clicado
            option.classList.add('selected');

            // C. Armazenar o novo URL
            selectedAvatarUrl = option.getAttribute('data-avatar-url');
        });
    });

    // 3. Adicionar Listener para o Botão Salvar
    saveButton.addEventListener('click', () => {
        // Verifica se houve uma seleção
        if (selectedAvatarUrl && selectedAvatarUrl !== currentAvatar.src) {
            
            // 1. Atualiza a imagem principal do perfil
            currentAvatar.src = selectedAvatarUrl;
            
            // 2. Transfere o destaque de 'em uso' para o novo avatar
            markInUseAvatar(); 

            alert('Seu novo avatar foi salvo com sucesso!');
        } else {
            alert('Nenhuma alteração feita ou o avatar já está em uso.');
        }
        
        // 3. Remove a seleção temporária (borda branca)
        avatarOptions.forEach(img => {
            img.classList.remove('selected');
        });
    });
});