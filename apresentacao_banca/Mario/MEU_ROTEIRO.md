# 👤 Integrante 5 — Mario
## Componentização Visual, Renderização de Dados e Camada de Serviço HTTP

---

## 📋 Cabeçalho de Identificação

- **Integrante:** 5 de 5 — Fecha a apresentação
- **Tempo Estimado de Fala:** 3 minutos
- **Componentes sob sua responsabilidade:**
  - `src/components/HeroBanner.tsx` — Banner de destaque da Home
  - `src/components/PratoCard.tsx` — Card individual de cada prato
  - `src/components/PratoGrid.tsx` — Grade de cards (componente intermediário)
  - `src/services/api.ts` — Camada de serviço HTTP (toda comunicação com o backend)
- **De quem você recebe a palavra:** Marcos Aurelio — *que acabou de mostrar o `AppContext`, `Login.tsx` e `LoginForm.tsx`*
- **Para quem você passa a palavra:** Ninguém — você encerra a apresentação

---

## 🎤 Roteiro de Fala Completo

### Abertura / Transição
> "Obrigado, Marcos. Meu nome é Mario e vou fechar a apresentação mostrando dois aspectos complementares: como os pratos são exibidos visualmente para o usuário, e como toda a comunicação entre o frontend e o backend é estruturada. Enquanto o Marcos mostrou onde os dados ficam guardados, eu vou mostrar como eles chegam da API e como são renderizados na tela."

### Explicação do Componente 1 — `HeroBanner.tsx` e `PratoCard.tsx`
> "Começo pelos componentes de exibição. O `HeroBanner` é o banner de destaque da página Home. Ele recebe uma prop chamada `pratoDestaque` com um `?` — o ponto de interrogação no TypeScript indica que a prop é opcional. Isso é necessário porque quando a página carrega, os pratos ainda estão sendo buscados da API — o `pratosLoading` está `true` e `pratos` é um array vazio, então `pratos[0]` seria `undefined`. O `HeroBanner` trata esse caso e exibe um placeholder enquanto os dados não chegaram.
>
> O `PratoCard` é o coração visual da aplicação — é o componente que o usuário mais vê e interage. Ele recebe quatro props tipadas: `prato` do tipo `Prato`, `isFavorite` do tipo `boolean`, `onToggleFavorite` que é uma função que recebe o ID do prato, e `onViewDetails` que recebe o objeto prato completo.
>
> Reparem no botão de favorito. Ele tem `aria-pressed={isFavorite}`. Esse atributo ARIA informa ao leitor de tela se o botão está ativado ou não — para uma pessoa com deficiência visual, o leitor vai anunciar 'Adicionar aos favoritos, não pressionado' ou 'Remover dos favoritos, pressionado'. O `aria-label` também é dinâmico: `isFavorite ? 'Remover ${prato.nome} dos favoritos' : 'Adicionar ${prato.nome} aos favoritos'`.
>
> A imagem usa `loading='lazy'` — isso é uma otimização de performance nativa do browser. Imagens fora da área visível não são baixadas até o usuário rolar a tela até elas. Com 10 pratos no cardápio, sem lazy loading todas as imagens seriam baixadas ao mesmo tempo na primeira carga.
>
> O `PratoCard` também tem renderização condicional para a fonte da imagem: se `prato.fonteImagem` existe, renderiza um `<a>` com link externo para o Wikimedia Commons, por exemplo. Se não existe, renderiza um `<span>` simples. Isso porque alguns pratos têm imagens de domínio público com atribuição obrigatória."

### Explicação do Componente 2 — `services/api.ts`
> "O segundo arquivo é o `services/api.ts`. Ele é a camada de serviço — um padrão arquitetural que centraliza toda a comunicação HTTP em um único lugar. Nenhum componente do projeto faz `fetch` diretamente. Quando precisam de dados, chamam uma função deste arquivo.
>
> A primeira coisa que chama atenção é a URL base: `const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'`. O `import.meta.env.VITE_API_URL` é uma variável de ambiente do Vite. Localmente vale `localhost:3001`. Na Netlify, configuramos a variável `VITE_API_URL` como `https://cardapio-api-8p32.onrender.com`. O operador `??` é o nullish coalescing — se a variável não estiver definida, cai no fallback `localhost:3001`. Zero URL hardcoded no código.
>
> O arquivo tem cinco funções. `buscarPratos` faz `GET /api/pratos` e verifica `response.ok` — se a resposta não for 2xx, lança um `Error` com o status HTTP. `enviarContato` faz `POST /api/contatos` com body em JSON. Se der erro, tenta parsear o body da resposta para pegar a mensagem de erro da API — `body.error` — ou usa um fallback genérico. `loginAdmin` faz `POST /api/auth/login` e retorna o `token` e o objeto `admin`. `buscarContatos` passa o token JWT no header `Authorization: Bearer ${token}` e monta os query params com `URLSearchParams`. E `marcarContatoLido` faz um `PATCH` para `/api/contatos/:id/lido`.
>
> Essa separação é o princípio de Separação de Responsabilidades — os componentes cuidam da UI, o `services/api.ts` cuida do HTTP."

### Encerramento da Apresentação
> "Para encerrar: o `PratoCard` e `HeroBanner` demonstram componentização, props tipadas, acessibilidade com `aria-pressed` e otimização com `loading='lazy'`. O `services/api.ts` demonstra a camada de serviço com `async/await`, variáveis de ambiente, tratamento de erros HTTP e uso de `URLSearchParams`.
>
> Em resumo, nosso projeto Cardapiaui cobre todos os requisitos do trabalho: TypeScript em todo o projeto, 13 componentes funcionais, 7 páginas distintas, mais de 8 hooks diferentes — `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, `useNavigate` e o custom hook `useAppContext` — além da integração com backend próprio em Node.js, que nos dá o ponto extra. Obrigado."

---

## 📚 Ficha Técnica Detalhada

### Componente: `src/components/HeroBanner.tsx`

**O que faz na prática:**
Banner de destaque na página Home. Exibe o primeiro prato do cardápio como chamada visual — imagem, nome e tempo de preparo. Se os pratos ainda estão carregando, exibe um estado de placeholder.

**Raio-X do Código:**

- **Entradas (Props — interface `HeroBannerProps`):**
  - `pratoDestaque?: Prato` — o `?` indica prop opcional; pode ser `undefined`

- **Processamento Interno:**
  - Nenhum estado, nenhum efeito — componente presentacional
  - Renderização condicional baseada em `pratoDestaque`: se existe, exibe imagem e dados; se `undefined`, exibe placeholder

- **Saída:** `<section class="hero">` com imagem do prato destaque, nome, categoria e tempo de preparo — ou estado de carregamento

**Conceitos Acadêmicos:**
- *Props Opcionais no TypeScript*: `?` indica que o valor pode ser `undefined` e obriga o tratamento do caso nulo
- *Renderização Condicional*: `pratoDestaque ? <conteúdo real> : <placeholder>`
- *Componente Presentacional*: sem estado, sem efeito — só apresenta dados

---

### Componente: `src/components/PratoCard.tsx`

**O que faz na prática:**
Card individual de um prato. Exibe imagem, categoria, tempo de preparo, nome, descrição, crédito da foto e dois botões de ação: favoritar e ver detalhes. É renderizado N vezes pelo `PratoGrid`.

**Raio-X do Código:**

- **Entradas (Props — interface `PratoCardProps`):**
  - `prato: Prato` — objeto completo do prato
  - `isFavorite: boolean` — se este prato está favoritado
  - `onToggleFavorite: (pratoId: string) => void` — callback para favoritar/desfavoritar
  - `onViewDetails: (prato: Prato) => void` — callback para abrir o modal de detalhes

- **Processamento Interno:**
  - Sem estado, sem efeito — 100% controlado pelo pai
  - `onClick={() => onToggleFavorite(prato.id)}` — passa o ID para o `toggleFavorite` do contexto (via `PratoGrid` → `Cardapio.tsx` → `AppContext`)
  - `onClick={() => onViewDetails(prato)}` — passa o objeto completo para `setPratoAtivo` no pai, que monta o `PratoModal`
  - `isFavorite ? 'is-favorite' : ''` — classe CSS condicional no botão de coração
  - `Heart fill={isFavorite ? 'currentColor' : 'none'}` — coração preenchido se favoritado
  - `loading="lazy"` — carregamento lazy da imagem
  - `prato.fonteImagem ? <a href={fonteImagem}> : <span>` — link externo se houver fonte da imagem

- **Saída:** `<article class="dish-card">` com imagem, badge de categoria, botão de favorito, dados do prato e dois botões de ação

**Conceitos Acadêmicos:**
- *Componentização e Reuso*: um componente, N instâncias com dados diferentes
- *Props como Contrato*: `PratoCardProps` define exatamente o que o componente precisa
- *Callback Props*: `onToggleFavorite` e `onViewDetails` invertem o controle — o pai decide o que acontece
- *Acessibilidade*: `aria-pressed`, `aria-label` dinâmico com nome do prato
- *Otimização de Performance*: `loading="lazy"` evita download de imagens fora do viewport

---

### Componente: `src/components/PratoGrid.tsx`

**O que faz na prática:**
Grade responsiva de cards. Recebe um array de pratos e renderiza um `PratoCard` para cada um, passando as props necessárias.

**Raio-X do Código:**

- **Entradas (Props — interface `PratoGridProps`):**
  - `pratos: Prato[]` — array de pratos filtrados
  - `favorites: string[]` — IDs favoritados
  - `onToggleFavorite: (pratoId: string) => void`
  - `onViewDetails: (prato: Prato) => void`

- **Processamento Interno:**
  - `pratos.map(prato => <PratoCard key={prato.id} prato={prato} isFavorite={favorites.includes(prato.id)} ...>)`
  - `favorites.includes(prato.id)` — computa `isFavorite` para cada card

- **Saída:** `<ul>` com um `<li>` / `PratoCard` por prato

**Conceitos Acadêmicos:**
- *Renderização de Listas*: `.map()` com `key` única para reconciliação eficiente do Virtual DOM
- *Composição de Componentes*: `PratoGrid` compõe múltiplos `PratoCard`

---

### Componente: `src/services/api.ts`

**O que faz na prática:**
Camada de serviço HTTP. Centraliza todas as chamadas `fetch` para o backend. Abstrai URLs, headers e tratamento de erros. Nenhum componente faz `fetch` diretamente — todos chamam funções deste arquivo.

**Raio-X do Código:**

- **Entradas:** nenhuma — é um módulo de funções exportadas
- **Constante central:** `const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'`

- **Funções Exportadas:**

  **`buscarPratos(): Promise<Prato[]>`**
  - `fetch(${BASE_URL}/api/pratos)` — GET sem autenticação
  - `if (!response.ok) throw new Error(...)` — lança erro em 4xx/5xx
  - `return response.json() as Promise<Prato[]>` — retorno tipado

  **`enviarContato(nome, email, mensagem): Promise<void>`**
  - `fetch(${BASE_URL}/api/contatos, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({nome, email, mensagem}) })`
  - Erro: tenta parsear `body.error` da resposta; fallback para mensagem genérica

  **`loginAdmin(email, senha): Promise<{ token: string; admin: Admin }>`**
  - `fetch(/api/auth/login, { method: 'POST', body: JSON.stringify({ email, senha }) })`
  - Retorna `{ token, admin }` — token salvo pelo `AppContext` no `localStorage`

  **`buscarContatos(token, pagina, apenasNaoLidos): Promise<ContatosPaginados>`**
  - Header: `Authorization: Bearer ${token}`
  - Query params via `URLSearchParams({ page, naoLidos })`
  - Retorna `{ data: Contato[], paginacao: { total, pagina, limite, totalPaginas } }`

  **`marcarContatoLido(token, id, lido): Promise<void>`**
  - `PATCH /api/contatos/${id}/lido` com `{ lido }` no body
  - Header: `Authorization: Bearer ${token}`

- **Saída:** Promises com dados tipados ou erros descritivos

**Conceitos Acadêmicos:**
- *Service Layer / Camada de Serviço*: separação entre lógica de UI e comunicação com API
- *Separação de Responsabilidades*: componentes não sabem como os dados chegam
- *Programação Assíncrona (async/await)*: operações de I/O não bloqueantes
- *Variável de Ambiente*: `import.meta.env.VITE_API_URL` — configuração por ambiente sem alterar código
- *Tratamento de Erros HTTP*: verificação explícita de `response.ok` + parsing do erro da API
- *Tipagem de Retorno*: `as Promise<Prato[]>` — TypeScript garante tipo na resposta do `fetch`
- *URLSearchParams*: construção segura de query strings sem concatenação manual

---

## 🛡️ Simulado de Perguntas da Banca

**P1: Por que vocês não usaram uma biblioteca como Axios em vez do `fetch` nativo?**

> **R:** O `fetch` nativo do browser é suficiente para o escopo do projeto e não adiciona dependência externa. As duas principais vantagens do Axios seriam: conversão automática do JSON (sem `response.json()`) e lançamento automático de erro em respostas 4xx/5xx (sem verificar `response.ok`). Nós implementamos ambos manualmente no `services/api.ts` — `response.json()` nos retornos e `if (!response.ok) throw new Error(...)` em todas as funções. Para um projeto acadêmico, fazer isso explicitamente demonstra melhor o entendimento do protocolo HTTP e do funcionamento real do `fetch`, em vez de delegar para uma abstração.

**P2: O que acontece se `VITE_API_URL` não for configurada na Netlify?**

> **R:** O código usa o operador `??` — nullish coalescing. `import.meta.env.VITE_API_URL ?? 'http://localhost:3001'` significa: se `VITE_API_URL` for `undefined` ou `null`, usa `'http://localhost:3001'`. Na Netlify, configuramos a variável em Site settings → Environment variables com o valor `https://cardapio-api-8p32.onrender.com`. O Vite injeta essa variável em tempo de build — no bundle final, `import.meta.env.VITE_API_URL` já está substituído pelo valor real. Se a variável não fosse configurada, o frontend em produção tentaria chamar `localhost:3001` e todas as requisições falhariam com erro de rede, pois não existe servidor em localhost na Netlify.

**P3: Por que o `PratoCard` recebe `onToggleFavorite` e `onViewDetails` como props em vez de acessar o contexto diretamente com `useAppContext`?**

> **R:** Por design intencional de acoplamento mínimo. Se o `PratoCard` acessasse `useAppContext()` diretamente, ele estaria acoplado ao contexto global do projeto — não poderia ser reutilizado em outro projeto sem levar o `AppContext` junto. Recebendo as funções como props, o `PratoCard` é agnóstico à origem dos dados: ele não sabe se o `toggleFavorite` vem do contexto, de um estado local, ou de uma store Redux. Essa abordagem é chamada de *Inversão de Controle* — o componente pai decide o comportamento, o filho só executa. É um padrão de design que maximiza o reuso e a testabilidade do componente.
