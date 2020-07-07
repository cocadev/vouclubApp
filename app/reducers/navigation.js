import { NavigationActions } from 'react-navigation';
import * as types from '../actions/types'

import RootAppNavigator from '../Routes'

const initialNavState = RootAppNavigator.router.getStateForAction(NavigationActions.init());

const navReducer = (state = initialNavState, action) => {
    
    const newState = RootAppNavigator.router.getStateForAction(action, state)
    return newState || state;
}

export default navReducer;