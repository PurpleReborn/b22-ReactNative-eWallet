import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import topUp from './topUp';
import transfers from './transfer';
import trx from './trx';

const rootReducer = combineReducers({auth, user, topUp, transfers, trx});

export default rootReducer;
