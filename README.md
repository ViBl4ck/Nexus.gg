Markdown
# Nexus.gg

Onde gamers encontram o próximo vício.

Plataforma simulada de catálogo de jogos inspirada em Steam, Epic Games Store, Xbox Game Pass e PlayStation Store. Construída inteiramente em HTML, CSS e JavaScript puros — sem frameworks, sem build steps, sem dependências de runtime.

![alt text](assets/image.png)

### Demo
🔗 [Ver demo ao vivo](#) ---

## Funcionalidades

* **SPA com 4 páginas:** (Home, Explorar, Lançamentos, Comunidade) e navegação por hash.
* **Filtro multi-critério:** busca com debounce, categoria, favoritos, em promoção.
* **Sistema de favoritos:** persistido em `localStorage`.
* **Renderização dinâmica:** de cards a partir de array de objetos.
* **Composer de posts:** funcional na página Comunidade.
* **Countdown ao vivo:** das ofertas.
* **Menu mobile:** com drawer animado.
* **Dark mode nativo:** (cyberpunk-lite).
* **Acessibilidade:** skip-link, foco visível, `aria-label`, `aria-pressed`, navegação por teclado, `prefers-reduced-motion`.
* **Responsivo mobile-first:** 1 / 2 / 3 / 4 colunas conforme breakpoint.

---

## Stack

* **HTML5** semântico
* **CSS3** (design system com custom properties, Grid, Flexbox, BEM)
* **JavaScript** ES6+ puro
* **Sem frameworks, sem build, sem npm**

---

## Estrutura

```text
nexus-gg/
├── index.html        # Estrutura semântica única
├── css/
│   └── style.css     # Design system + componentes + responsividade
├── js/
│   ├── data.js       # Catálogo de jogos, categorias, posts
│   └── script.js     # Estado, render, filtros, navegação
└── assets/           # Imagens e favicon

Decisões de arquitetura
State centralizado: Um objeto state global guarda página ativa, filtros, favoritos e posts. Toda função de render lê desse estado, toda função de mutação atualiza esse estado. Sem prop drilling, sem reatividade mágica — apenas funções puras.

Delegação de eventos: Um único listener no document captura cliques em [data-page] e [data-favorite]. Funciona com elementos criados dinamicamente sem precisar reanexar listeners após cada render.

BEM nas classes: .card-game__favorite--active é mais legível que .cga ou utilities Tailwind soltas. Permite reusar o sistema em outros projetos sem dependência externa.

Design tokens em :root: Toda cor, espaçamento, raio e duração de transição vive em variáveis CSS. Trocar a paleta inteira da marca é mudar 5 linhas.

XSS-safe rendering: Todo texto vindo de dados passa por escapeHtml() antes de ir pro innerHTML. Não é Twitter, mas é o reflexo certo.

Rodando localmente
Bash
git clone [https://github.com/seu-usuario/nexus-gg.git](https://github.com/seu-usuario/nexus-gg.git)
cd nexus-gg
Abra index.html no navegador. Pronto.

Nota: Para evitar problemas com file:// em alguns navegadores, recomendo usar a extensão Live Server do VS Code ou npx serve.

Roadmap
[ ] Página de detalhe do jogo

[ ] Carrinho funcional

[ ] Toggle grid/lista na Explorar

[ ] Modo claro

[ ] PWA instalável

[ ] Backend simulado com json-server

Autor
Vítor Camargo — seu-portfolio.com · LinkedIn · GitHub

Licença
MIT
