export function BookReviews(props) {

    const { reviews, onRemoveReview, bookId } = props;

    if (!reviews) {
        return <div className="book-review no-reviews">
            <div>Be the 1st to submit a review!</div>
            </div>
    }

    return (
        reviews.map(review => {
            
            return <div className="book-review column align-center">
                <h2>{review.name} has shared his opinion: (Date:{review.date})</h2>
                <p>His Rate For This Book:{review.rating}</p>
                <div className="review-txt"> Review: {review.reviewTxt}</div>
                <button onClick={() => { onRemoveReview(review.id, bookId) }}
                    className="remove-review-btn">❌</button>
            </div>
        })
    )
}