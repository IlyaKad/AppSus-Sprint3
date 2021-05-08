import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const reviewService = {
    query,
    addReview,
    removeReview,
}

function query(id) {
    return Promise.resolve(gReviews[id]);
}

function addReview(name, date, rating, reviewTxt, bookId) {
    const review = {
        id: utilService.makeId(),
        rating,
        date,
        reviewTxt,
        name,
    }
    if (!gReviews[bookId]) gReviews[bookId] = []
    gReviews[bookId].push(review);
    storageService.saveToStorage('reviews', gReviews);
    return Promise.resolve(review);
}

function removeReview(reviewId, bookId) {
    const reviewIdx = gReviews[bookId].findIndex(review => review.id === reviewId)
    gReviews[bookId].splice(reviewIdx, 1);
    storageService.saveToStorage('reviews', gReviews);
}

const gReviews = storageService.loadFromStorage('reviews') ? storageService.loadFromStorage('reviews') : {
    '2e0Pwuc46GU': [
        {
            id: utilService.makeId(),
            rating: 2,
            date: '2021-03-04',
            reviewTxt: 'this is my review1',
            fullName: 'Muli Molo'
        },

        {
            id: 1678,
            rating: 3,
            date: '2021-03-04',
            reviewTxt: 'this is my review2',
            fullName: 'koko jambo'
        },
    ],

    'OXeMG8wNskc': [
        {
            id: utilService.makeId(),
            rating: 4,
            date: '2021-03-04',
            reviewTxt: 'this is my review3',
            fullName: 'Jake Joko1'
        },

        {
            id: utilService.makeId(),
            rating: 1,
            date: '2021-03-04',
            reviewTxt: 'this is my review4',
            fullName: 'Jake Joko2'
        },
    ]


}