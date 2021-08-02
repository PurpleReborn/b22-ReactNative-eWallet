/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import React from 'react';
AppRegistry.registerComponent(appName, () => Main);

import {Provider} from 'react-redux';
import store from './src/redux/reducers/store';

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
