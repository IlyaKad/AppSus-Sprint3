const { Route, Switch } = ReactRouterDOM
import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailSideBar } from '../cmps/EmailSideBar.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailDetails } from '../pages/EmailDetails.jsx'
import { EmailCompose } from '../pages/EmailCompose.jsx'
import { utilService } from '../../../app-services/util-service.js'
import { eventBusService } from '../../../app-services/event-bus-service.js'
import { UserMsg } from '../cmps/UserMsg.jsx'

export class EmailApp extends React.Component {

    state = {
        emails: null,
        filterBy: null,
        view: 'inbox',
        isComposed: false
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy)
            .then((emails) => {
                this.setState({ emails })
                // let viewEmails = this.getEmailsForDisplay()
                // eventBusService.emit('email-count', viewEmails.length)
            })
    }

    onDeleteEmail = (emailId) => {
        emailService.deleteEmail(emailId)
            .then(this.loadEmails)
            .then(eventBusService.emit('show-user-msg', 'Email Deleted'))
    }

    onStaredEmail = (emailId) => {
        emailService.starEmail(emailId)
            .then(this.loadEmails)
            .then(eventBusService.emit('show-user-msg', 'Email Starred'))
    }

    changeEmailIsRead = (emailId) => {
        emailService.updateEmail(emailId)
            .then(this.loadEmails)
    }

    onComposeEmail = () => {
        this.setState({ isComposed: !this.state.isComposed })
    }

    hideComposeWindow = () => {
        this.setState({ isComposed: false })
        eventBusService.emit('show-user-msg', 'Email Sent')
    }



    getColorForTag = (tag) => {
        let tagColor = utilService.getFourColors(tag)
        return tagColor
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    toggleView = (view) => {
        this.setState({ view })
    }

    getEmailsForDisplay = () => {
        const { emails, view } = this.state

        switch (view) {
            case 'inbox': return emails.filter(mail => (!mail.isTrash && !mail.isSent))
            case 'trash': return emails.filter(mail => mail.isTrash)
            case 'starred': return emails.filter(mail => (mail.isStarred && !mail.isTrash))
            case 'sent': return emails.filter(mail => (mail.isSent && !mail.isTrash))
            default:
                break;
        }
    }

    render() {

        const { emails, view, isComposed } = this.state
        if (!emails) return <div>Loading...</div>
        const length = emails.filter(mail => (!mail.isTrash && !mail.isSent)).length

        return (
            <section className="email-app">
                <EmailFilter emails={this.state.emails} onSetFilter={this.onSetFilter} />
                <section className="flex">
                    <UserMsg />
                    <EmailSideBar emails={this.getEmailsForDisplay()} length={length}
                        onComposeEmail={this.onComposeEmail} toggleView={this.toggleView} />
                    {isComposed && <EmailCompose hideComposeWindow={this.hideComposeWindow} />}
                    <Switch>
                        <Route component={EmailDetails} path="/email/:id" />
                        <Route path="/email" render={() => (

                            <EmailList emails={this.getEmailsForDisplay()} onSetFilter={this.onSetFilter}
                                onDeleteEmail={this.onDeleteEmail} onStaredEmail={this.onStaredEmail}
                                toggleStarColor={this.toggleStarColor}
                                getColorForTag={this.getColorForTag} changeEmailIsRead={this.changeEmailIsRead} />
                        )} />
                    </Switch>
                </section>
            </section>
        )
    }
}