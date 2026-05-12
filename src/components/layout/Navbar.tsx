import { Link, useLocation } from 'react-router-dom'
import VisualIdentity from '../ui/VisualIdentity'

const ACCENT = '#114861'

const links = [
  { to: '/',            label: 'Accueil' },
  { to: '/portfolio',   label: 'Réalisations' },
  { to: '/partenaires', label: 'Partenaires' },
  { to: '/contact',     label: 'Contact', highlight: true },
]

/*
  Injecte le keyframe une seule fois dans le <head>.
  L'animation "slide-in" part de droite (scaleX 0, origin right)
  vers gauche (scaleX 1) — effet entrée droite→gauche.
*/
const styleTag = `
  @keyframes underline-in {
    from { transform: scaleX(0); transform-origin: right; }
    to   { transform: scaleX(1); transform-origin: right; }
  }
`
if (typeof document !== 'undefined' && !document.getElementById('navbar-anim')) {
  const s = document.createElement('style')
  s.id = 'navbar-anim'
  s.textContent = styleTag
  document.head.appendChild(s)
}

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.1rem 3rem',
        background: 'rgba(247,243,236,0.93)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(17,72,97,0.1)',
      }}
    >
      {/* Logo / identité */}
      <VisualIdentity />

      {/* Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {links.map(({ to, label, highlight }) => {
          const active = pathname === to
          return highlight ? (
            <Link
              key={to}
              to={to}
              style={{
                marginLeft: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.5rem 1.25rem',
                border: `1px solid ${ACCENT}`,
                color: active ? '#ebd4a8' : ACCENT,
                background: active ? ACCENT : 'transparent',
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = ACCENT
                e.currentTarget.style.color = '#ebd4a8'
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = ACCENT
                }
              }}
            >
              {label}
            </Link>
          ) : (
            <Link
              key={to}
              to={to}
              style={{
                position: 'relative',
                padding: '0.4rem 0.75rem',
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: active ? ACCENT : '#6b6155',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = ACCENT }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#6b6155' }}
            >
              {label}

              {/* Trait toujours rendu — animé via scaleX au montage de la page active */}
              <span
                key={active ? `${to}-active` : `${to}-inactive`}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '0.75rem',
                  right: '0.75rem',
                  height: 1,
                  background: ACCENT,
                  opacity: active ? 0.5 : 0,
                  transformOrigin: 'right',
                  animation: active ? 'underline-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'none',
                }}
              />
            </Link>
          )
        })}
      </nav>
    </header>
  )
}