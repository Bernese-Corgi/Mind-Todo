import { Action, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import reduxThunk, { ThunkDispatch } from 'redux-thunk';
import { persistStore } from 'redux-persist';
import persistedReducer, { RootState } from './modules';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const middlewares = [reduxThunk, logger];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>;

export const useReduxDispatch = () => useDispatch<ReduxDispatch>();

const persistor = persistStore(store);

const StoreProvider = props => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{props.children}</PersistGate>
  </Provider>
);

export default StoreProvider;
