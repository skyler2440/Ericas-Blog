import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {types} from './index';

export const postBlogPost = (post) => dispatch =>{
    const user = localStorage.getItem('uuid');
    dispatch({ type: types.POST_NEW_BLOG_START});
    return axiosWithAuth()
    .post(`/posts/user/${user}`, post)
    .then(res => {
  
      dispatch({type: types.POST_NEW_BLOG_SUCCESS, payload: res.data.item})
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
          console.log(res)
          dispatch({type: types.GET_BLOG_SUCCESS, payload: res.data});
        }
      )
      .catch(
        err => {
          dispatch({type: types.GET_BLOG_FAIL, payload: err})
          console.log(err)
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