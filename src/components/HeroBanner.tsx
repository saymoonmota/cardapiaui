import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { HeroBannerProps } from '../types'

export default function HeroBanner({ pratoDestaque }: HeroBannerProps) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><MapPin size={15} aria-hidden="true" /> Do sertão ao Delta</p>
          <h1>Culinária piauiense tem <em>história.</em></h1>
          <p className="hero-intro">
            Receitas, ingredientes e lembranças que celebram a cozinha caseira do Piauí,
            preparadas com o cuidado de quem mantém a tradição viva.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/cardapio">
              Conhecer o cardápio <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button button-quiet" to="/sobre">Sobre o projeto</Link>
          </div>
          <p className="hero-note">Comida de verdade, feita para compartilhar.</p>
        </div>
        <figure className="hero-visual">
          <img
            className="hero-photo"
            src="/images/foto-galinha-caipira.jpg"
            alt="Galinha caipira caseira servida com acompanhamentos"
          />
          {pratoDestaque && (
            <figcaption className="hero-inset hero-dish-label">
              <span>Receita em destaque</span>
              <strong>{pratoDestaque.nome}</strong>
            </figcaption>
          )}
        </figure>
      </div>
      <div className="hero-ribbon">
        <span>Ingredientes da nossa terra</span>
        <span>Tradição de família</span>
        <span>Sabores do Piauí</span>
      </div>
    </section>
  )
}
