/* =============================================================
   NEXUS.GG — SCRIPT.JS
   Stack: JS puro, sem frameworks.
   Arquitetura: state object + funções puras + delegação de eventos

   Sumário:
   1.  Estado da aplicação
   2.  Helpers (formatação, cores, etc)
   3.  Navegação SPA
   4.  Filtros e busca
   5.  Renderização — Home
   6.  Renderização — Explorar
   7.  Renderização — Lançamentos
   8.  Renderização — Comunidade
   9.  Favoritos (localStorage)
   10. Composer (publicar post)
   11. Menu mobile (drawer)
   12. Countdown
   13. Event listeners
   14. Inicialização
   ============================================================= */


/* ===== 1. ESTADO DA APLICAÇÃO ===================================== */

const state = {
    currentPage: 'home',
    filters: {
        search: '',
        category: 'all',
        onlyFavorites: false,
        onlyOnSale: false
    },
    favorites: [],          // ids dos jogos favoritados
    communityFilter: 'all', // 'all' | 'art' | 'review'
    posts: []               // posts dinâmicos (composer)
};


/* ===== 2. HELPERS ================================================= */

function formatPrice(value) {
    if (value === 0) return 'Grátis';
    return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('pt-BR');
}

function getRatingClass(rating) {
    const map = { 'L': 'success', '12': 'success', '16': 'danger', '18': 'danger' };
    return 'badge--' + (map[rating] || 'danger');
}

function getAvailabilityStatus(releaseDate) {
    const now = new Date();
    const release = new Date(releaseDate);
    if (now >= release) {
        return { text: 'Disponível', class: 'badge--success', icon: 'fa-play' };
    }
    return { text: 'Pré-venda', class: 'badge--secondary', icon: 'fa-clock' };
}

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}


/* ===== 3. NAVEGAÇÃO SPA =========================================== */

function switchPage(pageId) {
    if (!pageId) pageId = 'home';

    state.currentPage = pageId;

    // Atualiza visibilidade das páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('is-active');
    });
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) targetPage.classList.add('is-active');

    // Move foco pra página ativa (acessibilidade)
    if (targetPage) {
        targetPage.setAttribute('tabindex', '-1');
        targetPage.focus({ preventScroll: true });
    }

    // Atualiza nav (desktop e drawer)
    document.querySelectorAll('.nav-link, .mobile-drawer__link').forEach(link => {
        link.classList.toggle('is-active', link.dataset.page === pageId);
    });

    // Atualiza URL hash (permite compartilhar link)
    if (window.location.hash !== '#' + pageId) {
        history.replaceState(null, '', '#' + pageId);
    }

    // Renderiza conteúdo da página
    if (pageId === 'home')      renderHome();
    if (pageId === 'explore')   renderExplore();
    if (pageId === 'releases')  renderReleases();
    if (pageId === 'community') renderCommunity();

    // Fecha drawer mobile se estiver aberto
    closeDrawer();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ===== 4. FILTROS E BUSCA ========================================= */

function applyFilters() {
    let result = gamesData.slice();

    // Busca
    if (state.filters.search) {
        const q = state.filters.search.toLowerCase();
        result = result.filter(g => g.title.toLowerCase().includes(q));
    }

    // Categoria
    if (state.filters.category !== 'all') {
        result = result.filter(g => g.category === state.filters.category);
    }

    // Favoritos
    if (state.filters.onlyFavorites) {
        result = result.filter(g => state.favorites.includes(g.id));
    }

    // Em promoção
    if (state.filters.onlyOnSale) {
        result = result.filter(g => g.onSale);
    }

    return result;
}

function getActiveFiltersText() {
    const labels = [];
    if (state.filters.search) labels.push('busca');
    if (state.filters.category !== 'all') labels.push(state.filters.category);
    if (state.filters.onlyFavorites) labels.push('favoritos');
    if (state.filters.onlyOnSale) labels.push('promoção');
    return labels.length > 0 ? labels.join(', ') : 'nenhum';
}

function clearAllFilters() {
    state.filters = { search: '', category: 'all', onlyFavorites: false, onlyOnSale: false };

    document.getElementById('search-input').value = '';
    document.querySelector('input[name="category"][value="all"]').checked = true;
    document.getElementById('filter-favorites').checked = false;
    document.getElementById('filter-onsale').checked = false;

    renderExplore();
}


/* ===== 5. RENDERIZAÇÃO — HOME ===================================== */

function renderHome() {
    renderFreeGames();
    renderDeals();
    renderCategories();
}

function renderFreeGames() {
    const container = document.getElementById('free-games');
    if (!container) return;

    const freeGames = gamesData.filter(g => g.isFree).slice(0, 3);
    container.innerHTML = freeGames.map(game => createDealCard(game)).join('');
}

function renderDeals() {
    const container = document.getElementById('deals-grid');
    if (!container) return;

    const deals = gamesData.filter(g => g.onSale).slice(0, 4);
    container.innerHTML = deals.map(game => createDealCard(game)).join('');
}

function createDealCard(game) {
    const isFree = game.isFree;
    const priceBlock = isFree
        ? `<span class="badge badge--secondary">GRÁTIS</span>`
        : `<span class="card-deal__price-old">${formatPrice(game.originalPrice)}</span>
           <span class="card-deal__price-new">${formatPrice(game.price)}</span>`;

    const discountBlock = (game.discount > 0 && !isFree)
        ? `<span class="card-deal__discount">-${game.discount}%</span>`
        : '';

    return `
        <article class="card-deal" data-game-id="${game.id}">
            <div class="card-deal__media">
                ${discountBlock}
                <img src="${game.image}" alt="Capa do jogo ${escapeHtml(game.title)}" class="card-deal__image" loading="lazy">
            </div>
            <div class="card-deal__body">
                <h3 class="card-deal__title">${escapeHtml(game.title)}</h3>
                <span class="tag">${escapeHtml(game.category)}</span>
                <div class="card-deal__prices">${priceBlock}</div>
            </div>
        </article>
    `;
}

function renderCategories() {
    const container = document.getElementById('categories-grid');
    if (!container) return;

    container.innerHTML = categoriesData.map(cat => {
        const count = gamesData.filter(g => g.category === cat.slug).length;
        return `
            <a class="category-tile"
               href="#explore"
               data-page="explore"
               data-category="${cat.slug}"
               style="--tile-color: ${cat.color}"
               aria-label="Ver jogos da categoria ${cat.name}">
                <span class="category-tile__name">${cat.name}</span>
                <span class="category-tile__count">${count}</span>
            </a>
        `;
    }).join('');
}


/* ===== 6. RENDERIZAÇÃO — EXPLORAR ================================ */

function renderExplore() {
    const grid = document.getElementById('games-grid');
    const resultsCount = document.getElementById('results-count');
    const activeFilters = document.getElementById('active-filters');
    if (!grid) return;

    const filtered = applyFilters();

    // Atualiza contadores
    resultsCount.textContent = filtered.length + ' ' + (filtered.length === 1 ? 'jogo' : 'jogos');
    activeFilters.textContent = getActiveFiltersText();

    // Empty state
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon"><i class="fa-solid fa-ghost" aria-hidden="true"></i></div>
                <h3>Nenhum jogo encontrado</h3>
                <p>Tente ajustar seus filtros ou limpar a busca.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(game => createGameCard(game)).join('');
}

function createGameCard(game) {
    const status = getAvailabilityStatus(game.releaseDate);
    const isFavorite = state.favorites.includes(game.id);
    const favClass = isFavorite ? 'is-active' : '';
    const favIcon = isFavorite ? 'fa-solid' : 'fa-regular';

    return `
        <article class="card-game" data-game-id="${game.id}">
            <div class="card-game__media">
                ${status.text === 'Pré-venda' ? `
                    <div class="card-game__status">
                        <span class="badge ${status.class}">
                            <i class="fa-solid ${status.icon}" aria-hidden="true"></i> ${status.text}
                        </span>
                    </div>
                ` : ''}
                <button class="card-game__favorite ${favClass}"
                        type="button"
                        data-favorite="${game.id}"
                        aria-label="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
                        aria-pressed="${isFavorite}">
                    <i class="${favIcon} fa-star" aria-hidden="true"></i>
                </button>
                <img src="${game.image}" alt="Capa do jogo ${escapeHtml(game.title)}" class="card-game__image" loading="lazy">
            </div>
            <div class="card-game__body">
                <header class="card-game__header">
                    <h3 class="card-game__title">${escapeHtml(game.title)}</h3>
                    <span class="card-game__category">${escapeHtml(game.category)}</span>
                </header>
                <footer class="card-game__footer">
                    <span class="card-game__price">${formatPrice(game.price)}</span>
                    <button class="icon-btn icon-btn--small" type="button" aria-label="Adicionar ao carrinho">
                        <i class="fa-solid fa-cart-plus" aria-hidden="true"></i>
                    </button>
                </footer>
            </div>
        </article>
    `;
}


/* ===== 7. RENDERIZAÇÃO — LANÇAMENTOS ============================== */

function renderReleases() {
    const container = document.getElementById('releases-container');
    if (!container) return;

    // Mais recentes primeiro, pega top 4
    const sorted = gamesData.slice().sort((a, b) =>
        new Date(b.releaseDate) - new Date(a.releaseDate)
    ).slice(0, 4);

    container.innerHTML = sorted.map(game => createReleaseCard(game)).join('');
}

function createReleaseCard(game) {
    const status = getAvailabilityStatus(game.releaseDate);
    const tagText = new Date(game.releaseDate) > new Date() ? 'Em breve' : 'Novo';
    const platformsHtml = game.platforms.map(p =>
        `<span class="tag"><i class="fa-solid fa-gamepad" aria-hidden="true"></i> ${escapeHtml(p)}</span>`
    ).join('');

    return `
        <article class="card-release" data-game-id="${game.id}">
            <div class="card-release__media">
                <span class="card-release__tag">${tagText}</span>
                <img src="${game.image}" alt="Capa do jogo ${escapeHtml(game.title)}" class="card-release__image" loading="lazy">
            </div>
            <div class="card-release__body">
                <div class="card-release__meta">
                    <span class="tag">${escapeHtml(game.dev)}</span>
                    <span class="badge ${getRatingClass(game.rating)} badge--rating">${escapeHtml(game.rating)}</span>
                    ${platformsHtml}
                </div>
                <h3 class="card-release__title">${escapeHtml(game.title)}</h3>
                <p class="card-release__summary">${escapeHtml(game.summary)}</p>
                <div class="card-release__footer">
                    <span class="card-release__price">${formatPrice(game.price)}</span>
                    <button class="btn btn--primary" type="button">
                        Ver detalhes
                        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
}


/* ===== 8. RENDERIZAÇÃO — COMUNIDADE =============================== */

function renderCommunity() {
    renderFeed();
    renderContributors();
}

function renderFeed() {
    const feed = document.getElementById('community-feed');
    if (!feed) return;

    // Junta posts originais com os criados pelo composer (mais novos primeiro)
    const allPosts = state.posts.concat(communityPosts);

    let filtered = allPosts;
    if (state.communityFilter !== 'all') {
        filtered = allPosts.filter(p => p.type === state.communityFilter);
    }

    if (filtered.length === 0) {
        feed.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon"><i class="fa-solid fa-comments" aria-hidden="true"></i></div>
                <h3>Nenhum post nesse filtro</h3>
                <p>Seja o primeiro a publicar.</p>
            </div>
        `;
        return;
    }

    feed.innerHTML = filtered.map(post => createCommunityCard(post)).join('');
}

function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        const cls = i <= rating ? 'fa-solid' : 'fa-regular';
        html += `<i class="${cls} fa-star" aria-hidden="true"></i>`;
    }
    return html;
}

function createCommunityCard(post) {
    const relatedGame = gamesData.find(g => g.id === post.gameId);
    const gameName = relatedGame ? relatedGame.title : 'Jogo';

    const ownerBadge = post.isOwner ? `
        <span class="card-community__owner-tag" title="Possui o jogo">
            <i class="fa-solid fa-circle-check" aria-hidden="true"></i> Comprador
        </span>` : '';

    const artBlock = (post.type === 'art' && post.image) ? `
        <div class="card-community__art">
            <img src="${post.image}" alt="Arte de ${escapeHtml(post.user)} relacionada a ${escapeHtml(gameName)}">
            <p class="card-community__art-label">
                <i class="fa-solid fa-palette" aria-hidden="true"></i> Arte da comunidade
            </p>
        </div>` : '';

    const expMap = { 'Muito Bom': 'great', 'Bom': 'good', 'Ok': 'ok' };
    const expClass = 'card-community__experience--' + (expMap[post.experience] || 'ok');

    return `
        <article class="card-community" data-post-id="${post.id}">
            <header class="card-community__head">
                <div class="card-community__user">
                    <img src="${post.avatar}" alt="Avatar de ${escapeHtml(post.user)}" class="card-community__avatar">
                    <div>
                        <h4 class="card-community__username">
                            ${escapeHtml(post.user)} ${ownerBadge}
                        </h4>
                        <p class="card-community__game-ref">
                            Sobre: <a>${escapeHtml(gameName)}</a>
                        </p>
                    </div>
                </div>
                <div>
                    <p class="card-community__playtime">${escapeHtml(post.playtime)} de jogo</p>
                    <div class="card-community__stars">${renderStars(post.rating)}</div>
                </div>
            </header>
            ${artBlock}
            <p class="card-community__text">"${escapeHtml(post.text)}"</p>
            <footer class="card-community__foot">
                <span class="card-community__experience ${expClass}">${escapeHtml(post.experience)}</span>
                <div class="card-community__interactions">
                    <button type="button"><i class="fa-regular fa-thumbs-up" aria-hidden="true"></i> Útil</button>
                    <button type="button"><i class="fa-regular fa-comment" aria-hidden="true"></i> Comentar</button>
                </div>
            </footer>
        </article>
    `;
}

function renderContributors() {
    const container = document.getElementById('top-contributors');
    if (!container) return;

    container.innerHTML = topContributors.map(c => `
        <div class="contributor">
            <img src="${c.avatar}" alt="Avatar de ${escapeHtml(c.name)}" class="contributor__avatar">
            <div>
                <p class="contributor__name">${escapeHtml(c.name)}</p>
                <p class="contributor__points">${c.points.toLocaleString('pt-BR')} pts</p>
            </div>
        </div>
    `).join('');
}


/* ===== 9. FAVORITOS (localStorage) ================================ */

const STORAGE_KEY = 'nexus.favorites';

function loadFavorites() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        state.favorites = saved ? JSON.parse(saved) : [];
    } catch (e) {
        state.favorites = [];
    }
}

function saveFavorites() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
    } catch (e) {
        // localStorage indisponível (privacy mode, etc) — falha silenciosa
    }
}

function toggleFavorite(gameId) {
    const id = Number(gameId);
    const index = state.favorites.indexOf(id);

    if (index >= 0) {
        state.favorites.splice(index, 1);
    } else {
        state.favorites.push(id);
    }

    saveFavorites();
    updateFavoritesUI();

    // Se filtrando por favoritos, re-renderiza pra esconder o desfavoritado
    if (state.filters.onlyFavorites && state.currentPage === 'explore') {
        renderExplore();
    }
}

function updateFavoritesUI() {
    // Atualiza os botões de favorito visíveis
    document.querySelectorAll('[data-favorite]').forEach(btn => {
        const id = Number(btn.dataset.favorite);
        const isFav = state.favorites.includes(id);
        const icon = btn.querySelector('i');

        btn.classList.toggle('is-active', isFav);
        btn.setAttribute('aria-pressed', isFav);
        btn.setAttribute('aria-label', isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos');

        if (icon) {
            icon.classList.toggle('fa-solid', isFav);
            icon.classList.toggle('fa-regular', !isFav);
        }
    });

    // Atualiza badge do header
    const badge = document.getElementById('cart-count');
    if (state.favorites.length > 0) {
        badge.textContent = state.favorites.length;
        badge.hidden = false;
    } else {
        badge.hidden = true;
    }
}


/* ===== 10. COMPOSER =============================================== */

function handleComposerSubmit(event) {
    event.preventDefault();
    const textarea = document.getElementById('composer-textarea');
    const text = textarea.value.trim();

    if (!text) return;

    const newPost = {
        id: Date.now(),
        user: 'Player One',
        avatar: 'https://ui-avatars.com/api/?name=Player+One&background=7c3aed&color=fff',
        gameId: gamesData[0].id, // referência genérica
        type: 'review',
        rating: 5,
        text: text,
        playtime: '0h',
        experience: 'Bom',
        image: null,
        isOwner: false
    };

    state.posts.unshift(newPost);
    textarea.value = '';
    renderFeed();
}


/* ===== 11. MENU MOBILE (DRAWER) =================================== */

function openDrawer() {
    document.getElementById('mobile-drawer').classList.add('is-open');
    document.getElementById('mobile-drawer').setAttribute('aria-hidden', 'false');
    document.getElementById('drawer-backdrop').hidden = false;
    document.getElementById('hamburger-btn').setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    document.getElementById('mobile-drawer').classList.remove('is-open');
    document.getElementById('mobile-drawer').setAttribute('aria-hidden', 'true');
    document.getElementById('drawer-backdrop').hidden = true;
    document.getElementById('hamburger-btn').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function toggleDrawer() {
    const isOpen = document.getElementById('mobile-drawer').classList.contains('is-open');
    if (isOpen) closeDrawer();
    else openDrawer();
}


/* ===== 12. COUNTDOWN ============================================== */

function updateCountdown() {
    const el = document.getElementById('deals-countdown');
    if (!el) return;

    // Meia-noite do dia atual
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

    el.textContent = `${h}:${m}:${s}`;
}


/* ===== 13. EVENT LISTENERS ======================================== */

function setupEventListeners() {

    // Navegação SPA (delegação no documento)
    document.addEventListener('click', (e) => {
        const navTrigger = e.target.closest('[data-page]');
        if (navTrigger) {
            e.preventDefault();
            const pageId = navTrigger.dataset.page;

            // Se for um category-tile, ajusta o filtro antes
            if (navTrigger.classList.contains('category-tile')) {
                const cat = navTrigger.dataset.category;
                state.filters.category = cat;
                // Sincroniza radio button
                const radio = document.querySelector(`input[name="category"][value="${cat}"]`);
                if (radio) radio.checked = true;
            }

            switchPage(pageId);
        }
    });

    // Favoritos (delegação)
    document.addEventListener('click', (e) => {
        const favBtn = e.target.closest('[data-favorite]');
        if (favBtn) {
            e.preventDefault();
            toggleFavorite(favBtn.dataset.favorite);
        }
    });

    // Busca com debounce
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            state.filters.search = e.target.value;
            renderExplore();
        }, 200));
    }

    // Filtros de categoria
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.filters.category = e.target.value;
            renderExplore();
        });
    });

    // Filtros checkbox
    const favCheck = document.getElementById('filter-favorites');
    if (favCheck) {
        favCheck.addEventListener('change', (e) => {
            state.filters.onlyFavorites = e.target.checked;
            renderExplore();
        });
    }

    const saleCheck = document.getElementById('filter-onsale');
    if (saleCheck) {
        saleCheck.addEventListener('change', (e) => {
            state.filters.onlyOnSale = e.target.checked;
            renderExplore();
        });
    }

    // Limpar filtros
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) clearBtn.addEventListener('click', clearAllFilters);

    // Composer
    const composer = document.getElementById('composer-form');
    if (composer) composer.addEventListener('submit', handleComposerSubmit);

    // Tabs da comunidade
    document.querySelectorAll('[data-feed-filter]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-feed-filter]').forEach(t => t.classList.remove('is-active'));
            tab.classList.add('is-active');
            state.communityFilter = tab.dataset.feedFilter;
            renderFeed();
        });
    });

    // Hamburger
    const hamburger = document.getElementById('hamburger-btn');
    if (hamburger) hamburger.addEventListener('click', toggleDrawer);

    // Backdrop fecha drawer
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Esc fecha drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    // Hash change (botão voltar do navegador)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || 'home';
        switchPage(hash);
    });
}


/* ===== 14. INICIALIZAÇÃO ========================================== */

function initApp() {
    // Footer year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Carrega favoritos persistidos
    loadFavorites();

    // Liga eventos
    setupEventListeners();

    // Determina página inicial pelo hash ou default 'home'
    const initialPage = window.location.hash.replace('#', '') || 'home';
    switchPage(initialPage);

    // Atualiza UI de favoritos
    updateFavoritesUI();

    // Countdown (atualiza a cada segundo)
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Inicia quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
