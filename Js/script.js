document.addEventListener('DOMContentLoaded', () => {

    // Função para abrir o link em uma nova aba (mantém seu site aberto)
    function redirecionar(url) {
        window.open(url, '_blank');
    }

    // Configuração dos botões com os SEUS LINKS NOVOS
    const botoes = {
        ark: {
            id: 'btn-ark',
            url: 'https://store.steampowered.com/app/2050420/ARK_2/?l=brazilian'
        },
        cadeira: {
            id: 'btn-cadeira',
            // Link atualizado da Amazon (Cadeira Snake)
            url: 'https://www.amazon.com.br/Cadeira-Gamer-Snake-Lancaster-CGF001/dp/B0CLMDP1VG/ref=asc_df_B0CLMDP1VG?mcid=a2d1b533fcab39d18693ff8ff5a40f36&tag=googleshopp00-20&linkCode=df0&hvadid=709968341269&hvpos=&hvnetw=g&hvrand=12777164538080460911&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9196708&hvtargid=pla-2245543174734&psc=1&language=pt_BR&gad_source=1'
        },
        suporte: {
            id: 'btn-suporte',
            // Link atualizado da Kabum (Suporte BG500)
            url: 'https://www.kabum.com.br/produto/471996/suporte-gamer-para-notebook-kbm-gaming-bg500-ate-21-6-fans-rgb-preto-e-vermelho-kgbg500pt?gclsrc=aw.ds&&utm_id=22670696131&gad_source=1&gad_campaignid=22670696131&gbraid=0AAAAADx-HyHdqVW4gWXf1xEF0jv9x7nZF&gclid=Cj0KCQiAoZDJBhC0ARIsAERP-F8CxAiOiqzRVT5gC8nD0P4vi8rxLBJ5smFFavJPTw6XTRlFDnCU8PEaAiRAEALw_wcB'
        }
    };

    // Adiciona o evento de clique para cada botão identificado
    for (const key in botoes) {
        const btn = document.getElementById(botoes[key].id);
        if (btn) {
            btn.addEventListener('click', () => {
                redirecionar(botoes[key].url);
            });
        }
    }

    // --- Lógica de Scroll Suave do Menu (Opcional, mas melhora a experiência) ---
    const linksInternos = document.querySelectorAll('a[href^="#"]');

    linksInternos.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href');
            const target = document.querySelector(id);
            
            if (target) {
                // Ajusta a posição para não ficar escondido atrás do menu fixo
                const headerHeight = document.querySelector('#cabecalho').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});