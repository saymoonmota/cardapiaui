import { Clock3, Heart, Utensils } from 'lucide-react'
import type { PratoCardProps } from '../types'

export default function PratoCard({ prato, isFavorite, onToggleFavorite, onViewDetails }: PratoCardProps) {
  return (
    <article className="dish-card">
      <div className="dish-image-wrap">
        <img src={prato.imagem} alt={prato.imagemAlt} loading="lazy" />
        <span className="dish-category">{prato.categoria}</span>
        <button
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          type="button"
          onClick={() => onToggleFavorite(prato.id)}
          aria-label={isFavorite ? `Remover ${prato.nome} dos favoritos` : `Adicionar ${prato.nome} aos favoritos`}
          aria-pressed={isFavorite}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>
      <div className="dish-content">
        <p className="image-note"><Clock3 size={13} aria-hidden="true" /> {prato.tempoPreparoMinutos} min de preparo</p>
        <h3>{prato.nome}</h3>
        <p className="dish-description">{prato.descricao}</p>
        <p className="image-disclaimer">{prato.avisoImagem}</p>
        {prato.fonteImagem ? (
          <a className="photo-credit" href={prato.fonteImagem} target="_blank" rel="noopener noreferrer">
            Foto: {prato.creditoImagem}
          </a>
        ) : (
          <span className="photo-credit">Foto: {prato.creditoImagem}</span>
        )}
        <button className="text-link" type="button" onClick={() => onViewDetails(prato)}>
          <Utensils size={15} aria-hidden="true" /> Ver ingredientes
        </button>
      </div>
    </article>
  )
}
