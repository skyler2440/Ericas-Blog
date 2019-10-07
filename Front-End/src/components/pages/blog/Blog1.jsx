import React, { useEffect } from "react";
import { getLoggedInUser,getProfileById } from "../../../store/actions/authActions";
import { getBlogPostsById, deleteBlogPost } from "../../../store/actions/postActions";
import { postComment, deleteComment } from "../../../store/actions/commentActions";
import { connect } from "react-redux";
import { Card, Comment } from "semantic-ui-react";
import ConfirmDelete from "./ConfirmDelete";
import AddCommentForm from "../../form/AddCommentForm";
import ConfirmDeleteComment from "./ConfirmDeleteComment";
import "../scss/Blog.scss";
import SubscribeInput from "../../form/SubscribeInput";
const Blog1 = props => {
console.log("TCL: props", props.commentprops&&props.commentprops.commentuuid)
  useEffect(() => {
    props.getBlogPostsById(props.match.params.postid)
    props.getLoggedInUser();
    // props.getProfileById()
  }, []);
console.log("blog1props", props)
  var username = props.user && props.user.username;
//   const commentUsers = props.post&&props.post.blogPostComments.map(users => users.comment.commentuuid)

//   // console.log("TCL: avatar", avatar)
//   console.log("TCL: commentUsers", commentUsers)
//  var user=  commentUsers.map(user => user)
//   console.log("TCL: user", user)
     const avatar = props.user.userProfiles.map(user => user.avatarurl)
  return (
    //   <>
      <>
            {/* <h1>Blog Works User{" " + username}</h1> */}
      <div className="blogPostBox">
        <div className='postContent'>
            <div className="postHeader">
                <h1>{props.post&& props.post.title}</h1>
                {props.user && props.user.uuid === props.post && props.post.uuid ? (
              <div className="button-box">
                <ConfirmDelete deleteBlogPost={props} getBlogPosts={props} />
              </div>
            ) : (
              <></>
            )}
            </div>
            <div className="postMeta">
                <p className="userName">{props.post && props.post.author}</p>
                <p className="postDate">{props.post && props.post.date}</p>
            </div>
            <div className="postBody">
                <p className="postBodyP">{props.post && props.post.body}</p>
            </div>
        </div>
        <h1 className="commentHeader">Comments</h1>
        {props.post &&
              props.post.blogPostComments.map(comments => (
        <div className="commentContent">
            <div className="commentBox">

                <img className="commentAvatar" src={avatar} alt='avatar'/>
                <div className="commentBoxTop">
                    <p className="commentUserName">{comments.comment.commentun}</p>
                    <p className="commentDate">{comments.comment.date}</p>
                    {props.user &&
                          props.user.uuid === comments.comment.commentuuid ? (
                            <p><ConfirmDeleteComment
                              deleteComment={props}
                              commentprops={comments.comment}
                            /></p>
                          ) : (
                            <></>
                          )}
                </div>
                {/* <div className="commentBoxBottom">
                    <p className="commentBody">{comments.comment.comment}</p>
                </div> */}
                
            </div>
            <div className="commentBoxBottom">
                    <p className="commentBody">{comments.comment.comment}</p>
                </div>
        </div>))}
        <button className="ui button  comment showComment"
                onClick={()=>{let hideboxes = document.querySelector(".addComment");  hideboxes.classList.toggle('hidden'); }}>Comment</button>
        <div className="addComment hidden">
                
                <AddCommentForm props={props} />
                </div>
      </div>
      <SubscribeInput />
          </>

  )
}

const mapStateToProps = state => ({
  post: state.postReducer.post,
  user: state.authReducer.user,
  userProfile: state.authReducer.profile
});
export default connect(
  mapStateToProps,
  { getBlogPostsById, deleteBlogPost, postComment,getProfileById, deleteComment, getLoggedInUser }
)(Blog1);

// localStorage.getItem("token") ?

// (  )
// :
// ( )
