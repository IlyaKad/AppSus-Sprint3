import { NoteFilter } from './NoteFilter.jsx'
import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteCreator } from './NoteCreator.jsx'

// function NoteText({ note }) {
//   const { info: { title, text }, id } = note;

//   return (
//     <Link to={`/keep/${id}`}>
//       <article className="note-text">
//         <h4>{title}</h4>
//         {/* <textarea name="text" id={id} value={text}></textarea> */}
//         <p>{text}</p>
//       </article >
//     </Link>
//   )
// }

const DynamicCmp = (props) => {
  switch (props.note.type) {
    case 'NoteText':
      return <NoteText {...props} />
    case 'NoteImg':
      return <NoteImg {...props} />
    case 'NoteTodos':
      return <NoteTodos {...props} />
    default:
      return <p>Yep it's an error...</p>
  }
}

export function NoteList({ notes, onSetFilter }) {
  return (
    <React.Fragment>
      {/* <h4>Filter Notes by:</h4> */}
      <NoteFilter notes={notes} onSetFilter={onSetFilter} />
      <NoteCreator />
      <div className="note-list">
        {notes.map(note => <DynamicCmp note={note} key={note.id} />)}
      </div>
    </React.Fragment>
  )
}