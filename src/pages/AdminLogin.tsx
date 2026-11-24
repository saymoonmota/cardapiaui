import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAppContext } from '../context/useAppContext'
import { loginAdmin } from '../services/api'
import FeedbackMessage from '../components/FeedbackMessage'

export default function AdminLogin() {
  const { setAdmin } = useAppContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, admin } = await loginAdmin(email.trim(), senha)
      setAdmin(admin, token)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="section-shell narrow-page">
      <section className="form-page-card">
        <p className="eyebrow"><LogIn size={15} aria-hidden="true" /> Área administrativa</p>
        <h1>Acesso <em>restrito.</em></h1>
        <p>Somente administradores podem acessar esta área.</p>
        {error && <FeedbackMessage message={error} kind="error" />}
        <form className="suggestion-form" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@cardapiaui.com"
              autoComplete="email"
              disabled={loading}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </label>
          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : <> Entrar <LogIn size={16} aria-hidden="true" /> </>}
          </button>
        </form>
      </section>
    </main>
  )
}
