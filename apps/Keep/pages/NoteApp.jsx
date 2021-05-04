import { noteService } from '../services/note-service.js'
import { NoteList } from '../cmps/NoteList.jsx'

const { Route, Switch } = ReactRouterDOM

export class NoteApp extends React.Component {

    state = {
        notes: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes() {
        noteService.query(this.state.filterBy)
            .then((notes) => { this.setState({ notes }) })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <section className="note-app">
                <Switch>
                    <Route path="/keep" render={(props) => (
                        <NoteList {...props} notes={notes} onSetFilter={this.onSetFilter} />
                    )} />
                </Switch>
            </section>
        )
    }
}