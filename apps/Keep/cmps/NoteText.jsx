const { Link } = ReactRouterDOM

export function NoteText({ note }) {
    const { info: { title, text }, id } = note;

    return (
        <Link to={`/keep/${id}`}>
            <article className="note-text">
                <h4>{title}</h4>
                {/* <textarea name="text" id={id} value={text}></textarea> */}
                <p>{text}</p>
            </article >
        </Link>
    )
}