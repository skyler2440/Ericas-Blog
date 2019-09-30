import React, {useEffect} from 'react'
import {getBlogPosts, deleteBlogPost} from '../../store/actions/postActions';
import { postComment, deleteComment } from '../../store/actions/commentActions'
import {connect} from 'react-redux';
import { Card , Comment, Header} from 'semantic-ui-react'
import ConfirmDelete from './ConfirmDelete';
import AddCommentForm from './AddCommentForm';
import AddComment from './AddComment';
import ConfirmDeleteComment from './ConfirmDeleteComment';
import './scss/Blog.scss'
const Blog = (props) => {
    useEffect(() => {
        props.getBlogPosts()
      },[]);
      console.log("postpageprops: ",props.posts)
    return(
        <>
        <h1>Blog Works User{" " + localStorage.getItem("uuid")}</h1>
        {props.posts && props.posts.map(posts => (
            <div>

                <BlogPosts
                postid={posts.postid}
                title={posts.posttitle}
                date={posts.date}
                body={posts.postbody}
                uuid={posts.uuid}
                deleteBlogPost={props.deleteBlogPost}
                deleteComment ={ props.deleteComment}
                postComment={props.postComment}
                comments={posts.blogPostComments.map(comments =>
                
                    comments = comments
                    )}
                />
            </div>
        ))}
          </>
            )
}

function BlogPosts(props){
    console.log( props)
    return(
        <>
        
        <Card fluid >
            <Card.Content>
            <Card.Header textAlign='right'>{localStorage.getItem("uuid") == props.uuid ?
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
                    <Comment.Author as='a'>{comments.comment.commentuser}</Comment.Author>
                    <Comment.Metadata>
                     <div>{comments.comment.date}</div>
                    <div> {localStorage.getItem("uuid") == comments.comment.commentuser ?
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
    // console.log(state);
    })
export default connect(mapStateToProps, {getBlogPosts, deleteBlogPost, postComment, deleteComment})(Blog);

// localStorage.getItem("token") ?

// (  )
// :
// ( )