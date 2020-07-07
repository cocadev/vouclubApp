import * as types from './types'
import globals from '../libs/global'

export const getContent = () =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.openWeb + 'appContent?'; 
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        dispatch ({type:types.GET_DEALS,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);
