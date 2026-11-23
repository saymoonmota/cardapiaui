import { useCallback, useMemo, useState } from 'react'
import type { AppProviderProps, User } from '../types'
import { AppContext } from './appContextInstance'

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = useCallback((pratoId: string) => {
    setFavorites((current) =>
      current.includes(pratoId)
        ? current.filter((favoriteId) => favoriteId !== pratoId)
        : [...current, pratoId],
    )
  }, [])

  const value = useMemo(
    () => ({ user, favorites, setUser, toggleFavorite }),
    [user, favorites, toggleFavorite],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
