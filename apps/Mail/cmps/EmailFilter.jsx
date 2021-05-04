export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            author: '',
            subject: '',
            body: ''
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
        const { author, subject, body } = this.state.filterBy
        return (

            <form className="email-filter flex wrap justify-center" onSubmit={this.onFilter}>
                <label htmlFor="author">Sender</label>
                <input type="text" id="author" name="author" value={author} onChange={this.handleChange} />

                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" value={subject} onChange={this.handleChange} />

                <label htmlFor="body">Body Text</label>
                <input type="text" id="body" name="body" value={body} onChange={this.handleChange} />
                <button>Filter</button>
            </form>
        )
    }
}