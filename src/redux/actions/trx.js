import {http} from '../../helpers/http';

import {BACKEND_URL} from '@env';

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
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_FAILED',
      payload: err.response.data.message,
    });
  }
};
