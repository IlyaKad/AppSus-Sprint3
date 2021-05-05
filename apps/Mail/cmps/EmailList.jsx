
import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onSetFilter }) {


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
                            <span className="email-title-date">Delete</span>
                        </li>
                        <div className="email-list">
                            {emails.map(email => <EmailPreview email={email} key={email.id} />)}
                        </div>
                    </ul>
                </section>
            </section>
        </React.Fragment>
    )
}