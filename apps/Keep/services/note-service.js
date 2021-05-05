import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const noteService = {
    query,
    deleteNote,
    addNote
    // getNoteById,
    // saveNote
}

const KEY_NOTES = 'notes';
var gNotes = [
    {
        id: utilService.makeId(),
        type: "txt",
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
        type: "img",
        isPinned: false,
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
        type: "todos",
        isPinned: true,
        info: {
            title: "Me playing Mi",
            todos: [
                { text: "Do that", doneAt: null, id: utilService.makeId() },
                { text: "Do this", doneAt: 187111111, id: utilService.makeId() },
                { text: "Don't do this", doneAt: 187112111, id: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "txt",
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
        type: "todos",
        isPinned: false,
        info: {
            title: "Me playing Mi",
            todos: [
                { text: "Do that", doneAt: null, id: utilService.makeId() },
                { text: "Do this", doneAt: 187111111, id: utilService.makeId() },
                { text: "Don't do this", doneAt: 187112111, id: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        isPinned: false,
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
    // if (filterBy) {
    //     var { text } = filterBy
    //     text = text ? text : ''
    //     const filteredNotes = gNotes.filter(note => {
    //         return note.info.title.includes(text)
    //             && (note.info.text) ? note.info.text.includes(text) : note.info.text
    //     })
    //     return Promise.resolve(filteredNotes)
    // }
    return Promise.resolve(gNotes)
}

function addNote(note) {
    const noteToAdd = _createNote(note)
    //unshift ,push....storage...
    if (!note) return
    gNotes.unshift(noteToAdd);
    return Promise.resolve(gNotes);
}

function _createNote(note) {

    const noteToAdd = {
        id: utilService.makeId(),
        type: note.type,
        style: {
            backgroundColor: '#43c9b0'
        }
    }
    switch (note.type) {
        case 'txt':
            noteToAdd.info = {
                title: note.title,
                text: note.inputVal
            }
            break;
        case 'img':
            noteToAdd.info = {
                title: note.title,
                url: note.inputVal
            }
            break;
        case 'todos':
            noteToAdd.info = {
                title: note.title,
                todos: {
                    text: note.inputVal
                }
            }
    }
    console.log('noteToAdd', noteToAdd);
    return noteToAdd;
}
function todosSep(todoStr) {
    const todos = todoStr.split(',');
    return todos.map(todo => todo);
}

function deleteNote(noteId) {
    var noteIdx = gNotes.findIndex(function (note) {
        return noteId === note.id
    })
    gNotes.splice(noteIdx, 1)
    storageService.saveToStorage(KEY_NOTES, gNotes);
    return Promise.resolve(gNotes)//check this one.
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
