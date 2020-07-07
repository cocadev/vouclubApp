import * as types from './types'
import globals from '../libs/global'

export const changeTab = (tab,param) =>(

    // console.log("1111111");
    
    async (dispatch, getState, API) => {

        try{
            dispatch ({type:types.CHANGE_TAB,payload:param})
            return param
        }
        catch(e){
            console.warn(e);
        }

        

    }

    // dispatch({type:types.CHANGE_TAB, payload:param})
        
)