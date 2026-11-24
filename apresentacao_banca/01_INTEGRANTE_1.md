# 👤 Integrante 1 — Saymoon Wanderson Sousa Mota
## Arquitetura Geral, Roteamento e Navegação

---

## 📋 Cabeçalho de Identificação

- **Integrante:** 1 de 5 — Abre a apresentação
- **Tempo Estimado de Fala:** 3 minutos
- **Componentes sob sua responsabilidade:**
  - `src/main.tsx` — Ponto de entrada da aplicação
  - `src/App.tsx` — Estrutura de rotas e layout global
  - `src/components/Navbar.tsx` — Barra de navegação responsiva
- **De quem você recebe a palavra:** Ninguém — você abre a apresentação com a visão geral do projeto
- **Para quem você passa a palavra:** Francisco Vitor — *"Agora que a estrutura e navegação estão claras, o Francisco vai mostrar como os dados dos pratos são apresentados ao usuário nas interfaces principais."*

---

## 🎤 Roteiro de Fala Completo

### Abertura
> "Olá, bom dia/boa tarde. Meu nome é Saymoon Wanderson e vou abrir a apresentação explicando a arquitetura geral do nosso projeto, o Cardapiaui — uma aplicação web sobre a gastronomia caseira e tradicional do Piauí.
>
> Antes de mostrar o código, deixa eu dar um contexto rápido da estrutura. Nossa aplicação segue uma arquitetura baseada em componentes, com quatro camadas bem definidas: a camada de apresentação com os componentes visuais, a camada de estado global com o Context API, a camada de serviço com as chamadas HTTP, e a camada de tipos com as interfaces TypeScript. Cada camada tem uma responsabilidade específica — isso é o princípio de Separação de Responsabilidades na prática."

### Explicação do Componente 1 — `main.tsx` e `App.tsx`
> "Vamos começar pelo `main.tsx`. Ele é o ponto de entrada absoluto da aplicação. Quando o browser carrega o HTML, existe uma `<div id='root'>` vazia. O `main.tsx` pega essa div e monta o React nela usando `createRoot`. Ele envolve tudo com o `BrowserRouter` do React Router — isso é o que habilita a navegação de Single Page Application, onde o usuário muda de página sem a tela recarregar do zero.
>
> Dali o controle passa para o `App.tsx`. Ele tem duas funções: `App` e `AppLayout`. A função `App` envolve tudo com o `AppProvider`, que é o nosso contexto global — o Marcos vai explicar isso em detalhes. A razão de ter essa separação é técnica: a função `AppLayout` precisa usar o hook `useAppContext`, que só funciona dentro de um filho do `AppProvider`. Se colocássemos tudo em um componente só, o hook seria chamado antes do contexto existir, gerando um erro de runtime.
>
> No `AppLayout` estão declaradas todas as rotas com `<Routes>` e `<Route>`: Home em `/`, Cardápio em `/cardapio`, Login em `/login`, Sobre em `/sobre`, Contato em `/contato`, e as rotas administrativas em `/admin/login` e `/admin`. Reparem que a rota `/admin` está envolta em `<PrivateRoute>` — se o usuário tentar acessar sem estar autenticado, é redirecionado automaticamente para `/admin/login`. Essa é a nossa implementação de rota protegida, um padrão fundamental em aplicações com autenticação. Também temos a rota `path='*'` no final, que captura qualquer URL inválida e exibe uma página 404."

### Explicação do Componente 2 — `Navbar.tsx`
> "O segundo componente é o `Navbar`. Ele é a barra de navegação fixa no topo, e um bom exemplo de como o TypeScript garante contratos entre componentes. Ele recebe três props tipadas pela interface `NavbarProps`: `user` do tipo `User | null`, `favoritesCount` do tipo `number`, e `onLogout` do tipo `() => void`.
>
> Percebam que o `Navbar` não acessa o contexto global diretamente — ele recebe tudo de fora via props. Isso é um princípio chamado de inversão de dependência: o componente não sabe de onde vêm os dados, só sabe o que fazer com eles. Isso torna o componente mais reutilizável e testável.
>
> Internamente ele tem um único estado local: `menuOpen`, controlado por `useState`, que serve exclusivamente para o menu responsivo no mobile. Quando o usuário está logado, o componente renderiza `UserBadge` com o nome e botão de logout. Quando não está, exibe o link 'Entrar'. Isso é renderização condicional — o operador ternário `user ? <UserBadge> : <NavLink to='/login'>` decide o que mostrar baseado no tipo `User | null`."

### Fechamento e Passagem de Bastão
> "Para resumir: `main.tsx` é a ignição do React; `App.tsx` é a planta baixa da aplicação com rotas e proteção; e `Navbar` é o ponto de navegação do usuário com estado responsivo. Passo a palavra para o Francisco, que vai mostrar as interfaces de exibição dos pratos."

---

## 📚 Ficha Técnica Detalhada

### Componente: `src/main.tsx`

**O que faz na prática:**
Monta a aplicação React no DOM e habilita o roteamento SPA com `BrowserRouter`.

**Raio-X do Código:**
- **Entradas:** nenhuma — é o arquivo de inicialização
- **Processamento interno:**
  - `document.getElementById('root')!` — acessa a div raiz do `index.html`
  - `createRoot(...)` — cria a raiz do React nessa div
  - `.render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>)` — renderiza a árvore completa
  - `StrictMode` — ativa verificações extras em desenvolvimento (monta componentes duas vezes para detectar efeitos colaterais)
  - `BrowserRouter` — usa a History API do browser para navegação sem recarregamento
- **Saída:** aplicação React montada no DOM

**Conceitos Acadêmicos:**
- *Single Page Application (SPA)*: uma única página HTML, navegação via JavaScript
- *Renderização no cliente (CSR)*: o HTML inicial é mínimo, React monta tudo no browser
- *StrictMode*: ferramenta de desenvolvimento para detectar problemas

---

### Componente: `src/App.tsx`

**O que faz na prática:**
Define a estrutura global da aplicação: envolve tudo com o contexto global e declara todas as rotas.

**Raio-X do Código:**
- **Entradas:** nenhuma prop — é o componente raiz
- **Processamento interno:**
  - `useAppContext()` em `AppLayout` — extrai `user`, `favorites`, `setUser` do contexto global
  - `<AppProvider>` envolve `<AppLayout>` — garante que o contexto existe antes do layout
  - `<Routes>` + `<Route path="..." element={...}>` — mapeia URLs para componentes
  - `<PrivateRoute>` envolve `<AdminDashboard>` — rota protegida por autenticação
  - Rota `path="*"` — 404 para URLs inválidas
  - `onLogout={() => setUser(null)}` — passa função de logout para a Navbar
- **Saída:** `<div class="app-shell">` com Navbar + conteúdo da rota ativa + Footer

**Conceitos Acadêmicos:**
- *Composição de Componentes*: `AppProvider > AppLayout > Navbar + Routes + Footer`
- *Rota Protegida (Protected Route)*: padrão de autenticação em SPAs
- *Separação Provider/Consumer*: `App` cria o contexto, `AppLayout` o consome
- *Prop Drilling evitado*: dados globais via contexto, não via props em cascata

---

### Componente: `src/components/Navbar.tsx`

**O que faz na prática:**
Barra de navegação fixa no topo com links, contador de favoritos, badge de usuário logado e menu hambúrguer responsivo para mobile.

**Raio-X do Código:**
- **Entradas (Props — interface `NavbarProps`):**
  - `user: User | null` — se `null`, mostra link "Entrar"; se `User`, mostra `UserBadge`
  - `favoritesCount: number` — número exibido no ícone de coração
  - `onLogout: () => void` — função passada para o `UserBadge`
- **Processamento interno:**
  - `const [menuOpen, setMenuOpen] = useState(false)` — estado local do menu mobile
  - `closeMenu()` — seta `menuOpen` para `false`; chamada em cada `NavLink` para fechar o menu ao navegar
  - `const links = [...]` — array de rotas declarado fora do componente (não recriado a cada render)
  - `links.map(link => <NavLink>)` — renderiza os 4 links principais dinamicamente
  - `user ? <UserBadge user={user} onLogout={onLogout} /> : <NavLink to="/login">Entrar</NavLink>` — renderização condicional
  - `aria-expanded={menuOpen}` e `aria-label` dinâmico — acessibilidade do botão hambúrguer
- **Saída:** `<header class="site-header">` com logo, nav com links, badge de usuário e contador de favoritos

**Conceitos Acadêmicos:**
- *Componentização e Reuso*: recebe tudo via props, não acessa contexto diretamente
- *Tipagem Estática com TypeScript*: `NavbarProps` define o contrato exato de entrada
- *Estado Local vs. Estado Global*: `menuOpen` é local (só interessa ao Navbar); `user` vem de fora
- *Renderização Condicional*: ternário decide qual elemento exibir baseado no tipo
- *Separação de Responsabilidades*: Navbar não sabe como o logout funciona, só chama `onLogout()`

---

## 🛡️ Simulado de Perguntas da Banca

**P1: Por que vocês separaram `App` e `AppLayout` em dois componentes dentro do mesmo arquivo em vez de fazer tudo em um só?**

> **R:** Porque `AppLayout` precisa usar o hook `useAppContext()`, que internamente chama `useContext(AppContext)`. O `useContext` só funciona dentro de um componente que é filho do `Provider` correspondente — no caso, o `AppProvider`. Se tivéssemos apenas um componente chamando `useAppContext()` no mesmo nível do `AppProvider`, o hook seria executado antes do contexto ser criado, gerando o erro: *"useAppContext deve ser usado dentro de AppProvider"*. Separando em dois componentes e aninhando `AppProvider > AppLayout`, garantimos que quando `useAppContext` é chamado, o contexto já foi inicializado.

**P2: O que acontece se o usuário digitar manualmente uma URL como `/admin` no browser sem estar logado?**

> **R:** A rota `/admin` está envolta em `<PrivateRoute>`. O componente `PrivateRoute` lê `adminToken` do contexto via `useAppContext()`. Se `adminToken` for `null`, ele renderiza `<Navigate to="/admin/login" replace />` em vez do `AdminDashboard`. O `replace` evita que a URL `/admin` entre no histórico de navegação, então se o usuário clicar em voltar, não fica em loop. É um padrão clássico de rota protegida em aplicações React.

**P3: Por que o array `links` dentro do `Navbar` foi declarado fora do componente e não dentro?**

> **R:** Variáveis declaradas dentro de um componente funcional são recriadas a cada re-render. Como `links` é um array constante que nunca muda, declará-lo dentro do componente seria desperdício de memória — o array seria recriado toda vez que `menuOpen` mudasse, por exemplo. Declarando fora, o array é criado uma única vez quando o módulo é carregado, e todos os re-renders do `Navbar` reutilizam a mesma referência. É uma otimização pequena mas demonstra conhecimento do ciclo de re-render do React.
