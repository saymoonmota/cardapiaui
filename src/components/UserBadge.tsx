import { LogOut, UserRound } from 'lucide-react'
import type { UserBadgeProps } from '../types'

export default function UserBadge({ user, onLogout }: UserBadgeProps) {
  return (
    <div className="user-badge">
      <UserRound size={16} aria-hidden="true" />
      <span>{user.nome}</span>
      <button type="button" onClick={onLogout} aria-label="Sair da conta">
        <LogOut size={15} aria-hidden="true" />
      </button>
    </div>
  )
}
