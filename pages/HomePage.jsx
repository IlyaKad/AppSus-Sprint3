const { Link } = ReactRouterDOM
export function HomePage() {
    return <section>
        <h1>Home</h1>
        <section className="hero">
            Hero Goes Here
        </section>
        <p>Visit Our Book Shop <Link to="/book">Let's do it</Link> </p>
    </section>
}