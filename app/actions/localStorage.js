import * as types from './types'
import globals from '../libs/global'

export const getItem = (key) =>(
    
    (dispatch,getState,API) => {
        
        return API.get(endPoint,null,headers).then(res =>{
            dispatch ({type:types.GET_DEALS,payload:res});
            return res;
        }).catch((ex)=>{
            console.log(ex);
        })
    }
)