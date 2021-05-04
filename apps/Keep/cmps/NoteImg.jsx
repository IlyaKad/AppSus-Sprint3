const { Link } = ReactRouterDOM

export function NoteImg({ note }) {
    const { info: { title, url }, id } = note;

    return (
        <Link to={`/keep/${id}`}>
            <article className="note-img">
                <h4>{title}</h4>
                <img src={url} alt="Keep img" />
            </article >
        </Link>
    )
}