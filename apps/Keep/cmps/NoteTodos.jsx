import { NoteButtons } from '../cmps/NoteButtons.jsx'
export function NoteTodos({ note, onRemoveNote, onPinNote, onCopyNote }) {
    const { info: { title, todos } } = note;

    return (
        <article className="note-todos">
            <h4>{title}</h4>
            <ul>
                {todos.map(todo => <li key={todo.id} >{todo.text}</li>)}
            </ul>
            <NoteButtons note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} />
        </article >
    )
}