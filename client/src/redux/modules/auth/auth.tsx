import createRequestThunk, {
  createRequestActionTypes,
} from 'utils/createRequestThunk';
import * as authApi from 'utils/api/auth';

/* --------------------------------- action --------------------------------- */
export const [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR] =
  createRequestActionTypes('auth/SIGN_UP');

export const [SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_ERROR] =
  createRequestActionTypes('auth/SIGN_IN');

/* -------------------------- thunk action creator -------------------------- */
export const signUpAsync = (newUser: authApi.SignUp) =>
  createRequestThunk(SIGN_UP, authApi.signUp, newUser);

export const signInAsync = (user: authApi.SignIn) =>
  createRequestThunk(SIGN_IN, authApi.signIn, user);

/* ---------------------------------- types --------------------------------- */
// state types
export type AuthState = {
  loading: boolean;
  error: Error | null;
  data: (authApi.SignUp & authApi.SignIn) | null;
  // token:
};

// action types
interface SignUpAction {
  type: typeof SIGN_UP | typeof SIGN_UP_SUCCESS | typeof SIGN_UP_ERROR;
  payload: authApi.SignUp | null;
}

interface SignInAction {
  type: typeof SIGN_IN | typeof SIGN_IN_SUCCESS | typeof SIGN_IN_ERROR;
  payload: authApi.SignIn | null;
}

export type AuthActionTypes = SignUpAction | SignInAction;

// ANCHOR 쓰이는 곳이 없음.. ThunkAction의 네번째 인수에 들어가야 하는데 requestThunk함수가 유틸로 빠져있어서 지정하기 어려운거 같다.
export type AuthAction =
  | ReturnType<typeof signUpAsync>
  | ReturnType<typeof signInAsync>;

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  loading: false,
  error: null,
  data: null,
  // token: null,
};

/* --------------------------------- reducer -------------------------------- */
function authReducer(state = initialState, action /* : AuthActionTypes */) {
  const { type, payload } = action;

  switch (type) {
    // loading
    case SIGN_UP:
    case SIGN_IN:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    // success data loading
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: payload,
        // token: payload.header['access_token'],
      };
    // error
    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        data: null,
      };
    default:
      return state;
  }
}

export default authReducer;
