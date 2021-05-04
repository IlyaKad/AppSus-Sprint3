export function EmailReplies(props) {

    const { replies, emailId, email } = props;
    console.log(props);

    if (!replies) {
        return <div className="email-replies no-replies">
            <div>Reply to {email.author} (change later/remove this)</div>
        </div>
    }

    return (
        replies.map(reply => {
            return <div className="email-reply column align-center">
                <h2>{reply.replyAuthor} replied on : (Date:{reply.date})</h2>
                <div className="reply-txt"> His Answer: {reply.replyTxT}</div>
                {/* <button onClick={() => { onRemoveReply(reply.id, emailId) }}
                    className="remove-reply-btn">❌</button> */}
            </div>
        })
    )
}