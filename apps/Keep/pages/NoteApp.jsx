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
        <section className="note-app">

            <Switch>
            </Switch>
        </section>
    }
}