import * as types from '../actions/types'

const initialState = {user:[]};

const User = (state = initialState,action) => {

    switch(action.type){
        
        case types.GET_USER:
        
        return {
            ...state,
            user:action.payload,

        }
        case types.GET_PROFILE:
        
        return {
            ...state,
            user:action.payload.response,
        }
        case types.LOGOUT_USER:
        
        return {
            ...state,
            user:{},
        }
        
        default:
            return state;    
    
    }

}

export default User;