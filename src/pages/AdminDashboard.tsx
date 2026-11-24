import { useCallback, useEffect, useState } from 'react'
import { Inbox, LogOut, Mail, MailOpen, RefreshCw } from 'lucide-react'
import { useAppContext } from '../context/useAppContext'
import { buscarContatos, marcarContatoLido, type ContatosPaginados } from '../services/api'
import FeedbackMessage from '../components/FeedbackMessage'
import type { Contato } from '../types'

export default function AdminDashboard() {
  const { admin, adminToken, setAdmin } = useAppContext()
  const [dados, setDados] = useState<ContatosPaginados | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pagina, setPagina] = useState(1)
  const [apenasNaoLidos, setApenasNaoLidos] = useState(false)
  const [contatoAberto, setContatoAberto] = useState<Contato | null>(null)

  const carregar = useCallback(async (pag: number, naoLidos: boolean) => {
    if (!adminToken) return
    setLoading(true)
    setError('')
    try {
      const resultado = await buscarContatos(adminToken, pag, naoLidos)
      setDados(resultado)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar sugestões.')
    } finally {
      setLoading(false)
    }
  }, [adminToken])

  useEffect(() => {
    void carregar(pagina, apenasNaoLidos)
  }, [carregar, pagina, apenasNaoLidos])

  async function toggleLido(contato: Contato) {
    if (!adminToken) return
    try {
      await marcarContatoLido(adminToken, contato.id, !contato.lido)
      setDados((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          data: prev.data.map((c) => c.id === contato.id ? { ...c, lido: !c.lido } : c),
        }
      })
      if (contatoAberto?.id === contato.id) {
        setContatoAberto((prev) => prev ? { ...prev, lido: !prev.lido } : prev)
      }
    } catch {
      // silencia — o ícone simplesmente não muda
    }
  }

  function handleLogout() {
    setAdmin(null, null)
  }

  function formatarData(iso: string) {
    return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
  }

  return (
    <>
      <section className="page-banner">
        <div className="section-shell page-banner-inner">
          <p className="eyebrow"><Inbox size={15} aria-hidden="true" /> Área administrativa</p>
          <h1>Sugestões <em>recebidas.</em></h1>
          <p>Olá, <strong>{admin?.email}</strong>. Veja as sugestões enviadas pelo formulário de contato.</p>
        </div>
      </section>

      <main className="section-shell">
        {/* Barra de ações */}
        <div className="admin-toolbar">
          <label className="admin-filter-label">
            <input
              type="checkbox"
              checked={apenasNaoLidos}
              onChange={(e) => { setApenasNaoLidos(e.target.checked); setPagina(1) }}
            />
            Mostrar apenas não lidos
          </label>
          <div className="admin-toolbar-actions">
            <button
              className="button button-quiet"
              onClick={() => void carregar(pagina, apenasNaoLidos)}
              disabled={loading}
              title="Atualizar lista"
            >
              <RefreshCw size={15} aria-hidden="true" /> Atualizar
            </button>
            <button className="button button-quiet" onClick={handleLogout}>
              <LogOut size={15} aria-hidden="true" /> Sair
            </button>
          </div>
        </div>

        {error && <FeedbackMessage message={error} kind="error" />}

        {loading ? (
          <p className="loading-state" role="status">Carregando sugestões...</p>
        ) : dados && dados.data.length === 0 ? (
          <p className="loading-state">Nenhuma sugestão encontrada.</p>
        ) : (
          <>
            {/* Lista de contatos */}
            <ul className="admin-contatos-list">
              {dados?.data.map((contato) => (
                <li
                  key={contato.id}
                  className={`admin-contato-item ${!contato.lido ? 'admin-contato-nao-lido' : ''}`}
                >
                  <button
                    className="admin-contato-btn"
                    onClick={() => setContatoAberto(contato)}
                  >
                    <span className="admin-contato-nome">{contato.nome}</span>
                    <span className="admin-contato-email">{contato.email}</span>
                    <span className="admin-contato-preview">{contato.mensagem.slice(0, 80)}{contato.mensagem.length > 80 ? '…' : ''}</span>
                    <span className="admin-contato-data">{formatarData(contato.criadoEm)}</span>
                  </button>
                  <button
                    className="admin-lido-toggle"
                    title={contato.lido ? 'Marcar como não lido' : 'Marcar como lido'}
                    onClick={() => void toggleLido(contato)}
                  >
                    {contato.lido
                      ? <MailOpen size={17} aria-label="Lido" />
                      : <Mail size={17} aria-label="Não lido" />}
                  </button>
                </li>
              ))}
            </ul>

            {/* Paginação */}
            {dados && dados.paginacao.totalPaginas > 1 && (
              <div className="admin-paginacao">
                <button
                  className="button button-quiet"
                  disabled={pagina <= 1}
                  onClick={() => setPagina((p) => p - 1)}
                >
                  Anterior
                </button>
                <span>Página {dados.paginacao.pagina} de {dados.paginacao.totalPaginas}</span>
                <button
                  className="button button-quiet"
                  disabled={pagina >= dados.paginacao.totalPaginas}
                  onClick={() => setPagina((p) => p + 1)}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal de detalhe */}
      {contatoAberto && (
        <div className="dialog-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setContatoAberto(null) }}>
          <section className="detail-dialog" role="dialog" aria-modal="true" aria-label="Detalhe da sugestão" style={{ maxWidth: '560px' }}>
            <div className="admin-contato-detalhe-header">
              <div>
                <p className="eyebrow">Sugestão #{contatoAberto.id}</p>
                <h2>{contatoAberto.nome}</h2>
                <p className="admin-contato-email">{contatoAberto.email} · {formatarData(contatoAberto.criadoEm)}</p>
              </div>
              <button
                className="button button-quiet"
                onClick={() => void toggleLido(contatoAberto)}
              >
                {contatoAberto.lido
                  ? <><MailOpen size={15} /> Marcar não lido</>
                  : <><Mail size={15} /> Marcar lido</>}
              </button>
            </div>
            <p className="admin-contato-mensagem">{contatoAberto.mensagem}</p>
            <button className="button button-primary" onClick={() => setContatoAberto(null)}>
              Fechar
            </button>
          </section>
        </div>
      )}
    </>
  )
}
