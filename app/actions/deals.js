import AsyncStorage from '@react-native-community/async-storage';
import * as types from './types'
import globals from '../libs/global'
import Base64 from '../libs/base64'

var _ = require('lodash');

export const getDeals = (data) =>(
    
    async (dispatch,getState,API) => {
     try{   

        console.log(globals.savedDeals);

        if(globals.savedDeals!='' && globals.savedDeals!=undefined){
            data = "lastDealCount=" + globals.savedDealsCount + "&lastRefreshDateTime=" + globals.lastRefreshDate + "&cachedDealIds=" + globals.savedDeals + "&favDealIds=" + globals.userFavs.substr(1);
        }

        const endPoint = globals.openWeb + 'deals?'+data; 
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
        
        const response = await API.get(endPoint,null,headers);
        dispatch ({type:types.GET_DEALS,payload:response});

        console.log(response);

        if(response.status==200){

            var dealIds = "";
        
            for(var i=0; i<response.response.deals.length; i++){
                dealIds = (dealIds == "") ? dealIds + response.response.deals[i].dealID : dealIds + ","+ response.response.deals[i].dealID;
            }

            globals.savedDeals = dealIds;
            globals.savedDealsCount = response.response.deals.length;
            globals.lastRefreshDate = response.response.refreshDateTime;

            var savedDeals = {
                savedDeals:globals.savedDeals,
                savedDealsCount:globals.savedDealsCount,
                lastRefreshDate:globals.lastRefreshDate,
            }

            AsyncStorage.setItem("savedDeals",JSON.stringify(savedDeals));

        }

        

        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const searchDeals = (data) =>(
    
    async (dispatch,getState,API) => {
     try{   

        console.log(globals.savedDeals);

        if(globals.savedDeals!='' && globals.savedDeals!=undefined){
            data = data + "&lastDealCount=" + globals.savedDealsCount + "&lastRefreshDateTime=" + globals.lastRefreshDate + "&cachedDealIds=" + globals.savedDeals;
        }

        const endPoint = globals.openWeb + 'searchDeals?'+data; 
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
        
        const response = await API.get(endPoint,null,headers);
        dispatch ({type:types.SEARCH_DEALS,payload:response});        

        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const dealDetails = (id) => (

    async (dispatch,getState,API) => {
        try{

            const endPoint = globals.openWeb + 'dealDetails?dealID='+id; 
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }  

        const response = await API.get(endPoint,null,headers);
        
        dispatch ({type:types.GET_DEAL_DETAILS,payload:response});
        return response;

        // return API.get(endPoint,null,headers).then(res =>{
        //     dispatch ({type:types.GET_DEAL_DETAILS,payload:res});
        //     return res;
        // }).catch((ex)=>{
        //     console.log(ex);
        // })

        } catch(e){
            console.warn(e);
        }
        
    }

);

export const getContent = () =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint = globals.openWeb + 'appContent?'; 
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
        
        const response = await API.get(endPoint,null,headers);
        
        dispatch ({type:types.GET_CONTENT,payload:response});
        return response;
    } 
    catch(e){
        console.warn(e);
    }
    }
);

export const outletPin = (token,dealId,merchantPin) =>(
    
    async (dispatch,getState,API) => {
     try{   
        const endPoint =  globals.authWeb + 'isOutletPinValid';
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':token
        } 

        const response = await API.post(endPoint,{"dealID":dealId, "outletPIN": Base64.btoa(merchantPin)},headers);
        
        // dispatch ({type:types.BASIC_AUTH,payload:response});
        console.log("^^^^");
        console.log(response);
        console.log("^^^^");
        return response;
    } 
    catch(e){
        console.log("#$#$#$");
        console.log(e);
    }
    }
);

export const redeemVoucher = ( token, dealId, merchantPin, price ) =>(
    async (dispatch, getState, API) =>{
        try {


            const endPoint =  globals.authWeb + 'redeemDeal?clientId='+encodeURIComponent(globals.clientId)+'&channel='+encodeURIComponent(globals.channel)+'&appVersion='+encodeURIComponent(globals.appVersion)+'&advertisingId='+encodeURIComponent(globals.advertisingId);
        
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token
            } 
            console.log({ "dealID":dealId, "outletPIN":merchantPin, "dealPrice":price });
            const response = await API.post(endPoint,{ "dealID":dealId, "outletPIN":merchantPin, "dealPrice":price },headers);
            
            // dispatch ({type:types.BASIC_AUTH,payload:response});
            console.log("^^^^");
            console.log(response);
            console.log("^^^^");
            return response;


        }catch(e){
            console.log(e);
        }
    }
);

export const getUserFavourites = (msisdn) => {

    async (dispatch, getState, API) =>{
        try{

            const allFavs = await API.getLocalStorage("userFavs");
            const userFavs = "";
        
            if(allFavs!='' && allFavs!= null && allFavs!=undefined){
                allFavs = JSON.parse(allFavs);
                console.log(allFavs);

                if(_.find(allFavs,{'msisdn':msisdn})){

                    console.log("AAA");
            
                    userFavs = _.find(allFavs,{'msisdn':msisdn})['favourites'];
            
                }else {
            
                    userFavs = "";
            
                }

            }else {
                allFavs = [];
                userFavs  = "";
            }

            return {type:'USER_FAVS',favs:userFavs};

        }
        catch(e){
            console.warn(e);
        }
    }

}

export const saveFavourite = (msisdn,dealId) => {

    async (dispatch, getState, API) =>{
        try{
        
        console.log("BBBBBBBBB");    

        var allFavs = await API.getLocalStorage("userFavs");

        if(allFavs!='' && allFavs!=null && allFavs!=undefined){
            allFavs = JSON.parse(allFavs);
        }

        var userFavs = this.getUserFavourites(msisdn);

        var rowIndex;

        console.log("===");
        console.log(msisdn);
        console.log(allFavs);
        console.log(_.findIndex(allFavs,{'msisdn':msisdn}));
        
        if(_.findIndex(allFavs,{'msisdn':msisdn})>=0){

            console.log("AAA");

            userFavs = userFavs + "," + dealId;

            rowIndex = _.findIndex(allFavs, ['msisdn', msisdn]);

            allFavs[rowIndex].favourites = userFavs;

            AsyncStorage.setItem("userFavs", JSON.stringify(allFavs));

        }else {

            console.log("BBB");

            let thisFav = { "msisdn" : msisdn, "favourites":","+dealId } 

            allFavs.push(thisFav);

            AsyncStorage.setItem("userFavs", JSON.stringify(allFavs));

        }


         }catch(e){
             console.log(e);
         }
    }

}

export const removeFavourite = (msisdn,dealId) =>{

    let allFavs = localStorage.getItem('userFavs') || [];

    if(allFavs !="" && allFavs != undefined){
        allFavs = JSON.parse(allFavs);
    }else {
        allFavs = [];
    }

    let userFavs = this.getUserFavourites(msisdn);

    let rowIndex;

    rowIndex = _.findIndex(allFavs, ['msisdn', msisdn]);

    userFavs = _.replace(userFavs,","+dealId,'');

    console.log(rowIndex);
    console.log(userFavs);
    console.log(dealId);

    if(rowIndex>=0){
        allFavs[rowIndex].favourites = userFavs;
    }
    
    localStorage.setItem("userFavs", JSON.stringify(allFavs));        

}

export const getUserId = (token) =>{
    var string = Base64.atob(globals.user.token);
    var userId = string.split(":");
    
    if(token!='' && token!=undefined){
        return userId[1];
    }else {
        return 'GUEST';
    }
    
}
