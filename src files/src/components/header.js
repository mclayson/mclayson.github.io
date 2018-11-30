import React from 'react'
import {
  Link,
  NavLink
} from "react-router-dom";
import {GetToken, GetSetup} from '../utilities/cookies'
import Logo from '../assets/images/logo.png'
import {HOMEPAGE} from '../config/config'

// <Switch>
//   <Route path="/" exact={true} render={() => (
//     <img src={LogoDark} alt="Projul Logo" />
//   )} />
//   <Route path="/" render={() => (
//     <img src={Logo} alt="Projul Logo" />
//   )} />
// </Switch>

const Header = () => (
  <header>
    <Link to={HOMEPAGE}>
      <img src={Logo} alt="Projul Logo" />
    </Link>
      { GetToken() && (
        <ul className={"flex-center" + (GetSetup()?"":" menu-placeholder")}>
          <li><NavLink exact to="/dashboard">dashboard</NavLink></li>
          <li><NavLink exact to="/projects">projects</NavLink></li>
          <li><NavLink exact to="/schedule">schedule</NavLink></li>
        </ul>
      )}
    <nav>
      { GetToken() && (
        <ul>
          <li><NavLink exact to="/signout">sign out</NavLink></li>
        </ul>
      )}
    </nav>
  </header>
)

export default Header
