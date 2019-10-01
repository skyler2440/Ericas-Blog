import React, {useEffect} from 'react'
import {getLoggedInUser} from '../../store/actions/authActions'
import {getBlogPosts, deleteBlogPost} from '../../store/actions/postActions';
import { postComment, deleteComment } from '../../store/actions/commentActions'
import {connect} from 'react-redux';
import { Card , Comment} from 'semantic-ui-react'
import ConfirmDelete from './ConfirmDelete';
import AddCommentForm from './AddCommentForm';
import ConfirmDeleteComment from './ConfirmDeleteComment';
import './scss/Blog.scss'
const Blog = (props) => {
    useEffect(() => {
        props.getBlogPosts(0)
        props.getLoggedInUser()
      },[]);
      console.log("postpageprops: ",props.user && props.user.username)
      var username = props.user && props.user.username
      console.log("postprops", props.posts&&props.posts)
const totalPages = props.posts && props.posts.totalPages;
const pageNumbers = [];
for (let i = 0; i <= totalPages -1; i++) {
    pageNumbers.push(i);
}
// var renderPageNumbers = pageNumbers.map(number => {
//     let classes = props.posts.number === number ;

//     return (
//       <span key={number} className={classes} onClick={() => props.getBlogPosts(number)}>{number}</span>
//     );
//   });

  var renderPageNumbers = pageNumbers.map(number => {
    let classes = props.posts.number === number ;
  
    if (number == 1 || number == props.posts.totalPages || (number >= props.posts.number - 2 && number <= props.posts.number + 2)) {
      return (
        <span key={number} className={classes} onClick={() => props.getBlogPosts(number)}>{number}</span>
      );
    }
  });



    return(
        <>
        <h1>Blog Works User{" " + username}</h1>
        {props.posts && props.posts.content.map(posts => (
            <div>

                <BlogPosts
                postid={posts.postid}
                title={posts.posttitle}
                date={posts.date}
                body={posts.postbody}
                uuid={posts.uuid}
                deleteBlogPost={props.deleteBlogPost}
                deleteComment ={ props.deleteComment}
                getBlogPosts={props.getBlogPosts}
                postComment={props.postComment}
                user={props.user}
                comments={posts.blogPostComments.map(comments =>
                
                    comments = comments
                    )}
                />
                
            </div>

            
        ))}


                               <div className="pagination">
                       <span>&laquo;</span>
                       {/* {console.log(props.posts)} */}
                      {/* <span onClick={() => props.getBlogPosts(0)}>0</span> */}
                      {/* <span onClick={() => props.getBlogPosts(1)}>2</span> */}
                       {/* <span>3</span> */}
                       {/* <span>4</span> */}
                       {renderPageNumbers}
                       <span>&raquo;</span>
                     </div>
          </>
            )
                }

function BlogPosts(props){
    console.log( "bpost", props)
    return(
        <>
        
        <Card fluid >
            <Card.Content>
            <Card.Header textAlign='right'>{props.user && props.user.uuid == props.uuid ?
                    (
                        <div className="button-box">
                        <ConfirmDelete
                        deleteBlogPost={props}
                        />
    
                    </div>
                    ) :( <></>)}</Card.Header>
                <Card.Header>{props.title}</Card.Header>
                
                <Card.Description textAlign='left'>{props.date}</Card.Description>
                
                <Card.Description>{props.body}</Card.Description>


                <hr></hr>
                <Comment.Group>
                    <Card.Header textAlign='left'>Comments</Card.Header>
                {props.comments && props.comments.map(comments =>(
                    <>
                    <Comment>
                    {/* <hr></hr> */}
                    {/* <Card.Header textAlign='left'>Comments</Card.Header> */}
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                    <Comment.Author as='a'>{comments.comment.commentusername}</Comment.Author>
                    <Comment.Metadata>
                     <div>{comments.comment.date}</div>
                    <div> {props.user && props.user.uuid === comments.comment.commentuserid ?
                    (
                    <ConfirmDeleteComment
                    deleteComment={props}
                    commentprops={comments.comment}
                    />
                    ) :( <></>)}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comments.comment.comment}</Comment.Text>
                    
                    </Comment.Content>
                    {/* <AddComment
                    postid={props.postid}
                    commentprops={comments.comment}
                    />*/}
                    {/* TODO: Remove Delete button if not users comment */}
     
                    </Comment>

                    </>
            
                ))} <AddCommentForm
                props = {props}
            />
                    </Comment.Group>

            </Card.Content>
    
        </Card>

               </>

    )}

const mapStateToProps = (state) => ({
    posts: state.postReducer.posts,
    user: state.authReducer.user
    // console.log(state);
    })
export default connect(mapStateToProps, {getBlogPosts, deleteBlogPost, postComment, deleteComment, getLoggedInUser})(Blog);

// localStorage.getItem("token") ?

// (  )
// :
// ( )