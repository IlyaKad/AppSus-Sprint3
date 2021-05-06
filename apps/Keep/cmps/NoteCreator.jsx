
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

    placeholderText = () => {
        switch (this.state.noteToAdd.type) {
            case 'txt': return 'Write your note here';
            case 'img': return 'Paste img URL';
            case 'todos': return 'Write todos, use comma to separate them';
        }
    }

    render() {
        // const { type, inputVal, title } = this.state.noteToAdd
        return (
            <section className="note-new">
                <form>
                    <div className="new-input-area">
                        <input type="text" placeholder="title" name="title" onChange={this.handleChange} />
                        <textarea name="text" placeholder={this.placeholderText()} name="inputVal" onChange={this.handleChange} cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div className="btn-area">
                    <button onClick={() => this.onSetType('txt')} className="fa fa-sticky-note-o fa-2x"></button>
                    <button onClick={() => this.onSetType('img')} className="fa fa-picture-o fa-2x"></button>
                    <button onClick={() => this.onSetType('todos')} className="fa fa-list-ul fa-2x"></button>
                    {/* <input type="color" name="text-color" id="" /> */}
                    <button onClick={() => this.props.onAddNote(this.state.noteToAdd)} className="fa fa-plus-square fa-2x"></button>
                    {/* <button>Close</button> */}
                </div>
            </section>
        )
    }
}