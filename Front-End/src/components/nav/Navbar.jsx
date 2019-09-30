import React from 'react'
import {Icon, Menu, Header} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import './scss/Nav.scss'
import DrawerToggleButton from './SideDrawer/DrawerToggleButton';
const Navbar = props => {
//     <header className="navbar">
//     <nav className="navbar-nav">
//     <div><DrawerToggleButton/></div>
//     <div className="navbar-header"><a href="/">The Logo</a></div>
//     <div className="spacer"/>
//     <div className="navbar-items">
//         <ul>
//             <li><a href="/">Products</a></li>
//             <li><a href="/">Users</a></li>

//         </ul>
//     </div>
//     </nav>
//     </header>
// )
// class Navbar extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             menu_class: "",
//         }
//     }


// setToggleNavbarClass = () => {
//     if(this.state.menu_class === ""){
//         this.setState({
//             menu_class: 'toggled',
//         })
//     }else{
//         this.setState({
//             menu_class:"",
//         })
//     }
// }
// render = () => {
//     let top_menu_class = `top-menu ${this.state.menu_class}`

return(
    localStorage.getItem("token") ?

    (
        <>
        <Menu stackable borderless>
            <Menu.Item>
                <h1 className="header">Erica's Blog</h1>
            </Menu.Item>
            <Menu.Item>
            <NavLink className='navlink' exact to="/">Home</NavLink>     
            </Menu.Item>
            <Menu.Item>
            <NavLink className='navlink' to="/post">Add Post</NavLink>
            </Menu.Item>
            <Menu.Item>
            <NavLink className='navlink' to="/blog">Blog</NavLink>
            </Menu.Item>

            <Menu.Item position="right">
            <NavLink className='navlink' to="/logout">Logout</NavLink>
            </Menu.Item>
        </Menu>
       </>

    )
    :
    (
<>
    <Menu stackable borderless>
        <Menu.Item>
            <h1 className="header">Erica's Vanity</h1>
        </Menu.Item>
        <Menu.Item>
        <NavLink className='navlink' exact to="/">Home</NavLink>     
        </Menu.Item>
        <Menu.Item>
        <NavLink className='navlink' to="/post">Add Post</NavLink>
        </Menu.Item>
        <Menu.Item>
        <NavLink className='navlink' to="/blog">Blog</NavLink>
        </Menu.Item>
        <Menu.Item>
        <NavLink className='navlink' to="/contact">Contact</NavLink>
        </Menu.Item>
        <Menu.Item position="right">
        <NavLink className='navlink' to="/login">Login</NavLink>
        </Menu.Item>
    </Menu>
   </>
    )
    
)}

export default Navbar;