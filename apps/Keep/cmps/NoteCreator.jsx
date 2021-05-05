
export class NoteCreator extends React.Component {
    state = {
        noteToAdd: {
            type: 'txt',
            inputVal: '',
            title: ''
        }
    }

    handleChange = (ev) => {
        const copyNote = { ...this.state.noteToAdd }
        const { name, value } = ev.target
        copyNote[name] = value
        this.setState({ noteToAdd: copyNote })
    }

    onSetType = (type) => {
        const copyNote = { ...this.state.noteToAdd }
        copyNote.type = type
        this.setState({ noteToAdd: copyNote })
    }

    // onAddNote = () => {
    //     debugger
    //     this.props.onAddNote(this.state.noteToAdd)
    // }

    render() {

        return (
            <section className="note-new">
                <form>
                    <div className="new-input-area">
                        <input type="text" placeholder="title" name="title" onChange={this.handleChange} />
                        <textarea name="text" id="1" name="inputVal" onChange={this.handleChange} ></textarea>
                    </div>
                </form>
                <div className="btn-area">
                    <button onClick={() => this.onSetType('txt')} className="fa fa-sticky-note-o fa-2x"></button>
                    <button onClick={() => this.onSetType('img')} className="fa fa-picture-o fa-2x"></button>
                    <button onClick={() => this.onSetType('todos')} className="fa fa-list-ul fa-2x"></button>
                    {/* <input type="color" name="text-color" id="" /> */}
                    <button onClick={this.props.onAddNote} className="fa fa-plus-square fa-2x"></button>
                    {/* <button>Close</button> */}
                </div>
            </section>
        )
    }
}