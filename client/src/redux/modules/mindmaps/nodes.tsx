import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as mindmapsApi from 'utils/api/mindmaps';

/* --------------------------------- action --------------------------------- */
const [WRITE_NODE, WRITE_NODE_SUCCESS, WRITE_NODE_ERROR] =
  createRequestActionTypes('nodes/WRITE_NODE');

/* -------------------------- thunk action creator -------------------------- */
export const writeNodeAsync = (
  mindmapId: string,
  newNode: mindmapsApi.NodeType
) => createRequestThunk(WRITE_NODE, mindmapsApi.writeNode, mindmapId, newNode);

/* ----------------------------- action creator ----------------------------- */

/* ---------------------------------- types --------------------------------- */

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  data: null,
};

/* --------------------------------- reducer -------------------------------- */
function nodesReducer(state = initialState, { type, payload }) {
  switch (type) {
    // loading
    case WRITE_NODE:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };

    // success
    case WRITE_NODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: payload,
      };

    // error
    case WRITE_NODE_ERROR:
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

export default nodesReducer;
