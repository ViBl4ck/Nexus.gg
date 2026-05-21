/* =============================================================
   NEXUS.GG — DATA.JS
   Camada de dados. Sem lógica, só estado inicial e seeds.
   Em um produto real, isso viria de uma API.
   ============================================================= */


/* ===== JOGOS ====================================================== */

const gamesData = [
    {
        id: 1,
        title: "Cyber Odyssey",
        price: 199.90,
        originalPrice: 299.90,
        discount: 33,
        onSale: true,
        isFree: false,
        category: "RPG",
        releaseDate: "2023-11-20T10:00:00",
        dev: "Red CD Projekt",
        rating: "18",
        platforms: ["PC", "PS5", "Xbox"],
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        summary: "Uma aventura de mundo aberto ambientada em Night City, uma megalópole obcecada por poder, glamour e modificação corporal."
    },
    {
        id: 2,
        title: "Star Builder Tycoon",
        price: 72.00,
        originalPrice: null,
        discount: 0,
        onSale: false,
        isFree: false,
        category: "Estratégia",
        releaseDate: "2025-12-01T14:00:00",
        dev: "Cosmic Labs",
        rating: "L",
        platforms: ["PC"],
        image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop",
        summary: "Construa e gerencie sua própria estação espacial, negocie com alienígenas e sobreviva aos perigos do vácuo."
    },
    {
        id: 3,
        title: "Neon Warfare",
        price: 149.90,
        originalPrice: 299.90,
        discount: 50,
        onSale: true,
        isFree: false,
        category: "Ação",
        releaseDate: "2024-02-15T00:00:00",
        dev: "Activision Blizzard",
        rating: "16",
        platforms: ["PC", "PS5", "Xbox"],
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop",
        summary: "Combate tático em ritmo acelerado em arenas futuristas. Domine o movimento e a pontaria."
    },
    {
        id: 4,
        title: "Mystic Forest 3",
        price: 249.90,
        originalPrice: null,
        discount: 0,
        onSale: false,
        isFree: false,
        category: "RPG",
        releaseDate: "2023-05-10T10:00:00",
        dev: "Fantasy Soft",
        rating: "12",
        platforms: ["Switch", "PC"],
        image: "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=800&auto=format&fit=crop",
        summary: "Explore florestas mágicas, resolva puzzles antigos e salve o reino da escuridão eterna."
    },
    {
        id: 5,
        title: "Pixel Racer 2000",
        price: 0,
        originalPrice: 20.00,
        discount: 100,
        onSale: false,
        isFree: true,
        category: "Indie",
        releaseDate: "2023-01-01T00:00:00",
        dev: "Indie Devs Co",
        rating: "L",
        platforms: ["PC", "Mobile"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        summary: "Corrida retrô de alta velocidade com estética 16-bits e trilha sonora synthwave."
    },
    {
        id: 6,
        title: "Echoes of Aether",
        price: 89.90,
        originalPrice: 179.90,
        discount: 50,
        onSale: true,
        isFree: false,
        category: "RPG",
        releaseDate: "2024-08-30T00:00:00",
        dev: "Aether Studios",
        rating: "12",
        platforms: ["PC", "PS5"],
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
        summary: "Um RPG narrativo sobre memória, identidade e mundos que se desfazem. Cada escolha redesenha o universo."
    },
    {
        id: 7,
        title: "Tactical Brigade",
        price: 0,
        originalPrice: null,
        discount: 0,
        onSale: false,
        isFree: true,
        category: "Estratégia",
        releaseDate: "2024-06-12T00:00:00",
        dev: "Iron Forge",
        rating: "16",
        platforms: ["PC"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
        summary: "Estratégia em tempo real com batalhas massivas. Comande exércitos de até 10 mil unidades."
    },
    {
        id: 8,
        title: "Velocity Drift X",
        price: 119.90,
        originalPrice: null,
        discount: 0,
        onSale: false,
        isFree: false,
        category: "Ação",
        releaseDate: "2025-09-22T00:00:00",
        dev: "Speedline Games",
        rating: "L",
        platforms: ["PC", "PS5", "Xbox"],
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=800&auto=format&fit=crop",
        summary: "Corrida arcade frenética com mais de 200 carros e pistas espalhadas pelo globo."
    },
    {
        id: 9,
        title: "Hollow Threads",
        price: 39.90,
        originalPrice: null,
        discount: 0,
        onSale: false,
        isFree: false,
        category: "Indie",
        releaseDate: "2024-04-18T00:00:00",
        dev: "Loose Pixel",
        rating: "12",
        platforms: ["PC", "Switch"],
        image: "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?q=80&w=800&auto=format&fit=crop",
        summary: "Metroidvania melancólico sobre uma costureira que tece o tecido da realidade."
    },
    {
        id: 10,
        title: "Empire Crown",
        price: 0,
        originalPrice: null,
        discount: 0,
        onSale: false,
        isFree: true,
        category: "Estratégia",
        releaseDate: "2024-11-05T00:00:00",
        dev: "Throne Works",
        rating: "12",
        platforms: ["PC", "Mobile"],
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop",
        summary: "Estratégia 4X medieval. Construa, conquiste, diplomatize e domine o continente."
    },
    {
        id: 11,
        title: "Glitch Realm",
        price: 59.90,
        originalPrice: 89.90,
        discount: 33,
        onSale: true,
        isFree: false,
        category: "Indie",
        releaseDate: "2025-03-14T00:00:00",
        dev: "Static Noise",
        rating: "16",
        platforms: ["PC"],
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
        summary: "Roguelike onde cada bug é uma mecânica. Quebre o jogo pra avançar."
    },
    {
        id: 12,
        title: "Shadow Protocol",
        price: 229.90,
        originalPrice: null,
        discount: 0,
        onSale: false,
        isFree: false,
        category: "Ação",
        releaseDate: "2026-01-30T00:00:00",
        dev: "Black Cell Studio",
        rating: "18",
        platforms: ["PC", "PS5", "Xbox"],
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
        summary: "Stealth tático em tempo real. Cada missão é uma noite, cada erro é uma morte permanente."
    }
];


/* ===== CATEGORIAS ================================================= */

const categoriesData = [
    { name: "RPG",        slug: "RPG",        color: "#7c3aed", icon: "fa-dragon" },
    { name: "Ação",       slug: "Ação",       color: "#ff2a6d", icon: "fa-crosshairs" },
    { name: "Estratégia", slug: "Estratégia", color: "#05d9e8", icon: "fa-chess-knight" },
    { name: "Indie",      slug: "Indie",      color: "#ccff00", icon: "fa-puzzle-piece" },
    { name: "Corrida",    slug: "Corrida",    color: "#fbbf24", icon: "fa-flag-checkered" },
    { name: "Co-op",      slug: "Co-op",      color: "#22c55e", icon: "fa-users" }
];


/* ===== POSTS DA COMUNIDADE ======================================== */

const communityPosts = [
    {
        id: 1,
        user: "CyberNinja_2077",
        avatar: "https://ui-avatars.com/api/?name=Cyber+Ninja&background=ccff00&color=050507",
        gameId: 1,
        type: "review",
        rating: 5,
        text: "Simplesmente a melhor experiência imersiva que já tive. A história é profunda e o gameplay viciante.",
        playtime: "120h",
        experience: "Muito Bom",
        image: null,
        isOwner: true
    },
    {
        id: 2,
        user: "PixelArtist_BR",
        avatar: "https://ui-avatars.com/api/?name=Pixel+Art&background=7c3aed&color=fff",
        gameId: 5,
        type: "art",
        rating: 4,
        text: "Fiz essa fanart inspirada na pista Neon City! O jogo é visualmente incrível.",
        playtime: "15h",
        experience: "Bom",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        isOwner: true
    },
    {
        id: 3,
        user: "StrategyMaster",
        avatar: "https://ui-avatars.com/api/?name=Strat+Master&background=05d9e8&color=050507",
        gameId: 2,
        type: "review",
        rating: 3,
        text: "O jogo tem potencial, mas ainda precisa de balanceamento na economia. Vou esperar uns patches.",
        playtime: "5h",
        experience: "Ok",
        image: null,
        isOwner: true
    },
    {
        id: 4,
        user: "NightOwl_Gamer",
        avatar: "https://ui-avatars.com/api/?name=Night+Owl&background=ff2a6d&color=fff",
        gameId: 3,
        type: "review",
        rating: 4,
        text: "Multiplayer competitivo absurdo. Já queimei umas 60h sem perceber. Recomendo demais.",
        playtime: "60h",
        experience: "Muito Bom",
        image: null,
        isOwner: true
    },
    {
        id: 5,
        user: "IndieLover",
        avatar: "https://ui-avatars.com/api/?name=Indie+Lover&background=fbbf24&color=050507",
        gameId: 9,
        type: "art",
        rating: 5,
        text: "Que direção de arte... cada cenário parece quadro. Compartilhando meu print favorito.",
        playtime: "22h",
        experience: "Muito Bom",
        image: "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?q=80&w=800&auto=format&fit=crop",
        isOwner: true
    },
    {
        id: 6,
        user: "GhostInTheCode",
        avatar: "https://ui-avatars.com/api/?name=Ghost+Code&background=22c55e&color=050507",
        gameId: 6,
        type: "review",
        rating: 5,
        text: "Roteiro de filme. Sério, jogue até o fim e me agradeça depois. Tive que pausar várias vezes pra processar.",
        playtime: "45h",
        experience: "Muito Bom",
        image: null,
        isOwner: true
    }
];


/* ===== TOP CONTRIBUIDORES ========================================= */

const topContributors = [
    { name: "CyberNinja_2077", avatar: "https://ui-avatars.com/api/?name=Cyber+Ninja&background=ccff00&color=050507", points: 12450 },
    { name: "PixelArtist_BR",  avatar: "https://ui-avatars.com/api/?name=Pixel+Art&background=7c3aed&color=fff",     points: 9820 },
    { name: "GhostInTheCode",  avatar: "https://ui-avatars.com/api/?name=Ghost+Code&background=22c55e&color=050507", points: 7340 },
    { name: "NightOwl_Gamer",  avatar: "https://ui-avatars.com/api/?name=Night+Owl&background=ff2a6d&color=fff",      points: 5120 },
    { name: "IndieLover",      avatar: "https://ui-avatars.com/api/?name=Indie+Lover&background=fbbf24&color=050507", points: 3890 }
];
