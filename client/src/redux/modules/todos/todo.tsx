import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as todosApi from 'utils/api/todos';

/* --------------------------------- action --------------------------------- */
const [WRITE_TODO, WRITE_TODO_SUCCESS, WRITE_TODO_ERROR] =
  createRequestActionTypes('todo/WRITE_TODO');

const [UPDATE_TODO, UPDATE_TODO_SUCCESS, UPDATE_TODO_ERROR] =
  createRequestActionTypes('todo/UPDATE_TODO');

const [REMOVE_TODO, REMOVE_TODO_SUCCESS, REMOVE_TODO_ERROR] =
  createRequestActionTypes('todo/REMOVE_TODO');

const UNLOAD_TODO = 'todo/UNLOAD_TODO';

/* -------------------------- thunk action creator -------------------------- */
export const writeTodoAsync = (nodeId: string, newTodo: todosApi.TodoType) =>
  createRequestThunk(WRITE_TODO, todosApi.writeTodo, nodeId, newTodo);

export const updateTodoAsync = (
  todoId: string,
  updateTodo: todosApi.TodoType
) => createRequestThunk(UPDATE_TODO, todosApi.updateTodo, todoId, updateTodo);

export const removeTodoAsync = (todoId: string) =>
  createRequestThunk(REMOVE_TODO, todosApi.removeTodo, todoId);

/* ----------------------------- action creator ----------------------------- */

export const unloadTodo = () => ({ type: UNLOAD_TODO });

/* ---------------------------------- types --------------------------------- */

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  todo: null,
};

/* --------------------------------- reducer -------------------------------- */
function todoReducer(state = initialState, { type, payload }) {
  switch (type) {
    // loading
    case WRITE_TODO:
    case UPDATE_TODO:
    case REMOVE_TODO:
      return {
        ...state,
        loading: true,
        error: null,
        // todo: null,
      };

    // success
    case WRITE_TODO_SUCCESS:
    case UPDATE_TODO_SUCCESS:
    case REMOVE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        todo: payload,
      };

    // error
    case WRITE_TODO_ERROR:
    case UPDATE_TODO_ERROR:
    case REMOVE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        todo: null,
      };

    // unload todo
    case UNLOAD_TODO:
      return initialState;

    // default
    default:
      return initialState;
  }
}

export default todoReducer;
