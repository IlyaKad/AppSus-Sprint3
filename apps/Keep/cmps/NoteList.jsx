import { utilService } from '../../../app-services/util-service.js'
import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'



export function NoteList({ notes, onRemoveNote, onPinNote, onCopyNote }) {

  const DynamicCmp = ({ note }) => {
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

  return (
    <div className="note-list">
      {notes.map(note => <DynamicCmp key={note.id} note={note} />)}
    </div>
  )
}