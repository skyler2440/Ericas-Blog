import React, { useEffect } from "react";
import { getLoggedInUser } from "../../store/actions/authActions";
import { getBlogPosts, deleteBlogPost } from "../../store/actions/postActions";
import { postComment, deleteComment } from "../../store/actions/commentActions";
import { connect } from "react-redux";
import { Card, Comment } from "semantic-ui-react";
import ConfirmDelete from "./ConfirmDelete";
import AddCommentForm from "./AddCommentForm";
import ConfirmDeleteComment from "./ConfirmDeleteComment";
import "./scss/Blog.scss";
const Blog = props => {
console.log("TCL: props", props.posts)
  useEffect(() => {
    props.getBlogPosts(0);
    props.getLoggedInUser();
  }, []);

  var username = props.user && props.user.username;
  const totalPages = props.posts && props.posts.totalPages;
  const pageNumbers = [];
  for (let i = 0; i <= totalPages - 1; i++) {
    pageNumbers.push(i);
  }
  var renderPageNumbers = pageNumbers.map(number => {
    let classes = props.posts.number === number;

    if (
      number == 1 ||
      number == props.posts.totalPages ||
      (number >= props.posts.number - 2 && number <= props.posts.number + 2)
    ) {
      return (
        <span
          key={number}
          className={classes}
          onClick={() => props.getBlogPosts(number)}
        >
          {number + 1}
        </span>
      );
    }
  });

  return (
    <>
      <h1>Blog Works User{" " + username}</h1>
      {props.posts &&
        props.posts.content.map(posts => (
          <div>
            <BlogPosts
              postid={posts.postid}
              title={posts.posttitle}
              date={posts.date}
              body={posts.postbody}
              uuid={posts.uuid}
              deleteBlogPost={props.deleteBlogPost}
              deleteComment={props.deleteComment}
              getBlogPosts={props.getBlogPosts}
              postComment={props.postComment}
              user={props.user}
              postAuthor={posts.postauthor}
              pagenumber={props.posts.number}
              comments={posts.blogPostComments.map(
                comments => (comments = comments)
              )}
            />
          </div>
        ))}

      <div className="pagination">
        <span
          onClick={() =>
            props.getBlogPosts(
              props.posts.number === 0
                ? props.posts.number
                : props.posts.number - 1
            )
          }
        >
          &laquo;
        </span>
        {renderPageNumbers}
        <span
          onClick={() =>
            props.getBlogPosts(
              props.posts.number + 1 === props.posts.totalPages
                ? props.posts.number
                : props.posts.number + 1
            )
          }
        >
          &raquo;
        </span>
      </div>
    </>
  );
};

function BlogPosts(props) {
  console.log("TCL: props", props)
//   var user = props.posts.user.map(users => {
//       users = users;
//   })
  return (
    //   <>
      <>
      <div className="blogPostBox">
        <div className='postContent'>
            <div className="postHeader">
                <h1>{props.title}</h1>
                {props.user && props.user.uuid == props.uuid ? (
              <div className="button-box">
                <ConfirmDelete deleteBlogPost={props} getBlogPosts={props} />
              </div>
            ) : (
              <></>
            )}
            </div>
            <div className="postMeta">
                <p className="userName">{props.postAuthor}</p>
                <p className="postDate">{props.date}</p>
            </div>
            <div className="postBody">
                <p className="postBodyP">{props.body}</p>
            </div>
        </div>
        <h1 className="commentHeader">Comments</h1>
        {props.comments &&
              props.comments.map(comments => (
        <div className="commentContent">
            <div className="commentBox">
                
                <img className="commentAvatar" src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"/>
                <div className="commentBoxTop">
                    <p className="commentUserName">{comments.comment.commentusername}</p>
                    <p className="commentDate">{comments.comment.date}</p>
                    {props.user &&
                          props.user.uuid === comments.comment.commentuserid ? (
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
        <div className="addComment">
                {/* <button className="ui button comment showComment"
                onClick={()=>{let hideboxes = document.querySelector(".hideboxes"); hideboxes.classList.remove('hidden'); console.log(hideboxes.classList)}}>Comment</button> */}
                <AddCommentForm props={props} />
                </div>
      </div>
          </>
//     /* <>
//       <Card fluid>
//         <Card.Content>
//           <Card.Header textAlign="right">
//             {props.user && props.user.uuid == props.uuid ? (
//               <div className="button-box">
//                 <ConfirmDelete deleteBlogPost={props} getBlogPosts={props} />
//               </div>
//             ) : (
//               <></>
//             )}
//           </Card.Header>
//           <Card.Header>{props.title}</Card.Header>

//           <Card.Description textAlign="left">{props.date}</Card.Description>

//           <Card.Description>{props.body}</Card.Description>

//           <hr></hr>
//           <Comment.Group>
//             <Card.Header textAlign="left">Comments</Card.Header>
//             {props.comments &&
//               props.comments.map(comments => (
//                 <>
//                   <Comment>
//                     {/* <hr></hr> */}
//                     {/* <Card.Header textAlign='left'>Comments</Card.Header> */}
//                     <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
//                     <Comment.Content>
//                       <Comment.Author as="a">
//                         {comments.comment.commentusername}
//                       </Comment.Author>
//                       <Comment.Metadata>
//                         <div>{comments.comment.date}</div>
//                         <div>
//                           {" "}
//                           {props.user &&
//                           props.user.uuid === comments.comment.commentuserid ? (
//                             <ConfirmDeleteComment
//                               deleteComment={props}
//                               commentprops={comments.comment}
//                             />
//                           ) : (
//                             <></>
//                           )}
//                         </div>
//                       </Comment.Metadata>
//                       <Comment.Text>{comments.comment.comment}</Comment.Text>
//                     </Comment.Content>
//                     {/* <AddComment
//                     postid={props.postid}
//                     commentprops={comments.comment}
//                     />*/}
//                     {/* TODO: Remove Delete button if not users comment */}
//                   </Comment>
//                 </>
//               ))}{" "}
//             <AddCommentForm props={props} />
//           </Comment.Group>
//         </Card.Content>
//       </Card>
//     </>
//     </>
//   ); */}
  )
}

const mapStateToProps = state => ({
  posts: state.postReducer.posts,
  user: state.authReducer.user
});
export default connect(
  mapStateToProps,
  { getBlogPosts, deleteBlogPost, postComment, deleteComment, getLoggedInUser }
)(Blog);

// localStorage.getItem("token") ?

// (  )
// :
// ( )
