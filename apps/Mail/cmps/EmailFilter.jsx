export function EmailFilter({ onSetFilter }) {

    return (

        <section className="mail-filter">
            <input type="search" placeholder="serach" onChange={(ev) => { onSetFilter(ev) }} />
            <div className="radio-sort">
                <label htmlFor="all"> All
                <input type="radio" name="setReadDis" value="all" onChange={(ev) => onSetFilter(ev)} />
                </label>
                <label htmlFor="read"> Read
                <input type="radio" name="setReadDis" value="read" onChange={(ev) => onSetFilter(ev)} />
                </label>
                <label htmlFor="unread"> Unread
                <input type="radio" name="setReadDis" value="unread" onChange={(ev) => onSetFilter(ev)} />
                </label>
            </div>
        </section>

    )
}