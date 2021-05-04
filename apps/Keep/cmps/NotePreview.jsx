const { Link } = ReactRouterDOM

export function NotePreview({ note }) {
    console.log('note', note);
    const { title, text } = note;

    return (
        <Link to={`/note/${title}`}>
            <article className="note-preview">
                <h4>{title}</h4>
                <p>{text}</p>
            </article >
        </Link>
    )
}