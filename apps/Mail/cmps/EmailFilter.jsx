export function EmailFilter({ onSetFilter }) {

    return (

        <section className="sort-search-contianer flex ">
            <div className="panel">
                <input type="search" placeholder="Search email" onChange={(ev) => { onSetFilter(ev) }} />
                <label htmlFor="all"><small>All</small>
                    <input type="radio" name="sort-emails" value="all" onChange={(ev) => onSetFilter(ev)} />
                </label>
                <label htmlFor="read"><small>Read</small>
                    <input type="radio" name="sort-emails" value="read" onChange={(ev) => onSetFilter(ev)} />
                </label>
                <label htmlFor="unread"><small>Unread</small>
                    <input type="radio" name="sort-emails" value="unread" onChange={(ev) => onSetFilter(ev)} />
                </label>
            </div>
        </section>

    )
}