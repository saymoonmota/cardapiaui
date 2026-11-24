import { useCallback, useMemo, useState } from 'react'
import { Utensils } from 'lucide-react'
import FeedbackMessage from '../components/FeedbackMessage'
import PratoGrid from '../components/PratoGrid'
import PratoModal from '../components/PratoModal'
import SearchFilter from '../components/SearchFilter'
import { useAppContext } from '../context/useAppContext'
import type { CategoriaCardapio, Prato } from '../types'

function normalizeText(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR')
}

export default function Cardapio() {
  const { pratos, pratosLoading, pratosError, favorites, toggleFavorite } = useAppContext()
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState<CategoriaCardapio | 'Todos'>('Todos')
  const [pratoAtivo, setPratoAtivo] = useState<Prato | null>(null)

  const pratosFiltrados = useMemo(() => {
    const term = normalizeText(query.trim())
    return pratos.filter((prato) => {
      const matchesCategory = categoria === 'Todos' || prato.categoria === categoria
      const matchesText = !term || normalizeText(`${prato.nome} ${prato.descricao}`).includes(term)
      return matchesCategory && matchesText
    })
  }, [pratos, query, categoria])

  const closeModal = useCallback(() => setPratoAtivo(null), [])

  return (
    <>
      <section className="page-banner">
        <div className="section-shell page-banner-inner">
          <p className="eyebrow"><Utensils size={15} aria-hidden="true" /> Sabores piauienses</p>
          <h1><em>Cardapiauí.</em></h1>
          <p>Receitas caseiras, ingredientes da terra e histórias à mesa.</p>
        </div>
      </section>
      <main className="section-shell catalog-page">
        <SearchFilter
          query={query}
          categoria={categoria}
          onQueryChange={setQuery}
          onCategoriaChange={setCategoria}
        />
        <p className="result-count" aria-live="polite">
          {pratosLoading ? 'Carregando itens...' : `${pratosFiltrados.length} ${pratosFiltrados.length === 1 ? 'item encontrado' : 'itens encontrados'}`}
        </p>
        {pratosError ? <FeedbackMessage message={pratosError} kind="error" /> : pratosLoading ? (
          <p className="loading-state" role="status">Buscando opções da nossa cozinha...</p>
        ) : (
          <PratoGrid
            pratos={pratosFiltrados}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onViewDetails={setPratoAtivo}
          />
        )}
      </main>
      {pratoAtivo && <PratoModal prato={pratoAtivo} onClose={closeModal} />}
    </>
  )
}
