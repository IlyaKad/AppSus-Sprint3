import { emailService } from '../services/email-service.js'

export class EmailCompose extends React.Component {

    state = {
        email: {
            subject: '',
            body: '',
            author: ''
        }
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

    }

    render() {

        const { subject, body, author } = this.state;

        return (
            <div className="new-email-container hidden">

                <form className="email-form column" onSubmit={this.onSubmitEmail}>

                    <label htmlFor="author">Send To</label>
                    <input type="text" name="author" id="author" placeholder="email address" value={author} onChange={this.handleChange} />

                    <label htmlFor="subject">Subject</label>
                    <input type="text" name="subject" id="subject" placeholder="subject" value={subject} onChange={this.handleChange} />

                    <label htmlFor="body">Your Reply</label>
                    <textarea name="body" id="body" cols="10" rows="10" value={body} onChange={this.handleChange} />

                    <button type="submit">Send</button>

                </form >

            </div>
        )

    }

}