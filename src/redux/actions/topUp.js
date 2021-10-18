import {http} from '../../helpers/http';
import {BACKEND_URL} from '@env';
import {ToastAndroid} from 'react-native';
import PushNotification from 'react-native-push-notification';

export const topUp = (Data, token, navigation) => {
  return async dispatch => {
    const form = new URLSearchParams();
    console.log(token);
    form.append('deductedBalance', Data.deductedBalance);
    try {
      const {data} = await http(token).post(
        `${BACKEND_URL}/topup`,
        form.toString(),
      );
      console.log(`${BACKEND_URL}/topup`);
      dispatch({
        type: 'TOPUP',
        payload: data.results,
      });
      setTimeout(() => {
        PushNotification.localNotification({
          channelId: 'general-notif',
          title: 'OVO',
          message: 'Top Up Success',
        });
      }, 2000);
      ToastAndroid.showWithGravity(
        'Mobile Topup success',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } catch (err) {
      dispatch({
        type: 'TOPUP_FAILED',
        payload: err.response.data.message,
      });
      ToastAndroid.showWithGravity(
        'Minimum TopUp 10.000',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };
};
