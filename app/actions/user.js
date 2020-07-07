import * as types from './types'
import globals from '../libs/global'
import Base64 from '../libs/base64'

export const registerUser = (number) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.openWeb+'registerUser?clientId='+ globals.clientId +'&channel='+globals.channel+'&appVersion='+globals.appVersion+'&advertisingId='+globals.advertisingId+'&mobileNumber='+encodeURIComponent(number);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
        
        const response = await API.post(endPoint,{"test":"test"},headers);
        
        //dispatch ({type:types.GET_DEALS,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const basicAuth = (number, pin) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.openWeb+'sessionTokenBasicAuth?clientId='+encodeURIComponent(globals.clientId)+'&channel='+encodeURIComponent(globals.channel)+'&appVersion='+encodeURIComponent(globals.appVersion)+'&advertisingId='+encodeURIComponent(globals.advertisingId);
        
        var authHeader = Base64.btoa(pin+":"+number+":"+globals.authProvider+":"+globals.appAccess+":NONE");

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':authHeader,
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        dispatch ({type:types.BASIC_AUTH,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const autoAuth = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.openWeb+'sessionTokenAutoAuth?clientId='+encodeURIComponent(globals.clientId)+'&channel='+encodeURIComponent(globals.channel)+'&appVersion='+encodeURIComponent(globals.appVersion)+'&advertisingId='+encodeURIComponent(globals.advertisingId)+'&refreshToken='+encodeURIComponent(token);
        
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        // dispatch ({type:types.BASIC_AUTH,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const subscribeUser = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.authWeb + 'subscribeUser?clientId='+globals.clientId+'&channel='+globals.channel+'&appVersion='+globals.appVersion+'&advertisingId='+globals.advertisingId;
        
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.post(endPoint,{"test":"test"},headers);
        
        // dispatch ({type:types.BASIC_AUTH,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const unsubscribeUser = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.authWeb+'unsubscribeUser?clientId='+encodeURIComponent(globals.clientId)+'&channel='+encodeURIComponent(globals.channel)+'&appVersion='+encodeURIComponent(globals.appVersion)+'&advertisingId='+encodeURIComponent(globals.advertisingId);
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.post(endPoint,{"test":"test"},headers);
        
        // dispatch ({type:types.BASIC_AUTH,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const resetPin = (mobile) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint =  globals.openWeb+'resetPIN?clientId='+encodeURIComponent(globals.clientId)+'&channel='+encodeURIComponent(globals.channel)+'&appVersion='+encodeURIComponent(globals.appVersion)+'&advertisingId='+encodeURIComponent(globals.advertisingId)+'&mobileNumber='+encodeURIComponent(mobile);
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
        
        const response = await API.post(endPoint,{"test":"test"},headers);
        
        // dispatch ({type:types.BASIC_AUTH,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const postLogEvent = (token,formData) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint =  globals.authWeb + 'logEvent?'+ formData;
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.post(endPoint,{"test":"test"},headers);
        
        // dispatch ({type:types.BASIC_AUTH,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const uploadImage = (token,formData) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint =  globals.authWeb + 'uploadUserPhoto';
        
        console.log(formData);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization':token
        } 
        
        const response = await API.post(endPoint,formData,headers);
        
        // dispatch ({type:types.BASIC_AUTH,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const getProfile = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.authWeb+'userProfile';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        dispatch ({type:types.GET_PROFILE,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const getTransactions = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.authWeb+'userTransactions';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        dispatch ({type:types.GET_TRANSACTIONS,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const getNotifications = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.authWeb+'userNotifications';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        dispatch ({type:types.GET_TRANSACTIONS,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const refreshToken = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.openWeb+'refreshSession';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 

        
        const response = await API.get(endPoint,null,headers);
        
        
        // dispatch ({type:types.GET_TRANSACTIONS,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const logoutUser = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.openWeb+'logoutSession';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        dispatch ({type:types.LOGOUT_USER,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const getCreditPacks = () =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.openWeb+'creditPacks';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        // dispatch ({type:types.LOGOUT_USER,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const canUserTopup = (token) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.authWeb+'userCanTopupCredits';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        // dispatch ({type:types.LOGOUT_USER,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const topupCredits = (token,packId) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint =  globals.authWeb + 'topupCredits?clientId='+encodeURIComponent(globals.clientId)+'&channel='+encodeURIComponent(globals.channel)+'&appVersion='+encodeURIComponent(globals.appVersion)+'&advertisingId='+encodeURIComponent(globals.advertisingId)+"&creditPackId="+encodeURIComponent(packId);
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 
        
        const response = await API.post(endPoint,{"test":"test"},headers);
        
        // dispatch ({type:types.BASIC_AUTH,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);