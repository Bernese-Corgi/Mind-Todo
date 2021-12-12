import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as postsApi from 'utils/api/posts';

/* --------------------------------- action --------------------------------- */
const [LIST_POST, LIST_POST_SUCCESS, LIST_POST_ERROR] =
  createRequestActionTypes('posts/LIST_POST');

/* -------------------------- thunk action creator -------------------------- */
export const listPostsAsync = ({ username, tag }) =>
  createRequestThunk(LIST_POST, postsApi.listPost, { username, tag });

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  posts: null,
};

/* --------------------------------- reducer -------------------------------- */
function postsReducer(state = initialState, { type, payload }) {
  switch (type) {
    // loading
    case LIST_POST:
      return {
        ...state,
        loading: true,
        error: null,
        // posts: null,
      };

    // success
    case LIST_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: payload,
      };

    // error
    case LIST_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        posts: null,
      };

    default:
      return initialState;
  }
}

export default postsReducer;
