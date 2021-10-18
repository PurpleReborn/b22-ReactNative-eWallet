import {http} from '../../helpers/http';
import PushNotification from 'react-native-push-notification';
import {BACKEND_URL} from '@env';
import {ToastAndroid} from 'react-native';

export const transferByPhone = (token, Data) => async dispatch => {
  console.log('ini token tf');
  console.log(token);
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
    console.log(BACKEND_URL);
    setTimeout(() => {
      PushNotification.localNotification({
        channelId: 'general-notif',
        title: 'OVO',
        message: 'Transfers success',
      });
    }, 2000);
    ToastAndroid.showWithGravity(
      'Success transfer!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
    // navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
  } catch (err) {
    dispatch({
      type: 'TRANSFER_FAILED',
      payload: err.response.data.message,
    });
    ToastAndroid.showWithGravity(
      `${err.response.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  }
};

export const historySender = (token, sort, page) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${BACKEND_URL}/transfer/historySender?limit=6&page=${page}&sort[createdAt]=${sort}`,
    );

    // console.log(data);
    dispatch({
      type: 'TRANSFER_HISTORY_BY_SENDER',
      payload: data,
    });
    console.log(BACKEND_URL);
  } catch (err) {
    dispatch({
      type: 'TRANSFER_HISTORY_BY_SENDER_FAILED',
      payload: err.response.data.message,
    });
    setTimeout(() => {
      dispatch({type: 'RESET'});
    }, 3000);
  }
};

export const historySender2 = (token, sort, search, page) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${BACKEND_URL}/transfer/historySender?limit=6&page=${page}&search=${search}&sort[createdAt]=${sort}`,
    );
    console.log(data);
    dispatch({
      type: 'TRANSFER_HISTORY_BY_SENDER2',
      payload: data,
    });
    console.log(BACKEND_URL);
  } catch (err) {
    dispatch({
      type: 'TRANSFER_HISTORY_BY_SENDER_FAILED',
      payload: err.response.data.message,
    });
    setTimeout(() => {
      dispatch({type: 'RESET'});
    }, 3000);
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
    console.log(BACKEND_URL);
  } catch (err) {
    dispatch({
      type: 'TRANSFER_HISTORY_BY_RECIPIENT_FAILED',
      payload: err.response.data.message,
    });
  }
};
