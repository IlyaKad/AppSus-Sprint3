const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM
// import { BookApp } from './pages/BookApp.jsx'
// import { BookDetails } from './pages/BookDetails.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'
// import { BookEdit } from './pages/BookEdit.jsx'
// import { AppHeader } from './cmps/AppHeader.jsx'
// import { LongTxt } from "LongTxt.jsx";

function Home() {
    return <section>
        <h1>Home</h1>
        <section className="hero">
            Hero Goes Here
        </section>
        <p>Visit Our Book Shop <Link to="/book">Let's do it</Link> </p>
    </section>
}

export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>
            <main>
                <Switch>
                    <Route component={BookEdit} path="/book/edit/:id?" />
                    <Route component={BookDetails} path="/book/:id" />
                    <Route component={BookApp} path="/book" />
                    <Route component={AboutUs} path="/about" />
                    <Route component={Home} path="/" />
                </Switch>
            </main>
            <footer>
                BenZak Corp. &copy;
            </footer>
        </Router>
    )
}