import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const noteService = {
    query,
    deleteNote,
    addNote,
    pinNote,
    copyNote,
    changeNoteBgc
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
            backgroundColor: "ee8eff"
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
            backgroundColor: "#dcfff7"
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
            backgroundColor: "#b5b5ff"
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
            backgroundColor: "#ee8eff"
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
            backgroundColor: "#b5b5ff"
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
            backgroundColor: "#dcfff7"
        }
    }

];

function query(filterBy) {
    if (!filterBy || filterBy.value === 'all') return Promise.resolve(gNotes)

    else if (filterBy) {
        const { value, type } = filterBy
        // console.log('type:', type, 'value:', value);
        let filteredNotes;
        if (type === 'search') filteredNotes = getNotesBySearch(value)
        if (type === 'radio') filteredNotes = getNotesByRadio(value)
        return Promise.resolve(filteredNotes)
    }
}

function getNotesBySearch(value) {
    value = value ? value.toUpperCase() : ''
    // console.log('getNotesBySearch value:', value);
    const serchedNotes = gNotes.filter(note => {
        return note.info.title.toUpperCase().includes(value)
        // || note.info.text.toUpperCase().includes(value) 
        // || note.body.toUpperCase().includes(value)
    })
    return serchedNotes
}

function getNotesByRadio(type) {
    if (type === 'all') return gNotes
    const sortedNotes = gNotes.filter(note => { return note.type === type })
    return sortedNotes
}

function copyNote(note) {
    const copyNote = JSON.parse(JSON.stringify(note))
    copyNote.id = utilService.makeId();
    gNotes.unshift(copyNote);
    storageService.saveToStorage(KEY_NOTES, gNotes);
    return Promise.resolve(gNotes);
}

function addNote(note) {
    const noteToAdd = _createNote(note)
    if (!note) return
    gNotes.unshift(noteToAdd);
    storageService.saveToStorage(KEY_NOTES, gNotes);
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
                todos: todosSep(note.inputVal)
            }
    }
    return noteToAdd;
}

function todosSep(todoStr) {
    const todosTxt = todoStr.split(',');
    return todosTxt.map(todo => {
        return { id: utilService.makeId(), text: todo, doneAt: null }
    });

}

function deleteNote(noteId) {
    var noteIdx = gNotes.findIndex(note => {
        return noteId === note.id
    })
    gNotes.splice(noteIdx, 1)
    storageService.saveToStorage(KEY_NOTES, gNotes);
    return Promise.resolve(gNotes)//check this one.
}

function pinNote(noteId) {
    var noteIdx = gNotes.findIndex(note => {
        return noteId === note.id
    })

    if (gNotes[noteIdx].isPinned) gNotes[noteIdx].isPinned = false
    else gNotes[noteIdx].isPinned = true

    storageService.saveToStorage(KEY_NOTES, gNotes);
    return Promise.resolve(gNotes)
}

function changeNoteBgc(color, noteId) {
    var noteIdx = gNotes.findIndex(note => {
        return noteId === note.id
    })
    gNotes[noteIdx].style.backgroundColor = color;
    storageService.saveToStorage(KEY_NOTES, gNotes);
    return Promise.resolve(gNotes)
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
