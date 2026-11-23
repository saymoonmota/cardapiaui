import { BookOpen, Utensils } from 'lucide-react'

export default function Sobre() {
  return (
    <>
      <section className="page-banner">
        <div className="section-shell page-banner-inner">
          <p className="eyebrow"><BookOpen size={15} aria-hidden="true" /> Nossa proposta</p>
          <h1>Sobre o <em>projeto.</em></h1>
          <p>Um espaço para compartilhar sabores, ingredientes e histórias da culinária piauiense.</p>
        </div>
      </section>
      <main className="section-shell">
        <section className="about-copy">
          <p className="eyebrow"><Utensils size={16} aria-hidden="true" /> Culinária piauiense</p>
          <h2>Uma mesa feita de <em>encontros.</em></h2>
          <p>
            Nossa intenção é aproximar as pessoas da culinária piauiense, compartilhando pratos,
            ingredientes e modos de preparo que fazem parte do cotidiano e das memórias de muitas
            famílias. Queremos despertar a curiosidade pelos sabores do Piauí e valorizar os saberes
            transmitidos à mesa.
          </p>
          <p>
            As receitas representam sugestões de preparo, não versões únicas ou definitivas:
            nomes, ingredientes e modos de cozinhar variam entre famílias e regiões.
          </p>
        </section>
      </main>
    </>
  )
}
