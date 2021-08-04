import {http} from '../../helpers/http';
import {BACKEND_URL} from '@env';

export const topUp = (Data, token) => {
  return async dispatch => {
    const form = new URLSearchParams();
    console.log(token);
    form.append('deductedBalance', Data.deductedBalance);
    try {
      const {data} = await http(token).post(
        `${BACKEND_URL}/topup`,
        form.toString(),
      );
      console.log(data);
      dispatch({
        type: 'TOPUP',
        payload: data.results,
      });
    } catch (err) {
      dispatch({
        type: 'TOPUP_FAILED',
        payload: err.response.data.message,
      });
    }
  };
};
