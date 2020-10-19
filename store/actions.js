/**
 * @author 3zz.
 * @data 2020/10/19
 */
import axios from 'axios';
import types from './types';

export function logout() {
  return dispatch => {
    axios
      .post('/logout')
      .then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: types.LOGOUT,
          });
        }
        else console.log('logout failed', resp);
      })
      .catch(err => {
        console.log('logout failed', err);
      });
  }
}
