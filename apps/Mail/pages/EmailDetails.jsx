const { Link } = ReactRouterDOM
import { emailService } from '../services/email-service.js'
import { replyService } from '../services/reply-service.js'
import { ReplyToEmail } from '../cmps/ReplyToEmail.jsx'
// import { LongTxt } from '../cmps/LongTxt.jsx'


export class EmailDetails extends React.Component {

    state = {
        email: null,
        replies: null,
        body: null,
        isReplyShown: false
    }

    componentDidMount() {
        // const id = this.props.match.params;
        this.loadEmail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) this.loadEmail()
    }

    updateReplies = () => {
        const id = this.props.match.params
        this.loadReplyList(id)
    }

    // amend this so it will show : |NEW / 1/2/3/4/5/6 days ago/ over a week ago 
    handleDate = (publishedDate) => {
        let diff = new Date().getFullYear() - publishedDate
        if (diff > 10) return `${publishedDate} - Old Email`;
        else if (diff < 1) return `${publishedDate} - New!`;
        else return publishedDate;
    }

    // can be amended to change color of something if needed.
    // changePriceColor = (amount) => {
    //     if (amount > 150) return 'expesive'
    //     if (amount < 20) return 'cheap'
    // }

    // can be amended to participants of mail
    // handleCategories = (categories) => {
    //     return categories.map((category, idx) =>
    //         <span key={category + idx}>{category} </span>)
    // }

    onDeleteEmail = () => {
        emailService.deleteEmail(this.state.email.id)
            .then(() => {
                this.props.history.push('/email')
            })
    }

    // can be amended to load replies

    loadReplyList = (id) => {
        replyService.query(id)
            .then(replies => {
                if (!replies) return
                this.setState({ replies })
            })
    }

    //can be amended to "reply to mail" ?
    addReply = () => {
        const id = this.props.match.params
        this.loadReplyList(id)
    }

    replyShowToggle = () => {
        this.setState({ isReplyShown: !this.state.isReplyShown })
        console.log(this.state.isReplyShown);
    }


    loadEmail = () => {
        const id = this.props.match.params.id
        emailService.getEmailById(id).then(email => {
            this.setState({ email })
        })
        this.loadReplyList(id)
    }

    render() {
        const { email, isReplyShown } = this.state
        if (!email) return <div>Loading...</div>

        const {
            id,
            subject,
            body,
            sentAt,
            author,
        } = email;

        return (
            <div className="email-details column">
                <div className="email-btns flex align-center">

                    {/* <Link to={`/email/${emailService.getNextEmailId(email.id)}`}>Next Email</Link> */}
                </div>
                <div className="email-panel-container flex">
                    <div className="email-info-container" >
                        <h3>{subject}</h3>
                        <small>{author}</small>
                        <p>Sent Date: {this.handleDate(sentAt)}</p>
                    </div>
                </div>

                <section className="email-desc-container column align-center justify-center">
                    <h3>Message : </h3>
                    <p className="email-body flex">{body}</p>
                </section>
                <section className="email-btns-panel flex">
                    <ReplyToEmail isReplyShown={isReplyShown} replyShowToggle={this.replyShowToggle} emailId={email.id}
                        replies={this.state.replies} addReply={this.addReply} email={email} />
                    <button onClick={this.replyShowToggle}>Reply</button>
                    <Link to={`/keep/mail?&mail=${body}`}>Send To Keep</Link>
                    <button onClick={() => this.props.history.push('/email')} > Go back</button>
                    <button className="del-email-btn" onClick={this.onDeleteEmail}><i className="fa fa-trash-o"></i></button>
                </section>
            </div>
        )
    }
}
