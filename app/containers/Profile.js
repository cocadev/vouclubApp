import React, { Component } from 'react'
import ReactNative, { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index';

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

var ImagePicker = require('react-native-image-picker');

import Styles from '../libs/style/style'
import profile from '../libs/style/profile'
import globalVals from '../libs/global';

import Hamburger from '../components/hamburger';
import NoRecords from '../components/noRecords';
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
    StyleSheet
} = ReactNative

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, dataSource:[], avatarSource:images.noimage }
    }

    searchPressed(){
        this.setState({ loadingData: true })
        this.props.fatchCategories('').then( (res) => {
            this.setState({loadingData: false })
      });
    }
    
    toggleSideMenu(navigation){
        console.log("toggle menu 111");
        // this.props.navigation.dispatch(NavigationActions.navigate('DrawerOpen'));
        // this.props.navigation.openDrawer();
        navigation.openDrawer();
    }
 
    componentDidMount(){

        this.props.navigation.setParams({
            onMenuBtnPress: this.toggleSideMenu 
          });
 
        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("User Profile");

        if(globalVals.user.token=='HTTP 401 Unauthorized'){
            globalVals.user.token=='';
            AsyncStorage.setItem("userData",JSON.stringify(globalVals.user));
        }  


        if(globalVals.user.token!='' && globalVals.user.token!=undefined){

            this.props.refreshToken(globalVals.user.token).then((ref)=>{

                globalVals.user.token = ref.response.message;
                
                this.props.getProfile(globalVals.user.token).then((profile)=>{
    
                    this.setState({"dataSource":profile.response});
    
                    globalVals.user.status = profile.response.userSubscriptionStatus;
                    globalVals.user.image = profile.response.userPhotoUrl;
                    AsyncStorage.setItem("userData",JSON.stringify(globalVals.user));
    
                    console.log(globalVals.user.token + " $$$$$$ ");
                })
    
            }); 

        }  

        console.log("profile screen current token is = " + globalVals.user.token );
    }

    componentDidUpdate(prevProps){
        console.log("Profile 1111");
    }

    componentDidFocus(props){
        console.log("Profile 2222");
    }

    componentWillReceiveProps(nextProps){
        console.log("Profile 3333");
        if(globalVals.user.token=='HTTP 401 Unauthorized'){
            globalVals.user.token=='';
            AsyncStorage.setItem("userData",JSON.stringify(globalVals.user));
        }  

        if(globalVals.user.token!='' && globalVals.user.token!=undefined){

            this.props.refreshToken(globalVals.user.token).then((ref)=>{

                globalVals.user.token = ref.response.message;
                
                this.props.getProfile(globalVals.user.token).then((profile)=>{
                    
                    console.log("* * * *");
                    console.log(profile.response);
                    console.log("* * * *");
                    this.setState({"dataSource":profile.response});
    
                    globalVals.user.status = profile.response.userSubscriptionStatus;
                    globalVals.user.image = profile.response.userPhotoUrl;
                    AsyncStorage.setItem("userData",JSON.stringify(globalVals.user));
                    if(globalVals.user.image!='' && globalVals.user.image!=undefined && globalVals.user.image!=null){
                        this.setState({
                            avatarSource: {uri:globalVals.user.image}
                        });
                    }
    
                    console.log(globalVals.user.image + " $$$$$$ ");
                })
    
            }); 

        }  

        console.log("profile screen current token is = " + globalVals.user.token );
    }

    componentWillAppear() {
        console.log("Profile 4444");
    }
    
    isComponentActive(activeComponent) {
        console.log("Profile 5555");
    }

    handleAppStateChange(newAppState){
        console.log("Profile 6666");
    }

    gotoLogin(){
        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Login'}));
    }

    gotoTransactions(){
        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Transactions'}));
    }
    
    gotoNotifications(){
        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Notifications'}));
    }

    doTopup(){
        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Topup'}));
    }

    selectImage(){
        var options = {
            title: 'Select Profile Picture',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };
          
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info below in README)
           */
          ImagePicker.showImagePicker(options, (response) => {
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
              
              const formData = new FormData();

              formData.append("file", {uri:response.uri,type:response.type,name:response.fileName});

                this.setState({loadingData:true});
                this.props.uploadImage(globalVals.user.token,formData).then((resp)=>{
                        console.log(resp);
                        this.setState({loadingData:false});
                });
          
              this.setState({
                avatarSource: source
              });
            }
          });
          
    }

    render(){

        var categories = [];

        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>
                { globalVals.user.token!='' && globalVals.user.token != undefined ?
                    <ScrollView>
                    <View style= {profile.wrapper}>

                        <View style={profile.imageWrapper}>
                            <TouchableHighlight  onPress={()=>this.selectImage()} underlayColor={'transparent'}>
                                <Image source= { this.state.avatarSource } style={profile.image}></Image>
                            </TouchableHighlight>    
                        </View>

                        <Text style={profile.number}>{globalVals.user.mobile}</Text>

                        <View style={profile.whiteBox}>
                            <Image source={images.credit} style={profile.credit} />
                            <Text style={profile.creditLbl}>{ this.state.dataSource.balanceCredits } Credits</Text>
                            <Text style={profile.expLbl}>{(this.state.dataSource.creditsExpiryDateTime!='' && this.state.dataSource.creditsExpiryDateTime!=null && this.state.dataSource.creditsExpiryDateTime!=undefined) ? '(Expires on ' + Moment(this.state.dataSource.creditsExpiryDateTime,'ddd, Do MMMM YYYY HH:mm:ss').format('D MMM YYYY HH:mm') + ')':''}</Text>
                        </View>

                        <View style={profile.stats}>
                            <View style={profile.row}>
                                <Text style={profile.rowLbl}>Subscription Date</Text>
                                <Text style={profile.rowVal}>{ (this.state.dataSource.subscriptionDate!='' && this.state.dataSource.subscriptionDate!=null && this.state.dataSource.subscriptionDate!=undefined) ? Moment(this.state.dataSource.subscriptionDate,'ddd, Do MMMM YYYY HH:mm:ss').format('D MMM YYYY HH:mm'):''}</Text>
                            </View>
                            
                            <View style={profile.row}>
                                <Text style={profile.rowLbl}>Subscription End Date</Text>
                                <Text style={profile.rowVal}>{ (this.state.dataSource.subscriptionEndDate!='' && this.state.dataSource.subscriptionEndDate!=null && this.state.dataSource.subscriptionEndDate!=undefined) ? Moment(this.state.dataSource.subscriptionEndDate,'ddd, Do MMMM YYYY HH:mm:ss').format('D MMM YYYY HH:mm'):''}</Text>
                            </View>
                            <View style={profile.row}>
                                <Text style={profile.rowLbl}>Last Renewal Date</Text>
                                <Text style={profile.rowVal}>{ (this.state.dataSource.lastRenewalDate!='' && this.state.dataSource.lastRenewalDate!=null && this.state.dataSource.lastRenewalDate!=undefined) ? Moment(this.state.dataSource.lastRenewalDate,'ddd, Do MMMM YYYY HH:mm:ss').format('D MMM YYYY HH:mm'):''}</Text>
                            </View>
                            <View style={profile.row}>
                                <Text style={profile.rowLbl}>Subscription Type</Text>
                                <Text style={profile.rowVal}>{this.state.dataSource.subscriptionType}</Text>
                            </View>

                        </View>

                        <View style={profile.listWrapper}>
                            <CatItem key={1} label='Top Up Credits' icon={images.topup} onPress={() => this.doTopup()}/>
                            <CatItem key={2} label='Transactions History' icon={images.transactions} onPress={() => this.gotoTransactions()}/>
                            <CatItem key={3} label='Notifications' icon={images.notifications} onPress={() => this.gotoNotifications()}/>
                        </View>

                    </View>
                    </ScrollView>
                : null }
                { globalVals.user.token=='' || globalVals.user.token == undefined ? <NoRecords label="Oops!" message="Only registered users can do that. Click below to join now." /> : null}
                { globalVals.user.token=='' || globalVals.user.token == undefined ?
                <View style={Styles.footerBtn}>
                    <TouchableHighlight style={Styles.btnPurple} onPress={ ()=>this.gotoLogin() }><Text style={Styles.btnPurpleLbl}>Join</Text></TouchableHighlight>
                </View> : null }

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
        return {
            title: "Me",
            headerLeft: <Hamburger onPress={ ()=> params.onMenuBtnPress(navigation)  }/>,
        }
    };

}

function mapStateToProps(state){
    return {
        // statistics: state.Statistics.statistics.response,
        // categories: state.Deals.categories
        tabNav:state.tabNav
    }

}

function mapDispatchToProps (dispatch){
    return bindActionCreators(ActionCreators,dispatch);
    // return {
    //     actions: dispatch(ActionCreators,dispatch)
    //     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch) 
    // }
}

export default connect (mapStateToProps,mapDispatchToProps)(Profile);