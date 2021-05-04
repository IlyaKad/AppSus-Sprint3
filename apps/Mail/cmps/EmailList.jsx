import { EmailFilter } from './EmailFilter.jsx'
import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, onSetFilter }) {
    return (
        <React.Fragment>
            <h4>Search Your Emails:</h4>
            <EmailFilter emails={emails} onSetFilter={onSetFilter} />
            <div className="email-list">
                {emails.map(email => <EmailPreview email={email} key={email.id} />)}
            </div>
        </React.Fragment>
    )
}