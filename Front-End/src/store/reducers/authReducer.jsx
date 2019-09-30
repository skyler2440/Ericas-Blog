import {types} from '../actions';

const initialState = {
    token: "",
    user: null,
    isAuth: false,
    isLoading: false,
    isSuccess: false,
    errors:null
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case types.LOGIN_START:
            return {
              ...state,
              isLoading: true,
              isAuth: false,
              isSuccess: false,
              errors: null
            };
          case types.LOGIN_SUCCESS:
            return {
              ...state,
              isLoading: false,
              isAuth: true,
              isSuccess: true,
              user: payload
            };
          case types.LOGIN_FAIL:
            return {
              ...state,
              errors: payload,
              isLoading: false,
              token: ""
            };
        default:
            return state;
    }
}