import React from 'react';
import {connect} from 'react-redux';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import RootAppNavigator from '../Routes';

export const AppNavigator = () => (
  
    <RootAppNavigator uriPrefix={"voucherclub://voucherclub/"}/>
);

const navMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
);

// TODO: comment below line to show logs
// console.log = () => {};
if (!__DEV__) {
  
}

const AppNavigatorState = ({dispatch, nav}) => {
  const addListener = createReduxBoundAddListener('root');
  const prefix = "voucherclub://voucherclub";
  return (
      <AppNavigator navigation={{dispatch, state: nav, addListener}} uriPrefix={{prefix}}/>
  );
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppNavigatorState);