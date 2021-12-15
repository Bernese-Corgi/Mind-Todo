import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as mindmapsApi from 'utils/api/mindmaps';

/* --------------------------------- action --------------------------------- */
const [WRITE_MINDMAP, WRITE_MINDMAP_SUCCESS, WRITE_MINDMAP_ERROR] =
  createRequestActionTypes('mindmap/WRITE_MINDMAP');

const [READ_MINDMAP, READ_MINDMAP_SUCCESS, READ_MINDMAP_ERROR] =
  createRequestActionTypes('mindmap/READ_MINDMAP');

const [UPDATE_MINDMAP, UPDATE_MINDMAP_SUCCESS, UPDATE_MINDMAP_ERROR] =
  createRequestActionTypes('mindmap/UPDATE_MINDMAP');

const [REMOVE_MINDMAP, REMOVE_MINDMAP_SUCCESS, REMOVE_MINDMAP_ERROR] =
  createRequestActionTypes('mindmap/REMOVE_MINDMAP');

const INITIALIZE_FORM = 'mindmap/INITIALIZE_FORM';

/* -------------------------- thunk action creator -------------------------- */
export const writeMindmapAsync = (mindmaps: mindmapsApi.MindmapType) =>
  createRequestThunk(WRITE_MINDMAP, mindmapsApi.writeMindmap, mindmaps);

export const readMindmapAsync = (mindmapId: string) =>
  createRequestThunk(READ_MINDMAP, mindmapsApi.readMindmap, mindmapId);

export const updateMindmapAsync = (
  mindmapId: string,
  { title }: mindmapsApi.MindmapType
) =>
  createRequestThunk(UPDATE_MINDMAP, mindmapsApi.updateMindmap, mindmapId, {
    title,
  });

export const removeMindmapAsync = (mindmapId: string) =>
  createRequestThunk(REMOVE_MINDMAP, mindmapsApi.removeMindmap, mindmapId);

/* ----------------------------- action creator ----------------------------- */
export const initializeMindmapForm = () => ({ type: INITIALIZE_FORM });

/* ---------------------------------- types --------------------------------- */
// mindmap state types
export type MindmapState = {
  loading: boolean;
  error: Error | null;
  mindmap: mindmapsApi.MindmapType | null;
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
  mindmap: null,
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
        mindmap: null,
      };

    // success
    case WRITE_MINDMAP_SUCCESS:
    case READ_MINDMAP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        mindmap: payload,
      };

    // error
    case WRITE_MINDMAP_ERROR:
    case READ_MINDMAP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        mindmap: null,
      };

    // initialize
    case INITIALIZE_FORM:
      return initialState;

    default:
      return state;
  }
}

export default mindmapReducer;
