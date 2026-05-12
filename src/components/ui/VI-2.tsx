import { Link } from 'react-router-dom'

const FONT_COLOR = '#ebd4a8'

function NameComp({content}: {content: string}) {
    return (
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
            {content}
        </span>
    )
}

export default function VisualIdentity() {
    return (
        <Link
            to="/"
            style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'row',
                gap: 10
            }}
        >
            <span
                style={{
                    fontFamily: "'Accia Piano', 'Cormorant Garamond', serif",
                    fontSize: 30,
                    fontWeight: 'bolder',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: FONT_COLOR,
                    display: 'flex',
                    alignItems: 'center',
                    textShadow: '-2px 2px black',
                }}
            >
                Tapissier décorateur
            </span>
            <div className='flex flex-col gap-2 align-middle justify-content-center'>
                {['Isabelle', 'Mousterou'].map(str => <NameComp content={str} />)}
            </div>
      </Link>
    )
}