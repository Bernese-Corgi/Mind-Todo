import { finishLoading, startLoading } from 'redux/modules/common/loading';

export const createRequestActionTypes = (type: string) => [
  `${type}` as const,
  `${type}_SUCCESS` as const,
  `${type}_ERROR` as const,
];

const createRequestThunk =
  (type, api, ...params) =>
  async dispatch => {
    // start loading
    // dispatch(startLoading(type));
    dispatch({ type: `${type}` });

    try {
      // async request
      const response = await api(...params);
      // success request
      dispatch({
        type: `${type}_SUCCESS`,
        payload: response.data,
        meta: response,
      });
      return response.data;
    } catch (e) {
      // error (failure request)
      dispatch({ type: `${type}_ERROR`, payload: e });
    }
    // finish loading
    dispatch(finishLoading(type));
  };

export default createRequestThunk;
