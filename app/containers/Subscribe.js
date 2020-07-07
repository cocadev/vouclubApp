import React, { Component } from 'react'
import ReactNative, { StatusBar, InteractionManager,Dimensions, Linking, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'
import Modal from "react-native-modal";

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import login from '../libs/style/login'
import globalVals from '../libs/global';

import Loader from '../components/loader';
import NoRecords from '../components/noRecords';
import Popup from '../components/Popup';
import BackButton from '../components/backButton';

import images from '../assets/imgLibrary';

var _ = require('lodash');
import Moment from 'moment'

import Icon from 'react-native-vector-icons/Feather';

import DeviceInfo from 'react-native-device-info'

const {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    TouchableNativeFeedback,
    StyleSheet
} = ReactNative

class Subscribe extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, userMobile:"", dataSource:[], checkbox:false, btnDisable:true, popup:{
            status:false,
            icon:'',
            title:'',
            message:'',
        } }
    }
    
    _handleBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({}));
    }

    componentDidMount(){ 

        this.props.navigation.setParams({
            onBackPress: this._handleBack 
        });

        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("Subscribe");
       
        var userNumber = DeviceInfo.getPhoneNumber();
        if(_.startsWith(userNumber,"+971")){
            this.setState({"userMobile":_.replace(userNumber,"+971","")});
        }
    }

    toggleCheckBox(){
        
        var stat = false;

        if(this.state.checkbox==false){
            console.log("false");
            stat = true;
            this.setState({"checkbox":true});
            
        }else {
            console.log("true");
            stat = false;
            this.setState({"checkbox":false});
            
        }

        console.log(this.state.userMobile + " <><><> " + this.state.checkbox);

        if(this.state.userMobile.length>=8 && stat==true ){
            this.setState({"btnDisable":false});
        }else {
            this.setState({"btnDisable":true});
        }

    }
 
    updateBtn(text){
        this.setState({"userMobile":text})
        if(this.state.userMobile.length>=8 && this.state.checkbox==true ){
            this.setState({"btnDisable":false});
        }else {
            this.setState({"btnDisable":true});
        }
    }

    doSubscribe(){

        Keyboard.dismiss();

        if(this.state.btnDisable==false){

            globalVals.userNumber = "+971" + this.state.userMobile.replace(/^0+/, '');

            this.props.registerUser(globalVals.userNumber).then((resp)=>{
                console.log(resp);

                if(resp.status==200){

                    this.props.navigation.dispatch(NavigationActions.navigate({routeName:"Pin",params:{q:1}}));

                }else {

                    this.setState({
                        popup:{
                            status:true,
                            icon:images.error,
                            title:'Error',
                            message:'Error occured while processing your request. Please try again later.'
                        }
                    })

                }
                
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

    gotoLogin(){
        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Login'}));
    }

    skipLogin(){
        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Home'}));
    }

    render(){

        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>

                <View style={login.wrapper}>
                    <View style={login.top}>

                            <Text style={login.whiteText}>Hey,</Text>
                            <Text style={login.whiteText}>Welcome to VoucherClub</Text>

                            <View style={login.form}>
                                <Text style={login.cntCode}>+971</Text>
                                <TextInput style={login.mobile} value={this.state.userMobile} onChangeText={ (text)=>this.updateBtn(text) } underlineColorAndroid={'transparent'} placeholder="Enter your number" placeholderTextColor="#ffffff" keyboardType="numeric" />
                            </View>

                            <View style={[login.form]}>
                                <TouchableHighlight onPress={ ()=> this.toggleCheckBox() } style={login.checkbox} underlayColor={globalVals.colors.white}>{ this.state.checkbox == true ? <Icon name="check" size={16} color={globalVals.colors.purple} /> : <Icon name="check" size={0} /> }</TouchableHighlight>
                                <Text style={[login.whiteText,{fontSize:16, textAlign:'left'}]}>I agree with End User License Agreement</Text>
                            </View>

                            <TouchableHighlight style={[login.btnPurple, (this.state.btnDisable==true) ? login.btnDisable : '']} onPress = { ()=> this.doSubscribe() } underlayColor="#997097"><Text style={login.btnLbl}>Next</Text></TouchableHighlight>
                    </View>
                    <View style={login.bottom}>
                        <Text style={login.already}>Already have an Account?</Text>
                        <TouchableHighlight onPress={ ()=>this.gotoLogin() } style={login.btnGreen} underlayColor="transparent"><Text style={login.btnLbl}>Sign in</Text></TouchableHighlight>
                        <TouchableHighlight underlayColor="transparent" onPress={ ()=>this.skipLogin()}><Text style={login.guest}>Skip and continue as Guest</Text></TouchableHighlight>
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
            title: "Subscribe",
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

export default connect (mapStateToProps,mapDispatchToProps)(Subscribe);