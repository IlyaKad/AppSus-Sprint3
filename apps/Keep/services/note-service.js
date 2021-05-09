import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const noteService = {
    query,
    deleteNote,
    addNote,
    pinNote,
    copyNote,
    changeNoteBgc
}

const KEY_NOTES = 'notes';
var gNotes = storageService.loadFromStorage(KEY_NOTES) || gNotes;

var gNotes = [
    {
        id: utilService.makeId(),
        type: "txt",
        isPinned: true,
        info: {
            title: "Remember:",
            text: "Always Wash Behind Your Ears"
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
            title: "Love This MadaFaka Robot",
            url: "https://robohash.org/dsfhg"
        },
        style: {
            backgroundColor: "#86cf8f"
        }
    },
    {
        id: utilService.makeId(),
        type: "todos",
        isPinned: true,
        info: {
            title: "For Next Monday:",
            todos: [
                { text: "Do that", doneAt: null, id: utilService.makeId() },
                { text: "Do this", doneAt: 187111111, id: utilService.makeId() },
                { text: "Don't do this", doneAt: 187112111, id: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "#fad076"
        }
    },
    {
        id: utilService.makeId(),
        type: "txt",
        isPinned: true,
        info: {
            title: "Come On Already",
            text: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#c28fd7"
        }
    },
    {
        id: utilService.makeId(),
        type: "txt",
        isPinned: true,
        info: {
            title: "Amba Recipe",
            text: `Ingredients
            4 large mangoes (unripe and firm)
            3 tablespoons salt
            ...`
        },
        style: {
            backgroundColor: "#c28fd7"
        }
    },
    {
        id: utilService.makeId(),
        type: "txt",
        isPinned: false,
        info: {
            title: "Self-Reminder",
            text: "Never ever listen to Grandma"
        },
        style: {
            backgroundColor: "#c28fd7"
        }
    },
    {
        id: utilService.makeId(),
        type: "todos",
        isPinned: false,
        info: {
            title: "Must Be Done",
            todos: [
                { text: "Do that", doneAt: null, id: utilService.makeId() },
                { text: "Do this", doneAt: 187111111, id: utilService.makeId() },
                { text: "Don't do this", doneAt: 187112111, id: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "#ff91de"
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        isPinned: false,
        info: {
            title: "Me playing Mi",
            url: "https://www.akcpetinsurance.com/res/akc/blog/2020/three-common-puppy-illnesses/akc-pupill-hdr.jpg"
        },
        style: {
            backgroundColor: "#86cf8f"
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        isPinned: true,
        info: {
            title: "I'm in love with the coco!",
            url: "https://www.simplyquinoa.com/wp-content/uploads/2012/12/dairy-free-hot-chocolate-10.jpg"
        },
        style: {
            backgroundColor: "#86cf8f"
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        isPinned: true,
        info: {
            title: "Hey You",
            url: "https://www.swagmugs.co.uk/wp-content/uploads/2019/10/Hey-you-drop-this-design.png"
        },
        style: {
            backgroundColor: "#e36060"
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        isPinned: true,
        info: {
            title: "Can't Touch This",
            url: "https://ctl.s6img.com/society6/img/9aELNyli3iNFJDc4q_qfnKrLC60/w_700/canvas/~artwork/s6-original-art-uploads/society6/uploads/misc/d648e658481849fd9b3dec912a040611/~~/cant-touch-this-canvas.jpg"
        },
        style: {
            backgroundColor: "#f29647"
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        isPinned: false,
        info: {
            title: "Self-Reminder",
            url: "http://img-9gag-fun.9cache.com/photo/a9PrzoD_700bwp.webp"
        },
        style: {
            backgroundColor: "#86cf8f"
        }
    },
    {
        id: utilService.makeId(),
        type: "todos",
        isPinned: false,
        info: {
            title: "When CA Course is done:",
            todos: [
                { text: "Sleep on the beach", doneAt: null, id: utilService.makeId() },
                { text: "Get F$#@ing Drunk", doneAt: 187111111, id: utilService.makeId() },
                { text: "Scream a lil' bit", doneAt: 187112111, id: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "#ff91de"
        }
    },
];

function query(filterBy) {
    if (!filterBy || filterBy.value === 'all') return Promise.resolve(gNotes)

    else if (filterBy) {
        const { value, type } = filterBy

        let filteredNotes;
        if (type === 'search') filteredNotes = getNotesBySearch(value)
        if (type === 'radio') filteredNotes = getNotesByRadio(value)
        return Promise.resolve(filteredNotes)
    }
}

function getNotesBySearch(value) {
    value = value ? value.toUpperCase() : ''

    const serchedNotes = gNotes.filter(note => {
        return note.info.title.toUpperCase().includes(value)
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
