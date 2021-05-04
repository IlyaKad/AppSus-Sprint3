import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export class BookApp extends React.Component {
    state = {
        books: null,
        filterBy: null,
    }
    componentDidMount() {
        console.log('Mount!');
        this.loadBooks()
    }

    loadBooks() {
        bookService.query(this.state.filterBy)
            .then((books) => {
                console.log(books);
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {
        console.log('RENDER!', this.state.books);
        const { books, selectedBook } = this.state

        if (!books) return <div>Loading...</div>
        return (
            <section className="book-app column align-center">
                <h4>Filter Books by:</h4>
                <BookFilter books={books} onSetFilter={this.onSetFilter} />
                <BookList books={books} />
            </section>
        )
    }
}