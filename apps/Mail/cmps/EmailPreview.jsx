const { Link } = ReactRouterDOM

export function EmailPreview({ email, onDeleteEmail, onStaredEmail, getColorForTag, changeEmailIsRead, onReadUnreadClick }) {

    const { id, subject, body, isRead, sentAt, author, isStarred } = email;
    let tag = author.charAt(0).toUpperCase()

    const markReadEmails = () => {
        return isRead ? '' : 'bold'
    }

    const toggleStarColor = () => {
        return (isStarred) ? 'gold' : 'grey'

    }

    const showReadUreadIcon = () => {
        return isRead ? 'fa fa-envelope-open' : 'fa fa-envelope'
    }

    return (
        <li onClick={() => changeEmailIsRead(email.id)} className="email-preview flex">
            {/* <div className="email-details-container"> */}
                <Link className="preview-line flex align-center" to={`/email/${id}`}>
                    <p style={{ backgroundColor: getColorForTag(tag) }} className="tag-p tag flex align-center justify-center">{tag}</p>
                    <p className={`author-p ${markReadEmails()}`}>{author}</p>
                    <p className={`subject-p ${markReadEmails()}`}>{subject}</p>
                    <p className={`date-p ${markReadEmails()}`}>{sentAt}</p>
                </Link>
            {/* </div> */}
            <div className="preview-btns-container">
                <button className="del-email-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    onDeleteEmail(email.id)
                }
                }><i className="fa fa-trash-o"></i></button>

                <button className="read-unread-btn" onClick={(ev) => {
                    ev.stopPropagation();
                    { onReadUnreadClick(email.id) }
                }
                }><i className={showReadUreadIcon()}></i></button>

                <button className={`star-email-btn `} onClick={(ev) => {
                    ev.stopPropagation()
                    onStaredEmail(email.id)
                }}><i className={`fa fa-star ${toggleStarColor()}`}></i></button>
            </div>
        </li >

    )


}