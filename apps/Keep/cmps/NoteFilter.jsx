export function NoteFilter({ onSetFilter }) {

    return (
        <section className="note-filter">
            <input type="search" placeholder="search by title" onChange={(ev) => { onSetFilter(ev) }} />
            <div className="radio-sort">
                <label htmlFor="all"> All
                <input type="radio" name="sort-notes" value="all" id="all" onChange={(ev) => onSetFilter(ev)} />
                </label>
                <label htmlFor="note"> Notes
                <input type="radio" name="sort-notes" value="txt" id="note" onChange={(ev) => onSetFilter(ev)} />
                </label>
                <label htmlFor="todos"> Todos
                <input type="radio" name="sort-notes" value="todos" id="todos" onChange={(ev) => onSetFilter(ev)} />
                </label>
                <label htmlFor="img"> Images
                <input type="radio" name="sort-notes" value="img" id="img" onChange={(ev) => onSetFilter(ev)} />
                </label>
                {/* <select name="notes" id="notes" onChange={(ev) => { onSetFilter(ev) }}>
                    <option value="all">All</option>
                    <option value="note">Notes</option>
                    <option value="todos">Todos</option>
                    <option value="img">Images</option>
                </select> */}
            </div>
        </section>

    )
}