import { noteService } from '../services/note-service.js'

export class NoteApp extends React.Component {

    state = {
        note: ""
    }

    componentDidMount() {
        this.loadNote();
    }

    loadNote = (filterBy) => {
        noteService.query(filterBy)
            .then(notes => {
                this.setState({ notes })
            })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        // this.setState(prevState => ({
        //     book: { ...prevState.book, [field]: value }
        // }))
    }

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <section className="note-app">
                <Switch>
                    {/* <Route component={BookEdit} path="/book/edit/:id" />
                <Route component={BookDetails} path="/book/:id" /> */}
                    <Route path="/note" render={(props) => (
                        <NoteList {...props} note={note} onSetFilter={this.onSetFilter} />
                    )} />
                </Switch>
            </section>
        )
    }
}