const { Link } = ReactRouterDOM

export function EmailPreview({ email, onDeleteEmail, onStaredEmail, getColorForTag, changeEmailIsRead }) {

    const { id, subject, body, isRead, sentAt, author, isStarred } = email;
    let tag = author.charAt(0).toUpperCase()

    const markReadEmails = () => {
        return isRead ? '' : 'bold'
    }

    const toggleStarColor = () => {
        return (isStarred) ? 'gold' : 'grey'

    }

    return (
        <li onClick={() => changeEmailIsRead(email.id)} className="email-preview flex align-center justify-between">
            <Link to={`/email/${id}`}>
                <p style={{ backgroundColor: getColorForTag(tag) }} className="tag flex align-center justify-center">{tag}</p>
                <p>{author}</p>
                <h4 className={markReadEmails()}>{subject}</h4>
                <p>{sentAt}</p>
            </Link>
            <button className="del-email-btn" onClick={(ev) => {
                ev.stopPropagation()
                onDeleteEmail(email.id)
            }
            }><i className="fa fa-trash-o"></i></button>

            <button className={`star-email-btn ${toggleStarColor()}`} onClick={(ev) => {
                ev.stopPropagation()
                onStaredEmail(email.id)
            }}><i className="fa fa-star"></i></button>
        </li >

    )


}