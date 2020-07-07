import * as types from '../actions/types'

const initialState = {deals:[]};

const Deals = (state = initialState,action) => {


    switch(action.type){
        
        case types.GET_DEALS:
        
        return {
            ...state,
            deals:(action.payload.response.deals!="" && action.payload.response.deals!=undefined) ? action.payload.response.deals:[],
            refreshDateTime:action.payload.response.refreshDateTime,
            categories:action.payload.response.categories,

        };
        case types.SEARCH_DEALS:
        
        return {
            ...state,
            deals:(action.payload.response!="" && action.payload.response!=undefined) ? action.payload.response:[],
            

        };
        
        case types.GET_DEAL_DETAILS:
        return {
            ...state,
            dealDetails:action.payload.response,
        }

        case types.GET_CONTENT:
        return {
            ...state,
            content:action.payload.response,
        }
        
        default:
            return state;    
    
    }

}

export default Deals;