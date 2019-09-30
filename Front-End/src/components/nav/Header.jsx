import React from 'react'
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import './scss/Nav.scss'
import Navbar from './Navbar';
import sideDrawer from './SideDrawer/SideDrawer';
import NavBar from './components/NavBarComponents';
const Header = () => {
    const leftItems = [
        { as: "a", content: "Home", key: "home", href:"/" },
        { as: "a", content: "Users", key: "users", href:"/login"}
      ];
      const rightItems = [
        { as: "Navlink", content: "Login", key: "login", href:"/login" },
        { as: "NavLink", content: "Register", key: "register" }
      ];
    return(
        <>


<Navbar />
{/* <sideDrawer /> */}
        </>
    )
}

export default Header;