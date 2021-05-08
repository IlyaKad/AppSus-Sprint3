// import { EmailStatus } from './EmailStatus.jsx'
const { withRouter } = ReactRouterDOM

function _EmailSideBar({ toggleView, onComposeEmail, length }) {

  return (
    <nav className="email-sidebar">
      <ol className='nav-email clean-list'>
        <button className="compose-btn flex" onClick={() => onComposeEmail()}>
          <i className="fa fa-plus"></i>Compose</button>
        <li className="nav-a"><button className="sideb-btn" onClick={() => toggleView('inbox')}>Inbox({length})</button></li>
        <li className="nav-a"><button className="sideb-btn" onClick={() => toggleView('sent')}>Sent</button></li>
        <li className="nav-a"><button className="sideb-btn" onClick={() => toggleView('trash')}>Trash</button></li>
        <li className="nav-a"><button className="sideb-btn" onClick={() => toggleView('starred')}>Starred</button></li>
      </ol>
    </nav>
  )
}

export const EmailSideBar = withRouter(_EmailSideBar)