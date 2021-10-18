import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import {persistStore} from 'redux-persist';

export default () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);
  return {store, persistor};
};
