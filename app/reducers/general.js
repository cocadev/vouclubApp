import * as types from '../actions/types'

const initialState = {general:[]};

const General = (state = initialState,action) => {

    switch(action.type){
        
        case types.GET_CONTENT:
        
        return {
            ...state,
            general:action.payload,

        }
        
        default:
            return state;    
    
    }

}

export default General;