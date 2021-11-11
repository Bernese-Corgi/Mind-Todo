/* 액션 타입 --------------------------------- */
const START_LOADING = 'loading/START_LOADING' as const;
const FINISH_LOADING = 'loading/FINISH_LOADING' as const;

/* 액션 생성 함수 -------------------------------- */
// 요청을 위한 액션 타입을 payload로 설정 ('sample/GET_POST')
export const startLoading = requestType => ({
  type: START_LOADING,
  payload: requestType,
});

export const finishLoading = requestType => ({
  type: FINISH_LOADING,
  payload: requestType,
});

/* 초기 상태 --------------------------------- */
const initialState = {};

/* 리듀서 ---------------------------------- */
function loading(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, [action.payload]: true };
    case FINISH_LOADING:
      return { ...state, [action.payload]: false };
    default:
      return state;
  }
}

export default loading;
