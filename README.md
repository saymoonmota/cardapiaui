# Sabor do Piauí

Aplicação web responsiva sobre a gastronomia caseira e tradicional do Piauí. O projeto apresenta receitas, ingredientes, modos de preparo e acompanhamentos em uma experiência acadêmica interativa.

## Visão geral

- Cinco páginas: início, cardápio, login demonstrativo, sobre o projeto e contato.
- Busca por nome/descrição e filtro por categoria para pratos, bebidas, sobremesas e petiscos.
- Favoritos e usuário compartilhados entre páginas por contexto React.
- Modal com ingredientes, preparo caseiro e acompanhamentos.
- Formulários com validação nativa e retorno visual.
- Dados locais com atraso simulado para representar uma API REST.
- Fotografias do cardápio com textos alternativos e créditos; a galinha caipira também aparece no banner da página inicial.

O login, os favoritos e o envio de sugestões são demonstrações locais: não há autenticação, backend nem armazenamento persistente.

## Tecnologias

- React 19 e TypeScript com Vite.
- Tailwind CSS v4 integrado ao Vite e estilos responsivos do projeto.
- React Router para navegação.
- Lucide React para ícones.

## Instalação e execução

Requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

O Vite informará a URL local (normalmente `http://localhost:5173`).

Comandos adicionais:

```bash
npm run build
npm run lint
npm run preview
```

## Deploy

O site está publicado na Netlify: [https://jocular-peony-a6ba21.netlify.app](https://jocular-peony-a6ba21.netlify.app).

O deploy atual foi feito manualmente a partir da pasta `dist`; para publicar alterações futuras, execute `npm run build` e envie a pasta `dist` atualizada para o mesmo projeto na Netlify. O repositório ainda não está conectado para deploy automático.

## Páginas

| Caminho | Página | Conteúdo |
| --- | --- | --- |
| `/` | Início | Banner, pratos em destaque e chamada para o cardápio |
| `/cardapio` | Cardápio | Busca, filtros, favoritos e modal de receitas |
| `/login` | Login | Formulário demonstrativo de usuário |
| `/sobre` | Sobre | Intenção de valorizar a culinária piauiense |
| `/contato` | Contato | Sugestões de receitas com feedback |

## Componentes e hooks

O projeto integra mais de 8 componentes funcionais reutilizáveis, incluindo `Navbar`, `Footer`, `HeroBanner`, `PratoCard`, `PratoGrid`, `PratoModal`, `SearchFilter`, `LoginForm`, `UserBadge`, `ContactForm` e `FeedbackMessage`. `TeamMemberCard` também está implementado, mas não é exibido nas páginas.

Hooks utilizados: `useState`, `useEffect`, `useContext` (por meio do hook `useAppContext`), `useMemo` e `useRef`. Os dados são lidos do JSON local e carregados de forma assíncrona com atraso simulado; não há integração com uma API externa.

## Estrutura de pastas

```text
src/
├── components/       # Navbar, Footer, formulários, cards e modal reutilizáveis
├── context/          # Contexto de usuário e favoritos
├── data/             # Mock local dos pratos em JSON
├── pages/            # Páginas associadas às rotas
├── services/         # Simulação assíncrona da API de pratos
├── types/            # Interfaces e tipos compartilhados
├── App.tsx           # Layout e definição das rotas
├── App.css           # Componentes e estilos responsivos
├── index.css         # Estilos globais e tema Tailwind
└── main.tsx          # Inicialização React e BrowserRouter
```

## Itens do cardápio

- **Pratos:** Galinha Caipira, Panelada Piauiense, Carne de Bode, Carne de Sol, Piau Frito e Sarapatel.
- **Bebidas:** Cajuína Piauiense.
- **Sobremesas:** Doce de Buriti e Doce de Caju.
- **Petiscos:** Castanha Assada.

O cardápio contém 10 itens. Tempos, descrições, ingredientes, acompanhamentos e modos de preparo estão em `src/data/pratos.json`.

## Integrantes e componentes

Preencha com os nomes reais e os dois componentes que cada integrante desenvolveu e apresentará. Duplique a linha conforme o número de integrantes (máximo de seis).

| Integrante | Componente 1 | Componente 2 |
| --- | --- | --- |
| [Nome do integrante] | [Componente desenvolvido] | [Componente desenvolvido] |

## Capturas das telas principais

As capturas de tela ainda precisam ser adicionadas ao repositório antes da entrega. Inclua imagens das telas principais nesta seção, por exemplo: início, cardápio, sobre, login e contato.
