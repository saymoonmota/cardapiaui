import pratosJson from '../data/pratos.json'
import type { CategoriaCardapio, Prato } from '../types'

function isCategoriaCardapio(value: string): value is CategoriaCardapio {
  return value === 'Aves'
    || value === 'Carnes'
    || value === 'Peixes'
    || value === 'Bebidas'
    || value === 'Sobremesas'
    || value === 'Petiscos'
}

const pratos: Prato[] = pratosJson.map((prato) => {
  if (!isCategoriaCardapio(prato.categoria)) {
    throw new Error(`Categoria inválida no prato "${prato.id}": ${prato.categoria}`)
  }
  return { ...prato, categoria: prato.categoria }
})

export function buscarPratos(): Promise<Prato[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(pratos), 450)
  })
}
