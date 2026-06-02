import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import coverImage from '../assets/cover-modified.jpg'
import PresPhoto from '../assets/cover-2-modified.jpg'

const ACCENT = '#114861'

const craftItems = [
  { num: '01', title: 'Réfection de sièges',    desc: 'Anciens - Contemporains' },
  { num: '02', title: 'Confection',              desc: 'Voilages - Rideaux - Coussins - Stores' },
  { num: '03', title: 'Ventes & Fournitures',    desc: "Tissus d'éditeurs - Papiers peints - Mousse - Tringles" },
]

const editorialItems = [
  { title: 'Présentation', desc: 'Installé au cœur de notre atelier, nous donnons vie à vos projets de décoration textile avec exigence et précision. Tapissier décorateur passionné, nous travaillons chaque pièce avec le souci du détail, qu\'il s\'agisse de restaurer un fauteuil ancien ou de créer une ambiance sur mesure pour votre intérieur.', img: PresPhoto },
  { title: 'Savoir-faire', desc: 'Notre expertise repose sur des techniques artisanales maîtrisées et des matériaux sélectionnés avec soin. Du garnissage traditionnel à la pose de tissus contemporains, chaque réalisation est pensée pour allier esthétique, confort et durabilité.', img: PresPhoto },
  { title: 'Atelier',      desc: 'Notre atelier est un lieu de création et de transformation. C\'est ici que chaque projet prend forme, du choix des tissus jusqu\'aux finitions. Nous accueillons nos clients pour échanger, conseiller et construire ensemble des pièces uniques adaptées à leurs envies.', img: PresPhoto },
  { title: 'Prestations',  desc: 'Nous proposons un large éventail de services : réfection de sièges, confection de rideaux et coussins, pose de tentures murales ou encore conseils en décoration textile. Chaque prestation est personnalisée pour répondre au mieux à votre projet.', img: PresPhoto },
  { title: 'Engagement',   desc: 'Nous accordons une attention particulière à la qualité des matériaux et à la durabilité de nos réalisations. Notre objectif est de valoriser votre mobilier et votre intérieur tout en respectant leur histoire et leur caractère.', img: PresPhoto },
  { title: 'Contact',      desc: 'Un projet en tête ou simplement besoin de conseils ? Nous sommes à votre écoute pour vous accompagner à chaque étape. N\'hésitez pas à nous rendre visite à l\'atelier ou à nous contacter pour discuter de vos idées.', img: PresPhoto },
]

const IMG_LABELS = ['Présentation atelier', 'Gestes et matière', 'Conseil et sélection', 'Prestations', 'Exigence', 'Contact atelier']

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: "'Jost', sans-serif", background: '#f7f3ec', color: '#1a1a18' }}
    >

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        className="min-h-screen grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr]"
        style={{ background: ACCENT }}
      >
        {/* Texte */}
        <div className="flex flex-col justify-end px-8 pb-14 pt-32 md:px-16 md:pb-24 lg:pl-20">
          <motion.p
            variants={{ fadeUp }} initial="hidden" animate="show" custom={0}
            className="text-[11px] tracking-[0.28em] uppercase mb-6"
            style={{ fontFamily: "'Jost', sans-serif", color: '#ebd4a8', opacity: 0.7 }}
          >
            Atelier de tapisserie d'ameublement
          </motion.p>

          <motion.h1
            variants={{ fadeUp }} initial="hidden" animate="show" custom={1}
            className="font-light leading-[1.05] tracking-[-0.01em] mb-8"
            style={{
              fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
              fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
              color: '#ebd4a8',
            }}
          >
            L'art de <em style={{ fontStyle: 'italic' }}>restaurer</em>
            <br />ce qui dure.
          </motion.h1>

          <motion.button
            variants={{ fadeUp }} initial="hidden" animate="show" custom={2}
            whileHover={{ backgroundColor: '#ebd4a8', color: ACCENT }}
            className="inline-flex items-center gap-4 px-8 py-3.5 border text-[12px] tracking-[0.18em] uppercase cursor-pointer w-fit transition-[background,color] duration-300"
            style={{ border: '1px solid #ebd4a8', color: '#ebd4a8', background: 'transparent', fontFamily: "'Jost', sans-serif" }}
            onClick={() => navigate('/contact')}
          >
            Nous contacter <span style={{ fontSize: 16 }}>→</span>
          </motion.button>
        </div>

        {/* Photo — masquée sur mobile pour garder l'impact texte */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src={coverImage}
            alt="Atelier de tapisserie d'ameublement"
            className="w-full h-full object-cover block"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(13,58,80,0.18) 0%, rgba(13,58,80,0.08) 40%, rgba(13,58,80,0.28) 100%)' }}
          />
        </div>
      </section>

      {/* ── BANDEAU CRAFT ──────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: ACCENT }}>
        <div className="max-w-[1040px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-0">
          {craftItems.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col justify-center items-start px-8 py-10"
              style={{
                borderLeft: i > 0 ? '1px solid rgba(235,212,168,0.14)' : undefined,
                /* Sur mobile on sépare avec un border-top à la place */
              }}
            >
              {/* Séparateur mobile entre items */}
              {i > 0 && (
                <div className="sm:hidden w-full mb-8" style={{ height: 1, background: 'rgba(235,212,168,0.14)' }} />
              )}
              <div
                className="text-[3.5rem] font-light leading-none mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#ebd4a8', opacity: 0.2 }}
              >
                {item.num}
              </div>
              <div
                className="text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "'Jost', sans-serif", color: '#ebd4a8' }}
              >
                {item.title}
              </div>
              <p
                className="text-[0.88rem] font-light leading-[1.7]"
                style={{ fontFamily: "'Jost', sans-serif", color: '#ebd4a8', opacity: 0.55 }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTIONS ÉDITORIALES ───────────────────────────────── */}
      {editorialItems.map((item, idx) => {
        const isDark          = idx % 2 === 1
        const sectionBg       = isDark ? ACCENT : '#f7f3ec'
        const titleColor      = isDark ? '#ebd4a8' : '#1a1a18'
        const textColor       = isDark ? 'rgba(235,212,168,0.82)' : '#53483f'
        const labelColor      = isDark ? 'rgba(235,212,168,0.72)' : ACCENT
        const borderColor     = isDark ? 'rgba(235,212,168,0.16)' : 'rgba(17,72,97,0.08)'
        const panelBg         = isDark ? 'rgba(235,212,168,0.06)' : '#fffdf8'
        const sectionBorder   = isDark ? '1px solid rgba(235,212,168,0.08)' : '1px solid rgba(17,72,97,0.06)'

        return (
          <section
            key={item.title}
            style={{ background: sectionBg, borderTop: sectionBorder, borderBottom: sectionBorder }}
          >
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`
                max-w-[1120px] mx-auto px-6 py-14 md:py-[4.5rem]
                grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[2.75rem] items-center
              `}
            >
              {/* Panneau texte
                  Sur desktop les sections paires ont le texte à gauche, impaires à droite.
                  Sur mobile on empile toujours texte puis image. */}
              <div
                className={`order-1 ${isDark ? 'md:order-2' : 'md:order-1'} p-6 md:p-[1.6rem_1.5rem] relative`}
                style={{ background: panelBg, border: `1px solid ${borderColor}` }}
              >
                <div className="flex items-baseline justify-between gap-4 mb-5">
                  <div
                    className="text-[11px] tracking-[0.28em] uppercase"
                    style={{ fontFamily: "'Jost', sans-serif", color: labelColor, opacity: isDark ? 0.9 : 0.85 }}
                  >
                    {String(idx + 1).padStart(2, '0')} · {item.title}
                  </div>
                  <div className="w-14 h-px flex-shrink-0" style={{ background: borderColor }} />
                </div>

                <h2
                  className="font-light leading-[1.08] tracking-[-0.02em] mb-5"
                  style={{
                    fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.8rem, 3.8vw, 3.6rem)',
                    color: titleColor,
                    maxWidth: '12ch',
                  }}
                >
                  {item.title}
                </h2>

                <p
                  className="text-[1.03rem] font-light leading-[1.95] mb-6"
                  style={{ fontFamily: "'Jost', sans-serif", color: textColor, maxWidth: '62ch' }}
                >
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  {['Atelier', 'Sur mesure'].map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-2 text-[11px] tracking-[0.14em] uppercase"
                      style={{ border: `1px solid ${borderColor}`, color: labelColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Panneau image */}
              <div
                className={`order-2 ${isDark ? 'md:order-1' : 'md:order-2'} relative min-h-[20rem] md:min-h-[26rem]`}
              >
                {/* Décor ombre décalée */}
                <div
                  className="absolute"
                  style={{
                    inset: '0.9rem 0 0 0.9rem',
                    background: isDark ? 'rgba(235,212,168,0.14)' : 'rgba(17,72,97,0.05)',
                    transform: 'rotate(-1.5deg)',
                  }}
                />
                <div
                  className="relative h-full min-h-[20rem] md:min-h-[26rem] overflow-hidden"
                  style={{
                    marginLeft: isDark ? 0 : '1.1rem',
                    marginRight: isDark ? '1.1rem' : 0,
                    background: '#d9d0c2',
                    boxShadow: isDark ? '0 30px 70px rgba(0,0,0,0.22)' : '0 24px 60px rgba(17,72,97,0.12)',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover block"
                  />
                  <div
                    className="absolute left-0 right-0 bottom-0 px-5 py-4 text-[11px] tracking-[0.24em] uppercase"
                    style={{
                      background: isDark
                        ? 'linear-gradient(180deg, rgba(17,72,97,0) 0%, rgba(17,72,97,0.92) 100%)'
                        : 'linear-gradient(180deg, rgba(247,243,236,0) 0%, rgba(247,243,236,0.92) 100%)',
                      color: isDark ? '#ebd4a8' : ACCENT,
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    {IMG_LABELS[idx]}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )
      })}

      {/* ── CTA PORTFOLIO ──────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:py-32 flex flex-col items-center text-center border-t border-[rgba(17,72,97,0.08)]"
        style={{ background: '#f7f3ec' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <p
            className="text-[11px] tracking-[0.28em] uppercase mb-6"
            style={{ fontFamily: "'Jost', sans-serif", color: ACCENT, opacity: 0.5 }}
          >
            Nos réalisations
          </p>

          <h2
            className="font-light leading-[1.2] tracking-[-0.01em] mb-12"
            style={{
              fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              color: '#1a1a18',
              maxWidth: '14ch',
            }}
          >
            Chaque pièce est une{' '}
            <em style={{ fontStyle: 'italic', color: ACCENT }}>histoire</em> unique.
          </h2>

          <motion.button
            whileHover={{ background: '#1a6a8a' }}
            className="inline-flex items-center gap-4 px-10 py-4 text-[12px] tracking-[0.18em] uppercase cursor-pointer border-none transition-[background] duration-300"
            style={{
              background: ACCENT,
              color: '#ebd4a8',
              fontFamily: "'Jost', sans-serif",
            }}
            onClick={() => navigate('/portfolio')}
          >
            Découvrir le portfolio →
          </motion.button>

          <div className="w-px h-16 mt-16 opacity-40" style={{ background: '#c9ae78' }} />
        </motion.div>
      </section>
    </div>
  )
}