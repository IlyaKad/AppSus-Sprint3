import { utilService } from '../../../app-services/util-service.js'
const { Link } = ReactRouterDOM

export function NoteTodos({ note }) {
    const { info: { title, todos }, id } = note;

    return (
        <Link to={`/keep/${id}`}>
            <article className="note-todos">
                <h4>{title}</h4>
                <ul>
                    {todos.map(todo => <li key={utilService.makeId()} >{todo.text}</li>)}
                </ul>
            </article >
        </Link>
    )
}