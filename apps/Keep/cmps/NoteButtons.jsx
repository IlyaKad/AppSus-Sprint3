const { Link } = ReactRouterDOM

export function NoteButtons({ note, onRemoveNote, onPinNote, onCopyNote }) {

    return (
        <div className="note-btns flex">
            <button className="btn-1"><i className="fa fa-eyedropper"></i><input type="color" className="palette" /></button>
            <button className="btn-1"><i className="fa fa-pencil"></i></button>
            <button className="btn-1" onClick={() => onCopyNote(note)}><i className="fa fa-files-o"></i></button>
            <button className="btn-1" onClick={() => onRemoveNote(note.id)}><i className="fa fa-trash-o"></i></button>
            <Link to={`/email/note?&note=${'test'}`}><button className="btn-1"><i className="fa fa-envelope"></i></button></Link>
            <button className="btn-1" onClick={() => onPinNote(note.id)}><i className="fa fa-thumb-tack"></i></button>
            <div className="colors-palette">
                <span style={{ backgroundColor: "#5bd7c6" }}></span>
                <span style={{ backgroundColor: "#5bd76a" }}></span>
                <span style={{ backgroundColor: "#d5d75b" }}></span>
                <span style={{ backgroundColor: "#f29647" }}></span>
                <span style={{ backgroundColor: "#e36060" }}></span>
                <span style={{ backgroundColor: "#ec58e0" }}></span>
                <span style={{ backgroundColor: "#c97aea" }}></span>
                <span style={{ backgroundColor: "#7c7aea" }}></span>
            </div>
        </div>
    )
}
// onClick={() => changeNoteBgc(note.id)}
