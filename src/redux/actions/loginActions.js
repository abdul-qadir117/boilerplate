import {LOGIN} from './actionTypes';

export const loginPressed = (email, password) => ({
  type: LOGIN,
  payload: email,
  password,
});


