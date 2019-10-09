import { types } from "../actions";

const initialState = {
  user: null,
  post: null,
  posts: null,
  profile:null,
  isAuth: false,
  isLoading: false,
  isSuccess: false,
  errors: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case types.POST_NEW_BLOG_START:
      return {
        ...state,
        isLoading: true,
        errors: null
      };
    case types.POST_NEW_BLOG_SUCCESS:
      // const newBlogPost = [...state.post, payload];
      return {
        ...state,
        isLoading: false,
        errors: null,
        // post: newBlogPost,
        postid:payload,
        isSuccess: true
      };
    case types.POST_NEW_BLOG_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
        isSuccess: false
      };
    case types.GET_BLOG_START:
      return {
        ...state,
        isLoading: true,
        errors: null,
        isAuth: true,
        isSuccess: false
      };
    case types.GET_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: payload,
        isSuccess: true
      };
    case types.GET_BLOG_FAIL:
      return {
        ...state,
        errors: payload,
        isLoading: false
      };
      case types.GET_BLOGPOST_START:
        return {
          ...state,
          isLoading: true,
          errors: null,
          isAuth: true,
          isSuccess: false
        };
      case types.GET_BLOGPOST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          post: payload,
          isSuccess: true
        };
      case types.GET_BLOGPOST_FAIL:
        return {
          ...state,
          errors: payload,
          isLoading: false
        };
    case types.DELETE_BLOG_START:
      return {
        ...state,
        isLoading: true,
        errors: null
      };
      

    case types.DELETE_BLOG_SUCCESS:
      const updatedBlog = state.posts.filter(
        postid => postid.postid !== payload
      );
      return {
        ...state,
        isLoading: false,
        errors: null,
        posts: updatedBlog
      };

    case types.DELETE_BLOG_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload
      };
    default:
      return state;
  }
};
