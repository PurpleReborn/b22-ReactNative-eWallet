import {http} from '../../helpers/http';

import {BACKEND_URL} from '@env';

export const getUser = token => {
  return async dispatch => {
    const {data} = await http(token).get(`${BACKEND_URL}/users/detail`);
    dispatch({
      type: 'USER_GET_DETAILS',
      payload: data.results,
    });
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

export const updateProfile = (token, Data) => {
  return async dispatch => {
    const form = new FormData();
    console.log(token.token);
    if (Data.picture !== null) {
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
        payload: err.response.data.message,
      });
    }
  };
};
