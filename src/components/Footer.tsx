import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { FooterProps } from '../types'

const currentYear = new Date().getFullYear()

export default function Footer({ curso = 'Análise e Desenvolvimento de Sistemas', cidade = 'Teresina - PI' }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/">
            <span className="brand-name">Sabor do <strong>Piauí</strong><small>Culinária piauiense</small></span>
          </Link>
          <p>Uma celebração da memória, dos ingredientes e dos saberes à mesa.</p>
        </div>
        <div className="footer-note">
          <strong>{curso}</strong>
          <p>Sabores do Piauí · <MapPin size={13} aria-hidden="true" /> {cidade}</p>
        </div>
        <Link className="back-to-top" to="/">Voltar ao início ↑</Link>
      </div>
      <div className="footer-bottom">
        <span>© {currentYear} · Sabor do Piauí</span>
        <span>Receitas e histórias em diálogo com a cultura piauiense.</span>
      </div>
    </footer>
  )
}
