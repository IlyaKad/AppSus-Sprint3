
import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'


const DynamicCmp = (props) => {
  switch (props.note.type) {
    case 'txt':
      return <NoteText {...props} />
    case 'img':
      return <NoteImg {...props} />
    case 'todos':
      return <NoteTodos {...props} />
    default:
      return <p>Yep it's an error...</p>
  }
}

export function NoteList({ notes }) {
  return (
    <div className="note-list">
      {notes.map(note => <DynamicCmp note={note} key={note.id} />)}
    </div>
  )
}