

export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            text: ''
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
        const { text } = this.state.filterBy;
        return (
            <form className="note-filter" onSubmit={this.onFilter}>
                <label htmlFor="text"></label>
                <input type="text" id="text" name="text" value={text} placeholder="Search here" onChange={this.handleChange} />
            </form>
        )
    }
}