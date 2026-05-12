import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import coverImage from '../assets/cover-modified.jpg'

import PresPhoto from '../assets/cover-2-modified.jpg'

const ACCENT = '#114861'
const craftItems = [
  {
    num: '01',
    title: 'Réfection de sièges',
    desc: 'Anciens - Contemporains',
  },
  {
    num: '02',
    title: 'Confection',
    desc: 'Voilages - Rideaux - Coussins - Stores',
  },
  {
    num: '03',
    title: 'Ventes & Fournitures',
    desc: "Tissus d'éditeurs - Papiers peints - Mousse - Tringles",
  },
]

const editorialItems = [
  {
    title: 'Présentation',
    desc: 'Installé au cœur de notre atelier, nous donnons vie à vos projets de décoration textile avec exigence et précision. Tapissier décorateur passionné, nous travaillons chaque pièce avec le souci du détail, qu’il s’agisse de restaurer un fauteuil ancien ou de créer une ambiance sur mesure pour votre intérieur.',
    img: PresPhoto
  },
  {
    title: 'Savoir-faire',
    desc: 'Notre expertise repose sur des techniques artisanales maîtrisées et des matériaux sélectionnés avec soin. Du garnissage traditionnel à la pose de tissus contemporains, chaque réalisation est pensée pour allier esthétique, confort et durabilité.',
    img: PresPhoto
  },
  {
    title: 'Atelier',
    desc: 'Notre atelier est un lieu de création et de transformation. C’est ici que chaque projet prend forme, du choix des tissus jusqu’aux finitions. Nous accueillons nos clients pour échanger, conseiller et construire ensemble des pièces uniques adaptées à leurs envies.',
    img: PresPhoto
  },
  {
    title: 'Prestations',
    desc: 'Nous proposons un large éventail de services : réfection de sièges, confection de rideaux et coussins, pose de tentures murales ou encore conseils en décoration textile. Chaque prestation est personnalisée pour répondre au mieux à votre projet.',
    img: PresPhoto
  },
  {
    title: 'Engagement',
    desc: 'Nous accordons une attention particulière à la qualité des matériaux et à la durabilité de nos réalisations. Notre objectif est de valoriser votre mobilier et votre intérieur tout en respectant leur histoire et leur caractère.',
    img: PresPhoto
  },
  {
    title: 'Contact',
    desc: 'Un projet en tête ou simplement besoin de conseils ? Nous sommes à votre écoute pour vous accompagner à chaque étape. N’hésitez pas à nous rendre visite à l’atelier ou à nous contacter pour discuter de vos idées.',
    img: PresPhoto
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home()
{
  const navigate = useNavigate()

  return (
    <div
      style={{
        fontFamily: "'Jost', sans-serif",
        background: '#f7f3ec',
        color: '#1a1a18',
        overflowX: 'hidden',
      }}
    >

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: '100vh',
          background: ACCENT,
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.2fr',
        }}
      >
        {/* Texte */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 4rem 6rem 5rem',
          }}
        >
          <motion.p
            variants={{fadeUp}}
            initial="hidden"
            animate="show"
            custom={0}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#ebd4a8',
              opacity: 0.7,
              marginBottom: '1.5rem',
            }}
          >
            Atelier de tapisserie d'ameublement
          </motion.p>

          <motion.h1
            variants={{fadeUp}}
            initial="hidden"
            animate="show"
            custom={1}
            style={{
              fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: '#ebd4a8',
              letterSpacing: '-0.01em',
              marginBottom: '2rem',
            }}
          >
            L'art de{' '}
            <em style={{ fontStyle: 'italic' }}>restaurer</em>
            <br />
            ce qui dure.
          </motion.h1>

          <motion.button
            variants={{fadeUp}}
            initial="hidden"
            animate="show"
            custom={2}
            whileHover={{ backgroundColor: '#ebd4a8', color: ACCENT }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.9rem 2rem',
              border: '1px solid #ebd4a8',
              color: '#ebd4a8',
              background: 'transparent',
              fontFamily: "'Jost', sans-serif",
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              width: 'fit-content',
              transition: 'background 0.3s, color 0.3s',
            }}
            onClick={() => navigate('/contact')}
          >
            Nous contacter
            <span style={{ fontSize: 16 }}>→</span>
          </motion.button>
        </div>

        {/* Photo */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={coverImage}
            alt="Atelier de tapisserie d'ameublement"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(13,58,80,0.18) 0%, rgba(13,58,80,0.08) 40%, rgba(13,58,80,0.28) 100%)',
            }}
          />
        </div>
      </section>

      {/* ── BANDEAU CRAFT ── */}
      <section
        style={{
          background: ACCENT,
          padding: '5rem 0 5rem',
        }}
      >
        <div
          style={{
            maxWidth: 1040,
            margin: '0 auto',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1.25rem',
          }}
        >
          {craftItems.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: '2.5rem 2rem',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                background: 'transparent',
                borderRadius: 0,
                borderLeft: i > 0 ? '1px solid rgba(235,212,168,0.14)' : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '3.5rem',
                  fontWeight: 300,
                  color: '#ebd4a8',
                  opacity: 0.2,
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {item.num}
              </div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#ebd4a8',
                  marginBottom: '0.75rem',
                }}
              >
                {item.title}
              </div>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#ebd4a8',
                  opacity: 0.55,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* L'atelier removed as requested */}

      {/* ── EDITORIAL SECTIONS (one per item) ── */}
      {editorialItems.map((item, idx) => {
        const isDark = idx % 2 === 1
        const sectionBackground = isDark ? ACCENT : '#f7f3ec'
        const titleColor = isDark ? '#ebd4a8' : '#1a1a18'
        const textColor = isDark ? 'rgba(235,212,168,0.82)' : '#53483f'
        const labelColor = isDark ? 'rgba(235,212,168,0.72)' : ACCENT
        const borderColor = isDark ? 'rgba(235,212,168,0.16)' : 'rgba(17,72,97,0.08)'
        const panelBackground = isDark ? 'rgba(235,212,168,0.06)' : '#fffdf8'

        return (
          <section
            key={item.title}
            style={{
              background: sectionBackground,
              padding: '0',
              borderTop: isDark ? '1px solid rgba(235,212,168,0.08)' : '1px solid rgba(17,72,97,0.06)',
              borderBottom: isDark ? '1px solid rgba(235,212,168,0.08)' : '1px solid rgba(17,72,97,0.06)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                maxWidth: 1120,
                margin: '0 auto',
                padding: '4.5rem 2rem',
                display: 'grid',
                gridTemplateColumns: isDark ? '1.05fr 0.95fr' : '0.95fr 1.05fr',
                gap: '2.75rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  order: isDark ? 2 : 1,
                  padding: '1.6rem 1.5rem',
                  background: panelBackground,
                  border: `1px solid ${borderColor}`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 11,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: labelColor,
                      opacity: isDark ? 0.9 : 0.85,
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')} · {item.title}
                  </div>

                  <div
                    style={{
                      width: '3.5rem',
                      height: 1,
                      background: borderColor,
                    }}
                  />
                </div>

                <h2
                  style={{
                    fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
                    fontSize: 'clamp(2.1rem, 3.8vw, 3.6rem)',
                    fontWeight: 300,
                    lineHeight: 1.08,
                    color: titleColor,
                    marginBottom: '1.15rem',
                    letterSpacing: '-0.02em',
                    maxWidth: '12ch',
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '1.03rem',
                    fontWeight: 300,
                    lineHeight: 1.95,
                    color: textColor,
                    maxWidth: '62ch',
                    marginBottom: '1.5rem',
                  }}
                >
                  {item.desc}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      padding: '0.55rem 0.85rem',
                      border: `1px solid ${borderColor}`,
                      color: labelColor,
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Atelier
                  </span>
                  <span
                    style={{
                      padding: '0.55rem 0.85rem',
                      border: `1px solid ${borderColor}`,
                      color: labelColor,
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Sur mesure
                  </span>
                </div>
              </div>

              <div
                style={{
                  order: isDark ? 1 : 2,
                  position: 'relative',
                  minHeight: '26rem',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '0.9rem 0 0 0.9rem',
                    background: isDark ? 'rgba(235,212,168,0.14)' : 'rgba(17,72,97,0.05)',
                    transform: 'rotate(-1.5deg)',
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    marginLeft: isDark ? 0 : '1.1rem',
                    marginRight: isDark ? '1.1rem' : 0,
                    height: '100%',
                    minHeight: '26rem',
                    overflow: 'hidden',
                    background: '#d9d0c2',
                    boxShadow: isDark
                      ? '0 30px 70px rgba(0,0,0,0.22)'
                      : '0 24px 60px rgba(17,72,97,0.12)',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: '1.2rem 1.25rem',
                      background: isDark
                        ? 'linear-gradient(180deg, rgba(17,72,97,0) 0%, rgba(17,72,97,0.92) 100%)'
                        : 'linear-gradient(180deg, rgba(247,243,236,0) 0%, rgba(247,243,236,0.92) 100%)',
                      color: isDark ? '#ebd4a8' : ACCENT,
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 11,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {idx === 0 ? 'Présentation atelier' : idx === 1 ? 'Gestes et matière' : idx === 2 ? 'Conseil et sélection' : idx === 3 ? 'Prestations' : idx === 4 ? 'Exigence' : 'Contact atelier'}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )
      })}

      {/* ── CTA PORTFOLIO ── */}
      <section
        style={{
          background: '#f7f3ec',
          padding: '6rem 5rem 8rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderTop: '1px solid rgba(17,72,97,0.08)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: ACCENT,
              opacity: 0.5,
              marginBottom: '1.5rem',
            }}
          >
            Nos réalisations
          </p>

          <h2
            style={{
              fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#1a1a18',
              maxWidth: '14ch',
              marginBottom: '3rem',
              letterSpacing: '-0.01em',
            }}
          >
            Chaque pièce est une{' '}
            <em style={{ fontStyle: 'italic', color: ACCENT }}>histoire</em> unique.
          </h2>

          <motion.button
            whileHover={{ background: '#1a6a8a' }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 2.5rem',
              background: ACCENT,
              color: '#ebd4a8',
              fontFamily: "'Jost', sans-serif",
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: 'none',
              transition: 'background 0.3s',
            }}
            onClick={() => navigate('/portfolio') }
          >
            Découvrir le portfolio →
          </motion.button>

          <div
            style={{
              width: 1,
              height: '4rem',
              background: '#c9ae78',
              opacity: 0.4,
              marginTop: '4rem',
            }}
          />
        </motion.div>
      </section>
    </div>
  )
}