type Props = {
    title?: string
    children: React.ReactNode
}

export default function Section({ title, children }: Props)
{
    return (
        <section className="px-6 py-16 max-w-6xl mx-auto">
            {title &&
                <h2 className="text-2xl font-semibold mb-8">{title}</h2>
            }
            {children}
        </section>
    )
}
