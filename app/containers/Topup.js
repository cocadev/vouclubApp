import React, { Component } from 'react'
import ReactNative, { StatusBar, InteractionManager,Dimensions, Linking, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'
import Modal from "react-native-modal";

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import topup from '../libs/style/topup'
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
    ImageBackground,
    TouchableHighlight,
    TouchableNativeFeedback,
    StyleSheet
} = ReactNative

class Topup extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, userMobile:"", dataSource:[], profile:"", checkbox:false, btnDisable:true, popup:{
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
        tracker.trackScreenView("Topup");

        this.props.getCreditPacks().then((packs)=>{
            console.log(packs);
            this.setState({dataSource:packs.response});
        });

        this.props.refreshToken(globalVals.user.token).then((ref)=>{

            globalVals.user.token = ref.response.message;

            this.props.getProfile(globalVals.user.token).then((profile)=>{

                console.log(profile);

                if(profile.status==200){
                    
                    this.setState({profile:profile.response});

                }

            });

        });
       
    }

   
 
    

    doTopup(){

        

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

    doTopup(id){


        this.setState({loadingData:true});

        this.props.refreshToken(globalVals.user.token).then((ref)=>{

            globalVals.user.token = ref.response.message;
            globalVals.userNumber = globalVals.user.mobile;

            this.props.canUserTopup(globalVals.user.token).then((resp)=>{

                if(resp.response.message=='TRUE'){
                    this.setState({loadingData:false});

                    this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Pin',params:{q:4,p:id}}));

                }else {
                    
                    this.setState({loadingData:false});

                    var displayMsg = resp.response.message;

                    if(displayMsg == 'SUBSCRIPTION STATUS UNSUBSCRIBED'){
                        displayMsg = 'You are currently unsubscribed from the service. In order to top up please subscribe.'
                    }
        
                    if(displayMsg == "LAST TOPUP REQUEST IN PENDING STATUS"){
                      displayMsg = "Cannot process your request. Your last topup request is in queue.";
                    }

                    this.setState({
                        popup:{
                            status:true,
                            title:'Oops!',
                            message:displayMsg,
                            icon:images.error,
                        }
                    })

                }

            });

        });

    }

    render(){

        var packs = [];

        for (let i = 0; i < this.state.dataSource.length; i++) {
            var item = this.state.dataSource[i];
            packs.push(<TouchableHighlight underlayColor={globalVals.colors.white} onPress={()=>this.doTopup(item.id)} key={item.id}>
                <View style={topup.item}>
                    <ImageBackground source={images.creditBg} style={topup.creditWrapper}><Text style={topup.whiteText}>{item.creditCount}</Text></ImageBackground>
                    <View style={topup.packWrapper}><Text style={topup.packName}>{item.packName}</Text><Text style={topup.packMsg}>{item.packMessage}</Text></View>    
                    <View style={topup.priceWrapper}><Text style={topup.packPrice}>{item.packPrice}</Text><Text style={topup.packPrice}>{item.currencyCode}</Text></View>
                </View>
            </TouchableHighlight>);
      
          }

          

// creditCount
// currencyCode
// displayOrder
// id
// packMessage
// packName
// packPrice


        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>

                <View style={topup.wrapper}>
                    <View style={topup.top}>

                        <Image source={images.credit} style={topup.credit} />
                        <Text style={topup.whiteText}>Current Balance: {this.state.profile.balanceCredits} Credits</Text>
                        <Text style={topup.whiteTextSmall}>(Expire on {Moment(this.state.profile.creditsExpiryDateTime,'ddd, Do MMMM YYYY HH:mm:ss').format('D MMM YYYY HH:mm')})</Text>
                            
                    </View>
                    <View style={topup.bottom}>
                            { this.state.dataSource.length > 0 ?
                            <View style={topup.itemWrapper}>
                                { packs }
                            </View>: null }
                        
                            <Text style={topup.note}>Please note, that on the event of an unsuccessful charge attempt at whichever slab (5.00 AED / 3.00 AED / 1.00 AED), subsequent charge attempts will be triggered for the next lower until all charge attempts have been exhausted.  The corresponding number of credits will then be awarded based on whichever amount was successfully charged - 3 / 2 / 1 credits respectively.</Text>

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
            title: "Topup",
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

export default connect (mapStateToProps,mapDispatchToProps)(Topup);