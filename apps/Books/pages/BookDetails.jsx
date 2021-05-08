const { Link } = ReactRouterDOM
import { bookService } from '../services/book-service.js'
import { reviewService } from '../services/add-review-service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'


export class BookDetails extends React.Component {

  state = {
    isLongTxtShown: false,
    book: null,
    reviews: null
  }

  componentDidMount() {
    const id = this.props.match.params.bookId;
    this.loadBook()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) this.loadBook()
  }

  updateReviews = () => {
    const id = this.props.match.params.bookId;
    this.loadReviewList(id)
  }

  toggleIsShown = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
  }

  handleDate = (publishedDate) => {
    let diff = new Date().getFullYear() - publishedDate
    if (diff > 10) return `${publishedDate} - Veteran Book`;
    else if (diff < 1) return `${publishedDate} - New!`;
    else return publishedDate;
  }

  setReadLvl = (pageCount) => {
    if (pageCount > 500) return `${pageCount}pages. - Long Reading`;
    else if (pageCount > 200) return `${pageCount}pages. - Decent Reading`;
    else return `${pageCount}pages. - Short Reading`;
  }

  handlePrice = (currencyCode, amount) => {
    switch (currencyCode) {
      case 'ILS': return ` ${amount}₪`;
      case 'USD': return ` $${amount}`;
      case 'EUR': return ` €${amount}`;
    }
  }

  changePriceColor = (amount) => {
    if (amount > 150) return 'expesive'
    if (amount < 20) return 'cheap'
  }

  handleCategories = (categories) => {
    return categories.map((category, idx) =>
      <span key={category + idx}>{category} </span>)
  }

  onDeleteBook = () => {
    bookService.deleteBook(this.state.book.id)
      .then(() => {
        this.props.history.push('/book')
      })
  }

  loadReviewList = (id) => {
    reviewService.query(id)
      .then(reviews => {
        if (!reviews) return
        this.setState({ reviews })
      })
  }

  addReview = () => {
    const id = this.props.match.params.bookId
    this.loadReviewList(id)
  }

  onRemoveReview = (reviewId, bookId) => {
    reviewService.removeReview(reviewId, bookId)
    this.loadReviewList(bookId)
  }

  loadBook = () => {

    const id = this.props.match.params.id
    bookService.getBookById(id).then(book => {
      this.setState({ book })
    })
    this.loadReviewList(id)
  }

  render() {
    const { isLongTxtShown } = this.state
    const { book } = this.state
    if (!book) return <div>Loading...</div>
    const {
      title,
      subtitle,
      thumbnail,
      description,
      categories,
      publishedDate,
      language,
      pageCount,
      listPrice: { currencyCode, amount, isOnSale },
      authors
    } = book;

    return (
      <div className="book-details column align-center">
        <div className="book-btns flex align-center">
          <button onClick={() => this.props.history.push('/book')} > Go back</button>
          <Link to={`/book/edit/${book.id}`}>Edit Book</Link>
          <button onClick={this.onDeleteBook}>Delete Book</button>
          <Link to={`/book/${bookService.getNextBookId(book.id)}`}>Next Book</Link>
        </div>
        <div className="book-panel-container flex">
          <img src={thumbnail} alt="" />
          <div className="book-info-container" >

            <h3>{title} / <small>{authors}</small></h3>
            <p>Subtitle : {subtitle}</p>
            <p>Book genres : {this.handleCategories(categories)}</p>
            <p className="price-p">
              Price : <span className={this.changePriceColor(amount)}>
                {this.handlePrice(currencyCode, amount)}</span>
              {isOnSale && <span className="on-sale"></span>}
            </p>
            <p>Language : {language.toUpperCase()}</p>
            <p>Reading Level : {this.setReadLvl(pageCount)}</p>
            <p>Year published : {this.handleDate(publishedDate)}</p>
          </div>
        </div>

        <section className="book-desc-container column align-center justify-center">
          <h3>Book description : </h3><LongTxt isLongTxtShown={isLongTxtShown} txt={description}
            toggleIsShown={this.toggleIsShown}></LongTxt>
        </section>

        <section className="review-section column">
          <ReviewAdd bookId={book.id} reviews={this.state.reviews} addReview={this.addReview} onRemoveReview={this.onRemoveReview} />
        </section>
      </div>
    )
  }
}
