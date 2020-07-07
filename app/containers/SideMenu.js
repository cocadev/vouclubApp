import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions/index';

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import {NavigationActions} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import {ScrollView, Text, Image, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from '../libs/style/sidemenu';
import globalVals from '../libs/global';

import images from '../assets/imgLibrary';

class SideMenu extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, userData:{}}
        this.navParams = this.props.navigation.state;
    }  


  navigateToScreen = (route,params) => {

    console.log("Closing Drawer");

    // this.props.navigation.navigate('DrawerClose');
    // console.log(this.props.navigation);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params:params
    });

    console.log("AAAAAAAAAAAA");
    
    this.props.navigation.dispatch(navigateAction);
  }

  componentDidMount(){
    console.log("side menu 00000");

    this.setState ({ userData: globalVals.user });

    console.log(this.state.userData.token + " %%%%% ");
  }

  componentDidUpdate(prevProps){
    console.log("side menu 11111");
  }

  componentDidFocus(props){
    console.log("side menu 22222");  
    
  }

  componentWillReceiveProps(nextProps){
    console.log("side menu 33333");

    console.log(globalVals.user);

    this.setState ({ userData: globalVals.user });
  }

  componentWillAppear() {
    console.log("side menu 444444");
  }
  
  isComponentActive(activeComponent) {
    console.log("side menu 55555");
  }

  handleAppStateChange(newAppState){
    console.log("side menu 66666");
  }

  doUnsubscribe(){
    globalVals.userNumber = globalVals.user.mobile;
    this.navigateToScreen('Pin',{q:'6'});
  }

  doLogout(){

    console.log(globalVals.user.token);

    this.props.navigation.dispatch(DrawerActions.closeDrawer());

    this.props.refreshToken(globalVals.user.token).then((ref)=>{

      console.log("logout 1");
      console.log(ref);

      if(ref.status==200){
        console.log("logout 2");

        this.props.logoutUser(ref.response.message).then((logout)=>{
          console.log("logout 3");

          console.log(logout);
          console.log("logout 4");
          AsyncStorage.setItem("userData","");
          console.log("logout 5");
          globalVals.user = {
            image:'',
            name:'',
            mobile:'',
            email:'',
            token:'',
            status:''
          }
          console.log("logout 6");

          this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Login'}));

        });

      }else {
        console.log(ref);
      }

    });
  }

  render () {
    return (
      <View style={ styles.wrapper }>
        
        <View style={styles.header}>

            { globalVals.user.image!='' ? <Image source= { {uri:globalVals.user.image} } style={styles.userProfile}></Image> : <Image source= { images.noimage } style={styles.userProfile}></Image> }

            <Text style={styles.welcome}>Hey, Good to see you</Text>

        </View>

        <ScrollView style={styles.menu}>

            <Text style={styles.menuItem} onPress= { ()=> this.navigateToScreen('HowItWorks',{})}>How it Works</Text>
            <Text style={styles.menuItem} onPress= { ()=> this.navigateToScreen('Faq',{})}>FAQ's</Text>
            <Text style={styles.menuItem} onPress= { ()=> this.navigateToScreen('Rules',{})}>Rules of Use</Text>
            <Text style={styles.menuItem} onPress= { ()=> this.navigateToScreen('Bug',{})}>Found a Bug?</Text>
            <Text style={styles.menuItem} onPress= { ()=> this.navigateToScreen('ResetPin',{})}>Reset PIN</Text>
            { this.state.userData.status == 'SUBSCRIBED' ? <Text style={styles.menuItem} onPress= { ()=> this.doUnsubscribe()}>Unsubscribe</Text> : <Text style={styles.menuItem} onPress= { ()=> this.navigateToScreen('Subscribe',{})}>Subscribe</Text> }
            { this.state.userData.token == "" || this.state.userData.token == undefined || this.state.userData.token == null ? <Text style={styles.menuItem} onPress= { ()=> this.navigateToScreen('Login',{})}>Login</Text> : <Text style={styles.menuItem} onPress={()=> this.doLogout()}>Logout</Text> }

        </ScrollView>
        <View style={styles.footer}>
            <Image source={images.vslogo} style={styles.vslogo}></Image>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

function mapStateToProps(state) {
  return {
    // statistics: state.Statistics.statistics.response,
    user: state.user.user,
  };

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
  // return {
  //     actions: dispatch(ActionCreators,dispatch)
  //     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch)
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);