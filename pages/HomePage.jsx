const { Link } = ReactRouterDOM
export function HomePage() {
    return <section className="hero">
        <section className="hero-p">
            <Link to="/book">Ebook</Link>
            <Link to="/email">Mail</Link>
            <Link to="/keep">Keep</Link>
        </section>
    </section>

}