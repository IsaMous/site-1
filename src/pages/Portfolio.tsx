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
      className="fixed inset-0 z-[200] flex items-end items-center justify-center sm:p-8 p-0"
      style={{ background: 'rgba(10,47,63,0.88)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="w-full sm:max-w-[1200px] grid grid-cols-1 md:grid-cols-2 overflow-hidden max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
        style={{ background: WARM_BG }}
      >
        {/* ── Photo principale ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '1' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              style={getBackgroundStyle(project.photos[current])}
            />
          </AnimatePresence>

          {/* Flèches */}
          {project.photos.length > 1 && (
            <>
              <button
                onClick={() => setCurrent(i => (i - 1 + project.photos.length) % project.photos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 border-none cursor-pointer text-lg"
                style={{ background: 'rgba(247,243,236,0.85)', color: ACCENT }}
              >←</button>
              <button
                onClick={() => setCurrent(i => (i + 1) % project.photos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 border-none cursor-pointer text-lg"
                style={{ background: 'rgba(247,243,236,0.85)', color: ACCENT }}
              >→</button>
            </>
          )}

          {/* Miniatures */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {project.photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-9 h-9 p-0 cursor-pointer"
                style={{
                  border: i === current ? `2px solid ${CREAM}` : '2px solid transparent',
                  ...getBackgroundStyle(p),
                  transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Infos ── */}
        <div className="flex flex-col justify-between p-6 sm:p-10">
          <div>
            <span
              className="block text-[10px] tracking-[0.24em] uppercase"
              style={{ fontFamily: "'Jost', sans-serif", color: ACCENT, opacity: 0.55 }}
            >
              {project.category}
            </span>

            <h2
              className="text-[1.6rem] sm:text-[2rem] font-light leading-[1.15] mt-2 mb-5"
              style={{
                fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
                color: DARK_NAVY,
              }}
            >
              {project.title}
            </h2>

            <p
              className="text-[0.9rem] font-light leading-[1.8] mb-8"
              style={{ fontFamily: "'Jost', sans-serif", color: MUTED }}
            >
              {project.description}
            </p>

            {/* Détails */}
            <div
              className="flex flex-col gap-2.5 pt-5"
              style={{ borderTop: `1px solid rgba(17,72,97,0.12)` }}
            >
              {project.details.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="block shrink-0 h-px w-4"
                    style={{ background: CREAM }}
                  />
                  <span
                    className="text-[0.82rem] font-light tracking-[0.04em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: MUTED }}
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
            className="mt-8 px-5 py-2 text-[11px] tracking-[0.16em] uppercase cursor-pointer transition-[background,color] duration-200"
            style={{
              fontFamily: "'Jost', sans-serif",
              border: `1px solid ${ACCENT}`,
              background: 'transparent',
              color: ACCENT,
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
          padding: '2rem 3rem 3rem',
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

        {/* <motion.p
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
        </motion.p> */}
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
            key={i}
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