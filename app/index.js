import React from 'react';
import {Provider} from 'react-redux';
import App from './app';
import store from '../src/redux/store';

const AppContainer: () => React$Node = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppContainer;

