const { Route, Switch } = ReactRouterDOM
import { emailService } from '../services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailSideBar } from '../cmps/EmailSideBar.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailDetails } from '../pages/EmailDetails.jsx'
import { EmailCompose } from '../pages/EmailCompose.jsx'
import { utilService } from '../../../app-services/util-service.js'
import { eventBusService } from '../../../app-services/event-bus-service.js'
import { UserMsg } from '../../../cmps/UserMsg.jsx'


export class EmailApp extends React.Component {

    state = {
        emails: null,
        filterBy: null,
        view: 'inbox',
        isComposed: false,
        noteText: null
    }

    componentDidMount() {
        this.loadEmails()
        this.getTxtFromNote()
    }

    getTxtFromNote = () => {
        const noteToMail = new URLSearchParams(window.location.href).get('note');
        if (noteToMail) this.setState({ noteText: noteToMail, isComposed: true })
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy)
            .then((emails) => {
                this.setState({ emails })
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

    onReadUnreadClick = (emailId) => {
        emailService.toggleReadUnread(emailId)
            .then(this.loadEmails)
    }

    onComposeEmail = () => {
        this.setState({ isComposed: !this.state.isComposed })
    }

    hideComposeWindow = () => {
        this.setState({ isComposed: false })
    }

    getColorForTag = (tag) => {
        let tagColor = utilService.getFourColors(tag)
        return tagColor
    }

    onSetFilter = (ev) => {
        this.setState({ filterBy: ev.target }, this.loadEmails)
    }

    toggleView = (view) => {
        this.setState({ view })
        this.props.history.push('/email')
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

        const { emails, isComposed, noteText } = this.state

        if (!emails) return <div>Loading...</div>
        const length = emails.filter(mail => (!mail.isTrash && !mail.isSent)).length

        return (
            <section className="email-app">
                <EmailFilter onSetFilter={this.onSetFilter} />
                <section className="email-app-container flex">
                    <EmailSideBar emails={this.getEmailsForDisplay()} length={length}
                        onComposeEmail={this.onComposeEmail} toggleView={this.toggleView} />
                    {isComposed && <EmailCompose hideComposeWindow={this.hideComposeWindow} noteText={noteText} />}
                    <Switch>
                        <Route component={EmailDetails} path="/email/:id" />
                        <Route path="/email/" render={() => (

                            <EmailList emails={this.getEmailsForDisplay()}
                                onDeleteEmail={this.onDeleteEmail} onStaredEmail={this.onStaredEmail}
                                toggleStarColor={this.toggleStarColor}
                                getColorForTag={this.getColorForTag} changeEmailIsRead={this.changeEmailIsRead}
                                onReadUnreadClick={this.onReadUnreadClick} />
                        )} />
                    </Switch>
                </section>
                <UserMsg className="user-msg" />
            </section>
        )
    }
}