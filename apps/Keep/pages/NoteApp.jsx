import { noteService } from '../services/note-service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteCreator } from '../cmps/NoteCreator.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'

const { Route, Switch } = ReactRouterDOM

export class NoteApp extends React.Component {

    state = {
        notes: null,
        filterBy: null,
        emailText: null
    }

    componentDidMount() {
        const mailToNote = new URLSearchParams(window.location.href).get('mail');
        if (mailToNote) {
            this.setState({ emailText: mailToNote })
            // console.log('mailToNote', mailToNote);
            // // const { info: { text, url, todos } } = mailToNote
            // switch (mailToNote.info.type) {
            //     case 'text':
            //         this.setState({ emailText: text })
            //         break;
            //     case 'url':
            //         this.setState({ emailText: url })
            //         break;
            //     case 'todos':
            //         const todosStrArray = todos.map(() => todo['text'])
            //         const todosStr = todosStrArray.toString()
            //         this.setState({ emailText: todosStr })
            //         break;
            // }
            this.loadNotes()
        }
        else this.loadNotes();
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then((notes) => { this.setState({ notes }) })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    onAddNote = (note) => {
        noteService.addNote(note)
            .then(this.loadNotes)
    }

    onCopyNote = (note) => {
        noteService.copyNote(note)
            .then(this.loadNotes)
    }

    onRemoveNote = (noteId) => {
        noteService.deleteNote(noteId)
            .then(this.loadNotes)
    }

    onPinNote = (noteId) => {
        noteService.pinNote(noteId)
            .then(this.loadNotes)
    }

    onChangeNoteBgc = (color, noteId) => {
        noteService.changeNoteBgc(color, noteId)
            .then(this.loadNotes)
    }

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading...</div>

        const pinnedNotes = notes.filter((note) => note.isPinned)
        const unPinnedNotes = notes.filter((note) => !note.isPinned)

        return (
            <section className="note-app">
                <NoteCreator onAddNote={this.onAddNote} emailText={this.state.emailText} />
                <Switch>
                    <Route path="/keep" render={(props) => (
                        <React.Fragment>
                            <NoteList {...props} notes={pinnedNotes} onCopyNote={this.onCopyNote}
                                onPinNote={this.onPinNote} onSetFilter={this.onSetFilter}
                                onRemoveNote={this.onRemoveNote} onChangeNoteBgc={this.onChangeNoteBgc} />
                            <hr />
                            <NoteList {...props} notes={unPinnedNotes} onCopyNote={this.onCopyNote}
                                onPinNote={this.onPinNote} onSetFilter={this.onSetFilter}
                                onRemoveNote={this.onRemoveNote} onChangeNoteBgc={this.onChangeNoteBgc} />
                        </React.Fragment>
                    )} />
                </Switch>
            </section>
        )
    }
}