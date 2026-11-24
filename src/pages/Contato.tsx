import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import FeedbackMessage from '../components/FeedbackMessage'
import { enviarContato } from '../services/api'

export default function Contato() {
  const [feedback, setFeedback] = useState('')
  const [feedbackKind, setFeedbackKind] = useState<'success' | 'error'>('success')

  async function handleSuggestion(name: string, email: string, suggestion: string) {
    if (!name || !email || !suggestion) {
      setFeedbackKind('error')
      setFeedback('Confira os campos do formulário antes de enviar.')
      return
    }

    try {
      await enviarContato(name, email, suggestion)
      setFeedbackKind('success')
      setFeedback(`Obrigado, ${name}! Sua sugestão foi enviada com sucesso.`)
    } catch (err) {
      setFeedbackKind('error')
      setFeedback(err instanceof Error ? err.message : 'Não foi possível enviar. Tente novamente.')
    }
  }

  return (
    <>
      <section className="page-banner">
        <div className="section-shell page-banner-inner">
          <p className="eyebrow"><MessageCircle size={15} aria-hidden="true" /> Memória compartilhada</p>
          <h1>Conte sua <em>história.</em></h1>
          <p>Conhece uma receita caseira piauiense? Queremos ouvir você.</p>
        </div>
      </section>
      <main className="section-shell contact-layout">
        <section className="stories-copy">
          <p className="eyebrow">Sugestões da comunidade</p>
          <h2>Uma receita, uma lembrança. <em>Conta pra gente.</em></h2>
          <p>Compartilhe um prato de família, um ingrediente especial ou um modo de preparo que merece ser lembrado.</p>
          <blockquote><span>"</span><p>Comida boa também é saber de onde vem e com quem se aprende.</p></blockquote>
        </section>
        <section className="suggestion-panel" aria-label="Formulário de sugestão">
          {feedback && <FeedbackMessage message={feedback} kind={feedbackKind} />}
          <ContactForm onSubmitSuggestion={handleSuggestion} />
        </section>
      </main>
    </>
  )
}
