import { motion } from 'framer-motion'

import LogoNobilis from '../assets/partners/nobilis.svg'
import LogoCasal from '../assets/partners/casal.png'
import LogoJab from '../assets/partners/jab.png'
import logoGP from '../assets/partners/gp.png'
import LogoAldeco from '../assets/partners/aldeco.png'
import LogoLarsen from '../assets/partners/larsen.svg'
import LogoPt  from '../assets/partners/pt.png'
import LogoThevenon from '../assets/partners/thevenon.png'
import LogoPierreFrey from '../assets/partners/pierre-frey.svg'
import LogoChristianF from '../assets/partners/christian-fischbacher.svg'
import LogoManuelC from '../assets/partners/manuel-canovas.svg'
import LogoLalieD from '../assets/partners/lalie-design.jpg'
import LogoJaneC from '../assets/partners/jane-churchill.svg'

interface PartnerInfos {
    name: string
    link: string
	svgLogo: string | null
	pngLogo: string | null
}

const PARTNERS: Array<PartnerInfos> = [
    { name: 'Nobilis Paris',    	 svgLogo: LogoNobilis, 	  pngLogo: null, 	  	 link: "https://nobilis.fr/fr/" 		   			 },
    { name: 'Casal',      			 svgLogo: null, 		  pngLogo: LogoCasal, 	 link: "https://www.casal.fr" 		   				 },
    { name: 'JAB ANSTOETZ',     	 svgLogo: null, 		  pngLogo: LogoJab,	  	 link: "https://www.jab.de/fr/fr" 	   				 },
    { name: 'GP & J Baker', 		 svgLogo: null, 		  pngLogo: logoGP, 	  	 link: "https://www.gpjbaker.com/fr"    			 },
    { name: 'Aldeco',     			 svgLogo: null, 		  pngLogo: LogoAldeco,	 link: "https://aldeco.pt"	 		   				 },
	{ name: 'Larsen',     			 svgLogo: LogoLarsen,  	  pngLogo: null, 		 link: "https://www.larsenfabrics.com"  			 },
	{ name: 'Prestigious textiles',  svgLogo: null, 		  pngLogo: LogoPt, 		 link: 'https://www.prestigious.co.uk'  			 },
	{ name: 'Thevenon', 			 svgLogo: null,		  	  pngLogo: LogoThevenon, link: 'https://www.thevenon1908.com'   			 },
	{ name: 'Pierre frey',			 svgLogo: LogoPierreFrey, pngLogo: null, 		 link: 'https://www.pierrefrey.com/fr/' 			 },
	{ name: 'Christian Fischbacher', svgLogo: LogoChristianF, pngLogo: null,		 link: 'https://www.christianfischbacher.com/de/en/' },
	{ name: 'Manuel Canovas', 		 svgLogo: LogoManuelC,	  pngLogo: null, 		 link: 'https://www.manuelcanovas.fr'				 },
	{ name: 'Lalie Design',			 svgLogo: LogoLalieD,	  pngLogo: null,		 link: 'https://www.laliedesign.com'				 },
	{ name: 'Jane Churchill',		 svgLogo: LogoJaneC,	  pngLogo: null,		 link: 'https://www.janechurchill.com'				 }
]

/* ─── CONSTANTES ─── */
const ACCENT    = '#114861'
const WARM_BG   = '#f7f3ec'
const MUTED     = '#6b6155'
const DARK_NAVY = '#0a2f3f'

function PartnerCard({ partner }: { partner: PartnerInfos }) {
  const logoSrc = partner.svgLogo ?? partner.pngLogo

  return (
    <motion.a
      href={partner.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textDecoration: 'none',
        background: '#fff',
        border: '1px solid rgba(17,72,97,0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        minHeight: 220,
      }}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={`Logo ${partner.name}`}
          style={{
            maxWidth: '80%',
            maxHeight: 90,
            objectFit: 'contain',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: 100,
            background: 'rgba(17,72,97,0.06)',
          }}
        />
      )}
      {/* <span
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.95rem',
          color: DARK_NAVY,
          textAlign: 'center',
        }}
      >
        {partner.name}
      </span> */}
    </motion.a>
  )
}

export default function Partners()
{
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
            Partenaires
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
            Nos <em style={{ fontStyle: 'italic', color: ACCENT }}>partenaires</em>
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
          Découvrez nos partenaires et fournisseurs.
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
        {PARTNERS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <PartnerCard partner={p} />
          </motion.div>
        ))}
      </div>
    </div>
    )
}