import { useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import type { NavbarProps } from '../types'
import UserBadge from './UserBadge'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/cardapio', label: 'Cardápio', end: false },
  { to: '/sobre', label: 'Sobre', end: false },
  { to: '/contato', label: 'Contato', end: false },
]

export default function Navbar({ user, favoritesCount, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Sabor do Piauí, início">
          <span className="brand-mark">
            <img src="/images/caju-fruit.jpg" alt="" aria-hidden="true" />
          </span>
          <span className="brand-name">Sabor do <strong>Piauí</strong><small>Culinária piauiense</small></span>
        </Link>
        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav id="primary-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
          <Link className="favorites-link" to="/cardapio" onClick={closeMenu} aria-label={`${favoritesCount} itens favoritos`}>
            <Heart size={16} aria-hidden="true" /> Favoritos <span>{favoritesCount}</span>
          </Link>
          {user ? (
            <UserBadge user={user} onLogout={onLogout} />
          ) : (
            <NavLink className="login-link" to="/login" onClick={closeMenu}>Entrar</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
