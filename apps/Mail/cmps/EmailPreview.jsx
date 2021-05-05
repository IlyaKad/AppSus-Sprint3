import { utilService } from '../../../app-services/util-service.js'
const { Link } = ReactRouterDOM

export function EmailPreview({ email, onDeleteEmail, onStaredEmail, toggleStarColor, markReadEmails }) {

    const { id, subject, body, isRead, sentAt, author, isStarred } = email;
    let tag = author.charAt(0).toUpperCase()

    return (
        <li className="email-preview flex align-center justify-between">
            <Link to={`/email/${id}`}>
                <p style={{ backgroundColor: utilService.get4DiffColors(tag) }} className="tag flex align-center justify-center">{tag}</p>
                <p>{author}</p>
                <h4 className={markReadEmails(isRead)}>{subject}</h4>
                <p>{sentAt}</p>
            </Link>
            <button className="del-email-btn" onClick={(ev) => {
                ev.stopPropagation()
                onDeleteEmail(email.id)
            }
            }><i className="fa fa-trash-o"></i></button>

            <button className={`star-email-btn ${toggleStarColor(isStarred)}`} onClick={(ev) => {
                ev.stopPropagation()
                onStaredEmail(email.id)
            }
            }><i className="fa fa-star"></i>
            </button>
        </li >

    )


}