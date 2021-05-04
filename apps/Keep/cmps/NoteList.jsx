import { NoteFilter } from './NoteFilter.jsx'
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onSetFilter }) {
  console.log('notes', notes);
  debugger
  return (
    <p>000</p>
    // <React.Fragment>
    //   <h4>Filter Notes by:</h4>
    //   <NoteFilter notes={notes} onSetFilter={onSetFilter} />
    //   <div className="note-list">
    //     {notes.map(note => <NotePreview note={note} key={note.title} />)}
    //   </div>
    // </React.Fragment>
  )


  // switch(note.type){
  //   case :'txt'
  //   return <NoteTxt note={note}/>
  //   case :'img'
  //   return <NoteImg note={note}/>
  // }
}