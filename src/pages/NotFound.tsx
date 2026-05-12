import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ACCENT    = '#114861'
const CREAM     = '#ebd4a8'
const WARM_BG   = '#f7f3ec'
const MUTED     = '#6b6155'
const DARK_NAVY = '#0a2f3f'

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let raf: number
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      for (let l = 0; l < 6; l++) {
        const yBase = h * 0.3 + l * 28
        const phase = (l * Math.PI) / 3
        const amp   = 12 + l * 3
        ctx.beginPath()
        ctx.strokeStyle = `rgba(17,72,97,${0.06 - l * 0.008})`
        ctx.lineWidth   = 1
        for (let x = 0; x <= w; x += 2) {
          const y = yBase + Math.sin((x / w) * Math.PI * 4 + frame * 0.012 + phase) * amp
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      frame++
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      style={{
        background: WARM_BG,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 72,
      }}
    >
      {/* Fils animés en fond absolu */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Contenu en flux normal — rien ne se superpose */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          padding: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: ACCENT,
            opacity: 0.55,
            marginBottom: '1.5rem',
          }}
        >
          Page introuvable
        </motion.p>

        {/* 404 — dans le flux, grand mais pas superposé */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.07, y: 0 }}
          transition={{ duration: 1 }}
          aria-hidden
          style={{
            fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
            fontSize: 'clamp(8rem, 22vw, 16rem)',
            fontWeight: 300,
            color: ACCENT,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            userSelect: 'none',
            marginBottom: '2rem',
          }}
        >
          404
        </motion.p>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            lineHeight: 1.15,
            color: DARK_NAVY,
            marginBottom: '1.25rem',
            letterSpacing: '-0.01em',
          }}
        >
          Cette page s'est{' '}
          <em style={{ fontStyle: 'italic', color: ACCENT }}>effilochée</em>
          {' '}en chemin.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 300,
            lineHeight: 1.8,
            color: MUTED,
            marginBottom: '2.5rem',
          }}
        >
          L'adresse que vous cherchez n'existe pas, ou a été déplacée.
        </motion.p>

        {/* Boutons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}
        >
          <Link
            to="/"
            style={{
              padding: '0.7rem 1.75rem',
              border: `1px solid ${ACCENT}`,
              color: ACCENT,
              background: 'transparent',
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = ACCENT
              e.currentTarget.style.color = CREAM
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = ACCENT
            }}
          >
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  )
}