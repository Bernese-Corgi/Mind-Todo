import { RefObject } from 'react';
import { createRequestActionTypes } from 'utils/createRequestThunk';

/* --------------------------------- action --------------------------------- */
const [SET_TEXTAREA, SET_TEXTAREA_SUCCESS, SET_TEXTAREA_ERROR] =
  createRequestActionTypes('editor/SET_TEXTAREA');

/* ----------------------------- action creator ----------------------------- */
export const setTextarea = (ref: RefObject<HTMLTextAreaElement>) => ({
  type: SET_TEXTAREA,
  payload: ref,
});

/* ---------------------------------- types --------------------------------- */

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  textarea: null,
};

/* --------------------------------- reducer -------------------------------- */
function editorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_TEXTAREA:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SET_TEXTAREA_SUCCESS:
      return {
        ...state,
        loading: false,
        textarea: payload,
        error: null,
      };

    case SET_TEXTAREA_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return initialState;
  }
}

export default editorReducer;
