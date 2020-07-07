import React, { Component } from 'react'
import ReactNative, { StatusBar, InteractionManager,Dimensions, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'
import Modal from "react-native-modal"

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import pin from '../libs/style/pin'
import globalVals from '../libs/global';

import Loader from '../components/loader';
import NoRecords from '../components/noRecords';
import Popup from '../components/Popup';
import BackButton from '../components/backButton';

import images from '../assets/imgLibrary';

var _ = require('lodash');
import Moment from 'moment'

import Icon from 'react-native-vector-icons/Feather';

const {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    TouchableNativeFeedback,
    Button,
    StyleSheet
} = ReactNative

class MerchantPin extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, pin1:"",pin2:"",pin3:"",pin4:"", type:"", popup:{
            status:false,
            icon:'',
            title:'',
            message:'',
        } };
        this.params = this.props.navigation.state;

        this.pin1="";
        this.pin2="";
        this.pin3="";
        this.pin4="";
        
    }
    
    _handleBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({}));
    }

    componentDidMount(){ 

        this.props.navigation.setParams({
            onBackPress: this._handleBack 
        });

        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("Merchant Pin");
       
        // this.setState({"type":this.params.params.q});
    }

    updatePin(val){

        if(val>=0){

            if(this.state.pin1==""){
                this.setState({pin1:val});
                this.pin1=val;
            }else if(this.state.pin2==""){
                this.setState({pin2:val});
                this.pin2=val;
            }else if(this.state.pin3==""){
                this.setState({pin3:val});
                this.pin3=val;
            }else if(this.state.pin4==""){
                this.setState({pin4:val});
                this.pin4=val;
            }

        }else if(val==-1) {
            if(this.state.pin4!=""){
                this.setState({pin4:""});
                this.pin4="";
            }else if(this.state.pin3!=""){
                this.setState({pin3:""});
                this.pin3="";
            }else if(this.state.pin2!=""){
                this.setState({pin2:""});
                this.pin2="";
            }else if(this.state.pin1!=""){
                this.setState({pin1:""});
                this.pin1="";
            }
        }

        console.log(this.pin1 + "" + this.pin2 + "" + this.pin3 + "" + this.pin4);
        let finalPin = this.pin1 + "" + this.pin2 + "" + this.pin3 + "" + this.pin4;
        if(finalPin.length==4){
            
            globalVals.merchantPin = finalPin;  
            
            this.setState({loadingData:true});

            this.props.refreshToken(globalVals.user.token).then((ref)=>{

                globalVals.user.token = ref.response.message;

                this.props.outletPin(globalVals.user.token,globalVals.redeemDealId,finalPin).then((mpin)=>{

                    console.log(mpin);
                    this.setState({loadingData:false});
                    if(mpin.status==200){
                        
                        console.log(globalVals.redeemDealId);
                        globalVals.merchantPin = finalPin;

                        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Redeem'}));
                        
                    }else{
                        
                        this.setState({popup:{
                            status:true,
                            icon:images.error,
                            title:"Oops!",
                            message:"Invalid Merchant Pin"
                        }});

                        this.pin1="";
                        this.pin2="";
                        this.pin3="";
                        this.pin4="";
                    }

                });

            });
        }
        
    }

    closePopup(){
        this.setState({
            popup:{
                status:false,
                title:'',
                message:'',
                icon:images.success,
            }
        })
        
    }
    

    render(){

        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>

                <View style={pin.wrapper}>
                   <View style={pin.top}>
                            
                            <Text style={pin.title}>{"\n\n"}Pass phone to merchant</Text>
                            <Text style={pin.text}>Please allow the merchant to enter their code.</Text>
                    </View> 
                    <View style={pin.pinBox}>
                        <View style={pin.pin}>{ this.pin1!='' ? <View style={pin.bullet}></View> : null }</View>
                        <View style={pin.pin}>{ this.pin2!='' ? <View style={pin.bullet}></View> : null }</View>
                        <View style={pin.pin}>{ this.pin3!='' ? <View style={pin.bullet}></View> : null }</View>
                        <View style={pin.pin}>{ this.pin4!='' ? <View style={pin.bullet}></View> : null }</View>
                        
                    </View>
                    
                    <View style={pin.keypad}>
                        <View style={pin.keypadrow}>
                            <TouchableHighlight onPress={ ()=> this.updatePin('1')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>1</Text></TouchableHighlight>
                            <TouchableHighlight onPress={ ()=> this.updatePin('2')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>2</Text></TouchableHighlight>
                            <TouchableHighlight onPress={ ()=> this.updatePin('3')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>3</Text></TouchableHighlight>
                        </View>
                        <View style={pin.keypadrow}>
                            <TouchableHighlight onPress={ ()=> this.updatePin('4')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>4</Text></TouchableHighlight>
                            <TouchableHighlight onPress={ ()=> this.updatePin('5')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>5</Text></TouchableHighlight>
                            <TouchableHighlight onPress={ ()=> this.updatePin('6')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>6</Text></TouchableHighlight>
                        </View>
                        <View style={pin.keypadrow}>
                            <TouchableHighlight onPress={ ()=> this.updatePin('7')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>7</Text></TouchableHighlight>
                            <TouchableHighlight onPress={ ()=> this.updatePin('8')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>8</Text></TouchableHighlight>
                            <TouchableHighlight onPress={ ()=> this.updatePin('9')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>9</Text></TouchableHighlight>
                        </View>
                        <View style={pin.keypadrow}>
                            <TouchableHighlight style={[pin.key, pin.noBorder]}><Text style={pin.keyLbl}></Text></TouchableHighlight>
                            <TouchableHighlight onPress={ ()=> this.updatePin('0')} style={pin.key} underlayColor={globalVals.colors.white} ><Text style={pin.keyLbl}>0</Text></TouchableHighlight>
                            <TouchableHighlight onPress={ ()=> this.updatePin('-1')} style={[pin.key, pin.noBorder]} underlayColor={globalVals.colors.white}><Image source={images.backspace} style={pin.backspace}/></TouchableHighlight>
                        </View>
                        
                        
                    </View>
                </View>

                { this.state.loadingData==true ? <Loader label="Loading..." /> : null }

                <Modal isVisible={this.state.popup.status}
                    onBackdropPress={() => this.closePopup() }
                    onBackButtonPress={() => this.closePopup() }
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                    useNativeDriver={true}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    hideModalContentWhileAnimating={true}

                ><Popup icon={this.state.popup.icon} title={this.state.popup.title} message={ this.state.popup.message} onPress={ ()=> { this.closePopup() }} /></Modal>

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
        return {
            title: "Merchant PIN",
            headerLeft: <BackButton onPress={ ()=> { params.onBackPress() } } />,
        }
    };

}

function mapStateToProps(state){
    console.log(state);
    return {
        // statistics: state.Statistics.statistics.response,
        // categories: state.Deals.categories
        general:state.general.general
    }

}

function mapDispatchToProps (dispatch){
    return bindActionCreators(ActionCreators,dispatch);
    // return {
    //     actions: dispatch(ActionCreators,dispatch)
    //     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch) 
    // }
}

export default connect (mapStateToProps,mapDispatchToProps)(MerchantPin);