import { Search } from 'lucide-react'
import type { CategoriaCardapio, SearchFilterProps } from '../types'

const categories: Array<CategoriaCardapio | 'Todos'> = [
  'Todos',
  'Aves',
  'Carnes',
  'Peixes',
  'Bebidas',
  'Sobremesas',
  'Petiscos',
]

export default function SearchFilter({
  query,
  categoria,
  onQueryChange,
  onCategoriaChange,
}: SearchFilterProps) {
  return (
    <div className="search-filter">
      <label className="search-input">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Buscar itens do cardápio</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Busque pelo nome do item..."
        />
      </label>
      <div className="filter-row" role="group" aria-label="Filtrar por categoria">
        {categories.map((option) => (
          <button
            key={option}
            className={`filter-button ${categoria === option ? 'is-selected' : ''}`}
            type="button"
            onClick={() => onCategoriaChange(option)}
            aria-pressed={categoria === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
