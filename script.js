// Histórias com IDs do YouTube
const stories = {
    'moises': {
        title: 'Moisés e o Mar Vermelho',
        description: 'A incrível história de como Deus abriu o mar para salvar seu povo do Egito. Moisés, com fé em Deus, estendeu sua vara e as águas se dividiram, permitindo que os israelitas passassem em segurança.',
        youtubeId: 'CMtyHq0jfaA',
        duration: '8 min',
        book: 'Êxodo'
    },
    'davi': {
        title: 'Davi e Golias',
        description: 'Como um pequeno pastor venceu o gigante filisteu com apenas uma pedra e muita fé em Deus. Uma história sobre coragem, fé e como Deus usa os pequenos para grandes coisas.',
        youtubeId: 'T00d-4V-R6M',
        duration: '7 min',
        book: '1 Samuel'
    },
    'noe': {
        title: 'A Arca de Noé',
        description: 'Noé constrói uma grande arca para salvar sua família e os animais do grande dilúvio. Uma história sobre obediência a Deus e sua promessa simbolizada pelo arco-íris.',
        youtubeId: '2B6IMyzNHBg',
        duration: '10 min',
        book: 'Gênesis'
    },
    'adao-eva': {
        title: 'Adão e Eva no Jardim do Éden',
        description: 'A criação do primeiro homem e da primeira mulher por Deus no paraíso. Uma história sobre o amor de Deus e a importância da obediência.',
        youtubeId: 'UGUmcEwblyQ',
        duration: '8 min',
        book: 'Gênesis'
    },
    'jonas': {
        title: 'Jonas e a Baleia',
        description: 'Jonas aprende sobre obediência a Deus depois de ser engolido por uma grande baleia. Uma história sobre perdão e segunda chances.',
        youtubeId: 'fa2-x5Eh8Qg',
        duration: '7 min',
        book: 'Jonas'
    },
    'daniel': {
        title: 'Daniel na Cova dos Leões',
        description: 'Daniel é protegido por Deus na cova dos leões por causa de sua fé inabalável. Uma história sobre coragem e confiança em Deus.',
        youtubeId: 'stjqTnpnJbw',
        duration: '9 min',
        book: 'Daniel'
    },
    'jose': {
        title: 'José do Egito',
        description: 'A história do jovem José e sua túnica de muitas cores, mostrando como Deus transforma dificuldades em bênçãos.',
        youtubeId: 'YQ2852koHDg',
        duration: '11 min',
        book: 'Gênesis'
    },
    'nascimento-jesus': {
        title: 'O Nascimento de Jesus',
        description: 'A história mais linda de todas: o nascimento do Salvador em Belém. Maria e José, os anjos, os pastores e os reis magos celebram a chegada do Menino Jesus.',
        youtubeId: '1MKH5GH9KcU',
        duration: '9 min',
        book: 'Lucas'
    },
    'jesus-criancas': {
        title: 'Jesus e as Crianças',
        description: 'Jesus mostra seu amor especial pelas crianças, abençoando-as e ensinando que o Reino dos Céus pertence aos que têm um coração puro como o das crianças.',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '6 min',
        book: 'Marcos'
    },
    'multiplicacao-paes': {
        title: 'Multiplicação dos Pães e Peixes',
        description: 'Jesus alimenta cinco mil pessoas com apenas cinco pães e dois peixes, mostrando o poder de Deus e a importância de compartilhar.',
        youtubeId: 'guzjlkls2ng',
        duration: '8 min',
        book: 'João'
    }
};

// Progresso das histórias
let watchProgress = JSON.parse(localStorage.getItem('bibliaFlixProgress')) || {};

// Favoritos
let favorites = JSON.parse(localStorage.getItem('bibliaFlixFavorites')) || [];

// Elementos DOM
const modal = document.getElementById('video-modal');
const videoFrame = document.getElementById('story-video');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const closeBtn = document.querySelector('.close-btn');

// Estado atual
let currentStoryId = null;

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    initializeStoryCards();
    updateFavoritesSection();
    updateVisitCounter();
    setupFeedbackForm();
});

// Inicializar cards de histórias
function initializeStoryCards() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Não abrir modal se clicou no botão de favorito
            if (e.target.className !== 'favorite-btn') {
                const storyId = this.getAttribute('data-story');
                openStoryModal(storyId);
            }
        });
    });
}

// Abrir modal com vídeo
function openStoryModal(storyId) {
    const story = stories[storyId];
    if (!story) return;
    
    currentStoryId = storyId;
    
    videoTitle.textContent = story.title;
    videoDescription.textContent = story.description;
    
    // Carregar vídeo do YouTube no iframe do modal com autoplay e áudio ligado
    const embedUrl = `https://www.youtube.com/embed/${story.youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&fs=1`;
    videoFrame.src = embedUrl;
    
    // Garantir que o iframe tenha os atributos necessários para autoplay
    videoFrame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    videoFrame.setAttribute('allowFullscreen', 'true');
    videoFrame.setAttribute('autoplay', 'true');
    videoFrame.setAttribute('playsinline', 'true');
    
    // Marcar como assistida
    watchProgress[storyId] = 100;
    localStorage.setItem('bibliaFlixProgress', JSON.stringify(watchProgress));
    
    // Mostrar modal com informações da história
    updateFavoriteButton();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    modal.style.display = 'none';
    videoFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Adicionar/remover favoritos
function toggleFavorite(btn) {
    const card = btn.closest('.story-card');
    const storyId = card.getAttribute('data-story');
    
    if (favorites.includes(storyId)) {
        favorites = favorites.filter(id => id !== storyId);
        btn.textContent = '🤍';
    } else {
        favorites.push(storyId);
        btn.textContent = '❤️';
    }
    
    localStorage.setItem('bibliaFlixFavorites', JSON.stringify(favorites));
    updateFavoritesSection();
}

// Adicionar favorito do modal
function toggleFavoriteFromModal() {
    const btn = document.getElementById('modal-favorite-btn');
    
    if (favorites.includes(currentStoryId)) {
        favorites = favorites.filter(id => id !== currentStoryId);
        btn.textContent = '🤍 Adicionar aos Favoritos';
    } else {
        favorites.push(currentStoryId);
        btn.textContent = '❤️ Remover dos Favoritos';
    }
    
    localStorage.setItem('bibliaFlixFavorites', JSON.stringify(favorites));
    updateFavoritesSection();
}

// Atualizar botão de favoritos no modal
function updateFavoriteButton() {
    const btn = document.getElementById('modal-favorite-btn');
    if (favorites.includes(currentStoryId)) {
        btn.textContent = '❤️ Remover dos Favoritos';
    } else {
        btn.textContent = '🤍 Adicionar aos Favoritos';
    }
}

// Atualizar seção de favoritos
function updateFavoritesSection() {
    const favoritesGrid = document.getElementById('favorites-grid');
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Nenhuma história favoritada ainda. Clique no coração para adicionar!</p>';
        return;
    }
    
    favoritesGrid.innerHTML = '';
    
    favorites.forEach(storyId => {
        const story = stories[storyId];
        if (!story) return;
        
        const card = document.createElement('div');
        card.className = 'story-card';
        card.setAttribute('data-story', storyId);
        card.innerHTML = `
            <div class="story-image">
                <img src="${getImageForStory(storyId)}" alt="${story.title}">
                <div class="play-overlay">
                    <div class="play-button">▶️</div>
                </div>
            </div>
            <div class="story-info">
                <h3 class="story-title">${story.title}</h3>
                <p class="story-description">${story.description}</p>
                <span class="story-duration">${story.duration}</span>
                <span class="story-book">${story.book}</span>
            </div>
            <button class="favorite-btn" onclick="toggleFavorite(this)">❤️</button>
        `;
        
        card.addEventListener('click', function(e) {
            if (e.target.className !== 'favorite-btn') {
                openStoryModal(storyId);
            }
        });
        
        favoritesGrid.appendChild(card);
    });
}

// Obter imagem da história
function getImageForStory(storyId) {
    const imageMap = {
        'moises': 'moises_mar_vermelho_animacao.png',
        'davi': 'davi_golias_animacao.png',
        'noe': 'arca_noe_animacao.png',
        'adao-eva': 'adao_eva_animacao.png',
        'jonas': 'jonas_baleia_animacao.png',
        'daniel': 'daniel_leoes_animacao.png',
        'jose': 'jose_egito_animacao.png',
        'nascimento-jesus': 'nascimento_jesus_animacao.png',
        'jesus-criancas': 'jesus_criancas_animacao.png',
        'multiplicacao-paes': 'multiplicacao_paes_animacao.png'
    };
    return imageMap[storyId] || 'biblia_infantil.jpg';
}

// Compartilhar história
function shareStory() {
    const story = stories[currentStoryId];
    const text = `Assista "${story.title}" em Bíblia Flix! https://danieldfs13.github.io/bibliafix2026-/`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Bíblia Flix',
            text: text
        });
    } else {
        alert('Compartilhe: ' + text);
    }
}

// Copiar chave PIX
function copyPixKey() {
    const pixKey = document.getElementById('pix-key-text').textContent;
    navigator.clipboard.writeText(pixKey).then(() => {
        alert('Chave PIX copiada com sucesso!');
    });
}

// Alternar player de louvores
function toggleLouvorPlayer() {
    const player = document.getElementById('louvor-player');
    if (player.style.display === 'none') {
        player.style.display = 'block';
    } else {
        player.style.display = 'none';
    }
}

// Configurar formulário de feedback
function setupFeedbackForm() {
    const form = document.getElementById('feedback-form');
    const response = document.getElementById('feedback-response');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Enviar via Formspree usando AJAX
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            // Mostrar mensagem de sucesso
            form.reset();
            response.style.display = 'block';
            response.style.background = '#4CAF50';
            response.textContent = '✅ Obrigado! Seu feedback foi enviado com sucesso!';
            
            // Esconder mensagem após 3 segundos
            setTimeout(() => {
                response.style.display = 'none';
            }, 3000);
        })
        .catch(error => {
            // Mostrar mensagem de erro
            response.style.display = 'block';
            response.style.background = '#f44336';
            response.textContent = '❌ Erro ao enviar feedback. Tente novamente!';
            
            setTimeout(() => {
                response.style.display = 'none';
            }, 3000);
        });
    });
}

// Contador de visitantes
function updateVisitCounter() {
    let visits = parseInt(localStorage.getItem('bibliaFlixVisits')) || 0;
    visits++;
    localStorage.setItem('bibliaFlixVisits', visits);
    document.getElementById('visit-counter').textContent = visits;
}

// Scroll suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Alternar áudio global
let isAudioPlaying = false;

function toggleGlobalAudio() {
    const audioBtn = document.getElementById('audio-btn');
    
    if (!isAudioPlaying) {
        // Criar um container visível para o player de áudio
        let audioContainer = document.getElementById('global-audio-container');
        if (!audioContainer) {
            audioContainer = document.createElement('div');
            audioContainer.id = 'global-audio-container';
            audioContainer.style.position = 'fixed';
            audioContainer.style.bottom = '20px';
            audioContainer.style.right = '20px';
            audioContainer.style.width = '300px';
            audioContainer.style.zIndex = '9999';
            audioContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            audioContainer.style.padding = '10px';
            audioContainer.style.borderRadius = '10px';
            audioContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
            audioContainer.innerHTML = '<div style="color: #fff; font-size: 12px; margin-bottom: 8px; text-align: center;">🎵 Música Gospel 24h</div><iframe id="gospel-player" width="100%" height="80" src="https://www.youtube.com/embed/xvGSK2t7ucA?autoplay=1&rel=0&modestbranding=1&controls=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 5px;"></iframe>';
            document.body.appendChild(audioContainer);
        } else {
            audioContainer.style.display = 'block';
        }
        
        isAudioPlaying = true;
        audioBtn.classList.add('playing');
        audioBtn.textContent = '🔊 Música Gospel (Ativa)';
        localStorage.setItem('bibliaFlixAudioPlaying', 'true');
    } else {
        const container = document.getElementById('global-audio-container');
        if (container) {
            container.style.display = 'none';
        }
        
        isAudioPlaying = false;
        audioBtn.classList.remove('playing');
        audioBtn.textContent = '🔊 Música Gospel';
        localStorage.setItem('bibliaFlixAudioPlaying', 'false');
    }
}

// Restaurar estado do áudio ao carregar a página
function restoreAudioState() {
    const wasPlaying = localStorage.getItem('bibliaFlixAudioPlaying') === 'true';
    if (wasPlaying) {
        toggleGlobalAudio();
    }
}

// Modal de Produção
function showDrawingProduction() {
    const productionModal = document.getElementById('production-modal');
    productionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductionModal() {
    const productionModal = document.getElementById('production-modal');
    productionModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    const productionModal = document.getElementById('production-modal');
    if (event.target == productionModal) {
        closeProductionModal();
    }
});

// Gerar QR Code
function generateQRCode() {
    const siteUrl = 'https://danieldfs13.github.io/bibliafix2026/';
    const qrCodeContainer = document.getElementById('qr-code');
    
    if (qrCodeContainer && qrCodeContainer.src === '') {
        // Usar API de QR Code gratuita
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(siteUrl)}`;
        qrCodeContainer.src = qrCodeUrl;
    }
}

// Compartilhamento em Redes Sociais
function shareOnWhatsApp() {
    const message = encodeURIComponent('🙏 Olá! Descobri um site incrível chamado Bíblia Flix com histórias bíblicas animadas para crianças! Vem conhecer: https://danieldfs13.github.io/bibliafix2026/ 📖✨');
    window.open(`https://wa.me/?text=${message}`, '_blank');
}

function shareOnInstagram() {
    const message = '🙏 Bíblia Flix - Histórias Bíblicas para Crianças! Histórias animadas e narrações especiais. Confira: https://danieldfs13.github.io/bibliafix2026/ 📖✨ #BíbliaFlix #HistóriasBíblicas #CriançasEmFé';
    alert('Para compartilhar no Instagram, copie o texto abaixo e compartilhe em sua bio ou stories:\n\n' + message);
    navigator.clipboard.writeText(message);
}

function shareOnFacebook() {
    const url = 'https://danieldfs13.github.io/bibliafix2026/';
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function copyLink() {
    const link = document.getElementById('site-link');
    link.select();
    document.execCommand('copy');
    
    const btn = document.querySelector('.copy-link-btn');
    const originalText = btn.textContent;
    btn.textContent = '✅ Copiado!';
    
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

// Inicializar QR Code quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    generateQRCode();
    restoreAudioState();
});

// ============================================
// GALERIA DE DESENHOS
// ============================================

// Array com os desenhos bíblicos
const drawings = [
    {
        id: 1,
        title: "Adão e Eva no Jardim do Éden",
        description: "Gênesis 1:27 - Deus criou o homem à sua imagem",
        imageUrl: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=500&fit=crop",
        downloadUrl: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=1200&h=1500&fit=crop"
    },
    {
        id: 2,
        title: "A Arca de Noé",
        description: "Gênesis 6:14 - Noé construiu a arca conforme Deus mandou",
        imageUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=400&h=500&fit=crop",
        downloadUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=1200&h=1500&fit=crop"
    },
    {
        id: 3,
        title: "José do Egito",
        description: "Gênesis 37:3 - José tinha uma túnica de muitas cores",
        imageUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=400&h=500&fit=crop",
        downloadUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=1200&h=1500&fit=crop"
    },
    {
        id: 4,
        title: "Moisés e o Mar Vermelho",
        description: "Êxodo 14:21 - Deus abriu o mar com um vento forte",
        imageUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=400&h=500&fit=crop",
        downloadUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=1200&h=1500&fit=crop"
    },
    {
        id: 5,
        title: "Davi e Golias",
        description: "1 Samuel 17:45 - Vou a ti em nome do Senhor",
        imageUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=400&h=500&fit=crop",
        downloadUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=1200&h=1500&fit=crop"
    },
    {
        id: 6,
        title: "Daniel na Cova dos Leões",
        description: "Daniel 6:22 - Meu Deus enviou o seu anjo e fechou a boca dos leões",
        imageUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=400&h=500&fit=crop",
        downloadUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=1200&h=1500&fit=crop"
    },
    {
        id: 7,
        title: "Jonas e a Baleia",
        description: "Jonas 1:17 - O Senhor preparou um grande peixe para engolir Jonas",
        imageUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=400&h=500&fit=crop",
        downloadUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=1200&h=1500&fit=crop"
    },
    {
        id: 8,
        title: "O Nascimento de Jesus",
        description: "Lucas 2:11 - Nasceu-vos hoje na cidade de Davi um Salvador",
        imageUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=400&h=500&fit=crop",
        downloadUrl: "https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=1200&h=1500&fit=crop"
    }
];

let currentDrawingId = null;

// Inicializar galeria de desenhos
function initializeDrawingsGallery() {
    const gallery = document.getElementById('drawings-gallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    drawings.forEach(drawing => {
        const drawingCard = document.createElement('div');
        drawingCard.className = 'drawing-thumbnail';
        drawingCard.innerHTML = `
            <img src="${drawing.imageUrl}" alt="${drawing.title}">
            <div class="drawing-thumbnail-overlay">
                <button onclick="viewDrawing(${drawing.id})">👁️ Visualizar</button>
            </div>
        `;
        gallery.appendChild(drawingCard);
    });
}

// Visualizar desenho
function viewDrawing(drawingId) {
    const drawing = drawings.find(d => d.id === drawingId);
    if (drawing) {
        currentDrawingId = drawingId;
        document.getElementById('drawing-image').src = drawing.downloadUrl;
        document.getElementById('drawing-modal').style.display = 'flex';
        
        // Incrementar estatísticas
        incrementDrawingsViewed();
    }
}

// Fechar modal de desenho
function closeDrawingModal() {
    document.getElementById('drawing-modal').style.display = 'none';
}

// Download do desenho
function downloadDrawing() {
    if (currentDrawingId) {
        const drawing = drawings.find(d => d.id === currentDrawingId);
        if (drawing) {
            const link = document.createElement('a');
            link.href = drawing.downloadUrl;
            link.download = `${drawing.title}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

// ============================================
// CONTADOR DE ACESSOS E ESTATÍSTICAS
// ============================================

const ADMIN_PASSWORD = "admin123"; // Senha do admin (você pode mudar)

// Inicializar contador de acessos
function initializeVisitorCounter() {
    let stats = getStats();
    
    // Incrementar visitantes totais
    stats.totalVisitors++;
    
    // Verificar se é um novo dia
    const today = new Date().toDateString();
    if (stats.lastVisitDate !== today) {
        stats.lastVisitDate = today;
        stats.todayVisitors = 1;
    } else {
        stats.todayVisitors++;
    }
    
    saveStats(stats);
}

// Obter estatísticas do localStorage
function getStats() {
    const stats = localStorage.getItem('bibliaflix_stats');
    if (stats) {
        return JSON.parse(stats);
    } else {
        return {
            totalVisitors: 0,
            todayVisitors: 0,
            storiesWatched: 0,
            favoritesMarked: 0,
            lastVisitDate: new Date().toDateString()
        };
    }
}

// Salvar estatísticas no localStorage
function saveStats(stats) {
    localStorage.setItem('bibliaflix_stats', JSON.stringify(stats));
}

// Incrementar histórias assistidas
function incrementStoriesWatched() {
    let stats = getStats();
    stats.storiesWatched++;
    saveStats(stats);
}

// Incrementar desenhos visualizados
function incrementDrawingsViewed() {
    let stats = getStats();
    stats.storiesWatched++;
    saveStats(stats);
}

// Incrementar favoritos marcados
function incrementFavoritesMarked() {
    let stats = getStats();
    stats.favoritesMarked++;
    saveStats(stats);
}

// ============================================
// PAINEL ADMINISTRATIVO
// ============================================

// Mostrar login do admin
function showAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'flex';
}

// Fechar login do admin
function closeAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'none';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-error').style.display = 'none';
}

// Validar senha do admin
function validateAdminPassword() {
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        closeAdminLogin();
        openAdminPanel();
    } else {
        document.getElementById('admin-error').style.display = 'block';
        document.getElementById('admin-password').value = '';
    }
}

// Abrir painel de admin
function openAdminPanel() {
    updateAdminStats();
    document.getElementById('admin-panel').style.display = 'flex';
}

// Fechar painel de admin
function closeAdminPanel() {
    document.getElementById('admin-panel').style.display = 'none';
}

// Atualizar estatísticas no painel
function updateAdminStats() {
    const stats = getStats();
    
    document.getElementById('total-visitors').textContent = stats.totalVisitors;
    document.getElementById('today-visitors').textContent = stats.todayVisitors;
    document.getElementById('stories-watched').textContent = stats.storiesWatched;
    document.getElementById('favorites-marked').textContent = stats.favoritesMarked;
}

// Resetar contador de visitantes
function resetVisitorCounter() {
    if (confirm('Tem certeza que deseja resetar o contador de visitantes? Esta ação não pode ser desfeita.')) {
        let stats = getStats();
        stats.totalVisitors = 0;
        stats.todayVisitors = 0;
        stats.storiesWatched = 0;
        stats.favoritesMarked = 0;
        saveStats(stats);
        updateAdminStats();
        alert('✅ Contador resetado com sucesso!');
    }
}

// Exportar estatísticas
function exportStats() {
    const stats = getStats();
    const exportData = {
        ...stats,
        exportDate: new Date().toLocaleString('pt-BR'),
        siteUrl: window.location.href
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bibliaflix_stats_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ Dados exportados com sucesso!');
}

// Fechar modais ao clicar fora
window.addEventListener('click', function(event) {
    const drawingModal = document.getElementById('drawing-modal');
    const adminLoginModal = document.getElementById('admin-login-modal');
    
    if (event.target === drawingModal) {
        closeDrawingModal();
    }
    if (event.target === adminLoginModal) {
        closeAdminLogin();
    }
});

// Atualizar inicialização
const originalDOMContentLoaded = document.addEventListener;
document.addEventListener('DOMContentLoaded', function() {
    initializeDrawingsGallery();
    initializeVisitorCounter();
    generateQRCode();
    restoreAudioState();
}, { once: true });

// Se o documento já foi carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeDrawingsGallery();
        initializeVisitorCounter();
    });
} else {
    initializeDrawingsGallery();
    initializeVisitorCounter();
}
