import { useEffect, useRef } from 'react'
import { LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FeedbackMessage from '../components/FeedbackMessage'
import LoginForm from '../components/LoginForm'
import { useAppContext } from '../context/useAppContext'
import type { User } from '../types'

export default function Login() {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  function handleLogin(userData: User) {
    setUser(userData)
    navigate('/')
  }

  return (
    <main className="section-shell narrow-page">
      <section className="form-page-card">
        <p className="eyebrow"><LogIn size={15} aria-hidden="true" /> Área do visitante</p>
        <h1>Entre para <em>participar.</em></h1>
        <p>Identifique-se para salvar seus pratos favoritos durante esta sessão.</p>
        {user && <FeedbackMessage message={`Você está conectado como ${user.nome}.`} kind="success" />}
        <LoginForm onLogin={handleLogin} nameInputRef={nameInputRef} />
      </section>
    </main>
  )
}
