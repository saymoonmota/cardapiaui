import type { Admin, Contato, Prato } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

// ─── Pratos ──────────────────────────────────────────────────────────────────

export async function buscarPratos(): Promise<Prato[]> {
  const response = await fetch(`${BASE_URL}/api/pratos`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar pratos: ${response.status}`)
  }
  return response.json() as Promise<Prato[]>
}

// ─── Contatos (público) ───────────────────────────────────────────────────────

export async function enviarContato(nome: string, email: string, mensagem: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/contatos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, mensagem }),
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string }
    throw new Error(body.error ?? `Erro ao enviar mensagem: ${response.status}`)
  }
}

// ─── Auth admin ───────────────────────────────────────────────────────────────

export async function loginAdmin(email: string, senha: string): Promise<{ token: string; admin: Admin }> {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })
  const body = await response.json() as { token?: string; admin?: Admin; error?: string }
  if (!response.ok) {
    throw new Error(body.error ?? 'Credenciais inválidas.')
  }
  return { token: body.token!, admin: body.admin! }
}

// ─── Contatos (admin) ─────────────────────────────────────────────────────────

export interface ContatosPaginados {
  data: Contato[]
  paginacao: {
    total: number
    pagina: number
    limite: number
    totalPaginas: number
  }
}

export async function buscarContatos(token: string, pagina = 1, apenasNaoLidos = false): Promise<ContatosPaginados> {
  const params = new URLSearchParams({ page: String(pagina), ...(apenasNaoLidos && { naoLidos: 'true' }) })
  const response = await fetch(`${BASE_URL}/api/contatos?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) {
    throw new Error('Não foi possível carregar as sugestões.')
  }
  return response.json() as Promise<ContatosPaginados>
}

export async function marcarContatoLido(token: string, id: number, lido: boolean): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/contatos/${id}/lido`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ lido }),
  })
  if (!response.ok) {
    throw new Error('Não foi possível atualizar o status.')
  }
}
