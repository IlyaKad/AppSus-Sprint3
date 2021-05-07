import { NoteButtons } from '../cmps/NoteButtons.jsx'
export function NoteImg({ note, onRemoveNote, onPinNote, onCopyNote, onChangeNoteBgc, onNoteTextCase }) {
    const { info: { title, url }, id } = note;

    return (
        <article className="note-img" style={{ backgroundColor: note.style.backgroundColor }}>
            <h4>{title}</h4>
            <img src={url} alt="Keep img" />
            <NoteButtons note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} onChangeNoteBgc={onChangeNoteBgc} onNoteTextCase={onNoteTextCase} />
        </article >
    )
}