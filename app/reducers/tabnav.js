import * as types from '../actions/types'

const initialState = {tab:[]};

const TabNav = (state = initialState,action) => {

    switch(action.type){
        
        case types.CHANGE_TAB:
        
        return {
            ...state,
            param:action.payload,
        };    
        default:
            return state;    
    
    }

} 

export default TabNav;