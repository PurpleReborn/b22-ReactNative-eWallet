import {http} from '../../helpers/http';

import {BACKEND_URL} from '@env';

export const authLogin = (phone, password) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('phone', phone);
    form.append('password', password);
    try {
      const {data} = await http().post(
        `${BACKEND_URL}/users/login`,
        form.toString(),
      );
      dispatch({
        type: 'AUTH_LOGIN',
        payload: data.result,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'AUTH_LOGIN_FAILED',
        payload: err.response.data.message,
      });
    }
  };
};

export const authRegister = (phone, password, number) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('phone', phone);
    form.append('password', password);
    form.append('number', number);
    try {
      const {data} = await http().post(
        `${BACKEND_URL}/auth/register`,
        form.toString(),
      );
      dispatch({
        type: 'REGISTER',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAILED',
        payload: err.response.data.message,
      });
    }
  };
};

export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});
