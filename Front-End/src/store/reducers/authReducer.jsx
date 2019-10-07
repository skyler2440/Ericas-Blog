import {types} from '../actions';

const initialState = {
    token: "",
    user: null,
    signedin: false,
    isAuth: false,
    isLoading: false,
    isSuccess: false,
    errors:null,
    photo:null,
    profile: null
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
              signedin:true,
              token: payload
            };
          case types.LOGIN_FAIL:
            return {
              ...state,
              errors: payload,
              isLoading: false,
              token: ""
            };
            case types.GET_USER_START:
              return {
                ...state,
                isLoading: true,
                errors: null,
                isAuth: true,
                isSuccess: false
              };
            case types.GET_USER_SUCCESS:
              return {
                ...state,
                isLoading: false,
                user: payload,
                isSuccess: true
              };
            case types.GET_USER_FAIL:
              return {
                ...state,
                errors: payload,
                isLoading: false
              };
              case types.CREATE_PROFILE_START:
                return {
                  ...state,
                  isLoading: true,
                  isAuth: false,
                  isSuccess: false,
                  errors: null
                };
              case types.CREATE_PROFILE_SUCCESS:
                return {
                  ...state,
                  isLoading: false,
                  isAuth: true,
                  isSuccess: true,
                  message: payload
                };
              case types.CREATE_PROFILE_FAIL:
                return {
                  ...state,
                  errors: payload,
                  isLoading: false,
                  token: ""
                };
            case types.GET_PROFILE_START:
              return {
                ...state,
                isLoading: true,
                isAuth: false,
                isSuccess: false,
                errors: null
              };
            case types.GET_PROFILE_SUCCESS:
              return {
                ...state,
                isLoading: false,
                isAuth: true,
                isSuccess: true,
                user: payload
              };
            case types.GET_PROFILE_FAIL:
              return {
                ...state,
                errors: payload,
                isLoading: false,
                token: ""
              };
              case types.GET_PROFILEBYID_START:
                return {
                  ...state,
                  isLoading: true,
                  isAuth: false,
                  isSuccess: false,
                  errors: null
                };
              case types.GET_PROFILEBYID_SUCCESS:
                return {
                  ...state,
                  isLoading: false,
                  isAuth: true,
                  isSuccess: true,
                  profile: payload
                };
              case types.GET_PROFILEBYID_FAIL:
                return {
                  ...state,
                  errors: payload,
                  isLoading: false,
                 
                };
              case types.CREATE_USER_START:
                return {
                  ...state,
                  isLoading: true,
                  errors: null,
                  isAuth: false,
                  user: {},
                  isSuccess: false
                };
              case types.CREATE_USER_SUCCESS:
                return {
                  ...state,
                  isLoading: false,
                  errors: null,
                  isAuth: false,
                  user: {},
                  isSuccess: true
                };
              case types.CREATE_USER_FAIL:
                return {
                  ...state,
                  isLoading: false,
                  errors: payload,
                  isAuth: false,
                  user: {},
                  isSuccess: false
                };
          
              case types.LOGOUT_START:
            return {
              ...state,
              isLoading: true,
              isAuth: false,
              isSuccess: false,
              errors: null
            };
          case types.LOGOUT_SUCCESS:
            return {
              ...state,
              isLoading: false,
              isAuth: true,
              isSuccess: true,
              signedin: false,
              token: null,
              user:null
            };
          case types.LOGOUT_FAIL:
            return {
              ...state,
              errors: payload,
              isLoading: false,
              token: ""
            };
            case types.UPLOAD_START:
              return {
                ...state,
                isLoading: true,
                isAuth: false,
                isSuccess: false,
                errors: null
              };
            case types.UPLOAD_SUCCESS:
              return {
                ...state,
                isLoading: false,
                isAuth: true,
                isSuccess: true,

              };
            case types.UPLOAD_FAIL:
              return {
                ...state,
                errors: payload,

              };
        default:
            return state;
    }
}