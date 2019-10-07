import React, { useEffect } from "react";
import { getLoggedInUser } from "../../../store/actions/authActions";
import { getBlogPosts, deleteBlogPost } from "../../../store/actions/postActions";
import { postComment, deleteComment } from "../../../store/actions/commentActions";
import { connect } from "react-redux";
import { Card, Comment } from "semantic-ui-react";
import ConfirmDelete from "./ConfirmDelete";
import AddCommentForm from "../../form/AddCommentForm";
import ConfirmDeleteComment from "./ConfirmDeleteComment";
import{Link} from 'react-router-dom'
import "../scss/Blog.scss";
const Blog = props => {
console.log("TCL: propsb1", props.posts)
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
    let classes = props.posts.number = number;

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
      <div className="blogHeader"><h1 className="blogHeaderH">Read a post!</h1></div>
      {props.posts &&
        props.posts.content.map(posts => (
          <div>
            <BlogPosts
            key={posts}
              postid={posts.postid}
              title={posts.title}
              date={posts.date}
              body={posts.body}
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
  console.log("TCL: props posts", props)
//   var user = props.posts.user.map(users => {
//       users = users;
//   })
  return (
    //   <>
      <>
      <div className="blogPostDescriptionBox">
      
          <Link to={`/blog/${props.postid}`}><h1>{props.title}</h1></Link>
          {props.user && props.user.uuid === props.uuid ? (
          <ConfirmDelete deleteBlogPost={props} getBlogPosts={props} />
          ):(<></>)}
      
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
