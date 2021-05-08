const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
  return (
    <nav className="app-header flex space-between">
      <div className="logo flex align-center"><img src="../assets/app.img/logo.png" alt="logo" /></div>
      <ol className='nav-header clean-list flex align-center'>
        <li className="nav-a"><NavLink exact to="/">Home</NavLink></li>
        <li className="nav-a"><NavLink exact to="/email">Email</NavLink></li>
        <li className="nav-a"><NavLink exact to="/keep">Keep</NavLink></li>
        <li className="nav-a"><NavLink exact to="/book">Books</NavLink></li>
        <li className="nav-a"><NavLink exact to="/about">About</NavLink></li>
      </ol>
    </nav>
  )
}

export const AppHeader = withRouter(_AppHeader) //check to move up