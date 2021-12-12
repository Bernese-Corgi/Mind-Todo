import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as postsApi from 'utils/api/posts';

/* --------------------------------- action --------------------------------- */
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_ERROR] =
  createRequestActionTypes('post/WRITE_POST');

const [READ_POST, READ_POST_SUCCESS, READ_POST_ERROR] =
  createRequestActionTypes('post/READ_POST');

const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_ERROR] =
  createRequestActionTypes('post/UPDATE_POST');

const [REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_ERROR] =
  createRequestActionTypes('post/REMOVE_POST');

const SET_POST = 'post/SET_POST';

const UNLOAD_POST = 'post/UNLOAD_POST';

/* -------------------------- thunk action creator -------------------------- */
export const writePostAsync = (nodeId: string, newPost: postsApi.Post) =>
  createRequestThunk(WRITE_POST, postsApi.writePost, nodeId, newPost);

export const readPostAsync = (postId: string) =>
  createRequestThunk(READ_POST, postsApi.readPost, postId);

export const updatePostAsync = (postId: string, updatePost: postsApi.Post) =>
  createRequestThunk(UPDATE_POST, postsApi.updatePost, postId, updatePost);

export const removePostAsync = (postId: string) =>
  createRequestThunk(REMOVE_POST, postsApi.removePost, postId);

/* ----------------------------- action creator ----------------------------- */
export const setPost = post => ({ type: SET_POST, payload: post });

export const unloadPost = () => ({ type: UNLOAD_POST });

/* ---------------------------------- types --------------------------------- */

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  mindmap: null,
  node: null,
  post: null,
  todos: null,
};

/* --------------------------------- reducer -------------------------------- */
function postReducer(state = initialState, { type, payload }) {
  switch (type) {
    // loading
    case WRITE_POST:
    case READ_POST:
    case UPDATE_POST:
    case REMOVE_POST:
      return {
        ...state,
        loading: true,
        error: null,
        // post: null,
      };

    // success
    case WRITE_POST_SUCCESS:
    case READ_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
    case REMOVE_POST_SUCCESS:
    case SET_POST:
      return {
        ...state,
        loading: false,
        error: null,
        post: payload,
      };

    // error
    case WRITE_POST_ERROR:
    case READ_POST_ERROR:
    case UPDATE_POST_ERROR:
    case REMOVE_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        post: null,
      };

    // unload post
    case UNLOAD_POST:
      return initialState;
    default:
      return initialState;
  }
}

export default postReducer;
