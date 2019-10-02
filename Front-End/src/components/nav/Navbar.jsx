import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./scss/Nav.scss";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../store/actions/authActions";

const Navbar = props => {

  if (props.signedin == false) {
    return (
      <>
        <Menu stackable borderless>
          <Menu.Item>
            <h1 className="header">Erica's Vanity</h1>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlink" exact to="/">
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlink" to="/post">
              Add Post
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlink" to="/blog">
              Blog
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlink" to="/contact">
              Contact
            </NavLink>
          </Menu.Item>
          <Menu.Item position="right">
            <NavLink className="navlink" to="/login">
              Login
            </NavLink>
          </Menu.Item>

        </Menu>
      </>
    );
  } else {
    return (
      <>
        <Menu stackable borderless>
          <Menu.Item>
            <h1 className="header">Erica's Blog</h1>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlink" exact to="/">
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlink" to="/post">
              Add Post
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlink" to="/blog">
              Blog
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlink" to="/profile">
              Profile
            </NavLink>
          </Menu.Item>

          <Menu.Item position="right">
            <NavLink className="navlink" to="/logout">
              Logout
            </NavLink>
          </Menu.Item>
        </Menu>
      </>
    );
  }
};

const mapStateToProps = state => ({
  signedin: state.authReducer.signedin
});
export default connect(
  mapStateToProps,
  { getLoggedInUser }
)(Navbar);
