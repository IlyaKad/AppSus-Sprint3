import { NoteFilter } from './NoteFilter.jsx'
import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

const DynamicCmp = (props) => {
  switch (props.note.type) {
    case 'NoteText':
      return <NoteText {...props} />
    case 'NoteImg':
      return <NoteImg {...props} />
    case 'NoteTodos':
      return <NoteTodos {...props} />
    default:
      return <p>Yep it's error...</p>
  }
}

export function NoteList({ notes, onSetFilter }) {
  return (
    <React.Fragment>
      {/* <h4>Filter Notes by:</h4> */}
      <NoteFilter notes={notes} onSetFilter={onSetFilter} />
      <div className="note-list">
        {notes.map(note => <DynamicCmp note={note} key={note.id} />)}
      </div>
    </React.Fragment>
  )
}