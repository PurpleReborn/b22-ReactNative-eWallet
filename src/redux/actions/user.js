import {http} from '../../helpers/http';
import {ToastAndroid} from 'react-native';
import {BACKEND_URL} from '@env';

export const getUser = token => {
  return async dispatch => {
    const {data} = await http(token).get(`${BACKEND_URL}/users/detail`);
    dispatch({
      type: 'USER_GET_DETAILS',
      payload: data.results,
    });
    console.log(token, 'ini token');
  };
};

// export const updateProfile = (token, Data) => async dispatch => {
//   const form = new FormData();
//   if (Data.picture !== undefined) {
//     form.append('picture', {
//       uri: Data.picture.uri,
//       name: Data.picture.fileName,
//       type: Data.picture.type,
//     });
//   }
//   form.append('name', Data.name);
//   form.append('email', Data.email);
// form.append('phone', Data.phone);
// try {
//   const {data} = await http(token).patch(`${BACKEND_URL}/users`, form);
//   dispatch({
//     type: 'USER_UPDATE',
//     payload: data.message,
//   });
// } catch (err) {
//   dispatch({
//     type: 'USER_UPDATE_FAILED',
//     payload: err.response.data.message,
//   });
// }
// };

export const compare = (token, Data, navigation) => {
  console.log(token);
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('password', Data.password);
    console.log(form);
    console.log(token);
    try {
      const {data} = await http(token).post(`${BACKEND_URL}/users/code`, form);
      dispatch({
        type: 'COMPARE',
        payload: data.message,
      });
      ToastAndroid.showWithGravity(
        'Correct Password',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      navigation.navigate('change2');
    } catch (err) {
      dispatch({
        type: 'COMPARE_FAILED',
        payload: err.response.data.message,
      });
      ToastAndroid.showWithGravity(
        `${err.response.data.message}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };
};

export const changePassword = (token, Data, navigation) => {
  console.log(token, 'change');
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('password', Data.password);
    console.log(form);
    console.log(token);
    try {
      const {data} = await http(token).patch(
        `${BACKEND_URL}/users/change`,
        form,
      );
      dispatch({
        type: 'CHANGE',
        payload: data.message,
      });
      ToastAndroid.showWithGravity(
        'Change password Successfully!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      navigation.navigate('profile');
    } catch (err) {
      dispatch({
        type: 'CHANGE_FAILED',
        payload: err.response.data.message,
      });
      ToastAndroid.showWithGravity(
        `${err.response.data.message}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };
};

export const updateProfile = (token, Data) => {
  return async dispatch => {
    const form = new FormData();
    console.log(token.token);
    if (Data.picture !== null && Data.picture !== undefined) {
      form.append('picture', {
        uri: Data.picture.uri,
        name: Data.picture.fileName,
        type: Data.picture.type,
      });
    }

    form.append('name', Data.name);
    form.append('phone', Data.phone);
    form.append('email', Data.email);

    // if (Data.picture !== undefined) {
    //   form.append('picture', {
    //     uri: Data.picture.uri,
    //     name: Data.picture.fileName,
    //     type: Data.picture.type,
    //   });
    //   form.append('name', Data.name);
    //   form.append('phone', Data.phone);
    //   form.append('email', Data.email);
    // } else {
    //   form.append('name', Data.name);
    //   form.append('phone', Data.phone);
    //   form.append('email', Data.email);
    // }
    console.log(Data.picture);
    try {
      const {data} = await http(token.token).patch(
        `${BACKEND_URL}/users`,
        form,
      );
      console.log(data);
      dispatch({
        type: 'USER_UPDATE',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'USER_UPDATE_FAILED',
        payload: 'Update profile',
      });
    }
  };
};
