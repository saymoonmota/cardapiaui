import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Admin, AppProviderProps, Prato, User } from '../types'
import { buscarPratos } from '../services/api'
import { AppContext } from './appContextInstance'

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [admin, setAdminState] = useState<Admin | null>(null)
  const [adminToken, setAdminToken] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [pratos, setPratos] = useState<Prato[]>([])
  const [pratosLoading, setPratosLoading] = useState(true)
  const [pratosError, setPratosError] = useState('')

  useEffect(() => {
    // Restaura sessão admin do localStorage e valida o token
    const savedToken = localStorage.getItem('adminToken')
    const savedAdmin = localStorage.getItem('adminData')
    if (!savedToken || !savedAdmin) return

    try {
      setAdminState(JSON.parse(savedAdmin) as Admin)
      setAdminToken(savedToken)
    } catch {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminData')
      return
    }

    // Valida o token no servidor em background
    fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}/api/auth/me`, {
      headers: { Authorization: `Bearer ${savedToken}` },
    }).then((res) => {
      if (!res.ok) {
        // Token expirado ou inválido — limpa tudo
        setAdminState(null)
        setAdminToken(null)
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminData')
      }
    }).catch(() => {
      // Sem conexão — mantém a sessão local até o próximo request falhar
    })
  }, [])

  useEffect(() => {
    let active = true
    buscarPratos()
      .then((data) => { if (active) setPratos(data) })
      .catch(() => { if (active) setPratosError('Não foi possível carregar o cardápio. Atualize a página para tentar novamente.') })
      .finally(() => { if (active) setPratosLoading(false) })
    return () => { active = false }
  }, [])

  const setAdmin = useCallback((newAdmin: Admin | null, token: string | null) => {
    setAdminState(newAdmin)
    setAdminToken(token)
    if (newAdmin && token) {
      localStorage.setItem('adminToken', token)
      localStorage.setItem('adminData', JSON.stringify(newAdmin))
    } else {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminData')
    }
  }, [])

  const toggleFavorite = useCallback((pratoId: string) => {
    setFavorites((current) =>
      current.includes(pratoId)
        ? current.filter((id) => id !== pratoId)
        : [...current, pratoId],
    )
  }, [])

  const value = useMemo(
    () => ({ user, admin, adminToken, favorites, pratos, pratosLoading, pratosError, setUser, setAdmin, toggleFavorite }),
    [user, admin, adminToken, favorites, pratos, pratosLoading, pratosError, setAdmin, toggleFavorite],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
