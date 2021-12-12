import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as mindmapsApi from 'utils/api/mindmaps';

/* --------------------------------- action --------------------------------- */
const [WRITE_NODE, WRITE_NODE_SUCCESS, WRITE_NODE_ERROR] =
  createRequestActionTypes('node/WRITE_NODE');

const [READ_NODE, READ_NODE_SUCCESS, READ_NODE_ERROR] =
  createRequestActionTypes('node/READ_NODE');

const [UPDATE_NODE, UPDATE_NODE_SUCCESS, UPDATE_NODE_ERROR] =
  createRequestActionTypes('node/UPDATE_NODE');

const [REMOVE_NODE, REMOVE_NODE_SUCCESS, REMOVE_NODE_ERROR] =
  createRequestActionTypes('node/REMOVE_NODE');

/* -------------------------- thunk action creator -------------------------- */
export const writeNodeAsync = (
  mindmapId: string,
  newNode: mindmapsApi.NodeType
) => createRequestThunk(WRITE_NODE, mindmapsApi.writeNode, mindmapId, newNode);

export const readNodeAsync = (mindmapId: string, nodeId: string) =>
  createRequestThunk(READ_NODE, mindmapsApi.readNode, mindmapId, nodeId);

export const updateNodeAsync = (
  mindmapId: string,
  nodeId: string,
  updateNode: mindmapsApi.NodeType
) =>
  createRequestThunk(
    UPDATE_NODE,
    mindmapsApi.updateNode,
    mindmapId,
    nodeId,
    updateNode
  );

export const removeNodeAsync = (mindmapId: string, nodeId: string) =>
  createRequestThunk(REMOVE_NODE, mindmapsApi.removeNode, mindmapId, nodeId);

/* ----------------------------- action creator ----------------------------- */

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
function nodeReducer(state = initialState, { type, payload }) {
  switch (type) {
    // loading
    case WRITE_NODE:
    case READ_NODE:
    case UPDATE_NODE:
    case REMOVE_NODE:
      return {
        ...state,
        loading: true,
        error: null,
        node: null,
      };

    // success
    case WRITE_NODE_SUCCESS:
    case READ_NODE_SUCCESS:
    case UPDATE_NODE_SUCCESS:
    case REMOVE_NODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        node: payload,
        post: payload.post,
        todos: payload.todos,
      };

    // error
    case WRITE_NODE_ERROR:
    case READ_NODE_ERROR:
    case UPDATE_NODE_ERROR:
    case REMOVE_NODE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        node: null,
      };

    default:
      return initialState;
  }
}

export default nodeReducer;
