const { NavLink, withRouter } = ReactRouterDOM


// change NavLinks to buttons with onclick that fires the onSideBarClick()(from service)

function _EmailSideBar(props) {
  return (
    <nav className="email-sidebar column align-center">
      <ol className='nav-email clean-list column align-center'>
      <button className="compose-btn"><i className="fa fa-plus"></i>Compose</button>
        <li className="nav-a"><NavLink exact to="/email">Inbox</NavLink></li>
        <li className="nav-a"><NavLink exact to="/keep">Sent</NavLink></li>
        <li className="nav-a"><NavLink exact to="/trash">Trash</NavLink></li>
      </ol>
    </nav>
  )
}

export const EmailSideBar = withRouter(_EmailSideBar)