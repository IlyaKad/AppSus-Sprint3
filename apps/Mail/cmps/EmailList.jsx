
import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onStaredEmail, onDeleteEmail, setTagColor,
    getColorForTag, changeEmailIsRead, onReadUnreadClick }) {

    return (
        <React.Fragment>
            <section className="email-list-contianer">
                <ul className="clean-list">
                    <li className="email-subjects">
                        <span className="email-title-tag">Tag</span>
                        <span className="email-title-name">Name</span>
                        <span className="email-title-subject">Subject</span>
                        <span className="email-title-date">Date</span>
                        

                            <span className="email-btns">Buttons</span>
                        
                    </li>
                </ul>
                <ul className="email-ul column clean-list">
                    <div className="email-list">
                        {emails.map(email => <EmailPreview email={email} onStaredEmail={onStaredEmail}
                            onDeleteEmail={onDeleteEmail} key={email.id}
                            setTagColor={setTagColor} changeEmailIsRead={changeEmailIsRead}
                            getColorForTag={getColorForTag} onReadUnreadClick={onReadUnreadClick} />)}
                    </div>
                </ul>
            </section>
        </React.Fragment>
    )
}