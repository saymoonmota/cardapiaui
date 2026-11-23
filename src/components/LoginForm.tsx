import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import type { LoginFormProps } from '../types'

export default function LoginForm({ onLogin, nameInputRef }: LoginFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onLogin({ nome: name.trim(), email: email.trim() })
  }

  return (
    <form className="suggestion-form" onSubmit={handleSubmit}>
      <label>
        Seu nome
        <input
          ref={nameInputRef}
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          minLength={2}
          placeholder="Como podemos te chamar?"
        />
      </label>
      <label>
        E-mail
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="voce@email.com"
        />
      </label>
      <button className="button button-primary" type="submit">
        Entrar <ArrowRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note">Acesso demonstrativo: seus dados ficam apenas nesta sessão do navegador.</p>
    </form>
  )
}
