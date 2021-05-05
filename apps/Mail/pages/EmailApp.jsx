import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailSideBar } from '../cmps/EmailSideBar.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailDetails } from '../pages/EmailDetails.jsx'
// import { EmailEdit } from './EmailEdit.jsx'
const { Route, } = ReactRouterDOM

export class EmailApp extends React.Component {

    state = {
        emails: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails() {
        emailService.query(this.state.filterBy)
            .then((emails) => {
                this.setState({ emails })
            })
    }
  

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    render() {

        const { emails } = this.state

        if (!emails) return <div>Loading...</div>

        return (
            <section className="email-app">

                <Route component={EmailDetails} path="/email/:id" />

                <EmailFilter emails={this.state.emails} onSetFilter={this.onSetFilter} />

                <section className="flex">
                    <EmailSideBar />

                    <EmailList emails={emails} onSetFilter={this.onSetFilter} />

                </section>

            </section>

        )
    }
}