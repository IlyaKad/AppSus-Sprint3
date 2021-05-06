
import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onStaredEmail, onDeleteEmail, setTagColor,
    getColorForTag, changeEmailIsRead, onReadUnreadClick }) {

    return (
        <React.Fragment>
            <section className="column align-center">
                <section className="email-list-contianer">
                    <ul className="email-ul clean-list column">
                        <li className="email-subjects flex justify-between">
                            <span className="email-title-tag">Tag</span>
                            <span className="email-title-name">Name</span>
                            <span className="email-title-subject">Subject</span>
                            <span className="email-title-date">Date</span>
                        </li>
                        <div className="email-list">
                            {emails.map(email => <EmailPreview email={email} onStaredEmail={onStaredEmail}
                                onDeleteEmail={onDeleteEmail} key={email.id}
                                setTagColor={setTagColor} changeEmailIsRead={changeEmailIsRead}
                                getColorForTag={getColorForTag} onReadUnreadClick={onReadUnreadClick} />)}
                        </div>
                    </ul>
                </section>
            </section>
        </React.Fragment>
    )
}