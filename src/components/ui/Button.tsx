type Props = {
    children: React.ReactNode
}

export default function Button({ children }: Props)
{
    return (
        <button className="px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition">
        {children}
        </button>
    )
}
