import { emailService } from '../services/email-service.js'
const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    onDeleteEmail = () => {
        emailService.deleteEmail(this.props.email.id)
            .then(() => {
                this.props.history.push('/email')
            })
    }

    render() {
        const { id, subject, body, isRead, sentAt, author } = this.props.email;
        let tag = author.charAt(0).toUpperCase()

        return (
            <Link to={`/email/${id}`}>
                <li className="email-preview flex align-center justify-between">
                    <p className="tag flex align-center justify-center">{tag}</p>
                    <p>{author}</p>
                    <h4>{subject}</h4>
                    <p>{sentAt}</p>
                    <button className="del-email-btn" onClick={this.onDeleteEmail}><i className="fa fa-trash-o"></i></button>
                </li >
            </Link>
        )

    }
}