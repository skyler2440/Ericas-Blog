import React, {useEffect} from 'react'
import {doSignOut} from '../../store/actions/authActions';
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';

const Logout = (props) => {
    useEffect(() => {
        props.doSignOut()
      },[]);
    return(
        <Redirect to = "/" props={props}/>
        
    )


}

const mapStateToProps = (state) => ({
    logout: state.postReducer.logout,
    })
export default connect(mapStateToProps, {doSignOut})(Logout);