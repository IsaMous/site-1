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
    { day: 'Lundi', morning: '9h-12h', afternoon: 'Sur rendez-vous' },
    { day: 'Mardi', morning: '9h-12h', afternoon: '14h-17h' },
    { day: 'Mercredi', morning: '9h-12h', afternoon: '14h-18h' },
    { day: 'Jeudi', morning: '9h-12h', afternoon: 'Sur rendez-vous' },
    { day: 'Vendredi', morning: 'Sur rendez-vous', afternoon: '14h-18h' },
    { day: 'Samedi', morning: '9h-12h', afternoon: '14h-16h' },
    { day: 'Dimanche', morning: 'Fermé', afternoon: 'Fermé' },
  ],
  email: 'isabelle.mousterou-binois@orange.fr',
  phone: '06 20 81 51 58',
  socials: [
    { label: 'Instagram', value: '@isabelle.mousterou' }
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
      variants={{fadeUp}}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={0}
      style={{
        background: '#fff',
        border: '1px solid rgba(17,72,97,0.12)',
        padding: '1.75rem',
        minHeight: 240,
      }}
    >
      <div
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 10,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: ACCENT,
          opacity: 0.55,
          marginBottom: '0.85rem',
        }}
      >
        {eyebrow}
      </div>

      <h2
        style={{
          fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
          fontSize: '1.8rem',
          fontWeight: 300,
          lineHeight: 1.1,
          color: DARK_NAVY,
          marginBottom: '1rem',
        }}
      >
        {title}
      </h2>

      <div
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 300,
          lineHeight: 1.8,
          color: MUTED,
        }}
      >
        {children}
      </div>
    </motion.article>
  )
}

export default function Contact()
{
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
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '5rem 3rem 3rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          alignItems: 'end',
          borderBottom: '1px solid rgba(17,72,97,0.1)',
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <motion.p
            variants={{fadeUp}}
            initial="hidden"
            animate="show"
            custom={0}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 10,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: ACCENT,
              opacity: 0.55,
              marginBottom: '0.85rem',
            }}
          >
            Contact
          </motion.p>

          <motion.h1
            variants={{fadeUp}}
            initial="hidden"
            animate="show"
            custom={1}
            style={{
              fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
              fontSize: 'clamp(2.8rem, 5vw, 4.4rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: DARK_NAVY,
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}
          >
            Parlons de votre <em style={{ fontStyle: 'italic', color: ACCENT }}>projet</em>.
          </motion.h1>

        </div>

        <motion.p
            variants={{fadeUp}}
            initial="hidden"
            animate="show"
            custom={2}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.85,
              color: MUTED,
              maxWidth: '58ch',
            }}
          >
            Une première visite, une restauration délicate ou un simple avis sur une pièce à reprendre,
            cette page rassemble les informations utiles pour nous joindre et préparer votre venue.
          </motion.p>

      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 3rem 5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '1.25rem',
          }}
        >
          <InfoCard eyebrow="Adresse de l’atelier" title="Venir à l’atelier">
            <p>
              Les visites se font idéalement sur rendez-vous afin de prendre le temps d’examiner la pièce et
              d’échanger sur le projet.
            </p>

            <div
              style={{
                marginTop: '1rem',
                border: '1px solid rgba(17,72,97,0.12)',
                background: '#fff',
              }}
            >
              <iframe
                title="Carte de l'atelier"
                src={MAPS_EMBED_URL}
                width="100%"
                height="220"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: 'block' }}
              />
            </div>

            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: ACCENT,
                textDecoration: 'none',
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Ouvrir dans Google Maps
              <span aria-hidden>↗</span>
            </a>

            <p style={{ marginBottom: '0.8rem' }}>
              <br />
              {CONTACT_DETAILS.address[0]}
              <br />
              {CONTACT_DETAILS.address[1]}
              <br />
              {CONTACT_DETAILS.address[2]}
              <br />
              {CONTACT_DETAILS.address[3]}
            </p>

          </InfoCard>

          <InfoCard eyebrow="Horaires d’ouverture"
            title={(
              <>
                Nous sommes actuellement{' '}
                <span style={{ color: openingStatusColor }}>{openingStatusLabel}</span>
              </>
            )}
          >
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  minWidth: 360,
                  borderCollapse: 'collapse',
                  border: '1px solid rgba(17,72,97,0.12)',
                }}
              >
                <thead>
                  <tr style={{ background: 'rgba(17,72,97,0.06)' }}>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '0.55rem 0.7rem',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 10,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: ACCENT,
                        borderBottom: '1px solid rgba(17,72,97,0.12)',
                      }}
                    >
                      Jour
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '0.55rem 0.7rem',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 10,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: ACCENT,
                        borderBottom: '1px solid rgba(17,72,97,0.12)',
                      }}
                    >
                      Matin
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '0.55rem 0.7rem',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 10,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: ACCENT,
                        borderBottom: '1px solid rgba(17,72,97,0.12)',
                      }}
                    >
                      Après-midi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {CONTACT_DETAILS.hours.map((hour) => (
                    <tr key={hour.day}>
                      <td
                        style={{
                          padding: '0.55rem 0.7rem',
                          borderBottom: '1px solid rgba(17,72,97,0.08)',
                          color: DARK_NAVY,
                          fontWeight: 400,
                        }}
                      >
                        {hour.day}
                      </td>
                      <td
                        style={{
                          padding: '0.55rem 0.7rem',
                          borderBottom: '1px solid rgba(17,72,97,0.08)',
                        }}
                      >
                        {hour.morning}
                      </td>
                      <td
                        style={{
                          padding: '0.55rem 0.7rem',
                          borderBottom: '1px solid rgba(17,72,97,0.08)',
                        }}
                      >
                        {hour.afternoon}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfoCard>

          <InfoCard eyebrow="Coordonnées directes" title="Téléphone et mail">
            <p style={{ marginBottom: '0.8rem' }}>
              <span style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, opacity: 0.55, marginBottom: '0.35rem' }}>
                Email
              </span>
              <a href={`mailto:${CONTACT_DETAILS.email}`} style={{ color: DARK_NAVY, textDecoration: 'none' }}>
                {CONTACT_DETAILS.email}
              </a>
            </p>
            <p>
              <span style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, opacity: 0.55, marginBottom: '0.35rem' }}>
                Téléphone
              </span>
              <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`} style={{ color: DARK_NAVY, textDecoration: 'none' }}>
                {CONTACT_DETAILS.phone}
              </a>
            </p>
          </InfoCard>

          <InfoCard eyebrow="Réseaux" title="Suivre l’atelier">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {CONTACT_DETAILS.socials.map((social) => (
                <div
                  key={social.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    paddingBottom: '0.65rem',
                    borderBottom: '1px solid rgba(17,72,97,0.08)',
                  }}
                >
                  <span style={{ color: DARK_NAVY }}>{social.label}</span>
                  <span style={{ color: MUTED, textAlign: 'right' }}>{social.value}</span>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '1.25rem',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              background: ACCENT,
              color: CREAM,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 240,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                  marginBottom: '0.9rem',
                }}
              >
                Préparer votre demande
              </div>
              <h2
                style={{
                  fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                Plus votre demande est précise, plus la réponse l’est aussi.
              </h2>
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', lineHeight: 1.8, opacity: 0.75 }}>
              Une photo de face, une photo de détail, les dimensions et quelques mots sur l’usage suffisent
              souvent pour lancer un premier échange.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(17,72,97,0.12)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  opacity: 0.55,
                  marginBottom: '0.9rem',
                }}
              >
                Besoin de réflexion ?
              </div>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  color: MUTED,
                  marginBottom: '1.5rem',
                }}
              >
                Vous pouvez également revenir aux réalisations ou à la présentation de l’atelier avant de nous
                contacter.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link
                to="/portfolio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.8rem 1.4rem',
                  border: `1px solid ${ACCENT}`,
                  color: ACCENT,
                  background: 'transparent',
                  textDecoration: 'none',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.padding = '0.8rem 1.8rem'
                  e.currentTarget.style.background = ACCENT
                  e.currentTarget.style.color = CREAM
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.padding = '0.8rem 1.4rem'
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