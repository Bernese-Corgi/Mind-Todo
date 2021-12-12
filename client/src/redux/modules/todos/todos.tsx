import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as todosApi from 'utils/api/todos';

/* --------------------------------- action --------------------------------- */
const [LIST_TODOS, LIST_TODOS_SUCCESS, LIST_TODOS_ERROR] =
  createRequestActionTypes('todos/LIST_TODOS');

const [NODE_LIST_TODOS, NODE_LIST_TODOS_SUCCESS, NODE_LIST_TODOS_ERROR] =
  createRequestActionTypes('todos/NODE_LIST_TODOS');

const SET_TODOS = 'todo/SET_TODOS';

/* -------------------------- thunk action creator -------------------------- */
export const listTodosAsync = () =>
  createRequestThunk(LIST_TODOS, todosApi.listTodos);

export const nodeListTodosAsync = (nodeId: string) =>
  createRequestThunk(NODE_LIST_TODOS, todosApi.nodeListTodos, nodeId);

/* ----------------------------- action creator ----------------------------- */
export const setTodos = todos => ({ type: SET_TODOS, payload: todos });

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
function todosReducer(state = initialState, { type, payload }) {
  switch (type) {
    // loading
    case LIST_TODOS:
    case NODE_LIST_TODOS:
      return {
        ...state,
        loading: true,
        error: null,
        todos: null,
      };

    // success
    case LIST_TODOS_SUCCESS:
    case NODE_LIST_TODOS_SUCCESS:
    case SET_TODOS:
      return {
        ...state,
        loading: false,
        error: null,
        todos: payload,
      };

    // error
    case LIST_TODOS_ERROR:
    case NODE_LIST_TODOS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        todos: null,
      };

    default:
      return initialState;
  }
}

export default todosReducer;
