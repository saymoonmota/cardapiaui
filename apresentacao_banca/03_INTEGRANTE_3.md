# 👤 Integrante 3 — AJ Barros
## Formulários Assíncronos, Captura de Dados e Feedback Visual

---

## 📋 Cabeçalho de Identificação

- **Integrante:** 3 de 5
- **Tempo Estimado de Fala:** 3 minutos
- **Componentes sob sua responsabilidade:**
  - `src/components/ContactForm.tsx` — Formulário assíncrono de sugestões
  - `src/components/FeedbackMessage.tsx` — Componente de retorno visual
  - *(Contexto de suporte)* `src/pages/Contato.tsx` — página que orquestra os dois acima
- **De quem você recebe a palavra:** Francisco Vitor — *que acabou de mostrar o `PratoModal` e o `SearchFilter`*
- **Para quem você passa a palavra:** Marcos Aurelio — *"O AJ mostrou como os dados são capturados. O Marcos vai explicar onde esses dados são armazenados e como o estado é compartilhado em toda a aplicação."*

---

## 🎤 Roteiro de Fala Completo

### Abertura / Transição
> "Obrigado, Francisco. Meu nome é AJ Barros e vou dar continuidade mostrando como os dados inseridos pelo usuário são capturados, validados e enviados para a API. Enquanto o Francisco mostrou como os dados dos pratos são exibidos, eu vou mostrar o caminho inverso: como o usuário envia informações para o sistema."

### Explicação do Componente 1 — `ContactForm.tsx`
> "O `ContactForm` é o formulário da página de Contato, onde o usuário pode sugerir receitas caseiras. E ele é um bom exemplo de formulário controlado com comunicação assíncrona real.
>
> Primeiro, os estados. O componente tem quatro `useState`: `name`, `email` e `suggestion` para os três campos do formulário, e um quarto — `submitting` — que é o estado de controle do envio. Esse quarto estado é crucial para a experiência do usuário.
>
> O coração do componente é a função `handleSubmit`. Ela é assíncrona — declarada com `async`. O primeiro passo é `event.preventDefault()`, que impede o comportamento padrão do formulário HTML, que seria recarregar a página. Depois, `setSubmitting(true)` — isso desabilita os três campos e o botão de envio. Por que isso é importante? Para evitar que o usuário clique duas vezes e mande a mesma mensagem duas vezes para o banco de dados. É uma proteção contra duplo envio.
>
> Depois de setar `submitting`, o código faz `await onSubmitSuggestion(name.trim(), email.trim(), suggestion.trim())`. Percebam que `onSubmitSuggestion` é uma prop do tipo `(name, email, suggestion) => Promise<void>` — uma função assíncrona. O `ContactForm` não sabe o que essa função faz — ele só chama e espera. É o pai, o `Contato.tsx`, que implementa essa função chamando `enviarContato()` do `services/api.ts`, que o Mario vai explicar.
>
> Se o envio funcionar sem erros, os três campos são limpos: `setName('')`, `setEmail('')`, `setSuggestion('')`. Se der erro, o catch no `Contato.tsx` captura e exibe a mensagem. Em ambos os casos, o bloco `finally` garante que `setSubmitting(false)` sempre é chamado — o formulário volta ao estado normal independente do resultado. Esse padrão `try/await/finally` é a forma correta de lidar com loading states em JavaScript assíncrono."

### Explicação do Componente 2 — `FeedbackMessage.tsx`
> "O segundo componente é o `FeedbackMessage`. Ele é o menor do projeto em linhas de código, mas demonstra um conceito importante: o componente presentacional, também chamado de Dumb Component.
>
> Ele não tem `useState`, não tem `useEffect`, não faz nenhuma requisição. Recebe exatamente duas props: `message` do tipo `string` e `kind` do tipo `'success' | 'error'`. Esse `kind` é um union type do TypeScript — significa que o compilador não aceita nenhum outro valor. Se alguém tentasse passar `kind='warning'`, o TypeScript rejeitaria antes de compilar.
>
> Com base nesse `kind`, o componente decide três coisas: a classe CSS — verde para sucesso, vermelho para erro; o ícone — `Check` ou `CircleAlert` da biblioteca Lucide; e o atributo `role` do HTML — `alert` para erros ou `status` para sucessos.
>
> Essa distinção entre `role='alert'` e `role='status'` é acessibilidade real. Leitores de tela como o NVDA anunciam elementos com `role='alert'` imediatamente, interrompendo o que estiver lendo — porque um erro precisa de atenção urgente. Já `role='status'` é anunciado de forma não-intrusiva, quando o leitor de tela estiver disponível.
>
> O `FeedbackMessage` é usado em quatro lugares: `Contato.tsx`, `Login.tsx`, `AdminLogin.tsx` e `AdminDashboard.tsx`. Isso é o princípio de reuso na prática — um componente escrito uma vez, usado em quatro contextos diferentes."

### Fechamento e Passagem de Bastão
> "Para resumir: o `ContactForm` demonstra formulário controlado com `useState`, programação assíncrona com `async/await`, prevenção de duplo envio com estado de loading e comunicação por callback tipado. O `FeedbackMessage` demonstra componente presentacional, union types, renderização condicional e acessibilidade semântica. Passo a palavra para o Marcos, que vai explicar como o estado global é gerenciado e como o sistema de autenticação do visitante funciona."

---

## 📚 Ficha Técnica Detalhada

### Componente: `src/components/ContactForm.tsx`

**O que faz na prática:**
Formulário controlado para envio de sugestões de receitas. Captura nome, email e mensagem do usuário, controla o estado de envio para evitar submissões duplicadas e delega o envio real ao componente pai.

**Raio-X do Código:**

- **Entradas (Props — interface `ContactFormProps`):**
  - `onSubmitSuggestion: (name: string, email: string, suggestion: string) => Promise<void>` — callback assíncrono; o formulário não sabe como os dados serão enviados

- **Processamento Interno (Estados):**
  - `const [name, setName] = useState('')` — estado do campo nome
  - `const [email, setEmail] = useState('')` — estado do campo e-mail
  - `const [suggestion, setSuggestion] = useState('')` — estado da textarea
  - `const [submitting, setSubmitting] = useState(false)` — estado de loading do envio

- **Processamento Interno (Função Principal):**
  - **`async handleSubmit(event: FormEvent<HTMLFormElement>)`:**
    1. `event.preventDefault()` — bloqueia recarregamento da página
    2. `setSubmitting(true)` — desabilita campos e botão
    3. `try { await onSubmitSuggestion(name.trim(), email.trim(), suggestion.trim()) }` — chama callback do pai e aguarda
    4. `setName(''); setEmail(''); setSuggestion('')` — limpa campos (só executa se não houve erro)
    5. `finally { setSubmitting(false) }` — restaura UI em qualquer caso

- **Saída:** `<form>` com:
  - 3 campos com `value={estado}` + `onChange` + `disabled={submitting}`
  - Botão com texto condicional: `submitting ? 'Enviando...' : <> Enviar sugestão <Send /></>`
  - Validação nativa HTML: `required`, `minLength={2}` no nome, `type="email"` no email, `minLength={10}` na mensagem

**Conceitos Acadêmicos:**
- *Formulário Controlado (Controlled Component)*: estado do React é a fonte da verdade dos campos
- *Programação Assíncrona (async/await)*: aguarda a operação de I/O sem bloquear a thread
- *Padrão try/finally para Loading States*: garante restauração do estado em sucesso ou falha
- *Inversão de Controle*: o formulário não sabe como enviar — recebe a lógica via prop
- *Validação de Entrada*: primeira linha de defesa antes de qualquer requisição HTTP

---

### Componente: `src/components/FeedbackMessage.tsx`

**O que faz na prática:**
Componente de exibição de mensagens de retorno. Renderiza uma mensagem de sucesso (verde com ícone de check) ou erro (vermelho com ícone de alerta) com semântica HTML acessível.

**Raio-X do Código:**

- **Entradas (Props — interface `FeedbackMessageProps`):**
  - `message: string` — texto da mensagem a exibir
  - `kind: 'success' | 'error'` — tipo que determina visual e comportamento

- **Processamento Interno:**
  - Nenhum estado, nenhum efeito — componente puramente presentacional
  - Ternário de classe CSS: `kind === 'success' ? 'bg-piaui-verde/10 text-piaui-verde' : 'bg-red-50 text-red-900'`
  - Ternário de `role`: `kind === 'error' ? 'alert' : 'status'`
  - Ternário de ícone: `kind === 'success' ? <Check size={18} /> : <CircleAlert size={18} />`

- **Saída:** `<p role="alert|status">` com ícone Lucide + texto da mensagem

**Onde é usado no projeto:**
- `Contato.tsx` — resultado do envio da sugestão
- `Login.tsx` — aviso de que o usuário já está conectado
- `AdminLogin.tsx` — erro de credenciais inválidas
- `AdminDashboard.tsx` — erro ao carregar sugestões

**Conceitos Acadêmicos:**
- *Componente Presentacional (Dumb Component)*: sem estado, sem efeito — só recebe e renderiza
- *Union Type TypeScript*: `'success' | 'error'` garante type safety em compile time
- *Acessibilidade Semântica (ARIA)*: `role="alert"` para notificações urgentes, `role="status"` para informativas
- *Princípio DRY (Don't Repeat Yourself)*: um componente reutilizado em 4 lugares
- *Separação de Responsabilidades*: feedback visual desacoplado da lógica de negócio

---

### Contexto de Suporte: `src/pages/Contato.tsx`

Este arquivo orquestra `ContactForm` e `FeedbackMessage`. Contém a função `handleSuggestion` que é o `onSubmitSuggestion` passado para o `ContactForm`:

```typescript
async function handleSuggestion(name: string, email: string, suggestion: string) {
  if (!name || !email || !suggestion) {
    setFeedbackKind('error')
    setFeedback('Confira os campos do formulário antes de enviar.')
    return
  }
  try {
    await enviarContato(name, email, suggestion)  // chama services/api.ts
    setFeedbackKind('success')
    setFeedback(`Obrigado, ${name}! Sua sugestão foi enviada com sucesso.`)
  } catch (err) {
    setFeedbackKind('error')
    setFeedback(err instanceof Error ? err.message : 'Não foi possível enviar.')
  }
}
```

---

## 🛡️ Simulado de Perguntas da Banca

**P1: O que acontece se a API estiver fora do ar quando o usuário envia o formulário?**

> **R:** O `handleSubmit` no `ContactForm` faz `await onSubmitSuggestion(...)`. O `onSubmitSuggestion` implementado no `Contato.tsx` chama `await enviarContato()` do `services/api.ts`. Se a rede estiver indisponível, o `fetch` lança uma `TypeError: Failed to fetch`. O bloco `catch` em `Contato.tsx` captura essa exceção — `err instanceof Error` é `true`, então `err.message` contém a mensagem de erro real. O `setFeedbackKind('error')` e `setFeedback(err.message)` são chamados, exibindo o erro no `FeedbackMessage`. O bloco `finally` no `ContactForm` seta `submitting` de volta para `false`, reabilitando o formulário para o usuário tentar novamente. Os dados preenchidos não são perdidos.

**P2: Por que o `FeedbackMessage` usa `role='alert'` para erros e `role='status'` para sucessos? Qual a diferença prática?**

> **R:** São dois live regions do ARIA com comportamentos diferentes. `role='alert'` é uma live region com `aria-live='assertive'` implícito — o leitor de tela interrompe imediatamente o que está lendo e anuncia a mensagem. É usado para erros porque o usuário precisa saber agora que algo deu errado. `role='status'` tem `aria-live='polite'` implícito — o leitor de tela espera o usuário terminar o que está fazendo para então anunciar. É usado para sucessos porque é uma informação que não precisa interromper o fluxo. Essa distinção é um requisito do WCAG 2.1 para feedback de formulários.

**P3: Por que vocês usaram `name.trim()` ao chamar `onSubmitSuggestion` e não removeram os espaços diretamente no `onChange`?**

> **R:** Por design intencional. Se removêssemos os espaços no `onChange`, o usuário não conseguiria digitar um espaço entre palavras — a cada tecla de espaço, o valor seria `trim`eado e o espaço sumia. Manter o valor original no estado durante a digitação preserva a experiência do usuário. O `trim()` é aplicado apenas no momento do envio, na borda do sistema — isso é o princípio de sanitizar dados na saída, não na entrada visual. O backend em `contatos.ts` também aplica `nome.trim()` antes de salvar, criando uma segunda camada de sanitização.
