import React, {useEffect} from 'react'
import {doSignOut} from '../../store/actions/authActions';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const Logout = (props) => {
    useEffect(() => {
        props.doSignOut()
      },[]);
      console.log("signout: ",props)
    return(
        <Redirect to = "/"/>
    )}

const mapStateToProps = (state) => ({
    logout: state.postReducer.logout,
    // console.log(state);
    })
export default connect(mapStateToProps, {doSignOut})(Logout);