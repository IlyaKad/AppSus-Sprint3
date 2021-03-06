const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { EmailApp } from './apps/Mail/pages/EmailApp.jsx'
import { NoteApp } from './apps/Keep/pages/NoteApp.jsx'
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
                        <Route component={NoteApp} path="/keep" />
                        <Route component={AboutUs} path="/about" />
                        <Route component={HomePage} path="/" />
                    </Switch>
                </main>

                <footer>
                    <section className="footer-container column align-center justify-center">
                        <div className="fav-container flex">
                            <i className="fa fa-github"></i>
                            <i className="fa fa-linkedin-square"></i>
                        </div>
                        <p className="corp-p">BenZak and IlyaK Corp. &copy;</p>
                    </section>
                </footer>
            </Router>
        </section>
    )
}