import React, { Component } from 'react'
import ReactNative, { StatusBar, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'

import { StackActions, NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index';

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";


import RNReferrer from 'react-native-referrer';

const {
    View,
    Image,
    Text,
    StyleSheet
} = ReactNative

import Images from '../assets/imgLibrary';
import globalVals from '../libs/global';

class Splash extends Component {  

    constructor(props) {
        super(props)
        this.state = { loadingData: false }
    }

    loadStats(){

        console.log("loading stats.....");
        this.setState({ loadingData: true })

        // this.props.dispatch(getStatistics()).then((res)=>{
        //     console.log("&&&&&& ");
        //     console.log(res);
        //     console.log("&&&&&& ");
        // });

        this.props.getDeals().then( (resp) => {  

            console.log(resp);

            this.setState({loadingData: false });

            console.log(" PPPPPPPPP ");
            console.log(this.props.navigation.state);
            console.log(" PPPPPPPPP ");

            var routeName = 'Home';

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName })]
            });
            
            this.props.navigation.dispatch(resetAction)    
            // this.props.navigation.navigate(routeName);
            

        });
      
    }

    checkReferrer = async () => {
        console.log("referrer --- - - - -- - - - - ");
        
        var referer = await RNReferrer.getReferrer();
        
        if(referer!='' && referer!=undefined && referer!=null){
            this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'AutoAuth', params:{ 'token':referer} }));
        }
        
        console.log("referrer --- - - - -- - - - - ");
    }

    async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
        //   this.setState({myKey: value});
            return this.value;
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    async setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    componentDidMount(){
        console.log("App splash loaded");
        this.checkReferrer();
        
        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("Splash");

        Linking.getInitialURL().then(url=>{

            if(url!='' && url!=undefined && url!=null){


                const route = url.replace(/.*?:\/\//g, '');
                const id = route.match(/\/([^\/]+)\/?$/)[1];
                const routeName = route.split('/')[1];
                const domain = route.split('/')[0];

                if(domain == 'voucherclub' || domain == 'voucherclub.upp.st'){
                    
                    if(routeName == 'auth'){
                        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'AutoAuth', params:{ 'token':id} }));
                    }

                }


            }

            
        }); 

        AsyncStorage.getItem("clientId").then(val=>{

            console.log(val + " * * * * *");

            if(val!='' && val!= null && val!=undefined){
                console.log("client 1");
                globalVals.clientId = val;
            }else {
                console.log("client 2");
                var time = Math.round(Date.now() / 1000);
                var random = Math.round(Math.random()*9999)
                var clientId = "VS-"+ time + "" + random;
                globalVals.clientId = clientId;
                AsyncStorage.setItem("clientId", clientId);
            }  
        }).catch((e)=>{
            console.log(e + " : : : : : ");
        });

        AsyncStorage.getItem("advertisingId").then(val=>{
            
            if(val!='' && val!= null && val!=undefined){
                globalVals.advertisingId = val;
                console.log("adv 1");
            }else {
                console.log("adv 2");
                var time = Math.round(Date.now() / 1000);
                var random = Math.round(Math.random()*9999)
                var advertisingId = "AD-"+ time + "" + random;
                globalVals.advertisingId = advertisingId;
                AsyncStorage.setItem("advertisingId", advertisingId);
            }   
        });
 
        AsyncStorage.getItem("userData").then(val=>{
            if(val!='' && val!= null && val!=undefined){
                globalVals.user = JSON.parse(val);
                
                console.log(globalVals.user);
                console.log("-1-1-1-1-1-1-1-1-1-");
                if(globalVals.user.token!='' && globalVals.user.token!=undefined){
                    this.props.refreshToken(globalVals.user.token).then((ref)=>{

                        globalVals.user.token = ref.response.message;
                        
                        this.props.getProfile(globalVals.user.token).then((profile)=>{

                            globalVals.user.status = profile.response.userSubscriptionStatus;
                            globalVals.user.image = profile.response.userPhotoUrl;
                            AsyncStorage.setItem("userData",JSON.stringify(globalVals.user));
                        })
                        console.log("0000000000");
                        AsyncStorage.getItem("userFavs").then(val=>{
                            console.log("1111111111");
                            console.log(val);
                            var allFavs = [];
                            var msisdn = globalVals.user.mobile;

                            if(val!='' && val!= null && val!=undefined){
                                allFavs = JSON.parse(val);
                                if(_.find(allFavs,{'msisdn':msisdn})){
        
                                    globalVals.userFavs= _.find(allFavs,{'msisdn':msisdn})['favourites'];
                            
                                }else {
                            
                                    globalVals.userFavs = "";
                            
                                }
                            }else {
                             globalVals.userFavs = "";   
                            }  
                        });

                    });
                }

            }else {
                var userData = {
                    image:'',
                    name:'',
                    mobile:'',
                    email:'', 
                    token:'',
                    status:''
                }
                globalVals.userFavs = "";
                globalVals.user = userData;
                AsyncStorage.setItem("userData", JSON.stringify(globalVals.user));
            }  
        });

        

        var queryParams = "clientId="+ globalVals.clientId +"&channel="+ globalVals.channel +"&appVersion="+ globalVals.appVersion +"&advertisingId="+ globalVals.advertisingId +"&eventType=APP_LAUNCH";

        this.props.postLogEvent(globalVals.user.token,queryParams).then((log)=>{

        });

        this.loadStats();
        
    }

    render(){

        return <View style={styles.imageContainer}>
            <StatusBar backgroundColor={globalVals.colors.green} barStyle="light-content"/>
            <Image style={styles.image} source={Images.splashImage} />
      </View>
    }

}

var styles = StyleSheet.create({
    imageContainer: {
      flex: 1,
      alignItems: 'stretch'
    },
    image: {
      flex: 1,
      width: null,
        height: null,
        resizeMode: 'cover'
    }
  });

function mapStateToProps(state){
    
    return {
        statistics: state.statistics,
        categories: state.categories
    }

}

function mapDispatchToProps (dispatch){
    return bindActionCreators(ActionCreators,dispatch);
    // return {
    //     actions: dispatch(ActionCreators,dispatch)
    //     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch) 
    // }
}

export default connect (mapStateToProps,mapDispatchToProps)(Splash);