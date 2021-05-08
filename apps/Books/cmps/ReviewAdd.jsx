import { reviewService } from 'services/add-review-service.js'
import { BookReviews } from 'BookReviews.jsx'

export class ReviewAdd extends React.Component {

    state = {
        name: '',
        date: '2021-03-04',
        rating: '',
        reviewTxt: ''
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const val = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ ...this.state, [field]: val })
    }

    onSubmitReview = (ev) => {
        ev.preventDefault();
        const { name, date, rating, reviewTxt } = this.state
        const bookId = this.props.bookId;
        reviewService.addReview(name, date, rating, reviewTxt, bookId)
            .then(addedReview => {
                this.props.addReview(addedReview);
            })
        this.setState({
            name: '',
            date: '2021-03-04',
            rating: '',
            reviewTxt: '',
        })
    }

    render() {

        const { name, date, rating, reviewTxt } = this.state;

        return (
            <div className="reviews-container">

                <form className="review-form column" onSubmit={this.onSubmitReview}>

                    <label htmlFor="name">Your Name</label>
                    <input type="text" name="name" id="name" placeholder="full name" value={name} onChange={this.handleChange} />

                    <label htmlFor="date">Date-Read</label>
                    <input type="date" name="date" id="date" value={date} onChange={this.handleChange} />

                    <label htmlFor="rating">Rate This Book</label>
                    <input placeholder="1~5" min="1" max="5" type="number" id="rating" name="rating" value={rating} onChange={this.handleChange} />

                    <label htmlFor="review-txt">Your Review</label>
                    <textarea name="reviewTxt" id="reviewTxt" cols="10" rows="10" value={reviewTxt} onChange={this.handleChange} />

                    <button type="submit">Submit</button>

                </form >
                <div>

                    <BookReviews reviews={this.props.reviews} 
                    bookId={this.props.bookId} onRemoveReview={this.props.onRemoveReview} />
                </div>
            </div>
        )

    }

}