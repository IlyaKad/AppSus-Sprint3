import { NoteButtons } from 'cmps/NoteButtons.jsx'
export function NoteTodos({ note, onRemoveNote, onPinNote, onCopyNote, onChangeNoteBgc, onNoteTextCase }) {
    const { info: { title, todos } } = note;

    return (
        <article className="note-todos" style={{ backgroundColor: note.style.backgroundColor }}>
            <h4>{title}</h4>
            <ul>
                {todos.map(todo => <li className={todo.doneAt ? 'done' : ''} key={todo.id} >{todo.text}</li>)}
            </ul>
            <NoteButtons note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} onChangeNoteBgc={onChangeNoteBgc} onNoteTextCase={onNoteTextCase} />
        </article >
    )
}