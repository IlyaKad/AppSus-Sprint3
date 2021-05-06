import { NoteButtons } from '../cmps/NoteButtons.jsx'
export function NoteText({ note, onRemoveNote, onPinNote, onCopyNote }) {
    const { info: { title, text }, id } = note;

    return (
        <article className="note-text">
            <h4>{title}</h4>
            {/* <textarea name="text" id={id} value={text}></textarea> */}
            <p>{text}</p>
            <NoteButtons note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} />
        </article >
    )
}