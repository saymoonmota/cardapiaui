# 📋 Roteiro Geral e Transições — Cardapiaui

> **Trabalho Final — Front-end Frameworks · ADS · AV2**
> Deploy frontend: https://cardapiaui.netlify.app
> Deploy backend: https://cardapio-api-8p32.onrender.com

---

## 🏗️ Visão Geral do Projeto

### O que é o Cardapiaui?
Aplicação web sobre a gastronomia caseira e tradicional do Piauí. O usuário pode navegar pelo cardápio de receitas, favoritar pratos, enviar sugestões e, se for administrador, acessar um painel protegido para gerenciar as sugestões recebidas.

### Padrão Arquitetural
**Component-Based Architecture com separação em 4 camadas:**

```
┌─────────────────────────────────────────────────────┐
│  CAMADA DE APRESENTAÇÃO                             │
│  src/components/ e src/pages/                       │
│  Navbar, Footer, PratoCard, PratoModal, etc.        │
├─────────────────────────────────────────────────────┤
│  CAMADA DE ESTADO GLOBAL                            │
│  src/context/AppContext.tsx                         │
│  Usuário, Admin, Token JWT, Pratos, Favoritos       │
├─────────────────────────────────────────────────────┤
│  CAMADA DE SERVIÇO                                  │
│  src/services/api.ts                               │
│  Toda comunicação HTTP com o backend                │
├─────────────────────────────────────────────────────┤
│  CAMADA DE TIPOS                                    │
│  src/types/index.ts                                │
│  Contratos de dados via TypeScript                  │
└─────────────────────────────────────────────────────┘
```

### Stack Tecnológica Real (package.json)
| Tecnologia | Versão | Papel |
|---|---|---|
| React | 19.3.1 | Biblioteca de UI |
| TypeScript | ~7.0.2 | Tipagem estática |
| Vite | ^8.3.6 | Bundler e dev server |
| React Router DOM | ^7.18.6 | Roteamento SPA |
| Tailwind CSS | ^4.3.5 | Estilização |
| Lucide React | ^1.77.0 | Ícones |
| Node.js + Express | backend | API REST |
| SQLite (better-sqlite3) | backend | Banco de dados |
| JWT + bcryptjs | backend | Autenticação |

### Fluxo Macro do Sistema
```
Usuário acessa URL
      ↓
main.tsx → monta React na <div id="root"> com BrowserRouter
      ↓
App.tsx → envolve tudo em AppProvider (contexto global)
      ↓
AppContext → faz fetch dos pratos + restaura sessão admin
      ↓
AppLayout → renderiza Navbar + Routes + Footer
      ↓
Página correspondente à URL
      ↓
Página consome contexto e chama services/api.ts se necessário
      ↓
services/api.ts → fetch para https://cardapio-api-8p32.onrender.com
      ↓
Backend (Render) → responde com dados do SQLite
```

---

## 👥 Tabela Resumo da Divisão

| # | Integrante | Componente 1 | Componente 2 | Conceito Central |
|---|---|---|---|---|
| 1 | **Saymoon Wanderson** | `App.tsx` + `main.tsx` | `Navbar.tsx` | Arquitetura SPA, Roteamento |
| 2 | **Francisco Vitor** | `PratoModal.tsx` | `SearchFilter.tsx` | Acessibilidade, useMemo, Hooks |
| 3 | **AJ Barros** | `ContactForm.tsx` | `FeedbackMessage.tsx` | Formulários async, Feedback visual |
| 4 | **Marcos Aurelio** | `LoginForm.tsx` + `Login.tsx` | `AppContext.tsx` | Context API, Custom Hook, Estado global |
| 5 | **Mario** | `HeroBanner.tsx` + `PratoCard.tsx` | `services/api.ts` | Componentização, HTTP, Tipagem |

---

## 🎬 Checklist de Apresentação ao Vivo

> Siga esta ordem exata. Cada integrante assume o teclado/mouse no seu momento.

### ▶️ INTEGRANTE 1 — Saymoon Wanderson (3 min)
- [ ] Abrir o VS Code e mostrar a estrutura de pastas (`src/components`, `src/pages`, `src/context`, `src/services`)
- [ ] Abrir `src/main.tsx` — mostrar `BrowserRouter` e `createRoot`
- [ ] Abrir `src/App.tsx` — mostrar `AppProvider`, `AppLayout`, lista de `<Route>`, rota protegida `<PrivateRoute>`
- [ ] Abrir `src/components/Navbar.tsx` — mostrar props `NavbarProps`, `useState(menuOpen)`, `links[]`, renderização condicional `user ? <UserBadge> : <NavLink>`
- [ ] Abrir o browser em https://cardapiaui.netlify.app — mostrar a navbar funcionando, menu mobile

### ▶️ INTEGRANTE 2 — Francisco Vitor (3 min)
- [ ] Abrir `src/components/PratoModal.tsx` — mostrar `useRef`, `useEffect` com focus trap, `role="dialog"`, `aria-modal`
- [ ] No browser: abrir o cardápio, clicar em "Ver ingredientes" de qualquer prato — demonstrar o modal abrindo
- [ ] Pressionar `Escape` para fechar — mostrar que funciona
- [ ] Abrir `src/components/SearchFilter.tsx` — mostrar que não tem `useState`, props `query`, `categoria`, callbacks
- [ ] No browser: digitar na busca, clicar nos filtros de categoria — mostrar resultado em tempo real

### ▶️ INTEGRANTE 3 — AJ Barros (3 min)
- [ ] Abrir `src/components/ContactForm.tsx` — mostrar 4 `useState`, `handleSubmit` async, bloco `try/finally`, `submitting`
- [ ] Abrir `src/components/FeedbackMessage.tsx` — mostrar `role="alert"/"status"`, union type `kind`
- [ ] No browser: ir para /contato, preencher o formulário — mostrar botão "Enviando..." durante o envio
- [ ] Mostrar o feedback de sucesso aparecendo após envio

### ▶️ INTEGRANTE 4 — Marcos Aurelio (3 min)
- [ ] Abrir `src/pages/Login.tsx` — mostrar `useRef`, `useEffect`, `useNavigate`, `useAppContext`
- [ ] Abrir `src/components/LoginForm.tsx` — mostrar campos controlados, `handleSubmit`
- [ ] Abrir `src/context/AppContext.tsx` — mostrar os 2 `useEffect`, `localStorage`, `useMemo`, `useCallback`
- [ ] Abrir `src/context/useAppContext.ts` — mostrar o custom hook com verificação de erro
- [ ] No browser: fazer login como visitante, mostrar UserBadge na navbar

### ▶️ INTEGRANTE 5 — Mario (3 min)
- [ ] Abrir `src/components/PratoCard.tsx` — mostrar props, `aria-pressed`, `loading="lazy"`, callbacks
- [ ] Abrir `src/components/HeroBanner.tsx` — mostrar prop opcional `pratoDestaque?`
- [ ] Abrir `src/services/api.ts` — mostrar todas as funções, `import.meta.env.VITE_API_URL`, tratamento de erro
- [ ] No browser: abrir DevTools → Network → recarregar a página → mostrar a requisição real para `cardapio-api-8p32.onrender.com/api/pratos`
- [ ] Ir para `/admin/login` — fazer login com `admin@cardapiaui.com` / `admin123` — mostrar o dashboard de sugestões

---

## 🔄 Transições Entre Integrantes

| De | Para | Frase de Passagem |
|---|---|---|
| Saymoon → Francisco | "Agora que a estrutura e navegação estão claras, o Francisco vai mostrar como os dados dos pratos são apresentados ao usuário nas interfaces principais." |
| Francisco → AJ | "Com as interfaces de exibição explicadas, o AJ vai mostrar como o usuário interage com o sistema — especialmente como os dados entram pela camada de formulários." |
| AJ → Marcos | "O AJ mostrou como os dados são capturados. O Marcos vai explicar onde esses dados são armazenados e como o estado é compartilhado em toda a aplicação." |
| Marcos → Mario | "O Marcos mostrou o coração do estado da aplicação. O Mario fecha apresentando como os dados visuais são renderizados e como toda a comunicação com o backend acontece." |

---

## 📌 Requisitos do Trabalho — Checklist de Conformidade

| Requisito | Status | Evidência |
|---|---|---|
| React + TypeScript | ✅ | Todo o projeto em `.tsx` e `.ts` |
| Mínimo 8 componentes funcionais | ✅ | 13 componentes em `src/components/` |
| Mínimo 5 páginas distintas | ✅ | 7 páginas: Home, Cardápio, Login, Sobre, Contato, AdminLogin, AdminDashboard |
| Mínimo 4 hooks diferentes | ✅ | `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, `useNavigate`, custom hook `useAppContext` |
| Backend/API real (+1 ponto extra) | ✅ | Node.js + Express + SQLite no Render |
| Deploy | ✅ | Netlify (frontend) + Render (backend) |
| README com instruções | ✅ | `README.md` completo na raiz |
| Identificação dos membros | ✅ | Tabela de integrantes no README |
