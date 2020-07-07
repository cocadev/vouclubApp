import React, { Component } from 'react'
import ReactNative, { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import profile from '../libs/style/profile'
import globalVals from '../libs/global';

import Hamburger from '../components/hamburger';
import Loader from '../components/loader';
import NoRecords from '../components/noRecords';
import BackButton from '../components/backButton';
import CatItem from '../components/categoryItem';

import images from '../assets/imgLibrary';

import Moment from 'moment'
var _ = require('lodash');

const {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
    FlatList,
} = ReactNative

class AutoAuth extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, dataSource:[] }
        this.navParams = this.props.navigation.state;
    }

   
    _handleBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({}));
    }

    componentDidMount(){

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

                var token = this.navParams.params.token;
            console.log("processing auto auth ===== " + token);

            this.props.autoAuth(token).then((resp)=>{

                if(resp.status==200) {

                    globalVals.user.token = resp.response.message;

                    this.props.getProfile(globalVals.user.token).then((resp)=>{

                    globalVals.user.status = resp.response.userSubscriptionStatus;
                    globalVals.user.image = resp.response.userPhotoUrl;
                    globalVals.user.mobile = resp.response.userMsisdn;

                    AsyncStorage.setItem("userData",JSON.stringify(globalVals.user));


                });

                }else {
                    globalVals.user.token = "";
                }


            });
            
            

        }).catch((e)=>{
            console.log(e + " : : : : : ");
        });

       

            
            });


        
       
    }

    

    render(){

        var categories = [];

        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>
                
                <Loader label="Loading..." />
        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
        return {
            title: "Login",
            headerLeft: null,
        }
    };

}

function mapStateToProps(state){
    return {
        // statistics: state.Statistics.statistics.response,
        // categories: state.Deals.categories
    }

}

function mapDispatchToProps (dispatch){
    return bindActionCreators(ActionCreators,dispatch);
    // return {
    //     actions: dispatch(ActionCreators,dispatch)
    //     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch) 
    // }
}

export default connect (mapStateToProps,mapDispatchToProps)(AutoAuth);