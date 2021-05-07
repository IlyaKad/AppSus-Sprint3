import { ColorPalette } from './ColorPalette.jsx'
const { Link } = ReactRouterDOM

export function NoteButtons({ note, onRemoveNote, onPinNote, onCopyNote, onChangeNoteBgc, onNoteTextCase }) {

    return (
        <div className="note-btns flex">
            <button className="btn-1"><i className="fa fa-eyedropper"></i><input type="color" className="palette" /></button>
            <button className="btn-1"><i className="fa fa-pencil"></i></button>
            <button className="btn-1" onClick={() => onCopyNote(note)}><i className="fa fa-files-o"></i></button>
            <button className="btn-1" onClick={() => onRemoveNote(note.id)}><i className="fa fa-trash-o"></i></button>
            <button className="btn-1"><Link to={() => onNoteTextCase(note)}><i className="fa fa-envelope"></i></Link></button>
            <button className="btn-1" onClick={() => onPinNote(note.id)}><i className="fa fa-thumb-tack"></i></button>
            <ColorPalette onChangeNoteBgc={onChangeNoteBgc} noteId={note.id} />
        </div>
    )
}