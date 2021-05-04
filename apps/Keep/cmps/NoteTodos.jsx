const { Link } = ReactRouterDOM

export function NoteTodos({ note }) {
    const { info: { title, todos }, id } = note;

    return (
        <Link to={`/keep/${id}`}>
            <article className="note-todos">
                <h4>{title}</h4>
                <ul>
                {todos.map(todo => <li>{todo.text}</li>)}
                </ul>
            </article >
        </Link>
    )
}