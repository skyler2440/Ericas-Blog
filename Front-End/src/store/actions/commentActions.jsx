import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {types} from './index';

export const postComment = (comment, postid) => dispatch =>{
    const user = localStorage.getItem('uuid');
    //NEED TO PULL IN POST ID//DOES NOT WORK PROPERLY//
    // const postid = localStorage.getItem("postid");
    dispatch({ type: types.POST_NEW_COMMENT_START});
    return axiosWithAuth()
    .post(`comments/${user}/${postid}`, comment)
    .then(res => {
  
      dispatch({type: types.POST_NEW_COMMENT_SUCCESS, payload: res.data.item})
    })
    .catch(err => {
      dispatch({type: types.POST_NEW_COMMENT_FAIL, payload: err})
    })
};
    export const deleteComment = (commentid, uuid) => dispatch => {
        dispatch({ type: types.DELETE_COMMENT_START});
      return axiosWithAuth()
      .delete(`/comments/${uuid}/${commentid}`)
      .then(res => {
    
        dispatch({type: types.DELETE_COMMENT_SUCCESS, payload: commentid})
      })
      .catch(err => {
        dispatch({type: types.DELETE_COMMENT_FAIL, payload: err})
      })
  };