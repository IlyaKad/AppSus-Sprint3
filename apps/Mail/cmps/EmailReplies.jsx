export function EmailReplies(props) {

    const { replies, emailId, email } = props;

    if (!replies) {
        return <div className="email-replies no-replies">
            <div>Reply to {email.author}</div>
        </div>
    }

    return (
        replies.map(reply => {
            return <div className="email-reply column align-center">
                <p>You replied on : (Date:{reply.date})</p>
                <div className="reply-txt"> Message: {reply.replyBody}</div>
            </div>
        })
    )
}