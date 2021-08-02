import {http} from '../../helpers/http';

import {BACKEND_URL} from '@env';

export const transferByPhone = (token, Data) => async dispatch => {
  const form = new URLSearchParams();
  form.append('phoneNumberRecipient', Data.phoneNumberRecipient);
  form.append('deductedBalance', Data.deductedBalance);
  form.append('description', Data.description);
  try {
    const {data} = await http(token).post(
      `${BACKEND_URL}/transfer`,
      form.toString(),
    );
    dispatch({
      type: 'TRANSFER',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSFER_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const historySender = (token, page) => async dispatch => {
  console.log(page);
  try {
    const {data} = await http(token).get(
      `${BACKEND_URL}/transfer/historySender?sort[createdAt]=1&page=${page}`,
    );
    dispatch({
      type: 'TRANSFER_HISTORY_BY_SENDER',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSFER_HISTORY_BY_SENDER_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const historyRecipient = (token, page) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${BACKEND_URL}/transfer/historyRecipient?sort[createdAt]=0&page=${page}`,
    );
    dispatch({
      type: 'TRANSFER_HISTORY_BY_RECIPIENT',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSFER_HISTORY_BY_RECIPIENT_FAILED',
      payload: err.response.data.message,
    });
  }
};
