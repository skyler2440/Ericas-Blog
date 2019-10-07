import React, {useEffect} from 'react'
import UserProfile from '../form/UserProfile'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Bg from '../Bg'

import {getBlogPostsHome} from '../../store/actions/postActions'
import "./scss/Home.scss"
const Home = (props) => {
    console.log("TCL: Home -> props", props)
    useEffect(() => {
        props.getBlogPostsHome()
      },[]);
      const mappedPosts = props.posts && props.posts.content.map(posts => posts)
      console.log("TCL: Home -> mappedPosts", mappedPosts)
    return(
        <>
        <div className="home">
        <div className="homeHeader">
            <h1 className="homeHeaderH">Welcome to Erica's Vanity</h1>
        </div>
        <Bg>

<h1>Latest Posts</h1>
{props.posts && props.posts.content.map(posts => (
 
<>
<div className="homeLatest">
    <div className="homeLatestTitle">
<h1>{posts.title}</h1>
<p>{posts.date}</p>
</div>
<p>{posts.body.slice(0,100).concat('...')}</p>
<Link className="homeLink"to={`/blog/${posts.postid}`}>Read Me...</Link>
</div>
</>
))}
</Bg>

</div>

</>
    )
}

const mapStateToProps = (state) => ({
    posts: state.postReducer.posts,
    // console.log(state);
    })
export default connect(mapStateToProps, {getBlogPostsHome})(Home);