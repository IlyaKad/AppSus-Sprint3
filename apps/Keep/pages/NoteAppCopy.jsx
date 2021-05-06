import { noteService } from '../services/note-service.js'
import { NoteList } from '../cmps/NoteList.jsx'
// import { NoteCreator } from '../cmps/NoteCreator.jsx'
import { NoteCreatorCopy } from '../cmps/NoteCreatorCopy.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'

const { Route, Switch } = ReactRouterDOM

export class NoteAppCopy extends React.Component {

    state = {
        notes: null,
        filterBy: null,
        emailText: null
    }

    componentDidMount() {
        const mailToNote = new URLSearchParams(window.location.href).get('mail');
        console.log('test in NoteApp copy', mailToNote);
        if (mailToNote) {
            this.setState({ emailText: mailToNote })
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

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading...</div>

        const pinnedNotes = notes.filter((note) => note.isPinned)
        const unPinnedNotes = notes.filter((note) => !note.isPinned)

        return (
            <section className="note-app">
                <NoteCreatorCopy onAddNote={this.onAddNote} emailText={this.state.emailText} />
                <Switch>
                    <Route path="/keep" render={(props) => (
                        <React.Fragment>
                            <NoteList {...props} notes={pinnedNotes} onCopyNote={this.onCopyNote}
                                onPinNote={this.onPinNote} onSetFilter={this.onSetFilter}
                                onRemoveNote={this.onRemoveNote} />
                            <hr />
                            <NoteList {...props} notes={unPinnedNotes} onCopyNote={this.onCopyNote}
                                onPinNote={this.onPinNote} onSetFilter={this.onSetFilter}
                                onRemoveNote={this.onRemoveNote} />
                        </React.Fragment>
                    )} />
                </Switch>
            </section>
        )
    }
}