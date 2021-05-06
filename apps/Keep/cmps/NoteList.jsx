
import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'


const DynamicCmp = ({ note, onRemoveNote, onPinNote, onCopyNote }) => {
  switch (note.type) {
    case 'txt':
      return <NoteText note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} />
    case 'img':
      return <NoteImg note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} />
    case 'todos':
      return <NoteTodos note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} />
    default:
      return <p>Yep it's an error...</p>
  }
}

export function NoteList({ notes, onRemoveNote, onPinNote, onCopyNote }) {
  return (
    <div className="note-list">
      {notes.map(note => <DynamicCmp key={note.id} note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onCopyNote={onCopyNote} />)}
    </div>
  )
}