import React, { Component } from 'react'
import ReactNative, { StatusBar,Linking } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import HomeStyle from '../libs/style/home'
import globalVals from '../libs/global';

import Hamburger from '../components/hamburger';

import images from '../assets/imgLibrary';
import Icon from 'react-native-vector-icons/Feather';

const {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet
} = ReactNative

class Bug extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false }
    }

    searchPressed(){
        this.setState({ loadingData: true })
        this.props.fatchCategories('').then( (res) => {
            this.setState({loadingData: false })
      });
    }
    
    homeBtnPress(type){

        
    }

    componentDidMount(){
        console.log(this.props.categories);   
        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("Report a Bug");
    }

    sendEmail(){
        Linking.openURL("mailto:voucherclubhelp@voucherskout.com");
    } 

    render(){

        var categories = [];

        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>
                
                <View style={Styles.bugWrapper}>
                    <Text style={Styles.bugTitleGreen}>NOOOO!</Text>
                    <Text style={Styles.bugTitle}>We hate those little things.</Text>
                    <Text style={Styles.bugText}>Okay help us out and tell us the issue in an email below. We will get the debut team on it right away.</Text>
                    <TouchableHighlight style={Styles.bugBtn} onPress={()=> this.sendEmail()} underlayColor= { globalVals.colors.darkGreen }><Icon name="mail" size={80} color={globalVals.colors.white} /></TouchableHighlight>
                </View>

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
        return {
            title: "Found a bug?",
            headerLeft: <Hamburger />,
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

export default connect (mapStateToProps,mapDispatchToProps)(Bug);