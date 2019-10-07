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
      <div className="navbar">
        <div className="navLeft">
          <h1 className="header" onClick={e=>{var hidden=document.querySelector('.navMid'); hidden.classList.toggle("hidden")}}>Erica's Vanity</h1>
        </div>
        <div className="navMid hidden">
            <NavLink className="navlink" exact to="/">
              Home
            </NavLink>
            <NavLink className="navlink" to="/post">
              Add Post
            </NavLink>
            <NavLink className="navlink" to="/blog">
              Blog
            </NavLink>
            <NavLink className="navlink" to="/contact">
              Contact
            </NavLink>
        </div>
        <div className="navRight">
            <NavLink className="navlink" to="/login">
              Login
            </NavLink>
        </div>
      </div>
      </>
    );
  } else {
    return (
      <>
      <div className="navbar">
        <div className="navLeft">
          <h1 className="header" onClick={e=>{var hidden=document.querySelector('.navMid'); hidden.classList.toggle("hidden")}}>Erica's Vanity</h1>
        </div>
        <div className="navMid hidden">
            <NavLink className="navlink" exact to="/">
              Home
            </NavLink>
            <NavLink className="navlink" to="/post">
              Add Post
            </NavLink>
            <NavLink className="navlink" to="/blog">
              Blog
            </NavLink>
            <NavLink className="navlink" to="/contact">
              Contact
            </NavLink>
            <NavLink className="navlink" to="/profile">
              Profile
            </NavLink>
        </div>
        <div className="navRight">
            <NavLink className="navlink" to="/logout">
              Logout
            </NavLink>
        </div>
      </div>
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
