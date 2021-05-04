import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailDetails } from '../pages/EmailDetails.jsx'
// import { EmailEdit } from './EmailEdit.jsx'
const { Route, Switch } = ReactRouterDOM

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
                // console.log(emails);
                this.setState({ emails })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    render() {

        const { emails } = this.state
        console.log('render start', emails);

        if (!emails) return <div>Loading...</div>

        return (
            <section className="email-app">
                <h1>eMail App</h1>
                <Switch>
                    {/* <Route component={EmailEdit} path="/email/edit/:id" /> */}
                    <Route component={EmailDetails} path="/email/:id" />
                    <Route path="/email" render={(props) => (
                        <EmailList {...props} emails={emails} onSetFilter={this.onSetFilter} />
                    )} />
                </Switch>
            </section>

        )
    }
}