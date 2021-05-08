import { bookService } from 'services/book-service.js'

export class BookEdit extends React.Component {
    state = {
        book: ''
    }


    componentDidMount() {
        this.loadBook()
    }
    
    loadBook() {
        const { id } = this.props.match.params
        if (!id) return
        bookService.getBookById(id).then(book => { 
            this.setState({ book: book })
        })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({
            book: { ...prevState.book, [field]: value }
        }))
    }

    onSaveBook = (ev) => {
        ev.preventDefault()
        const { book } = this.state
        if (!book.title) return alert('Please enter a book name')
        bookService.saveBook(this.state.book).then(() => {
            this.props.history.push('/book')
        })
    }

    render() {
        if (!this.state.book) return <div>Loading...</div>
        const { title, amount, id } = this.state.book

        return (
            <form className="book-edit" onSubmit={this.onSaveBook}>
                <h1>{id ? 'Edit' : 'Add'} Book</h1>
                <label>Name
          <input type="text" name="title" value={title} onChange={this.handleChange} />
                </label>
                <label>Price
          <input type="number" name="amount" value={amount} onChange={this.handleChange} />
                </label>
                <button>Save</button>
            </form>
        )
    }
}
