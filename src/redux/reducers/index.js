import {combineReducers} from 'redux';
// import {reducer as formReducer} from 'redux-form';

import credentialsReducer from './credentialsReducer';


const rootReducer = combineReducers({
  credentialsReducer,
});

export default rootReducer;
