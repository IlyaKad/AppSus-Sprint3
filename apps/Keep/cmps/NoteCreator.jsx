
export class NoteCreator extends React.Component {

    state = {
        noteToAdd: {
            type: 'txt',
            inputVal: '',
            title: '',
            titleVal: ''
        }
    }

    componentDidMount() {
        this.checkforEmailText()
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

    checkforEmailText = () => {
        const { emailText } = this.props
        if (emailText) this.setState({ noteToAdd: { ...this.state.noteToAdd, inputVal: emailText } })
    }

    placeholderText = () => {
        switch (this.state.noteToAdd.type) {
            case 'txt': return 'Write your note here';
            case 'img': return 'Paste img URL';
            case 'todos': return 'Write todos, use comma to separate them';
        }
    }

    // cleanInput = () => {
    //     this.setState({ titleVal: '' })
    // }

    render() {
        const { inputVal, titleVal } = this.state.noteToAdd
        return (
            <section className="note-new">
                <form className="new-input-form">
                    {/* <div className="new-input-area"> */}
                    <input type="text" placeholder="title" name="title" onChange={this.handleChange} />
                    <textarea name="text" placeholder={this.placeholderText()} value={inputVal} name="inputVal"
                        onChange={this.handleChange}></textarea>
                    {/* </div> */}
                </form>
                <div className="btn-area">
                    <button onClick={() => this.onSetType('txt')} className="fa fa-sticky-note-o fa-2x"></button>
                    <button onClick={() => this.onSetType('img')} className="fa fa-picture-o fa-2x"></button>
                    <button onClick={() => this.onSetType('todos')} className="fa fa-list-ul fa-2x"></button>
                    <button onClick={() => {
                        this.props.onAddNote(this.state.noteToAdd)
                        // this.cleanInput()
                    }} className="fa fa-plus-square fa-2x"></button>
                </div>
            </section>
        )
    }
}