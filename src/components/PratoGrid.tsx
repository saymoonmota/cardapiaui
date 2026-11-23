import type { PratoGridProps } from '../types'
import PratoCard from './PratoCard'

export default function PratoGrid({ pratos, favorites, onToggleFavorite, onViewDetails }: PratoGridProps) {
  if (pratos.length === 0) {
    return <p className="empty-state" role="status">Nenhum item encontrado. Tente outra busca ou categoria.</p>
  }

  return (
    <div className="dish-grid">
      {pratos.map((prato) => (
        <PratoCard
          key={prato.id}
          prato={prato}
          isFavorite={favorites.includes(prato.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}
