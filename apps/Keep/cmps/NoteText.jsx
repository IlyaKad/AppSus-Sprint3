import { NoteButtons } from '../cmps/NoteButtons.jsx'
export function NoteText({ note }) {
    const { info: { title, text }, id } = note;

    return (
        <article className="note-text">
            <h4>{title}</h4>
            {/* <textarea name="text" id={id} value={text}></textarea> */}
            <p>{text}</p>
            <NoteButtons />
        </article >
    )
}