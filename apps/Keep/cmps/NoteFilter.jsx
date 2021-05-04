

export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            title,
            text
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { title, text } = this.state.filterBy;
        return (
            <form className="note-filter" onSubmit={this.onFilter}>
                <label htmlFor="title"></label>
                <input type="text" id="title" name="title" value={title} placeholder="By title" onChange={this.handleChange} />

                <label htmlFor="text">Subject</label>
                <input type="text" id="text" name="text" value={text} placeholder="By text" onChange={this.handleChange} />
            </form>
        )
    }
}