import React from "react";
import { connect } from "react-redux";
import UserProfile from "../../form/UserProfile";
import AddPostForm from "../../form/AddPostForm";
import {postBlogPost} from '../../../store/actions/postActions';

const AddPost = ( props) => {
console.log("TCL: AddPost -> props", props)
// console.log("TCL: AddPost -> user", user)
return(
    <>
    {props.user && props.user.userProfiles.length === 0 ? (<UserProfile props={props} />):(<AddPostForm props={props}/>)}
    </>
)
}

const mapStateToProps = state => ({
    posts: state.postReducer.posts,
    user: state.authReducer.user
  });
  export default connect(
    mapStateToProps, {postBlogPost}
  )(AddPost);