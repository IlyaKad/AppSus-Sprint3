import { replyService } from '../services/reply-service.js'
import { EmailReplies } from './EmailReplies.jsx'

export class ReplyToEmail extends React.Component {

    state = {
        recipient: this.props.email.author,
        date: '2021-03-04',
        subject: this.props.email.subject,
        replyBody: ''
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const val = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ ...this.state, [field]: val })
    }

    containerShowToggle = () => {
        if (!this.props.isReplyShown) return 'hidden'
        else return ''
    }

    onSubmitReply = (ev) => {
        ev.preventDefault();
        const { recipient, date, subject, replyBody } = this.state
        const { emailId } = this.props
        replyService.addReply(recipient, date, subject, replyBody, emailId)
            .then(addedReply => {
                this.props.addReply(addedReply); //need to amend this func as in the props
            })
        this.setState({
            recipient: '',
            date: '2021-03-04',
            subject: '',
            replyBody: '',
        })
        this.props.replyShowToggle()
    }

    render() {

        const { recipient, date, subject, replyBody } = this.state;

        return (
            <div className={`replies-container ${this.containerShowToggle()} `} >

                <form className="reply-form column" onSubmit={this.onSubmitReply}>

                    <label htmlFor="recipient">Reply To</label>
                    <input type="text" name="recipient" id="recipient" placeholder="email address" value={recipient} onChange={this.handleChange} />

                    <label htmlFor="recipient">Subject</label>
                    <input type="text" name="subject" id="subject" placeholder="subject" value={subject} onChange={this.handleChange} />

                    <label htmlFor="replyBody">Your Reply</label>
                    <textarea name="replyBody" id="replyBody" cols="10" rows="10" value={replyBody} onChange={this.handleChange} />

                    <button type="submit">Send</button>

                </form >
                <div>

                    <EmailReplies replies={this.props.replies} emailId={this.props.emailId} email={this.props.email} />
                    {/* <EmailReplies replies={this.props.replies}
                        emailId={this.props.emailId} onRemoveReply={this.props.onRemoveReply} /> */}
                </div>
            </div >
        )

    }

}