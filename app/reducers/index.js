import { combineReducers } from 'redux';
import Deals from './deals';
import navReducer from './navigation';
import tabNav from './tabnav';
import general from './general';
import user from './user';

export default combineReducers({
    Deals,
    navReducer,
    general,
    user,
});
