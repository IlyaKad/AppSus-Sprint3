export function ColorPalette(onChangeNoteBgc, noteId) {

    return (
        <div className="colors-palette">
            <span style={{ backgroundColor: "#5bd7c6" }} onClick={() => onChangeNoteBgc('#5bd7c6', noteId)}></span>
            <span style={{ backgroundColor: "#5bd76a" }} onClick={() => onChangeNoteBgc('#5bd76a', noteId)}></span>
            <span style={{ backgroundColor: "#d5d75b" }} onClick={() => onChangeNoteBgc('#d5d75b', noteId)}></span>
            <span style={{ backgroundColor: "#f29647" }} onClick={() => onChangeNoteBgc('#f29647', noteId)}></span>
            <span style={{ backgroundColor: "#e36060" }} onClick={() => onChangeNoteBgc('#e36060', noteId)}></span>
            <span style={{ backgroundColor: "#ec58e0" }} onClick={() => onChangeNoteBgc('#ec58e0', noteId)}></span>
            <span style={{ backgroundColor: "#c97aea" }} onClick={() => onChangeNoteBgc('#c97aea', noteId)}></span>
            <span style={{ backgroundColor: "#7c7aea" }} onClick={() => onChangeNoteBgc('#7c7aea', noteId)}></span>
            {/* <span style={{ backgroundColor: "#7c7aea" }} onClick={(ev) => this.onChangeNoteBgc('#7c7aea', ev)}></span> */}
        </div>
    )
}