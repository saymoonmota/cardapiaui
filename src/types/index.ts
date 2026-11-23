import type { ReactNode, RefObject } from 'react'

export type CategoriaCardapio = 'Aves' | 'Carnes' | 'Peixes' | 'Bebidas' | 'Sobremesas' | 'Petiscos'

export interface Prato {
  id: string
  nome: string
  categoria: CategoriaCardapio
  tempoPreparoMinutos: number
  descricao: string
  imagem: string
  imagemAlt: string
  avisoImagem: string
  creditoImagem: string
  fonteImagem?: string
  ingredientes: string[]
  modoPreparo: string
  acompanhamentos: string[]
}

export interface User {
  nome: string
  email: string
}

export interface TeamMember {
  nome: string
  componentes: [string, string]
  papel: string
}

export interface NavbarProps {
  user: User | null
  favoritesCount: number
  onLogout: () => void
}

export interface FooterProps {
  curso?: string
  cidade?: string
}

export interface HeroBannerProps {
  pratoDestaque?: Prato
}

export interface PratoCardProps {
  prato: Prato
  isFavorite: boolean
  onToggleFavorite: (pratoId: string) => void
  onViewDetails: (prato: Prato) => void
}

export interface PratoModalProps {
  prato: Prato
  onClose: () => void
}

export interface SearchFilterProps {
  query: string
  categoria: CategoriaCardapio | 'Todos'
  onQueryChange: (query: string) => void
  onCategoriaChange: (categoria: CategoriaCardapio | 'Todos') => void
}

export interface LoginFormProps {
  onLogin: (user: User) => void
  nameInputRef: RefObject<HTMLInputElement | null>
}

export interface UserBadgeProps {
  user: User
  onLogout: () => void
}

export interface TeamMemberCardProps {
  member: TeamMember
}

export interface ContactFormProps {
  onSubmitSuggestion: (name: string, email: string, suggestion: string) => void
}

export interface AppContextValue {
  user: User | null
  favorites: string[]
  setUser: (user: User | null) => void
  toggleFavorite: (pratoId: string) => void
}

export interface AppProviderProps {
  children: ReactNode
}

export interface PratoGridProps {
  pratos: Prato[]
  favorites: string[]
  onToggleFavorite: (pratoId: string) => void
  onViewDetails: (prato: Prato) => void
}

export interface FeedbackMessageProps {
  message: string
  kind: 'success' | 'error'
}
