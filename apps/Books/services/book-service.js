import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'

export const bookService = {
  query,
  deleteBook,
  getBookById,
  getNextBookId,
  saveBook
}

const KEY = 'books';
var gBooks;

_getBooksFromJson()

function query(filterBy) {
  if (filterBy) {
    var { title, maxPrice, minPrice } = filterBy
    maxPrice = maxPrice ? maxPrice : Infinity
    minPrice = minPrice ? minPrice : 0
    const filteredBooks = gBooks.filter(book => {
      return book.title.includes(title) && book.listPrice.amount > minPrice && book.listPrice.amount < maxPrice
    })
    return Promise.resolve(filteredBooks)
  }
  return Promise.resolve(gBooks)
}

function deleteBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id
  })
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage();
  return Promise.resolve()
}

function _addBook(bookToAdd) {
  var book = _createBook(bookToAdd.title, bookToAdd.listPrice.amount)
  gBooks.unshift(book)
  _saveBooksToStorage()
  return Promise.resolve()
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return bookId === book.id
  })
  return Promise.resolve(book)
}

function getNextBookId(bookId) {
  const bookIdx = gBooks.findIndex(book => book.id === bookId)
  var nextBookIdx = bookIdx + 1
  nextBookIdx = nextBookIdx === gBooks.length ? 0 : nextBookIdx
  return gBooks[nextBookIdx].id
}

function _updateBook(bookToUpdate) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookToUpdate.id;
  })
  gBooks.splice(bookIdx, 1, bookToUpdate)
  _saveBooksToStorage();
  return Promise.resolve(bookToUpdate)
}

function saveBook(book) {
  return book.id ? _updateBook(book) : _addBook(book)
}

function _saveBooksToStorage() {
  storageService.saveToStorage(KEY, gBooks)
}

function _createBook(title) {
  return {
    id: utilService.makeId(),
    title,
    subtitle: utilService.makeLorem(15),
    authors: [
      "Author Authorious"
    ],
    publishedDate: utilService.getRandomIntInclusive(2010, 2021),
    description: utilService.makeLorem(70),
    pageCount: utilService.getRandomIntInclusive(120, 450),
    categories: [
      "React",
      "Hacks"
    ],
    thumbnail: "http://coding-academy.org/books-photos/20.jpg",
    language: "en",
    listPrice: {
      amount: utilService.getRandomIntInclusive(15, 70),
      currencyCode: "ILS",
      isOnSale: Math.random() > 0.5 ? true : false
    }
  }
}

function _saveBooksToStorage() {
  storageService.saveToStorage(KEY, gBooks)
}

function _loadBooks() {
  return axios.get('./services/books.json').then(res => {
    gBooks = res.data.slice();
    _saveBooksToStorage();
    return Promise.resolve(gBooks);
  })
}

function _getBooksFromJson() {
  var books = storageService.loadFromStorage(KEY)
  if (!books || !books.length) {
    var books = _loadBooks()
  }
  gBooks = books;
}