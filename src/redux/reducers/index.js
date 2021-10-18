import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import topUp from './topUp';
import transfers from './transfer';
import trx from './trx';
// import global from './global';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistAuth = {
  storage: AsyncStorage,
  key: 'auth',
};

// const persistUser = {
//   key: 'user',
//   storage: AsyncStorage,
// };

const reducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  // user: persistReducer(persistUser, user),
  user,
  topUp,
  transfers,
  trx,
  // global,
});

export default reducer;
