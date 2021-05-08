import { noteService } from 'services/note-service.js'
import { NoteList } from 'cmps/NoteList.jsx'
import { NoteCreator } from 'cmps/NoteCreator.jsx'
import { NoteFilter } from 'cmps/NoteFilter.jsx'
import { UserMsg } from 'cmps/UserMsg.jsx'

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

    onSetFilter = (ev) => {
        this.setState({ filterBy: ev.target }, this.loadNotes)
    }

    onNoteTextCase = (note) => {
        const { info: { text, url, todos } } = note
        let emailText = '';
        switch (note.type) {
            case 'text': emailText = text
            case 'url': emailText = url
            case 'todos':
                const todosStrArray = todos.map(todo => todo.text)
                const todosStr = todosStrArray.toString()
                emailText = todosStr
        }
        return '/email/?&note=' + emailText
    }

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading...</div>

        const pinnedNotes = notes.filter((note) => note.isPinned)
        const unPinnedNotes = notes.filter((note) => !note.isPinned)

        return (

            <section className="note-app">
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteCreator onAddNote={this.onAddNote} emailText={this.state.emailText} />
                {/* <UserMsg /> */}
                <Switch>
                    <Route path="/keep" render={(props) => (
                        <React.Fragment>
                            <NoteList {...props} notes={pinnedNotes} onCopyNote={this.onCopyNote} onPinNote={this.onPinNote}
                                onRemoveNote={this.onRemoveNote} onChangeNoteBgc={this.onChangeNoteBgc} onNoteTextCase={this.onNoteTextCase} />
                            <hr />
                            <NoteList {...props} notes={unPinnedNotes} onCopyNote={this.onCopyNote} onPinNote={this.onPinNote}
                                onRemoveNote={this.onRemoveNote} onChangeNoteBgc={this.onChangeNoteBgc} onNoteTextCase={this.onNoteTextCase} />
                        </React.Fragment>
                    )} />
                </Switch>
            </section>
        )
    }
}