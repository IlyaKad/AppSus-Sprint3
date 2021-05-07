import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'



export function NoteList({ notes, onRemoveNote, onPinNote, onCopyNote, onChangeNoteBgc }) {

  const DynamicCmp = ({ note }) => {
    switch (note.type) {
      case 'txt':
        return <NoteText note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} onChangeNoteBgc={onChangeNoteBgc} />
      case 'img':
        return <NoteImg note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} onChangeNoteBgc={onChangeNoteBgc} />
      case 'todos':
        return <NoteTodos note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} onChangeNoteBgc={onChangeNoteBgc} />
      default:
        return <p>Yep it's an error...</p>
    }
  }

  return (
    <div className="note-list">
      {notes.map(note => <DynamicCmp key={note.id} note={note} />)}
    </div>
  )
}