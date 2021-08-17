import {LOGIN, LOGIN_SUCCESS} from '../actions/actionTypes';
import credentials from '../store/initial-state';

const initialState = {data: [], loading: false, error: ''};

const credentialsReducer = (state = credentials, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default credentialsReducer;
