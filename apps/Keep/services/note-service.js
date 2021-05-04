import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const noteService = {
    query,
    deleteNote,
    // getNoteById,
    // saveNote
}

const KEY_NOTES = 'notes';
var gNotes = [
    {
        id: utilService.makeId(),
        type: "NoteText",
        isPinned: true,
        info: {
            title: "Me playing Mi",
            text: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "NoteImg",
        info: {
            title: "Me playing Mi",
            url: "https://robohash.org/dsfhg"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "NoteTodos",
        info: {
            title: "Me playing Mi",
            todos: [
                { text: "Do that", doneAt: null },
                { text: "Do this", doneAt: 187111111 },
                { text: "Don't do this", doneAt: 187112111 }
            ]
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "NoteText",
        isPinned: true,
        info: {
            title: "Me playing Mi",
            text: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "NoteTodos",
        info: {
            title: "Me playing Mi",
            todos: [
                { text: "Do that", doneAt: null },
                { text: "Do this", doneAt: 187111111 },
                { text: "Don't do this", doneAt: 187112111 }
            ]
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "NoteImg",
        info: {
            title: "Me playing Mi",
            url: "https://robohash.org/dsfhg"
        },
        style: {
            backgroundColor: "#00d"
        }
    }

];

function query(filterBy) {
    if (filterBy) {
        var { text } = filterBy
        text = text ? text : ''
        const filteredNotes = gNotes.filter(note => {
            return note.title.includes(text) &&
                note.text.includes(text)
        })
        return Promise.resolve(filteredNotes)
    }
    return Promise.resolve(gNotes)
}

// function _loadNotes() {
//     storageService.saveToStorage(KEY_NOTES, gNotes);
//     return Promise.resolve(gNotes);
// }

function deleteNote(noteId) {
    var noteIdx = gNotes.findIndex(function (note) {
        return noteId === note.id
    })
    gNotes.splice(noteIdx, 1)
    storageService.saveToStorage(KEY_NOTES, gNotes);
    return Promise.resolve(gNotes)//check this one.
}