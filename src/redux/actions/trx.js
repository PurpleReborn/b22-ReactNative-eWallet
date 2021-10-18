import {http} from '../../helpers/http';

import {BACKEND_URL} from '@env';
import {ToastAndroid} from 'react-native';

export const transaction = (token, Data) => async dispatch => {
  const form = new URLSearchParams();
  console.log(token.token);
  form.append('deductedBalance', Data.deductedBalance);
  form.append('description', Data.description);
  form.append('trxFee', Data.trxFee);
  form.append('refNo', Data.refNo);
  try {
    const {data} = await http(token).post(
      `${BACKEND_URL}/transaction`,
      form.toString(),
    );
    dispatch({
      type: 'TRANSACTION',
      payload: data.message,
    });
    ToastAndroid.showWithGravity(
      'Transactions success',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
    console.log(BACKEND_URL);
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_FAILED',
      payload: err.response.data.message,
    });
    ToastAndroid.showWithGravity(
      'Failed Transaction',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  }
};

export const getTransaction = id => async dispatch => {
  // console.log(BACKEND_URL);
  // console.log(page);
  try {
    const {data} = await http().get(`${BACKEND_URL}/transaction/${id}`);
    dispatch({
      type: 'TRANSACTION_HISTORY',
      payload: data.results,
    });
    console.log(BACKEND_URL);
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_HISTORY_FAILED',
      payload: err.response.data.message,
    });
  }
};
