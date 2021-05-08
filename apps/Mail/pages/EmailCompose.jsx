import { emailService } from '../services/email-service.js'
import { eventBusService } from '../../../app-services/event-bus-service.js'

export class EmailCompose extends React.Component {

    state = {
        email: {
            subject: '',
            body: '',
            author: ''
        }
    }

    componentDidMount() {
        this.checkforNoteText()
    }

    checkforNoteText = () => {
        const { noteText } = this.props
        if (noteText) this.setState({ email: { ...this.state.email, body: noteText } })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({
            email: {
                ...prevState.email,
                [field]: value
            }
        }))
    }

    onSubmitEmail = (ev) => {
        ev.preventDefault()
        emailService.addEmail(this.state.email)
        this.props.hideComposeWindow()
        eventBusService.emit('show-user-msg', 'Email Sent')
    }

    render() {

        const { subject, body, author } = this.state.email;

        return (


            <form className="email-form flex column" onSubmit={this.onSubmitEmail}>
                <div className="compose-header flex justify-between align-center">
                    <h4>New Message</h4>
                    <button className="close-compose-btn" onClick={() => this.props.hideComposeWindow()} ><i className="fa fa-times"></i></button>
                </div>

                <input className="compose-author" type="text" name="author" id="author" placeholder=" To" value={author}
                    onChange={this.handleChange} />
                <input className="compose-subject" type="text" name="subject" id="subject" placeholder=" Subject" value={subject}
                    onChange={this.handleChange} />
                <textarea className="compose-body" name="body" id="body" cols="50" rows="17" value={body} onChange={this.handleChange} />

                <button className="send-email-btn" type="submit" name="send">Send</button>

            </form >

        )

    }

}