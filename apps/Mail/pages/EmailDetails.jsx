const { Link } = ReactRouterDOM
import { emailService } from '../services/email-service.js'
import { replyService } from '../services/reply-service.js'
import { ReplyToEmail } from '../cmps/ReplyToEmail.jsx'
// import { LongTxt } from '../cmps/LongTxt.jsx'


export class EmailDetails extends React.Component {

    state = {
        isRead: false,
        email: null,
        replies: null,
        body: null
    }

    componentDidMount() {
        // console.log(this.props.match.params);
        const id = this.props.match.params;
        this.loadEmail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) this.loadEmail()
    }

    updateReplies = () => {
        const id = this.props.match.params
        this.loadReplyList(id)
    }

    // toggleIsShown = () => {
    //     this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    // }

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

    // can i use this to delete email preview? ?
    // onRemoveReview = (reviewId, emailId) => {
    //     reviewService.removeReview(reviewId, emailId)
    //     this.loadReviewList(emailId)
    // }

    loadEmail = () => {
        const id = this.props.match.params.id
        emailService.getEmailById(id).then(email => {
            this.setState({ email })
        })
        this.loadReplyList(id)
    }

    render() {
        const { isRead } = this.state
        const { email } = this.state
        if (!email) return <div>Loading...</div>

        const {
            id,
            subject,
            body,
            // isRead,
            sentAt,
            author,
        } = email;

        return (
            <div className="email-details column align-center">
                <div className="email-btns flex align-center">
                    <button onClick={() => this.props.history.push('/email')} > Go back</button>
                    <Link to={`/email/edit/${email.id}`}>Reply</Link>
                    <button onClick={this.onDeleteEmail}>Delete Email</button>
                    {/* <Link to={`/email/${emailService.getNextEmailId(email.id)}`}>Next Email</Link> */}
                </div>
                <div className="email-panel-container flex">
                    {/* <img src={thumbnail} alt="" /> */}
                    <div className="email-info-container" >

                        <h3>{subject} / <small>{author}</small></h3>
                        {/* <p>Email participants : {this.handleCategories(categories)}</p> */}

                        <p>Sent Date: {this.handleDate(sentAt)}</p>
                    </div>
                </div>

                <section className="email-desc-container column align-center justify-center">
                    <h3>Message : </h3> {body}
                </section>
                <section className="replies-section column">
                    <ReplyToEmail emailId={email.id} replies={this.state.replies} addReply={this.addReply} email={email} />
                    {/* <ReplyToEmail emailId={email.id} replies={this.state.replies} addReply={this.addReply} onRemoveReview={this.onRemoveReview} /> */}
                </section>
            </div>
        )
    }
}
