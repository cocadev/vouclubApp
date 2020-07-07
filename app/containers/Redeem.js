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
import redeem from '../libs/style/redeem'
import globalVals from '../libs/global';
import Base from '../libs/base64';

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

class Redeem extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, dataSource:[], voucherCode:"", priceCredits:"", popup:{
            status:false,
            icon:'',
            title:'',
            message:'',
        } };
        this.params = this.props.navigation.state;
        this.payStatus = false;
        this.displayName = "";
        this.priceCredits = "";
        this.voucherCode = "";
    }
    
    _handleBack = () => {
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DealDetails', params:{ 'dealId':globalVals.redeemDealId, 'voucher':this.voucher, 'displayName': this.displayName } }));
    }

    componentDidMount(){ 

        this.props.navigation.setParams({
            onBackPress: this._handleBack 
        });

        

        this.setState({loadingData : true});

        this.props.dealDetails(globalVals.redeemDealId).then( (res) => {

            console.log("#########");
            // console.log(res.response.voucher.priceCredits);
            console.log("#########");

            this.setState({loadingData: false });
            this.voucher = res.response.voucher.voucherName;
            this.displayName = res.response.outlet.displayName;
            this.priceCredits = res.response.voucher.priceCredits;

            var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
            tracker.trackScreenView("Redeem Voucher - " + res.response.voucher.voucherName);

        });
       
        // this.setState({"type":this.params.params.q});
    }

    doRedeem(){
        this.setState({loadingData:true});
        this.props.refreshToken(globalVals.user.token).then((ref)=>{

            globalVals.user.token = ref.response.message;
            
            this.props.redeemVoucher(globalVals.user.token, globalVals.redeemDealId, Base.btoa(globalVals.merchantPin), this.priceCredits).then((redeem)=>{
                console.log(redeem);
                this.setState({loadingData:false});
                if(redeem.status==200){
                    this.setState({voucherCode:redeem.response.transactionID}) ;
                    this.setState({popup:{
                        status:true,
                        icon:images.success,
                        title:"Success",
                        message:""
                    }});
                }else {
                    this.setState({popup:{
                        status:true,
                        icon:images.error,
                        title:"Oops!",
                        message:redeem.response.message
                    }});
                }
            });

        });
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

                <View style={redeem.wrapper}>
                    <View style={redeem.top}>

                            <Text style={redeem.whiteText}>Make payment below</Text>
                            <Text style={redeem.whiteTextSmall}>Payment can be made using credits only.</Text>

                            <View style={redeem.creditWrapper}>
                                <Image source={images.credit} style={redeem.creditIcon} />
                                <Text style={redeem.whiteText}> {this.priceCredits} credits</Text>
                            </View>
                            
                            { this.state.voucherCode!='' && this.state.voucherCode!=undefined ? <TouchableHighlight style={redeem.btnPurple} onPress = { ()=> this._handleBack() } underlayColor="#997097"><Text style={redeem.btnLbl}>Done</Text></TouchableHighlight> : <TouchableHighlight style={redeem.btnPurple} onPress = { ()=> this.doRedeem() } underlayColor="#997097"><Text style={redeem.btnLbl}>Pay</Text></TouchableHighlight> }
                    </View>
                    <View style={redeem.bottom}>
                            <View style={redeem.codeWrapper}>
                                { this.state.voucherCode!='' && this.state.voucherCode!=undefined ? <Text style={redeem.voucherCode}>{this.state.voucherCode}</Text> : <Text style={redeem.title}>Confirmation code will appear here when payment is made</Text> }
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
            title: "Pay",
            headerLeft: <BackButton onPress={ ()=> { params.onBackPress() } } />,
        }
    };

}

function mapStateToProps(state){
    console.log(state);
    return {
        // statistics: state.Statistics.statistics.response,
        // categories: state.Deals.categories
        // general:state.general.general
    }

}

function mapDispatchToProps (dispatch){
    return bindActionCreators(ActionCreators,dispatch);
    // return {
    //     actions: dispatch(ActionCreators,dispatch)
    //     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch) 
    // }
}

export default connect (mapStateToProps,mapDispatchToProps)(Redeem);