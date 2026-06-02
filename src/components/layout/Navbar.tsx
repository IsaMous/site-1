// import { Link, useLocation } from 'react-router-dom'
// import VisualIdentity from '../ui/VisualIdentity'

// const ACCENT = '#114861'

// const links = [
//   { to: '/',            label: 'Accueil' },
//   { to: '/portfolio',   label: 'Réalisations' },
//   { to: '/partenaires', label: 'Partenaires' },
//   { to: '/contact',     label: 'Contact', highlight: true },
// ]

// /*
//   Injecte le keyframe une seule fois dans le <head>.
//   L'animation "slide-in" part de droite (scaleX 0, origin right)
//   vers gauche (scaleX 1) — effet entrée droite→gauche.
// */
// const styleTag = `
//   @keyframes underline-in {
//     from { transform: scaleX(0); transform-origin: right; }
//     to   { transform: scaleX(1); transform-origin: right; }
//   }
// `
// if (typeof document !== 'undefined' && !document.getElementById('navbar-anim')) {
//   const s = document.createElement('style')
//   s.id = 'navbar-anim'
//   s.textContent = styleTag
//   document.head.appendChild(s)
// }

// export default function Navbar() {
//   const { pathname } = useLocation()

//   return (
//     <header
//       style={{
//         position: 'fixed',
//         top: 0, left: 0, right: 0,
//         zIndex: 100,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '1.1rem 3rem',
//         background: 'rgba(247,243,236,0.93)',
//         backdropFilter: 'blur(10px)',
//         borderBottom: '1px solid rgba(17,72,97,0.1)',
//       }}
//     >
//       {/* Logo / identité */}
//       <VisualIdentity />

//       {/* Navigation */}
//       <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
//         {links.map(({ to, label, highlight }) => {
//           const active = pathname === to
//           return highlight ? (
//             <Link
//               key={to}
//               to={to}
//               style={{
//                 marginLeft: '1rem',
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 padding: '0.5rem 1.25rem',
//                 border: `1px solid ${ACCENT}`,
//                 color: active ? '#ebd4a8' : ACCENT,
//                 background: active ? ACCENT : 'transparent',
//                 fontFamily: "'Jost', sans-serif",
//                 fontSize: 11,
//                 letterSpacing: '0.16em',
//                 textTransform: 'uppercase',
//                 textDecoration: 'none',
//                 transition: 'background 0.25s, color 0.25s',
//               }}
//               onMouseEnter={e => {
//                 e.currentTarget.style.background = ACCENT
//                 e.currentTarget.style.color = '#ebd4a8'
//               }}
//               onMouseLeave={e => {
//                 if (!active) {
//                   e.currentTarget.style.background = 'transparent'
//                   e.currentTarget.style.color = ACCENT
//                 }
//               }}
//             >
//               {label}
//             </Link>
//           ) : (
//             <Link
//               key={to}
//               to={to}
//               style={{
//                 position: 'relative',
//                 padding: '0.4rem 0.75rem',
//                 fontFamily: "'Jost', sans-serif",
//                 fontSize: 11,
//                 letterSpacing: '0.14em',
//                 textTransform: 'uppercase',
//                 color: active ? ACCENT : '#6b6155',
//                 textDecoration: 'none',
//                 transition: 'color 0.2s',
//               }}
//               onMouseEnter={e => { e.currentTarget.style.color = ACCENT }}
//               onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#6b6155' }}
//             >
//               {label}

//               {/* Trait toujours rendu — animé via scaleX au montage de la page active */}
//               <span
//                 key={active ? `${to}-active` : `${to}-inactive`}
//                 style={{
//                   position: 'absolute',
//                   bottom: 0,
//                   left: '0.75rem',
//                   right: '0.75rem',
//                   height: 1,
//                   background: ACCENT,
//                   opacity: active ? 0.5 : 0,
//                   transformOrigin: 'right',
//                   animation: active ? 'underline-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'none',
//                 }}
//               />
//             </Link>
//           )
//         })}
//       </nav>
//     </header>
//   )
// }






import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import VisualIdentity from '../ui/VisualIdentity'

const ACCENT = '#114861'

const links = [
  { to: '/',            label: 'Accueil' },
  { to: '/portfolio',   label: 'Réalisations' },
  { to: '/partenaires', label: 'Partenaires' },
  { to: '/contact',     label: 'Contact', highlight: true },
]

// Injecte le keyframe une seule fois
if (typeof document !== 'undefined' && !document.getElementById('navbar-anim')) {
  const s = document.createElement('style')
  s.id = 'navbar-anim'
  s.textContent = `
    @keyframes underline-in {
      from { transform: scaleX(0); transform-origin: right; }
      to   { transform: scaleX(1); transform-origin: right; }
    }
    @keyframes drawer-in {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `
  document.head.appendChild(s)
}

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Ferme le drawer sur changement de route
  useEffect(() => { setOpen(false) }, [pathname])

  // Bloque le scroll body quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 lg:px-12 py-4 md:py-[1.1rem] bg-[rgba(247,243,236,0.93)] backdrop-blur-[10px] border-b border-[rgba(17,72,97,0.1)]">

        <VisualIdentity />

        {/* ── Navigation desktop (md+) ── */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, highlight }) => {
            const active = pathname === to
            return highlight ? (
              <Link
                key={to}
                to={to}
                className="ml-4 inline-flex items-center px-5 py-2 border text-[11px] tracking-[0.16em] uppercase font-['Jost',sans-serif] no-underline transition-[background,color] duration-[250ms]"
                style={{
                  borderColor: ACCENT,
                  color: active ? '#ebd4a8' : ACCENT,
                  background: active ? ACCENT : 'transparent',
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
                className="relative px-3 py-[0.4rem] text-[11px] tracking-[0.14em] uppercase font-['Jost',sans-serif] no-underline transition-colors duration-200"
                style={{ color: active ? ACCENT : '#6b6155' }}
                onMouseEnter={e => { e.currentTarget.style.color = ACCENT }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#6b6155' }}
              >
                {label}
                <span
                  key={active ? `${to}-active` : `${to}-inactive`}
                  className="absolute bottom-0 left-3 right-3 h-px"
                  style={{
                    background: ACCENT,
                    opacity: active ? 0.5 : 0,
                    transformOrigin: 'right',
                    animation: active ? 'underline-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
                  }}
                />
              </Link>
            )
          })}
        </nav>

        {/* ── Bouton hamburger (< md) ── */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] bg-transparent border-none cursor-pointer p-0 z-[110]"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          <span
            className="block w-6 h-[1.5px] transition-all duration-300 origin-center"
            style={{
              background: ACCENT,
              transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-6 h-[1.5px] transition-all duration-300"
            style={{
              background: ACCENT,
              opacity: open ? 0 : 1,
              transform: open ? 'scaleX(0)' : 'none',
            }}
          />
          <span
            className="block w-6 h-[1.5px] transition-all duration-300 origin-center"
            style={{
              background: ACCENT,
              transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </header>

      {/* ── DRAWER plein écran (mobile) ───────────────────────── */}
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-[rgba(247,243,236,0.97)] backdrop-blur-[16px] transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-2 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <nav
          className="flex flex-col items-center gap-6 w-full px-8"
          style={{ animation: open ? 'drawer-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards' : 'none' }}
        >
          {links.map(({ to, label, highlight }) => {
            const active = pathname === to
            return highlight ? (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-full max-w-xs px-5 py-3 border text-[12px] tracking-[0.2em] uppercase font-['Jost',sans-serif] no-underline transition-[background,color] duration-200"
                style={{
                  borderColor: ACCENT,
                  color: active ? '#ebd4a8' : ACCENT,
                  background: active ? ACCENT : 'transparent',
                }}
              >
                {label}
              </Link>
            ) : (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="relative text-[13px] tracking-[0.18em] uppercase font-['Jost',sans-serif] no-underline pb-1"
                style={{ color: active ? ACCENT : '#6b6155' }}
              >
                {label}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: ACCENT,
                      opacity: 0.5,
                      animation: 'underline-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
                    }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
