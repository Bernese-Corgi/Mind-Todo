import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import persistedReducer from './modules';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const middlewares = [reduxThunk, logger];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

console.log(store);

const StoreProvider = props => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{props.children}</PersistGate>
  </Provider>
);

export default StoreProvider;
