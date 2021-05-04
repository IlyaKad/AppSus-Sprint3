

export class NoteFilter extends React.Component {



    render() {
        if (!this.state.note) return <div>Loading...</div>
        const { title, amount, id } = this.state.note
        return (
            <input type="text" name="search" value={search} onChange={this.handleChange} />
        )
    }
}