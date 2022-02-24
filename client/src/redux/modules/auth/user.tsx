import { createRequestActionTypes } from 'utils/createRequestThunk';
import * as authApi from 'utils/api/auth';
import { finishLoading, startLoading } from '../common/loading';

/* --------------------------------- action --------------------------------- */
// 새로 고침 이후 임시 로그인 처리
const TEMP_SET_USER = 'user/TEMP_SET_USER';

// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_ERROR] =
  createRequestActionTypes('user/CHECK');

// 로그아웃
const SIGN_OUT = 'user/SIGN_OUT';

/* ---------------------------------- types --------------------------------- */
export type UserState = {
  // user: user에 필요한 타입 선언
  checkError: Error | null;
};

interface TempSetUserAction {
  type: typeof TEMP_SET_USER;
}

interface CheckAction {
  type: typeof CHECK | typeof CHECK_SUCCESS | typeof CHECK_ERROR;
  // payload: user 타입 | null;
}

// TODO 로그아웃

export type UserActionTypes = TempSetUserAction | CheckAction;

/* ----------------------------- action creator ----------------------------- */
export const tempSetUser = user => ({ type: TEMP_SET_USER, payload: user });

// export const checkAsync = () => createRequestThunk(CHECK, authApi.check);
export const checkAsync = () => async dispatch => {
  dispatch(startLoading(CHECK));

  try {
    const response = await authApi.check();
    dispatch({ type: CHECK_SUCCESS, payload: response.data, meta: response });
  } catch (e) {
    dispatch({ type: CHECK_ERROR, payload: e });
    localStorage.removeItem('user');
  }

  dispatch(finishLoading(CHECK));
};

export const signOutAsync = () => async dispatch => {
  try {
    const response = await authApi.signOut();
    localStorage.removeItem('user');
    dispatch({ type: SIGN_OUT, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  user: null,
  checkError: null,
};

/* --------------------------------- reducer -------------------------------- */
function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TEMP_SET_USER:
      return {
        ...state,
        user: payload,
      };
    case CHECK_SUCCESS:
      return {
        ...state,
        user: payload,
        checkError: null,
      };
    case CHECK_ERROR:
      return {
        ...state,
        user: null,
        checkError: payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export default userReducer;
