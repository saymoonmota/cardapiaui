# 👤 Integrante 2 — Francisco Vitor Santos Lima
## Interfaces Principais, Acessibilidade e Filtragem

---

## 📋 Cabeçalho de Identificação

- **Integrante:** 2 de 5
- **Tempo Estimado de Fala:** 3 minutos
- **Componentes sob sua responsabilidade:**
  - `src/components/PratoModal.tsx` — Modal de detalhes do prato
  - `src/components/SearchFilter.tsx` — Busca e filtro por categoria
- **De quem você recebe a palavra:** Saymoon Wanderson — *que acabou de mostrar a arquitetura geral, `App.tsx` e `Navbar`*
- **Para quem você passa a palavra:** Antonio Jose Barros Silva Filho — *"Com as interfaces de exibição explicadas, o AJ vai mostrar como o usuário interage com o sistema — especialmente como os dados entram pela camada de formulários."*

---

## 🎤 Roteiro de Fala Completo

### Abertura / Transição
> "Obrigado, Saymoon. Meu nome é Francisco Vitor e, dando continuidade ao fluxo que ele apresentou, vou mostrar as interfaces principais de interação com os pratos. Enquanto o Saymoon mostrou a estrutura que sustenta a aplicação, eu vou mostrar dois componentes que o usuário usa diretamente: o modal com os detalhes completos de um prato e o sistema de busca e filtro do cardápio."

### Explicação do Componente 1 — `PratoModal.tsx`
> "O `PratoModal` é o componente que aparece quando o usuário clica em 'Ver ingredientes' em um card. Ele exibe todos os detalhes de um prato: ingredientes, modo de preparo, acompanhamentos, tempo de preparo e crédito da foto. Ele recebe duas props: `prato`, do tipo `Prato` — que é uma interface TypeScript com todos os campos do prato — e `onClose`, que é uma função que o componente pai passa para fechar o modal.
>
> O que torna este componente tecnicamente mais sofisticado é o seu `useEffect`. Ele faz três coisas simultâneas ao ser montado. Primeiro: bloqueia o scroll da página colocando `document.body.style.overflow = 'hidden'` — isso impede que o usuário role a página por baixo do modal. Segundo: adiciona um listener de teclado na janela inteira. Dentro do `handleKeyDown`, se o usuário pressionar `Escape`, o modal fecha. Se pressionar `Tab`, implementamos o que se chama de *focus trap* — o foco fica circulando apenas dentro do modal. Para isso, o código usa `dialogRef.current.querySelectorAll` para encontrar todos os elementos focáveis dentro do modal, pega o primeiro e o último, e quando o foco chega no último e o usuário pressiona Tab, força o foco de volta ao primeiro.
>
> Terceiro, e muito importante do ponto de vista acadêmico: o `useEffect` retorna uma função de cleanup. Essa função é executada automaticamente quando o componente é desmontado — ou seja, quando o modal fecha. Ela remove o listener de teclado, restaura o `overflow` do body e devolve o foco ao elemento que estava ativo antes do modal abrir, que foi salvo na variável `previousFocus`.
>
> Usamos ainda dois `useRef`: `dialogRef` aponta para o `<section>` do modal — necessário para o querySelectorAll do focus trap — e `closeButtonRef` aponta para o botão de fechar, para que o foco vá direto para ele quando o modal abre.
>
> Tudo isso são requisitos de acessibilidade para modais: o usuário de teclado não pode ficar preso fora do modal nem perder o contexto depois que fecha."

### Explicação do Componente 2 — `SearchFilter.tsx`
> "O segundo componente é o `SearchFilter`, que é o sistema de busca e filtro do cardápio. E ele é um ótimo exemplo de um conceito importante: o *componente controlado* e o padrão *Lifting State Up*.
>
> Reparem: o `SearchFilter` não tem nenhum `useState` internamente. Zero estado próprio. Ele recebe quatro props: `query` e `categoria` como valores, e `onQueryChange` e `onCategoriaChange` como callbacks. Isso é o que chamamos de componente totalmente controlado pelo pai.
>
> O padrão *Lifting State Up* diz que quando dois componentes precisam dos mesmos dados, o estado deve subir para o ancestral comum. O `Cardapio.tsx` é dono dos estados `query` e `categoria`. O `SearchFilter` só exibe esses valores e notifica quando mudam. A lógica de filtragem real fica no `useMemo` dentro do `Cardapio.tsx` — o Mayson de Tacio vai explicar como o `PratoGrid` recebe esses dados filtrados.
>
> A prop `categoria` tem o tipo `CategoriaCardapio | 'Todos'` — um union type do TypeScript. Isso significa que o TypeScript não deixa passar nenhum valor inválido. Se alguém tentasse passar `categoria='Frutos do Mar'`, o compilador rejeitaria em tempo de build, antes de o código rodar em produção."

### Fechamento e Passagem de Bastão
> "Para resumir minha parte: o `PratoModal` demonstra uso avançado de `useEffect` com cleanup, `useRef` para manipulação do DOM e implementação real de acessibilidade. O `SearchFilter` demonstra o padrão de componente controlado e Lifting State Up. Passo a palavra para o AJ, que vai mostrar como os dados inseridos pelo usuário nos formulários são capturados e enviados para a API."

---

## 📚 Ficha Técnica Detalhada

### Componente: `src/components/PratoModal.tsx`

**O que faz na prática:**
Modal (janela flutuante) que exibe todos os detalhes de um prato sem sair da página. Implementa acessibilidade completa: foco automático, focus trap, fechamento por teclado e restauração de foco.

**Raio-X do Código:**

- **Entradas (Props — interface `PratoModalProps`):**
  - `prato: Prato` — objeto completo com todos os campos do prato
  - `onClose: () => void` — função para fechar o modal (controlada pelo pai)

- **Processamento Interno:**
  - `dialogRef = useRef<HTMLElement>(null)` — referência ao `<section>` do modal para buscar elementos focáveis via `querySelectorAll`
  - `closeButtonRef = useRef<HTMLButtonElement>(null)` — referência ao botão fechar para foco automático na abertura
  - **`useEffect` (único, executado na montagem):**
    - `const previousFocus = document.activeElement` — salva o elemento com foco antes do modal abrir
    - `const previousOverflow = document.body.style.overflow` — salva o overflow atual
    - **`handleKeyDown(event)`:**
      - `event.key === 'Escape'` → chama `onClose()`
      - `event.key === 'Tab'` → focus trap: coleta todos os focáveis com `querySelectorAll('a[href], button:not([disabled]), ...')`, detecta se está no primeiro ou último e inverte a direção
    - `document.addEventListener('keydown', handleKeyDown)` — ativa o listener
    - `document.body.style.overflow = 'hidden'` — bloqueia scroll da página
    - `closeButtonRef.current?.focus()` — foca o botão fechar ao abrir
    - **Função de cleanup (retorno do useEffect):**
      - `document.removeEventListener('keydown', handleKeyDown)`
      - `document.body.style.overflow = previousOverflow`
      - `previousFocus?.focus()` — devolve foco ao elemento anterior
  - `role="dialog"`, `aria-modal="true"`, `aria-labelledby="prato-modal-title"` — atributos ARIA obrigatórios para modais acessíveis
  - `onMouseDown` no backdrop — fecha o modal ao clicar fora (`event.target === event.currentTarget`)
  - Renderização condicional de `fonteImagem`: `prato.fonteImagem ? <a href={...}> : <span>` — se há fonte, cria link externo; senão, texto simples

- **Saída:** `<div class="dialog-backdrop">` com `<section class="detail-dialog">` contendo imagem, categoria, tempo, título, descrição, listas de ingredientes e acompanhamentos, modo de preparo e crédito da foto

**Conceitos Acadêmicos:**
- *useEffect com Cleanup*: evita memory leak removendo listeners ao desmontar
- *useRef para acesso ao DOM*: acessa elementos reais do DOM sem re-render
- *Acessibilidade (a11y) — WCAG*: `role="dialog"`, `aria-modal`, focus trap, foco automático
- *Renderização Condicional*: decide entre `<a>` e `<span>` baseado em dado opcional

---

### Componente: `src/components/SearchFilter.tsx`

**O que faz na prática:**
Interface de busca por texto e filtro por categoria do cardápio. Não tem estado próprio — é um componente puramente controlado pelo pai (`Cardapio.tsx`).

**Raio-X do Código:**

- **Entradas (Props — interface `SearchFilterProps`):**
  - `query: string` — valor atual do campo de busca
  - `categoria: CategoriaCardapio | 'Todos'` — categoria selecionada
  - `onQueryChange: (query: string) => void` — callback chamado a cada tecla no input
  - `onCategoriaChange: (categoria: CategoriaCardapio | 'Todos') => void` — callback chamado ao clicar num filtro

- **Processamento Interno:**
  - **Nenhum `useState`, nenhum `useEffect`** — componente 100% controlado
  - Array de categorias: `['Todos', 'Aves', 'Carnes', 'Peixes', 'Bebidas', 'Sobremesas', 'Petiscos']`
  - `<input value={query} onChange={(e) => onQueryChange(e.target.value)}>` — cada tecla dispara o callback
  - `categorias.map(cat => <button onClick={() => onCategoriaChange(cat)}>)` — renderiza botões
  - `categoria === cat ? 'ativo' : ''` — destaque visual no filtro selecionado

- **Saída:** barra de busca + linha de botões de categoria com destaque no selecionado

**Conceitos Acadêmicos:**
- *Controlled Component*: `value` sempre vem de fora, `onChange` notifica o pai — sem estado próprio
- *Lifting State Up*: estado `query` e `categoria` vivem no `Cardapio.tsx`, não aqui
- *Separação de Responsabilidades*: `SearchFilter` exibe a UI de filtro; `Cardapio.tsx` executa a filtragem
- *Union Type TypeScript*: `CategoriaCardapio | 'Todos'` impede valores inválidos em compile time
- *Componente Reutilizável*: poderia ser usado em qualquer lista filtrável sem mudar uma linha

---

## 🛡️ Simulado de Perguntas da Banca

**P1: O que acontece se o usuário pressionar Tab infinitamente dentro do modal? O foco sai?**

> **R:** Não. O `handleKeyDown` dentro do `useEffect` implementa o *focus trap*. Ele usa `dialogRef.current.querySelectorAll` com um seletor que captura todos os elementos interativos: `a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])`. Pega o `first` e o `last` desse NodeList. Quando o `document.activeElement` é o `last` e o usuário pressiona `Tab` (sem Shift), `event.preventDefault()` bloqueia o comportamento padrão e `first.focus()` move o foco de volta para o início. Com `Shift+Tab` no primeiro elemento, vai para o último. O foco circula indefinidamente dentro do modal.

**P2: Por que o `SearchFilter` não tem estado próprio para a busca? Não seria mais simples o componente gerenciar seu próprio `query`?**

> **R:** Se o `SearchFilter` tivesse seu próprio `useState` para `query`, o `Cardapio.tsx` precisaria de algum mecanismo para "ouvir" esse valor — via callback ou ref — para executar a filtragem. Isso cria um fluxo de dados em duas direções, que é mais difícil de rastrear e manter. Com *Lifting State Up*, o estado vive no `Cardapio.tsx`, que é o único componente que precisa do valor para executar o `useMemo` de filtragem. O `SearchFilter` vira um componente mais simples, sem lógica de negócio, e poderia ser reaproveitado em qualquer outra lista sem trazer lógica embutida junto.

**P3: Por que o `useEffect` do `PratoModal` não tem uma lista de dependências com `onClose`?**

> **R:** Olhando o código, o array de dependências é `[onClose]`. Isso é correto — o `useEffect` precisa de `onClose` na lista porque `handleKeyDown` a referencia. Se `onClose` mudasse entre renders (o que poderia acontecer se não fosse memoizado pelo pai com `useCallback`), o efeito seria reexecutado, removendo o listener antigo e adicionando um novo com a referência atualizada. No `Cardapio.tsx` e `Home.tsx`, o `onClose` é declarado com `useCallback(() => setPratoAtivo(null), [])`, garantindo referência estável e evitando re-execuções desnecessárias do `useEffect`.
