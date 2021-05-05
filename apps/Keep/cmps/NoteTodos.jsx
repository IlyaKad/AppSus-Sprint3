import { NoteButtons } from '../cmps/NoteButtons.jsx'
export function NoteTodos({ note }) {
    // debugger
    const { info: { title, todos }, id } = note;

    return (
        <article className="note-todos">
            <h4>{title}</h4>
            <ul>
                {todos.map(todo => <li key={todo.id} >{todo.text}456</li>)}
            </ul>
            <NoteButtons />
        </article >
    )
}