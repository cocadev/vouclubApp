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

class Notifications extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, dataSource:[] }
    }

    searchPressed(){
        this.setState({ loadingData: true })
        this.props.fatchCategories('').then( (res) => {
            this.setState({loadingData: false })
      });
    }
    
    _handleBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({}));
    }

    componentDidMount(){

        this.props.navigation.setParams({
            onBackPress: this._handleBack 
        });

        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("Notifications");

        this.setState({loadingData:true});

        this.props.refreshToken(globalVals.user.token).then((ref)=>{

            globalVals.user.token = ref.response.message;
            
            this.props.getNotifications(globalVals.user.token).then((trans)=>{

                // console.log(trans);

                this.setState({loadingData:false});

                this.setState({dataSource:trans.response});
            })

        }); 
    }

    dateDiff(date, date1){
        var now = Moment(date1);
        var past = Moment(date);
        
        return past.from(now);
    }

    gotoLogin(){
        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Login'}));
    }

    renderTransItem(item,index){
        
        return <TouchableHighlight key={'key'+index} underlayColor={ globalVals.colors.f1f1f1 }>
        <View key={'key'+index} style={profile.transWrapper}>
            <Image source={{uri:item.iconUrl}} style={profile.transIcon} />
            <View style={profile.transInfoWrapper}>
                <Text style={profile.transTitle}>{item.title}</Text>
                <Text style={profile.transInfo}>{item.messageBody}</Text>
                <Text style={profile.time}>{ this.dateDiff(item.createdOn,item.requestedAt)}</Text>
            </View>
        </View>
    </TouchableHighlight>
    }

    render(){

        var categories = [];

        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>
                { globalVals.user.token!='' && globalVals.user.token != undefined ?
                     this.state.dataSource.length > 0 && this.state.loadingData==false ?
                        <FlatList style={profile.list}
                            data={this.state.dataSource}
                            keyExtractor={(x,i)=> x.transactionId}
                            removeClippedSubviews={true}
                            renderItem={({item, index}) => this.renderTransItem(item,index)
                            }
                        /> : null 
                : null }
                { globalVals.user.token=='' || globalVals.user.token == undefined ? <NoRecords label="Oops!" message="Only registered users can do that. Click below to join now." /> : null}
                { globalVals.user.token=='' || globalVals.user.token == undefined ?
                <View style={Styles.footerBtn}>
                    <TouchableHighlight style={Styles.btnPurple} onPress={ ()=>this.gotoLogin() }><Text style={Styles.btnPurpleLbl}>Join</Text></TouchableHighlight>
                </View> : null }

                { this.state.loadingData==true ? <Loader label="Loading..." /> : null }

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
        return {
            title: "Transactions",
            headerLeft: <BackButton onPress={ ()=> { params.onBackPress() } } />,
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

export default connect (mapStateToProps,mapDispatchToProps)(Notifications);