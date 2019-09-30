import axios from "axios";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { types } from "./index";
export const doSignIn = credentials => dispatch => {
  dispatch({ type: types.LOGIN_START });

  axios
    .post(
      "http://localhost:2019/login",
      `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
      {
        headers: {
          // btoa is converting our client id/client secret into base64
          Authorization: `Basic ${btoa("skyler-client:skyler-secret")}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then(res => {
      // localStorage.setItem('token', res.data.access_token);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", credentials.username);
      console.log(res);
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
      dispatch({ type: types.GET_USER_START });
      return axiosWithAuth()
        .get(`/users/name/${credentials.username}`)
        .then(res => {
          localStorage.removeItem("user");
          localStorage.setItem("uuid", res.data.uuid);
          console.log(res);
          dispatch({ type: types.GET_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
          //   dispatch({type: types.GET_USER_FAIL, payload: err})
          console.log(err);
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
      console.log(res);
      // dispatch({ type: types.LOGOUT_SUCCESS, payload: res.data });
      })
    .catch(err => {
      dispatch({ type: types.LOGOUT_FAIL, payload: err });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("uuid")
      console.dir(err);
    });
};