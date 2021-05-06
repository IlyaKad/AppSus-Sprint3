import { EmailStatus } from './EmailStatus.jsx'
const { NavLink, withRouter } = ReactRouterDOM

function _EmailSideBar({ toggleView, onComposeEmail }) {

  return (
    <nav className="email-sidebar column align-center">
      <ol className='nav-email clean-list column align-center'>
        <button className="compose-btn" onClick={() => onComposeEmail()}><i className="fa fa-plus"></i>Compose</button>
        <li className="nav-a">
          <button onClick={() => toggleView('inbox')}>
            Inbox <EmailStatus />
          </button>
        </li>
        <li className="nav-a"><button onClick={() => toggleView('sent')}>Sent</button></li>
        <li className="nav-a">
          <button onClick={() => toggleView('trash')}>
            Trash 
            {/* <EmailStatus /> */}
          </button>
        </li>
        <li className="nav-a"><button onClick={() => toggleView('starred')}>Starred</button></li>
      </ol>
    </nav>
  )
}

export const EmailSideBar = withRouter(_EmailSideBar)