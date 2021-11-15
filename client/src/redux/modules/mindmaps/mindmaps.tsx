import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as mindmapsApi from 'utils/api/mindmaps';

/* --------------------------------- action --------------------------------- */
const [LIST_MINDMAP, LIST_MINDMAP_SUCCESS, LIST_MINDMAP_ERROR] =
  createRequestActionTypes('mindmaps/LIST_MINDMAP');

/* -------------------------- thunk action creator -------------------------- */
export const listMindmapAsync = () =>
  createRequestThunk(LIST_MINDMAP, mindmapsApi.listMindmap);

/* ----------------------------- action creator ----------------------------- */

/* ---------------------------------- types --------------------------------- */

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  data: null,
};

/* --------------------------------- reducer -------------------------------- */
function mindmapsReducer(state = initialState, { type, payload }) {
  switch (type) {
    // loading
    case LIST_MINDMAP:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };

    // success
    case LIST_MINDMAP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: payload,
      };

    // error
    case LIST_MINDMAP_ERROR:
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

export default mindmapsReducer;
