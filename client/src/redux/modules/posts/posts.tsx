import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as postsApi from 'utils/api/posts';

/* --------------------------------- action --------------------------------- */
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_ERROR] =
  createRequestActionTypes('posts/WRITE_POST');

/* -------------------------- thunk action creator -------------------------- */
export const writePostAsync = (nodeId: string) =>
  createRequestThunk(WRITE_POST, postsApi.writePost, nodeId);

/* ----------------------------- action creator ----------------------------- */

/* ---------------------------------- types --------------------------------- */

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  data: null,
};

/* --------------------------------- reducer -------------------------------- */
function postsReducer(state = initialState, { type, payload }) {
  switch (type) {
    // loading
    case WRITE_POST:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };

    // success
    case WRITE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: payload,
      };

    // error
    case WRITE_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        data: null,
      };
    default:
      return initialState;
  }
}

export default postsReducer;
