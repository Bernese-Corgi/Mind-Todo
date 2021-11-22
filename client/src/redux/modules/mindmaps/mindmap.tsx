import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as mindmapsApi from 'utils/api/mindmaps';

/* --------------------------------- action --------------------------------- */
const [WRITE_MINDMAP, WRITE_MINDMAP_SUCCESS, WRITE_MINDMAP_ERROR] =
  createRequestActionTypes('mindmap/WRITE_MINDMAP');

const [READ_MINDMAP, READ_MINDMAP_SUCCESS, READ_MINDMAP_ERROR] =
  createRequestActionTypes('mindmap/READ_MINDMAP');

const INITIALIZE_FORM = 'mindmap/INITIALIZE_FORM';

/* -------------------------- thunk action creator -------------------------- */
export const writeMindmapAsync = (mindmaps: mindmapsApi.Mindmap) =>
  createRequestThunk(WRITE_MINDMAP, mindmapsApi.writeMindmap, mindmaps);

export const readMindmapAsync = (id: string) =>
  createRequestThunk(READ_MINDMAP, mindmapsApi.readMindmap, id);

/* ----------------------------- action creator ----------------------------- */
export const initializeMindmapForm = () => ({ type: INITIALIZE_FORM });

/* ---------------------------------- types --------------------------------- */
// mindmap state types
export type MindmapState = {
  loading: boolean;
  error: Error | null;
  data: mindmapsApi.Mindmap | null;
};

export type MindmapAction = {
  type:
    | typeof WRITE_MINDMAP
    | typeof WRITE_MINDMAP_SUCCESS
    | typeof WRITE_MINDMAP_ERROR;
  payload: ReturnType<typeof writeMindmapAsync> | null;
};

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  data: null,
};

/* --------------------------------- reducer -------------------------------- */
function mindmapReducer(
  state /* : MindmapState */ = initialState,
  { type, payload } /* : MindmapAction */
) {
  switch (type) {
    // loading
    case WRITE_MINDMAP:
    case READ_MINDMAP:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };

    // success
    case WRITE_MINDMAP_SUCCESS:
    case READ_MINDMAP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: payload,
      };

    // error
    case WRITE_MINDMAP_ERROR:
    case READ_MINDMAP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        data: null,
      };

    // initialize
    case INITIALIZE_FORM:
      return initialState;

    default:
      return state;
  }
}

export default mindmapReducer;
