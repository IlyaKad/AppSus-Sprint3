import { storageService } from '../../../app-services/storage-service.js'

export const noteService = {
    query
}

const KEY = 'notes';
var notes = [
    {
        type: "NoteText",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        type: "NoteImg",
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        type: "NoteTodos",
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        }
    }
];

function query(filterBy) {
    // if (filterBy) {
    //     const filteredBooks = notes.filter(note => {
    //         return book.title.includes(title) && book.listPrice.amount > minPrice && book.listPrice.amount < maxPrice
    //     })
    //     return Promise.resolve(filteredBooks)
    // }
    return Promise.resolve(_loadNotes())
}

function _loadNotes() {
    storageService.saveToStorage(KEY, notes);
    return Promise.resolve(notes);
}