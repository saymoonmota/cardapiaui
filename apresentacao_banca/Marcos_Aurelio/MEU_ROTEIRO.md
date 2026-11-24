# 👤 Integrante 4 — Marcos Aurelio
## Gerenciamento de Estado Global, Context API e Autenticação

---

## 📋 Cabeçalho de Identificação

- **Integrante:** 4 de 5
- **Tempo Estimado de Fala:** 3 minutos
- **Componentes sob sua responsabilidade:**
  - `src/pages/Login.tsx` — Página de identificação do visitante
  - `src/components/LoginForm.tsx` — Formulário controlado de login do visitante
  - `src/context/AppContext.tsx` — Provedor de estado global da aplicação
  - `src/context/useAppContext.ts` — Custom Hook de acesso ao contexto
  - `src/context/appContextInstance.ts` — Instância do contexto React
- **De quem você recebe a palavra:** AJ Barros — *que acabou de mostrar `ContactForm` e `FeedbackMessage`*
- **Para quem você passa a palavra:** Mario — *"O Marcos mostrou o coração do estado da aplicação. O Mario fecha apresentando como os dados visuais são renderizados e como toda a comunicação com o backend acontece."*

---

## 🎤 Roteiro de Fala Completo

### Abertura / Transição
> "Obrigado, AJ. Meu nome é Marcos Aurelio e vou explicar como o estado global da aplicação é gerenciado. O AJ mostrou como os dados entram pelo formulário e são enviados. Eu vou mostrar onde esses dados — e todos os outros dados da aplicação — são armazenados e como qualquer componente consegue acessá-los sem precisar de prop drilling."

### Explicação do Componente 1 — `Login.tsx` e `LoginForm.tsx`
> "Começo pelo sistema de login do visitante, que envolve dois arquivos: `Login.tsx` e `LoginForm.tsx`. O login do visitante é demonstrativo — não há senha nem verificação no backend. O usuário informa nome e e-mail, esses dados são salvos no contexto global e habilitam o sistema de favoritos durante a sessão.
>
> No `Login.tsx`, temos três hooks. O primeiro é `useRef<HTMLInputElement>(null)` — cria uma referência para o campo de nome no `LoginForm`. O segundo é `useEffect` com array de dependências vazio: `useEffect(() => { nameInputRef.current?.focus() }, [])`. O array vazio significa que esse efeito roda uma única vez, quando o componente é montado. O que ele faz? Chama `.focus()` no campo de nome, colocando o cursor direto nele ao abrir a página. É um uso clássico de `useRef` para manipulação do DOM sem re-render. O terceiro hook é `useNavigate`, do React Router — após o login, chama `navigate('/')` para redirecionar para a Home programaticamente.
>
> A função `handleLogin` chama `setUser(userData)` — que é do contexto global — e depois `navigate('/')`. Percebam que `Login.tsx` não gerencia o estado do usuário diretamente: ele delega isso ao contexto.
>
> O `LoginForm.tsx` é o formulário em si. Ele tem dois `useState` para `name` e `email`, e a função `handleSubmit` que chama a prop `onLogin` passada pelo `Login.tsx`. É o mesmo padrão de componente controlado que o AJ explicou no `ContactForm`."

### Explicação do Componente 2 — `AppContext.tsx` e `useAppContext.ts`
> "Agora o componente mais importante do projeto: o `AppContext`. Ele centraliza todo o estado global da aplicação em um único lugar.
>
> O `AppContext` gerencia seis estados: `user` para o visitante logado, `admin` e `adminToken` para o administrador autenticado, `favorites` como array de IDs dos pratos favoritados, e `pratos`, `pratosLoading` e `pratosError` para o cache dos pratos da API.
>
> Temos dois `useEffect`. O primeiro é o de restauração da sessão admin. Ele lê `adminToken` e `adminData` do `localStorage`. Mas não para por aí: ele faz um `fetch` para o endpoint `/api/auth/me` do backend passando o token no header `Authorization: Bearer`. Se o servidor retornar erro — 401, token expirado — o código limpa o `localStorage` e desloga o admin. Se a rede estiver indisponível, mantém a sessão local temporariamente. Isso é validação server-side da sessão persistida no cliente.
>
> O segundo `useEffect` carrega os pratos da API. Usamos o padrão `let active = true` — uma variável de controle. Quando o `fetch` retorna, verificamos `if (active)` antes de chamar `setPratos`. Se o componente for desmontado antes da resposta chegar — o que pode acontecer em navegações rápidas — `active` já foi setado para `false` pela função de cleanup `return () => { active = false }`, e o `setState` não é chamado. Isso previne o erro *Can't perform a React state update on an unmounted component*.
>
> O `useMemo` no final cria o objeto `value` que é passado para o `AppContext.Provider`. Sem `useMemo`, um novo objeto seria criado a cada render do `AppProvider`, causando re-renders desnecessários em todos os consumidores do contexto.
>
> O `useAppContext` é nosso custom hook. Ele encapsula `useContext(AppContext)` e verifica se o valor é `null` — se for, lança um erro descritivo: 'useAppContext deve ser usado dentro de AppProvider'. Sem isso, o erro seria genérico e difícil de debugar."

### Fechamento e Passagem de Bastão
> "Para resumir: o `Login.tsx` demonstra `useRef`, `useEffect` de montagem e `useNavigate`. O `AppContext` demonstra Context API, dois `useEffect` com lógicas distintas, `useCallback`, `useMemo`, persistência no `localStorage` e um custom hook. É a peça central que conecta todos os outros componentes do projeto. Passo a palavra para o Mario, que fecha a apresentação mostrando como os cards de pratos são renderizados e como toda a comunicação HTTP está estruturada."

---

## 📚 Ficha Técnica Detalhada

### Componente: `src/pages/Login.tsx`

**O que faz na prática:**
Página de identificação do visitante. Captura nome e e-mail, salva no contexto global e redireciona para a Home. Foca automaticamente o campo de nome ao abrir.

**Raio-X do Código:**

- **Entradas:** nenhuma prop — é uma página
- **Processamento Interno:**
  - `const nameInputRef = useRef<HTMLInputElement>(null)` — referência ao input de nome no `LoginForm`
  - `const { user, setUser } = useAppContext()` — lê usuário atual e função para atualizá-lo
  - `const navigate = useNavigate()` — hook do React Router para navegação programática
  - `useEffect(() => { nameInputRef.current?.focus() }, [])` — foca o campo na montagem (array vazio = executa uma vez)
  - `handleLogin(userData: User)` — chama `setUser(userData)` e `navigate('/')`
  - Renderização condicional: se `user` já existe, exibe `FeedbackMessage` informando login ativo
- **Saída:** página com `LoginForm` passando `onLogin={handleLogin}` e `nameInputRef`

**Conceitos Acadêmicos:**
- *useRef*: referência ao DOM sem causar re-render
- *useEffect com array vazio*: efeito de montagem — executa uma única vez
- *useNavigate*: redirecionamento programático (imperativo) em React Router v6+
- *Composição*: `Login.tsx` orquestra `LoginForm` e `FeedbackMessage`

---

### Componente: `src/components/LoginForm.tsx`

**O que faz na prática:**
Formulário controlado com dois campos (nome e e-mail) para identificação do visitante. Sem validação de senha — acesso demonstrativo.

**Raio-X do Código:**

- **Entradas (Props — interface `LoginFormProps`):**
  - `onLogin: (user: User) => void` — callback chamado ao submeter
  - `nameInputRef: RefObject<HTMLInputElement | null>` — ref passada pelo pai para foco automático

- **Processamento Interno:**
  - `const [name, setName] = useState('')`
  - `const [email, setEmail] = useState('')`
  - `handleSubmit(event)` — `preventDefault()` + `onLogin({ nome: name.trim(), email: email.trim() })`

- **Saída:** `<form>` com 2 inputs controlados + botão + nota "Acesso demonstrativo"

**Conceitos Acadêmicos:**
- *Controlled Component*: campos espelham estado React
- *Ref Forwarding*: recebe `nameInputRef` do pai e aplica no `<input>` via `ref={nameInputRef}`

---

### Componente: `src/context/AppContext.tsx` + `useAppContext.ts`

**O que faz na prática:**
Provedor de estado global. Gerencia usuário visitante, admin autenticado com JWT, lista de favoritos e cache dos pratos. Persiste sessão do admin no `localStorage` com validação server-side.

**Raio-X do Código:**

- **Entradas:** `children: ReactNode` via `AppProviderProps`

- **Estados Gerenciados:**
  - `user: User | null` — visitante logado (não persistido — sessão de aba)
  - `admin: Admin | null` — administrador autenticado
  - `adminToken: string | null` — JWT do admin
  - `favorites: string[]` — IDs dos pratos favoritados
  - `pratos: Prato[]` — cache dos pratos carregados da API
  - `pratosLoading: boolean` — estado de carregamento
  - `pratosError: string` — mensagem de erro do fetch

- **Processamento Interno:**

  **`useEffect` #1 — Restauração da sessão admin:**
  ```typescript
  const savedToken = localStorage.getItem('adminToken')
  const savedAdmin = localStorage.getItem('adminData')
  // seta estado local imediatamente (UX: não pisca tela de login)
  setAdminState(JSON.parse(savedAdmin))
  setAdminToken(savedToken)
  // valida no servidor em background
  fetch('/api/auth/me', { headers: { Authorization: `Bearer ${savedToken}` } })
    .then(res => { if (!res.ok) { /* limpa tudo */ } })
    .catch(() => { /* mantém local se offline */ })
  ```

  **`useEffect` #2 — Carregamento dos pratos:**
  ```typescript
  let active = true  // flag anti-memory-leak
  buscarPratos()
    .then(data => { if (active) setPratos(data) })
    .catch(() => { if (active) setPratosError('...') })
    .finally(() => { if (active) setPratosLoading(false) })
  return () => { active = false }  // cleanup
  ```

  **`setAdmin(newAdmin, token)`** — seta estado + persiste ou limpa `localStorage`

  **`toggleFavorite(pratoId)`** — toggle imutável:
  ```typescript
  setFavorites(current =>
    current.includes(pratoId)
      ? current.filter(id => id !== pratoId)   // remove
      : [...current, pratoId]                   // adiciona
  )
  ```

  **`useMemo`** — memoiza o objeto `value` para evitar re-renders em todos os consumidores

- **Saída:** `<AppContext.Provider value={value}>{children}</AppContext.Provider>`

**`useAppContext.ts` — Custom Hook:**
```typescript
export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de AppProvider.')
  }
  return context
}
```

**Conceitos Acadêmicos:**
- *Context API — Provider Pattern*: disponibiliza estado para toda a árvore sem prop drilling
- *Custom Hook*: encapsula `useContext` com validação — reutilizável e seguro
- *useMemo para Otimização de Renderização*: evita re-renders cascata nos consumidores
- *useCallback para Estabilidade de Referência*: `toggleFavorite` e `setAdmin` não mudam entre renders
- *Padrão anti-memory-leak*: flag `active` em `useEffect` assíncrono
- *Persistência com localStorage*: sessão sobrevive a recarregamentos
- *Validação server-side da sessão*: `GET /api/auth/me` verifica token no servidor

---

## 🛡️ Simulado de Perguntas da Banca

**P1: Por que os pratos são carregados no `AppContext` e não em cada página (`Home.tsx` e `Cardapio.tsx`) separadamente?**

> **R:** Porque tanto `Home.tsx` quanto `Cardapio.tsx` precisam dos pratos. Se cada página fizesse seu próprio `fetch`, teríamos duas requisições idênticas para `GET /api/pratos` a cada vez que o usuário navegasse entre elas — uma ao entrar na Home e outra ao entrar no Cardápio. Centralizando no `AppContext`, o `useEffect` de carregamento executa uma única vez quando o `AppProvider` monta — que acontece antes de qualquer página renderizar. Os dados ficam em memória (`pratos`, `pratosLoading`, `pratosError`) e qualquer componente os acessa via `useAppContext()` sem nova requisição. É o padrão de *cache em memória no contexto*.

**P2: Por que vocês usaram `localStorage` em vez de `sessionStorage` para o token do admin?**

> **R:** `sessionStorage` é limpo quando o usuário fecha ou recarrega a aba — a cada reload o admin era deslogado, que era o bug que tínhamos antes. Com `localStorage`, a sessão persiste entre recarregamentos. O risco dessa abordagem é que um token expirado ficaria no storage. Para mitigar isso, implementamos a validação via `fetch('/api/auth/me')` no `useEffect` de restauração: se o servidor retornar 401 (token expirado ou inválido), o código chama `localStorage.removeItem` em ambas as chaves e reseta `admin` e `adminToken` para `null`. O token no backend expira em 8 horas — definido em `jwt.sign({ expiresIn: '8h' })`.

**P3: O que é o `useMemo` que envolve o objeto `value` no `AppContext`? Por que é necessário?**

> **R:** Em React, toda vez que um componente renderiza, seu corpo inteiro é executado novamente. Sem `useMemo`, a linha `const value = { user, admin, adminToken, ... }` criaria um objeto JavaScript novo a cada render do `AppProvider` — mesmo que nenhum dos valores mudasse. O `AppContext.Provider` detecta mudança de referência no `value` e força re-render em todos os componentes que consomem o contexto via `useAppContext`. Com `useMemo(() => ({ ... }), [user, admin, adminToken, favorites, pratos, pratosLoading, pratosError, setAdmin, toggleFavorite])`, o objeto só é recriado quando uma das dependências realmente muda. Isso evita re-renders cascata desnecessários em todos os componentes do projeto.
