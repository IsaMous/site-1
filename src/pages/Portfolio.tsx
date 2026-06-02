import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../projects'
import { PROJECTS } from '../projects'

/* ─── CONSTANTES ─── */
const ACCENT    = '#114861'
const CREAM     = '#ebd4a8'
const WARM_BG   = '#f7f3ec'
const MUTED     = '#6b6155'
const DARK_NAVY = '#0a2f3f'

/* ─── HELPER ─── */
function isColor(str: string): boolean {
  return str.startsWith('#') || str.startsWith('rgb')
}

function getBackgroundStyle(photo: string) {
  if (isColor(photo)) {
    return { backgroundColor: photo }
  }
  return {
    backgroundImage: `url(${photo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}

/* ─── CARTE DE PROJET ─── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered]     = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setPhotoIndex(i => (i + 1) % project.photos.length)
    }, 1500)
  }, [project.photos.length])

  const stopSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setPhotoIndex(0)
  }, [])

  useEffect(() => {
    if (hovered) startSlide()
    else stopSlide()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [hovered, startSlide, stopSlide])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '4/3',
      }}
    >
      
      <AnimatePresence mode="wait">
        <motion.div
          key={photoIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            inset: 0,
            ...getBackgroundStyle(project.photos[photoIndex]),
          }}
        />
      </AnimatePresence>

      
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `rgba(10,47,63,0.72)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.5rem',
        }}
      >
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: CREAM,
            opacity: 0.7,
            marginBottom: '0.4rem',
          }}
        >
          {project.category}
        </span>
        <span
          style={{
            fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
            fontSize: '1.4rem',
            fontWeight: 300,
            color: CREAM,
            lineHeight: 1.15,
          }}
        >
          {project.title}
        </span>

        {/* Indicateurs de photos */}
        <div style={{ display: 'flex', gap: 5, marginTop: '1rem' }}>
          {project.photos.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === photoIndex ? 20 : 5,
                height: 2,
                background: CREAM,
                opacity: i === photoIndex ? 0.9 : 0.35,
                transition: 'width 0.25s, opacity 0.25s',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Trait décoratif coin bas-droit */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          width: 24,
          height: 24,
          borderRight: `1px solid rgba(235,212,168,0.5)`,
          borderBottom: `1px solid rgba(235,212,168,0.5)`,
        }}
      />
    </motion.div>
  )
}

/* ─── MODAL ─── */
function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % project.photos.length)
      if (e.key === 'ArrowLeft')  setCurrent(i => (i - 1 + project.photos.length) % project.photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(10,47,63,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: WARM_BG,
          maxWidth: 1200,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          overflow: 'hidden',
        }}
      >
        {/* Photo principale */}
        <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                inset: 0,
                ...getBackgroundStyle(project.photos[current]),
              }}
            />
          </AnimatePresence>

          {/* Flèches */}
          {project.photos.length > 1 && (
            <>
              <button
                onClick={() => setCurrent(i => (i - 1 + project.photos.length) % project.photos.length)}
                style={{
                  position: 'absolute', left: 12, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(247,243,236,0.85)',
                  border: 'none', cursor: 'pointer',
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'sans-serif', fontSize: 18, color: ACCENT,
                }}
              >
                ←
              </button>
              <button
                onClick={() => setCurrent(i => (i + 1) % project.photos.length)}
                style={{
                  position: 'absolute', right: 12, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(247,243,236,0.85)',
                  border: 'none', cursor: 'pointer',
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'sans-serif', fontSize: 18, color: ACCENT,
                }}
              >
                →
              </button>
            </>
          )}

          {/* Miniatures */}
          <div
            style={{
              position: 'absolute', bottom: 12, left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: 6,
            }}
          >
            {project.photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 36,
                  height: 36,
                  border: i === current ? `2px solid ${CREAM}` : '2px solid transparent',
                  ...getBackgroundStyle(p),
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Infos */}
        <div
          style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: ACCENT,
                opacity: 0.55,
              }}
            >
              {project.category}
            </span>

            <h2
              style={{
                fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
                fontSize: '2rem',
                fontWeight: 300,
                lineHeight: 1.15,
                color: DARK_NAVY,
                margin: '0.6rem 0 1.5rem',
              }}
            >
              {project.title}
            </h2>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.8,
                color: MUTED,
                marginBottom: '2rem',
              }}
            >
              {project.description}
            </p>

            {/* Détails */}
            <div
              style={{
                borderTop: `1px solid rgba(17,72,97,0.12)`,
                paddingTop: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              {project.details.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 1,
                      background: CREAM,
                      display: 'block',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 300,
                      color: MUTED,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {d}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fermer */}
          <button
            onClick={onClose}
            style={{
              marginTop: '2rem',
              alignSelf: 'flex-start',
              padding: '0.5rem 1.25rem',
              border: `1px solid ${ACCENT}`,
              background: 'transparent',
              color: ACCENT,
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
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
            Fermer
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── PAGE PRINCIPALE ─── */
export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <div style={{ background: WARM_BG, minHeight: '100vh', paddingTop: 72 }}>

      {/* EN-TÊTE */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '5rem 3rem 3rem',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '4rem',
          alignItems: 'end',
          borderBottom: `1px solid rgba(17,72,97,0.1)`,
        }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 10,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: ACCENT,
              opacity: 0.55,
              marginBottom: '0.75rem',
            }}
          >
            Galerie
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{
              fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: DARK_NAVY,
              letterSpacing: '-0.01em',
            }}
          >
            Nos <em style={{ fontStyle: 'italic', color: ACCENT }}>réalisations</em>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 300,
            lineHeight: 1.8,
            color: MUTED,
            maxWidth: '42ch',
            alignSelf: 'end',
            paddingBottom: '0.5rem',
          }}
        >
          Chaque pièce restaurée est une histoire singulière. Survolez les cartes pour
          découvrir les détails, cliquez pour en savoir plus.
        </motion.p>
      </div>

      {/* GRILLE */}
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCard project={p} onClick={() => setSelected(p)} />
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <Modal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}