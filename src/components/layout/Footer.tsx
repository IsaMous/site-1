export default function Footer()
{
    return (
        <footer
            style={{
            background: '#0a2f3f',
            padding: '2.5rem 5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            }}
        >
            <span
                style={{
                    fontFamily: "'Anaktoria', 'Cormorant Garamond', serif",
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    color: '#ebd4a8',
                    opacity: 0.5,
                }}
            >
                Isabelle Mousterou
            </span>
            <span
                style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    color: '#ebd4a8',
                    opacity: 0.3,
                }}
            >
                © {new Date().getFullYear()} - Atelier de tapisserie
            </span>
      </footer>
    )
}
