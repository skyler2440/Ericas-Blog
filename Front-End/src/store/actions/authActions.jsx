import axios from "axios";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { types } from "./index";
export const doSignIn = credentials => dispatch => {
  dispatch({ type: types.LOGIN_START });

 return axios
    .post(
      // "https://skylerwebdev-ericasblog.herokuapp.com/login",
      "http://localhost:2019/login",
      `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
      {
        headers: {
          // btoa is converting our client id/client secret into base64
          // Authorization: `Basic ${btoa("oauth-client:oauth-secret")}`,
          Authorization: `Basic ${btoa("skyler-client:skyler-secret")}`,

          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then(res => {
      // localStorage.setItem('token', res.data.access_token);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", credentials.username);
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.access_token });
      dispatch({ type: types.GET_USER_START });
      return axiosWithAuth()
        .get(`/users/name/${credentials.username}`)
        .then(res => {
          localStorage.removeItem("user");
          localStorage.setItem("uuid", res.data.uuid);
          dispatch({ type: types.GET_USER_SUCCESS, payload:res.data});
        })
        .catch(err => {
          //   dispatch({type: types.GET_USER_FAIL, payload: err})
        });
    })
    .catch(err => {
      dispatch({ type: types.LOGIN_FAIL, payload: err });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("uuid")
      console.dir(err);
    });
};

export const doSignOut = () => dispatch => {
  dispatch({ type: types.LOGOUT_START });

return axiosWithAuth()
    .get("/logout")
    .then(res => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("uuid");
      dispatch({ type: types.LOGOUT_SUCCESS, payload: false });
      })
    .catch(err => {
      dispatch({ type: types.LOGOUT_FAIL, payload: err });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("uuid")
    });
};

export const getLoggedInUser = () => dispatch => {

  dispatch({ type: types.GET_PROFILE_START });
  var uuid = localStorage.getItem("uuid")
  return axiosWithAuth()
.get(`/users/user/${uuid}`)

.then(res => {
      dispatch({ type: types.GET_PROFILE_SUCCESS, payload: res.data });

      })
    .catch(err => {
      dispatch({ type: types.GET_PROFILE_FAIL, payload: err });

    });
};

export const doCreateAccount = newUserDetails => dispatch =>{
  dispatch({ type: types.CREATE_USER_START});
  axios.post('http://localhost:2019/users/user', newUserDetails)
  .then(
    res => {
      dispatch({ type: types.CREATE_USER_SUCCESS, payload: {message: 'User was created successfully!'}});
    }
  )
  .catch(
    err => {
      dispatch({type: types.CREATE_USER_FAIL, payload: err})
    } 
  )

};

export const doUpdateUser = userDetails => dispatch => {
  const uuid = localStorage.getItem("uuid")
  dispatch({type: types.UPDATE_USER_START})
  return axiosWithAuth()
  .put(`/users/user/${uuid}`, userDetails)
  .then(res => {
    console.log(userDetails)
    console.log("update user res", res)
    dispatch({type: types.UPDATE_USER_SUCCESS, payload:{message: "User updated Successfully"}})
    dispatch({ type: types.GET_PROFILE_START });
    return axiosWithAuth()
  .get(`/users/user/${uuid}`)
  
  .then(res => {
        dispatch({ type: types.GET_PROFILE_SUCCESS, payload: res.data });
  
        })
      .catch(err => {
        dispatch({ type: types.GET_PROFILE_FAIL, payload: err });
  
      });
  })
  .catch(err => {
    dispatch({type: types.UPDATE_USER_FAIL, payload: err})
  })
}