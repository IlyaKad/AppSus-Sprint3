import { BookFilter } from './BookFilter.jsx'
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onSetFilter }) {
  return (
    <React.Fragment>
      <h4>Filter Books by:</h4>
      <BookFilter books={books} onSetFilter={onSetFilter} />
      <div className="book-list">
        {books.map(book => <BookPreview book={book} key={book.id} />)}
      </div>
    </React.Fragment>
  )


  // switch(note.type){
  //   case :'txt'
  //   return <NoteTxt note={note}/>
  //   case :'img'
  //   return <NoteImg note={note}/>
  // }
}