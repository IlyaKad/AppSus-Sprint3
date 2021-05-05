import { noteService } from '../services/note-service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteCreator } from '../cmps/NoteCreator.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'

const { Route, Switch } = ReactRouterDOM

export class NoteApp extends React.Component {

    state = {
        notes: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadNotes()
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

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading...</div>
        // console.log('before filter: notes', notes);
        const pinnedNotes = notes.filter((note) => note.isPinned)
        // console.log('pinnedNotes', pinnedNotes);
        const unPinnedNotes = notes.filter((note) => !note.isPinned)
        // console.log('unPinnedNotes', unPinnedNotes);
        // console.log('after filter', notes, notes.isPinned);
        return (
            <section className="note-app">
                <NoteCreator onAddNote={this.onAddNote} />
                {/* <NoteFilter notes={notes} onSetFilter={this.onSetFilter} /> */}
                <Switch>
                    <Route path="/keep" render={(props) => (
                        <React.Fragment>
                            <NoteList {...props} notes={pinnedNotes} onSetFilter={this.onSetFilter} />
                            <hr />
                            <NoteList {...props} notes={unPinnedNotes} onSetFilter={this.onSetFilter} />
                        </React.Fragment>
                    )} />
                </Switch>
            </section>
        )
    }
}