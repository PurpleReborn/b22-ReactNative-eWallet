import {http} from '../../helpers/http';
import {ToastAndroid} from 'react-native';
import {BACKEND_URL} from '@env';

export const authLogin = (Data, navigation) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('phone', Data.phone);
    form.append('password', Data.password);
    try {
      const {data} = await http().post(
        `${BACKEND_URL}/users/login`,
        form.toString(),
      );
      dispatch({
        type: 'AUTH_LOGIN',
        payload: data.result,
      });
      console.log(BACKEND_URL);
      // console.log(data.result, 'ini bugnya');
      // console.log(`${BACKEND_URL}/users/login`);
      ToastAndroid.showWithGravity(
        'Login success',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      navigation.reset({index: 0, routes: [{name: 'home'}]});
      // navigation.navigate('home');
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'AUTH_LOGIN_FAILED',
        payload: err.response.data.message,
      });
      ToastAndroid.showWithGravity(
        'Login failed',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };
};

export const authRegister = (Data, navigation) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('email', Data.email);
    form.append('phone', Data.phone);
    form.append('password', Data.password);
    form.append('balance', Data.balance);
    form.append('name', Data.name);
    console.log(form);
    // console.log(Data.email);
    try {
      const {data} = await http().post(
        `${BACKEND_URL}/users/register`,
        form.toString(),
      );
      dispatch({
        type: 'REGISTER',
        payload: data.message,
      });
      console.log(BACKEND_URL);
      ToastAndroid.showWithGravity(
        'Create Account Successfully!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      navigation.navigate('picker');
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'REGISTER_FAILED',
        payload: err.response.data.message,
      });
      // if (!Data.password.length < 8) {
      //   ToastAndroid.showWithGravity(
      //     'password length must be 8 characters at least',
      //     ToastAndroid.LONG,
      //     ToastAndroid.TOP,
      //   );
      // }
      // if (!Data.phone.length < 10) {
      //   ToastAndroid.showWithGravity(
      //     'Phone number length must be 11 characters at least',
      //     ToastAndroid.LONG,
      //     ToastAndroid.TOP,
      //   );
      // }
    }
  };
};

export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});

export const authNotifToken = (token, notifToken) => {
  console.log(token);
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('token', notifToken.token);
    if (token) {
      await http(token).post(
        `${BACKEND_URL}/users/registerToken`,
        form.toString(),
      );
      dispatch({
        type: 'AUTH_NOTIF_TOKEN',
        payload: notifToken,
      });
      console.log(BACKEND_URL);
    }
  };
};
