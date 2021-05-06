export function NoteButtons({ note, onRemoveNote, onPinNote, onCopyNote }) {

    return (
        <div className="note-btns flex">
            <button className="btn-1"><i className="fa fa-eyedropper"></i><input type="color" className="palette" name="" id="" /></button>
            <button className="btn-1"><i className="fa fa-pencil"></i></button>
            <button className="btn-1" onClick={() => onCopyNote(note)}><i className="fa fa-files-o"></i></button>
            <button className="btn-1" onClick={() => onRemoveNote(note.id)}><i className="fa fa-trash-o"></i></button>
            <button className="btn-1"><i className="fa fa-envelope"></i></button>
            <button className="btn-1" onClick={() => onPinNote(note.id)}><i className="fa fa-thumb-tack"></i></button>
            {/* <button><i className="fa fa-palette"></i></button> */}
        </div>
    )
}
// onClick={() => changeNoteBgc(note.id)}