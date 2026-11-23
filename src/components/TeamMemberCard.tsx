import { Code2 } from 'lucide-react'
import type { TeamMemberCardProps } from '../types'

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="team-card">
      <div className="team-avatar" aria-hidden="true">{member.nome.slice(0, 1)}</div>
      <p className="eyebrow">{member.papel}</p>
      <h3>{member.nome}</h3>
      <div className="team-components">
        <span><Code2 size={14} aria-hidden="true" /> {member.componentes[0]}</span>
        <span><Code2 size={14} aria-hidden="true" /> {member.componentes[1]}</span>
      </div>
    </article>
  )
}
