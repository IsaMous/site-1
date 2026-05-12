import { Link } from 'react-router-dom'

const ACCENT = '#114861'

export default function VisualIdentity() {
    return (
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
                style={{
                    fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
                    fontSize: 10,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: ACCENT,
                    fontWeight: 400,
                }}
            >
                Tapissier décorateur
            </span>
            <span
                style={{
                    fontFamily: "Anaktoria, 'Cormorant Garamond', serif",
                    fontSize: 17,
                    fontWeight: 500,
                    color: '#1a1a18',
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                }}
            >
                Isabelle Mousterou
            </span>
      </Link>
    )
}
