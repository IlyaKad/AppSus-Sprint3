const { Link } = ReactRouterDOM
import { emailService } from '../services/email-service.js'
import { EmailReplies } from '../cmps/EmailReplies.jsx'


export class EmailDetails extends React.Component {

    state = {
        email: null,
        replies: null,
        body: null,
    }

    componentDidMount() {
        // const id = this.props.match.params;
        this.loadEmail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) this.loadEmail()
    }

    onDeleteEmail = () => {
        emailService.deleteEmail(this.state.email.id)
            .then(() => {
                this.props.history.push('/email')
            })
    }

    loadEmail = () => {
        const id = this.props.match.params.id
        emailService.getEmailById(id).then(email => {
            this.setState({ email })
        })
    }

    render() {
        const { email } = this.state
        if (!email) return <div>Loading...</div>

        const {
            id,
            subject,
            body,
            sentAt,
            author,
        } = email;

        return (
            <div className="email-details ">
                <div className="email-panel-container ">
                    <div className="email-info-container" >
                        <h3>{subject}</h3>
                        <small>{author}</small>
                        <p>Sent Date: {sentAt}</p>
                    </div>
                </div>

                <section className="email-desc-container">
                    <h3>Message : </h3>
                    <p className="email-body">{body}</p>
                </section>
                <section className="email-btns-panel">
                    <button className="goback-email-btn" onClick={() => this.props.history.push('/email')} > Go back</button>
                    <button className="del-email-btn" onClick={this.onDeleteEmail}>
                        <i className="fa fa-trash-o"></i></button>
                </section>
            </div>
        )
    }
}
