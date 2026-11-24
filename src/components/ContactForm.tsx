import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import type { ContactFormProps } from '../types'

export default function ContactForm({ onSubmitSuggestion }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    try {
      await onSubmitSuggestion(name.trim(), email.trim(), suggestion.trim())
      setName('')
      setEmail('')
      setSuggestion('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="suggestion-form" onSubmit={handleSubmit}>
      <label>
        Seu nome
        <input name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} placeholder="Como podemos te chamar?" disabled={submitting} />
      </label>
      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="voce@email.com" disabled={submitting} />
      </label>
      <label>
        Receita ou sugestão
        <textarea name="suggestion" rows={5} value={suggestion} onChange={(event) => setSuggestion(event.target.value)} required minLength={10} placeholder="Conte uma receita caseira ou uma lembrança à mesa..." disabled={submitting} />
      </label>
      <button className="button button-primary" type="submit" disabled={submitting}>
        {submitting ? 'Enviando...' : <> Enviar sugestão <Send size={16} aria-hidden="true" /> </>}
      </button>
      <p className="form-note">Sua sugestão será enviada e guardada pela nossa equipe.</p>
    </form>
  )
}
