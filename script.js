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
    
    // Carregar vídeo do YouTube no iframe do modal com autoplay
    const embedUrl = `https://www.youtube.com/embed/${story.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&fs=1`;
    videoFrame.src = embedUrl;
    
    // Garantir que o iframe tenha os atributos necessários para autoplay
    videoFrame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    videoFrame.setAttribute('allowFullscreen', 'true');
    videoFrame.setAttribute('autoplay', 'true');
    videoFrame.setAttribute('muted', 'true');
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
