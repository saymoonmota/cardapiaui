import { useState } from 'react'
import { ArrowRight, BookOpen, HeartHandshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import FeedbackMessage from '../components/FeedbackMessage'
import HeroBanner from '../components/HeroBanner'
import PratoGrid from '../components/PratoGrid'
import PratoModal from '../components/PratoModal'
import { useAppContext } from '../context/useAppContext'
import type { Prato } from '../types'

export default function Home() {
  const { pratos, pratosLoading, pratosError, favorites, toggleFavorite } = useAppContext()
  const [pratoAtivo, setPratoAtivo] = useState<Prato | null>(null)

  return (
    <>
      <HeroBanner pratoDestaque={pratos[0]} />
      <section className="section-shell">
        <div className="section-intro">
          <div>
            <p className="eyebrow"><BookOpen size={15} aria-hidden="true" /> Receitas de família</p>
            <h2>Feito com tempo, servido com <em>carinho.</em></h2>
          </div>
          <p>Conheça receitas caseiras que fazem parte da mesa piauiense, com ingredientes e modos de preparo para compartilhar.</p>
        </div>
        {pratosError ? <FeedbackMessage message={pratosError} kind="error" /> : pratosLoading ? (
          <p className="loading-state" role="status">Preparando nosso cardápio...</p>
        ) : (
          <PratoGrid
            pratos={pratos.slice(0, 3)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onViewDetails={setPratoAtivo}
          />
        )}
        <Link className="button button-primary section-cta" to="/cardapio">
          Ver todos os pratos <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
      <section className="home-values">
        <div className="section-shell home-values-inner">
          <HeartHandshake size={33} aria-hidden="true" />
          <div>
            <p className="eyebrow">Cozinha de território</p>
            <h2>Uma receita pode carregar muitas histórias.</h2>
            <p>Os sabores e os nomes mudam de casa para casa. Aqui, cada prato é um convite para conhecer e respeitar essas tradições.</p>
          </div>
          <Link className="button button-quiet" to="/sobre">Conheça o projeto</Link>
        </div>
      </section>
      {pratoAtivo && <PratoModal prato={pratoAtivo} onClose={() => setPratoAtivo(null)} />}
    </>
  )
}
