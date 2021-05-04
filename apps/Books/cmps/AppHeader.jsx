const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
  return (
    <nav className="app-header flex space-between">
      <div className="logo"><img src="../assets/img/logo.png" alt="logo"/></div>
      <ol className = 'nav-header clean-list flex align-center'>
        <li className="nav-a"><NavLink exact to="/">Home</NavLink></li>
        <li className="nav-a"><NavLink exact to="/about">About</NavLink></li>
        <li className="nav-a"><NavLink exact to="/book">Book Shop</NavLink></li>
        {/* <li className="nav-a"><button onClick={()=>{
          props.history.goBack()
        }}>Back</button></li> */}
      </ol>
    </nav>
  )
}

export const AppHeader = withRouter(_AppHeader)

