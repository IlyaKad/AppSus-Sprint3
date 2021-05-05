const DynamicCmp = (props) => {
    switch (props.note.type) {
        case 'NoteText':
            return <NoteText {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
        default:
            return <p>Yep it's an error...</p>
    }
}

function createimg(params) {
    <url />
}

export function NoteCreator({ }) {
    return (
        <section className="note-new">
            <form>
                <div className="new-input-area">
                    <input type="text" placeholder="title" />
                    <textarea name="text" id="1"></textarea>
                </div>
            </form>
            <div className="btn-area">
                <button>Note</button>
                <button>Img</button>
                <button>Todos</button>
                <input type="color" name="text-color" id="" />
                <button>Save</button>
                <button>Close</button>
            </div>
        </section>
    )
}