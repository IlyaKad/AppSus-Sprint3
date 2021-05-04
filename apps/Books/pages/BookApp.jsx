import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../pages/BookDetails.jsx'
import { BookEdit } from './BookEdit.jsx'
const { Route, Switch } = ReactRouterDOM

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
                // console.log(books);
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {
        // console.log('RENDER!', this.state.books);
        const { books, selectedBook } = this.state

        if (!books) return <div>Loading...</div>
        return (
            <section className="book-app column align-center">
                <Switch>
                    <Route component={BookEdit} path="/book/edit/:id" />
                    <Route component={BookDetails} path="/book/:id" />
                    <Route path="/book" render={(props) => (
                        <BookList {...props} books={books} onSetFilter={this.onSetFilter} />
                    )} />
                </Switch>
            </section>
        )
    }
}