import React, {Component} from 'react';
import { YellowBox, View } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions/index';
import AppNavigator from './AppNavigator'

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export const AppContainer = () => (
  <AppNavigator />
)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(AppContainer);

