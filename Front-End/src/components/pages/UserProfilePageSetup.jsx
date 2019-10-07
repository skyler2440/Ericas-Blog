import React from 'react'
import { connect } from "react-redux";
import UserProfilePage from './UserProfilePage';
import CreateProfile from '../form/CreateProfile';

const UserProfilePageSetup = (props) => {
    
console.log("TCL: UserProfilePage -> props", props.user)
if (props.user && props.user.userProfiles.length === 0)
{
    return(
        <CreateProfile props={props}/>
    )
}else{
return(
    <>
    {props.user && props.user.userProfiles.map(userinfo => (
        <>
        
        <UserProfilePage userprops = {userinfo} uuid={props.user.uuid} />

        </>
))}
    </>
)}
} 
const mapStateToProps = state => ({
    post: state.postReducer.post,
    user: state.authReducer.user
  });
  export default connect(
    mapStateToProps)(UserProfilePageSetup);