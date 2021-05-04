const { Link } = ReactRouterDOM

export function EmailPreview({ email }) {

    const { id, subject, body, isRead, sentAt, author } = email;


    return (
        <Link to={`/email/${id}`}>
            <article className="email-preview">
                <h4>{subject}</h4>
                <p>{body}</p>
                <p>Sent By {author}</p>
            </article >
        </Link>
    )
}

