import {put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN,
  LOGIN_SUCCESS,
  
} from '../actions/actionTypes';


let BASE_URL = 'https://webwek.herokuapp.com/';
const access_token = 'JJASGDHnbsagJ448ASDAS98asda8SADa';

const getUser = (email, password) => {
  return axios.post(
    `${BASE_URL}/auth`,
    {
      access_token: access_token,
    },
    {
      auth: {
        username: email,
        password: password,
      },
    },
  );
};


function* loginFlow(action) {
  try {
    let email = 'ahmadj@divsync.com';
    let password = '123';

    const response = yield call(getUser, email, password);
    let token = response.data.access_token;

    axiosApi.defaults.headers.common = {Authorization: `bearer ${token}`};

    let user = response.data.user;
    const result = yield response;


    if (token) {
    //   yield call(AsyncStorage.setItem, 'token', token);
      yield put({type: LOGIN_SUCCESS, token, data: user});
    } else {
      if (result.error) {
        yield put({type: LOGIN_FAILURE, error: result.error});
      }
    }
  } catch (e) {
    yield put({type: LOGIN_FAILURE, error: e.message});
    console.log(e);
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN, loginFlow);

}
