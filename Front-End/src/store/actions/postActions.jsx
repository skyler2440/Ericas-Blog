import { axiosWithAuth, axiosWithOutAuth } from "../../utils/axiosWithAuth";
import {types} from './index';

export const postBlogPost = (post) => dispatch =>{
    const user = localStorage.getItem('uuid');
    dispatch({ type: types.POST_NEW_BLOG_START});
    return axiosWithAuth()
    .post(`/posts/${user}`, post)
    .then(res => {
    console.log("TCL: res", res)
  
      dispatch({type: types.POST_NEW_BLOG_SUCCESS, payload: res.data})
    })
    .catch(err => {
      dispatch({type: types.POST_NEW_BLOG_FAIL, payload: err})
    })
  
  };

  export const getBlogPosts = (pageno) => dispatch => {
    dispatch({ type: types.GET_BLOG_START});
    return axiosWithAuth()
      .get(`/posts/all?page=${pageno}`)
      .then(
        res => {
          dispatch({type: types.GET_BLOG_SUCCESS, payload: res.data});
        }
      )
      .catch(
        err => {
          dispatch({type: types.GET_BLOG_FAIL, payload: err})
        }
      )
  };

  export const getBlogPostsHome = () => dispatch => {
    dispatch({ type: types.GET_BLOG_START});
    return axiosWithOutAuth()
      .get(`/posts/all`)
      .then(
        res => {
          dispatch({type: types.GET_BLOG_SUCCESS, payload: res.data});
        }
      )
      .catch(
        err => {
          dispatch({type: types.GET_BLOG_FAIL, payload: err})
        }
      )
  };


  export const deleteBlogPost = (postid, uuid) => dispatch => {
	dispatch({ type: types.DELETE_BLOG_START});
  return axiosWithAuth()
  .delete(`/posts/${uuid}/${postid}`)
  .then(res => {

    dispatch({type: types.DELETE_BLOG_SUCCESS, payload: postid})
  })
  .catch(err => {
    dispatch({type: types.DELETE_BLOG_FAIL, payload: err})
  })

};

export const getBlogPostsById = (postid) => dispatch => {
  dispatch({ type: types.GET_BLOGPOST_START});
  return axiosWithAuth()
    .get(`/posts/${postid}`)
    .then(
      res => {
      // console.log("TCL: res", res)
        
        dispatch({type: types.GET_BLOGPOST_SUCCESS, payload: res.data});
      }
    )
    .catch(
      err => {
        dispatch({type: types.GET_BLOGPOST_FAIL, payload: err})
      }
    )
};
