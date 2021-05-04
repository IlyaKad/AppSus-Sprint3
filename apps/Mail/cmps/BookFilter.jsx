export class BookFilter extends React.Component {

  state = {
    filterBy: {
      title: '',
      minPrice: '',
      maxPrice: ''
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
    const { title, minPrice, maxPrice } = this.state.filterBy
    return (

      <form className="book-filter flex wrap justify-center" onSubmit={this.onFilter}>
        <label htmlFor="byName">Name</label>
        <input type="text" id="byName" name="title" value={title} onChange={this.handleChange} />

        <label htmlFor="minPrice">Min Price</label>
        <input type="number" id="minPrice" name="minPrice" value={minPrice} onChange={this.handleChange} />

        <label htmlFor="maxPrice">Max Price</label>
        <input type="number" id="maxPrice" name="maxPrice" value={maxPrice} onChange={this.handleChange} />
        <button>Filter</button>
      </form>
    )
  }
}