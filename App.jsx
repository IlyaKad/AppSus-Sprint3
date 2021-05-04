const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { EmailApp } from './apps/Mail/pages/EmailApp.jsx'
import { KeepApp } from './apps/Keep/pages/KeepApp.jsx'
import { BookApp } from './apps/Books/pages/BookApp.jsx'
import { AboutUs } from './pages/AboutUs.jsx'

export function App() {
    return (
        <section className="main-app">
            <Router>
                <header>
                    <AppHeader />
                </header>

                <main>
                    <Switch>
                        <Route component={BookApp} path="/book" />
                        <Route component={EmailApp} path="/email" />
                        <Route component={KeepApp} path="/keep" />
                        <Route component={AboutUs} path="/about" />
                        <Route component={HomePage} path="/" />
                    </Switch>
                </main>
                
                <footer>
                    <p>BenZak and IlyaK Corp. &copy;</p>
                </footer>
            </Router>
        </section>
    )
}