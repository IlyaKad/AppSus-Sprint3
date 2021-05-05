import { NoteButtons } from '../cmps/NoteButtons.jsx'
export function NoteImg({ note }) {
    const { info: { title, url }, id } = note;

    return (
        <article className="note-img">
            <h4>{title}</h4>
            <img src={url} alt="Keep img" />
            <NoteButtons />
        </article >
    )
}