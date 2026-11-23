import { useContext } from 'react'
import { AppContext } from './appContextInstance'
import type { AppContextValue } from '../types'

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de AppProvider.')
  }
  return context
}
