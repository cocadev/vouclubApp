/** Developed by: Ali Masani **/

import React, { Component } from 'react';
import { Platform } from 'react-native';

import { Provider, connect } from 'react-redux';

import AppContainer from './app/containers/AppContainer';
import getStore from "./app/store";
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps has been',
  'Warning: componentWillUpdate',
]);

export const store = getStore();

const App = () => (

  <Provider store={store} >
    <AppContainer />
  </Provider>

);

export default App;