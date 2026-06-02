import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ACCENT = '#114861'
const CREAM = '#ebd4a8'
const WARM_BG = '#f7f3ec'
const MUTED = '#6b6155'
const DARK_NAVY = '#0a2f3f'
const MAPS_QUERY = 'Tapissier Décorateur Isabelle Mousterou, 126 Av. Marechal Leclerc, 84120 Pertuis, France'
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`
const MAPS_LINK_URL = 'https://www.google.com/maps/place/Tapissier+Décorateur+Isabelle+Mousterou/@43.692745,5.503248,2829m/data=!3m1!1e3!4m15!1m8!3m7!1s0x12ca271eba96a287:0x8f9f003466375399!2s126+Av.+Maréchal+Leclerc,+84120+Pertuis,+France!3b1!8m2!3d43.6927446!4d5.5032484!16s%2Fg%2F11f6fz7bf9!3m5!1s0x12ca272574ef7563:0x45447d0854428ed4!8m2!3d43.6927446!4d5.5032484!16s%2Fg%2F11k_xnr2w9?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D'

const CONTACT_DETAILS = {
  address: ['Tapissier Décorateur Isabelle Mousterou', '126 Av. Maréchal Leclerc', '84120 Pertuis', 'France'],
  hours: [
    { day: 'Lundi',    morning: '9h-12h',          afternoon: 'Sur rendez-vous' },
    { day: 'Mardi',    morning: '9h-12h',          afternoon: '14h-17h' },
    { day: 'Mercredi', morning: '9h-12h',          afternoon: '14h-18h' },
    { day: 'Jeudi',    morning: '9h-12h',          afternoon: 'Sur rendez-vous' },
    { day: 'Vendredi', morning: 'Sur rendez-vous', afternoon: '14h-18h' },
    { day: 'Samedi',   morning: '9h-12h',          afternoon: '14h-16h' },
    { day: 'Dimanche', morning: 'Fermé',            afternoon: 'Fermé' },
  ],
  email: 'isabelle.mousterou-binois@orange.fr',
  phone: '06 20 81 51 58',
  socials: [
    { label: 'Instagram', value: '@isabelle.mousterou' },
  ],
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const OPENING_SLOTS: Record<number, Array<{ start: number; end: number }>> = {
  1: [{ start: 9 * 60, end: 12 * 60 }],
  2: [{ start: 9 * 60, end: 12 * 60 }, { start: 14 * 60, end: 17 * 60 }],
  3: [{ start: 9 * 60, end: 12 * 60 }, { start: 14 * 60, end: 18 * 60 }],
  4: [{ start: 9 * 60, end: 12 * 60 }],
  5: [{ start: 14 * 60, end: 18 * 60 }],
  6: [{ start: 9 * 60, end: 12 * 60 }, { start: 14 * 60, end: 16 * 60 }],
  0: [],
}

function isWorkshopOpen(now: Date) {
  const day = now.getDay()
  const slots = OPENING_SLOTS[day] ?? []
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  return slots.some((slot) => currentMinutes >= slot.start && currentMinutes < slot.end)
}

function InfoCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <motion.article
      variants={{ fadeUp }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={0}
      className="bg-white border border-[rgba(17,72,97,0.12)] p-6 sm:p-7 min-h-[240px]"
    >
      <div
        className="mb-3 text-[10px] tracking-[0.24em] uppercase"
        style={{ fontFamily: "'Jost', sans-serif", color: ACCENT, opacity: 0.55 }}
      >
        {eyebrow}
      </div>

      <h2
        className="text-[1.5rem] sm:text-[1.8rem] font-light leading-[1.1] mb-4"
        style={{ fontFamily: "'Accia Piano', 'Cormorant Garamond', serif", color: DARK_NAVY }}
      >
        {title}
      </h2>

      <div
        className="text-[0.95rem] font-light leading-[1.8]"
        style={{ fontFamily: "'Jost', sans-serif", color: MUTED }}
      >
        {children}
      </div>
    </motion.article>
  )
}

export default function Contact() {
  const [isOpenNow, setIsOpenNow] = useState(() => isWorkshopOpen(new Date()))

  useEffect(() => {
    const updateStatus = () => setIsOpenNow(isWorkshopOpen(new Date()))
    updateStatus()
    const intervalId = window.setInterval(updateStatus, 60000)
    return () => window.clearInterval(intervalId)
  }, [])

  const openingStatusLabel = isOpenNow ? 'ouvert' : 'fermé'
  const openingStatusColor = isOpenNow ? '#1f7a3f' : '#b42318'

  return (
    <div style={{ background: WARM_BG, minHeight: '100vh', paddingTop: 72, color: '#1a1a18' }}>

      {/* ── EN-TÊTE ──────────────────────────────────────────────── */}
      <section
        className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-12
                   grid grid-cols-1 gap-6
                   border-b border-[rgba(17,72,97,0.1)]"
      >
        <div className="max-w-[720px]">
          <motion.p
            variants={{ fadeUp }}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-3 text-[10px] tracking-[0.26em] uppercase"
            style={{ fontFamily: "'Jost', sans-serif", color: ACCENT, opacity: 0.55 }}
          >
            Contact
          </motion.p>

          <motion.h1
            variants={{ fadeUp }}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-light leading-[1.05] tracking-[-0.01em] mb-4"
            style={{
              fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
              color: DARK_NAVY,
            }}
          >
            Parlons de votre{' '}
            <em style={{ fontStyle: 'italic', color: ACCENT }}>projet</em>.
          </motion.h1>
        </div>
      </section>

      {/* ── CONTENU ──────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-10 pb-20">

        {/* Grille 4 InfoCards : 1 col mobile → 2 col sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Adresse */}
          <InfoCard eyebrow="Adresse de l'atelier" title="Venir à l'atelier">
            <p>
              Les visites se font idéalement sur rendez-vous afin de prendre le temps d'examiner
              la pièce et d'échanger sur le projet.
            </p>

            <div className="mt-4 border border-[rgba(17,72,97,0.12)] bg-white">
              <iframe
                title="Carte de l'atelier"
                src={MAPS_EMBED_URL}
                width="100%"
                height="200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: 'block' }}
              />
            </div>

            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-[0.45rem] no-underline text-[11px] tracking-[0.16em] uppercase"
              style={{ fontFamily: "'Jost', sans-serif", color: ACCENT }}
            >
              Ouvrir dans Google Maps
              <span aria-hidden>↗</span>
            </a>

            <p className="mt-3 mb-2">
              {CONTACT_DETAILS.address[0]}<br />
              {CONTACT_DETAILS.address[1]}<br />
              {CONTACT_DETAILS.address[2]}<br />
              {CONTACT_DETAILS.address[3]}
            </p>
          </InfoCard>

          {/* Horaires */}
          <InfoCard
            eyebrow="Horaires d'ouverture"
            title={(
              <>
                Nous sommes actuellement{' '}
                <span style={{ color: openingStatusColor }}>{openingStatusLabel}</span>
              </>
            )}
          >
            <div style={{ overflowX: 'auto' }}>
              <table
                className="w-full border-collapse border border-[rgba(17,72,97,0.12)]"
                style={{ minWidth: 300 }}
              >
                <thead>
                  <tr style={{ background: 'rgba(17,72,97,0.06)' }}>
                    {['Jour', 'Matin', 'Après-midi'].map((h) => (
                      <th
                        key={h}
                        className="text-left px-2 py-2 text-[10px] tracking-[0.16em] uppercase border-b border-[rgba(17,72,97,0.12)]"
                        style={{ fontFamily: "'Jost', sans-serif", color: ACCENT }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONTACT_DETAILS.hours.map((hour) => (
                    <tr key={hour.day}>
                      <td
                        className="px-2 py-2 border-b border-[rgba(17,72,97,0.08)] font-medium"
                        style={{ color: DARK_NAVY }}
                      >
                        {hour.day}
                      </td>
                      <td className="px-2 py-2 border-b border-[rgba(17,72,97,0.08)]">{hour.morning}</td>
                      <td className="px-2 py-2 border-b border-[rgba(17,72,97,0.08)]">{hour.afternoon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfoCard>

          {/* Téléphone & mail */}
          <InfoCard eyebrow="Coordonnées directes" title="Téléphone et mail">
            <p className="mb-3">
              <span
                className="block text-[10px] tracking-[0.18em] uppercase mb-1"
                style={{ fontFamily: "'Jost', sans-serif", color: ACCENT, opacity: 0.55 }}
              >
                Email
              </span>
              <a
                href={`mailto:${CONTACT_DETAILS.email}`}
                className="no-underline break-all"
                style={{ color: DARK_NAVY }}
              >
                {CONTACT_DETAILS.email}
              </a>
            </p>
            <p>
              <span
                className="block text-[10px] tracking-[0.18em] uppercase mb-1"
                style={{ fontFamily: "'Jost', sans-serif", color: ACCENT, opacity: 0.55 }}
              >
                Téléphone
              </span>
              <a
                href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`}
                className="no-underline"
                style={{ color: DARK_NAVY }}
              >
                {CONTACT_DETAILS.phone}
              </a>
            </p>
          </InfoCard>

          {/* Réseaux */}
          <InfoCard eyebrow="Réseaux" title="Suivre l'atelier">
            <div className="grid gap-3">
              {CONTACT_DETAILS.socials.map((social) => (
                <div
                  key={social.label}
                  className="flex justify-between gap-4 pb-2 border-b border-[rgba(17,72,97,0.08)]"
                >
                  <span style={{ color: DARK_NAVY }}>{social.label}</span>
                  <span className="text-right" style={{ color: MUTED }}>{social.value}</span>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>

        {/* ── Bandeau bas : 1 col mobile → 2 col sm+ ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] gap-5"
        >
          {/* Bloc bleu */}
          <div
            className="flex flex-col justify-between min-h-[240px] p-7 sm:p-8"
            style={{ background: ACCENT, color: CREAM }}
          >
            <div>
              <div
                className="text-[10px] tracking-[0.24em] uppercase opacity-60 mb-3"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Préparer votre demande
              </div>
              <h2
                className="text-[1.6rem] sm:text-[2rem] font-light leading-[1.1] mb-4"
                style={{ fontFamily: "'Accia Piano', 'Cormorant Garamond', serif" }}
              >
                Plus votre demande est précise, plus la réponse l'est aussi.
              </h2>
            </div>
            <p
              className="text-[0.95rem] leading-[1.8] opacity-75"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Une photo de face, une photo de détail, les dimensions et quelques mots sur l'usage
              suffisent souvent pour lancer un premier échange.
            </p>
          </div>

          {/* Bloc blanc */}
          <div
            className="flex flex-col justify-between p-7 sm:p-8 border border-[rgba(17,72,97,0.12)] bg-white"
          >
            <div>
              <div
                className="text-[10px] tracking-[0.24em] uppercase mb-3"
                style={{ fontFamily: "'Jost', sans-serif", color: ACCENT, opacity: 0.55 }}
              >
                Besoin de réflexion ?
              </div>
              <p
                className="text-[0.95rem] leading-[1.8] mb-6"
                style={{ fontFamily: "'Jost', sans-serif", color: MUTED }}
              >
                Vous pouvez également revenir aux réalisations ou à la présentation de l'atelier
                avant de nous contacter.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-5 py-3 border no-underline
                           text-[11px] tracking-[0.16em] uppercase transition-[padding,background,color] duration-300"
                style={{
                  borderColor: ACCENT,
                  color: ACCENT,
                  background: 'transparent',
                  fontFamily: "'Jost', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '1.8rem'
                  e.currentTarget.style.paddingRight = '1.8rem'
                  e.currentTarget.style.background = ACCENT
                  e.currentTarget.style.color = CREAM
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '1.25rem'
                  e.currentTarget.style.paddingRight = '1.25rem'
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = ACCENT
                }}
              >
                Voir les réalisations
              </Link>
            </div>
          </div>
        </motion.section>
      </section>
    </div>
  )
}