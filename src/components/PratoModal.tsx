import { useEffect, useRef } from 'react'
import { Clock3, X } from 'lucide-react'
import type { PratoModalProps } from '../types'

export default function PratoModal({ prato, onClose }: PratoModalProps) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable?.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section ref={dialogRef} className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="prato-modal-title">
        <button ref={closeButtonRef} className="dialog-close" type="button" onClick={onClose} aria-label="Fechar detalhes">
          <X size={20} aria-hidden="true" />
        </button>
        <div className="dialog-image">
          <img src={prato.imagem} alt={prato.imagemAlt} />
          <span className="dish-category">{prato.categoria}</span>
        </div>
        <div className="dialog-content">
          <p className="eyebrow"><Clock3 size={15} aria-hidden="true" /> {prato.tempoPreparoMinutos} minutos</p>
          <h2 id="prato-modal-title">{prato.nome}</h2>
          <p className="dialog-story">{prato.descricao}</p>
          <div className="dialog-lists">
            <div>
              <h3>Ingredientes</h3>
              <ul>{prato.ingredientes.map((ingrediente) => <li key={ingrediente}>{ingrediente}</li>)}</ul>
            </div>
            <div>
              <h3>Acompanhamentos</h3>
              <ul>{prato.acompanhamentos.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <div className="preparation-note">
            <h3>Preparo caseiro</h3>
            <p>{prato.modoPreparo}</p>
          </div>
          <p className="image-disclaimer">{prato.avisoImagem}</p>
          {prato.fonteImagem ? (
            <a className="photo-credit" href={prato.fonteImagem} target="_blank" rel="noopener noreferrer">
              Foto: {prato.creditoImagem}
            </a>
          ) : (
            <span className="photo-credit">Foto: {prato.creditoImagem}</span>
          )}
        </div>
      </section>
    </div>
  )
}
