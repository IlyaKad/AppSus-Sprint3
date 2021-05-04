export function LongTxt({ isLongTxtShown, txt, toggleIsShown }) {

    if (txt.length < 100) return <div className="book-details-desc flex column wrap"><p>{txt}
    </p></div>

    if (!isLongTxtShown) {//currBooleanState
        return <div className="book-details-desc flex column wrap align-center"><p>{txt.substr(0, 100)} 
        </p><button onClick={() => { toggleIsShown() }}> Read more...</button></div>
    }
    else return <div className="book-details-desc flex column wrap align-center"><p>{txt}</p>
        <button onClick={() => { toggleIsShown() }}> Read less</button></div>

}
