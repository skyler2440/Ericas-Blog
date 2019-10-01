import {types} from '../actions';

const initialState = {
    user: null,
    post: null,
    comment: null,
    commentid: null,
    isAuth: false,
    isLoading: false,
    isSuccess: false,
    errors:null
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
      

            case types.POST_NEW_COMMENT_START:
                return {
                  ...state,
                  isLoading: true,
                  errors: null
                };
              case types.POST_NEW_COMMENT_SUCCESS:
                const newComment = [...state.post, payload];
                return {
                  ...state,
                  isLoading: false,
                  errors: null,
                  post: newComment,
                  isSuccess: true
                };
              case types.POST_NEW_COMMENT_FAIL:
                return {
                  ...state,
                  isLoading: false,
                  errors: payload,
                  isSuccess: false
                };
                case types.DELETE_COMMENT_START:
                    return {
                      ...state,
                      isLoading: true,
                      errors: null
                    };
              
                  case types.DELETE_COMMENT_SUCCESS:
                    const updatedComment = state.posts.filter(
                      commentid => commentid.commentid !== payload
                    );
                    return {
                      ...state,
                      isLoading: false,
                      errors: null,
                      posts: updatedComment
                    };
              
                  case types.DELETE_COMMENT_FAIL:
                    return {
                      ...state,
                      isLoading: false,
                      errors: payload
                    };

            default:
                return state;
    }
};