import React, { Component } from 'react'
import ReactNative, { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import DealStyle from '../libs/style/deal'
import globalVals from '../libs/global';
import Distance from '../libs/getDistance';

import Loader from '../components/loader';
import Hamburger from '../components/hamburger';
import NoRecords from '../components/noRecords';

import images from '../assets/imgLibrary';
import Geolocation from '@react-native-community/geolocation';

var _ = require('lodash');
import Moment from 'moment'

const {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    FlatList,
    TouchableHighlight,
    StyleSheet
} = ReactNative

class Favourites extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, dataSource:[], pageTitle:'', allFavs:[], userFavs:'' }
        this.navParams = this.props.navigation.state;
        this.allFavs = [];
        this.userFavs = "";
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
    
    dealItemPress(item){

        console.log(item);

        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DealDetails', params:{ 'dealId':item.dealID, 'voucher':item.voucher, 'displayName': item.displayName } }));

        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'DealDetails', params:{ 'dealId':item.dealID, 'voucher':item.voucher, 'displayName': item.displayName } })]
        // });
        
        // this.props.navigation.dispatch(resetAction)    
    }

    renderDealItem(item){

        Moment.locale('en');
        
        return <TouchableHighlight key={ item.dealID }  onPress={ ()=>this.dealItemPress(item) } underlayColor={ globalVals.colors.f1f1f1 }>
                <View key={item.dealID} style={DealStyle.dealWrapper}>
                <Image source={{uri:item.outletImageUrl}} style={DealStyle.dealImage} />

                <View style={DealStyle.dealInfo}>
                    <Text style={DealStyle.dealTitle}> {item.voucher} </Text>
                    <Text style={DealStyle.dealDesc}> {item.displayName} - {item.displayInfo} </Text>

                    <View style={DealStyle.infoGroup}>
                        <View style={DealStyle.otherInfo}>
                            <Text style={DealStyle.infoValue}>{item.distance}</Text>
                            <Text style={DealStyle.infoLabel}>kms away</Text>
                        </View>
                        
                        <View style={DealStyle.otherInfo}>
                        <Text style={DealStyle.infoValue}>{ Moment(item.validUntil,'ddd, Do MMMM YYYY HH:mm:ss').format('D MMM YYYY') }</Text>
                            <Text style={DealStyle.infoLabel}>Expires</Text>
                        </View>
                        
                        <View style={[DealStyle.otherInfo, DealStyle.otherInfoNoBorder]}>
                        <Text style={DealStyle.infoValue}>{item.validFor}</Text>
                            <Text style={DealStyle.infoLabel}>Valid for</Text>
                        </View>
                    </View>
                </View>
        
        </View>
        </TouchableHighlight>
    }

    loadDeals(cat){

        this.setState({loadingData:true});

        AsyncStorage.getItem("savedDeals").then((val)=>{ 

            if(val!='' && val!= null && val!=undefined){ 
                var savedDeals = JSON.parse(val);
                globalVals.savedDeals = savedDeals.savedDeals;
                globalVals.savedDealsCount = savedDeals.savedDealsCount;
                globalVals.lastRefreshDate = savedDeals.lastRefreshDate;
            }


            this.props.getDeals("").then( (resp) => {
            
                // console.log(resp.response.deals);
                
                var userFavs = "";
                var allFavs = [];
                
                var mobileNo = globalVals.user.mobile;
            
                AsyncStorage.getItem("userFavs").then(val => {

                    console.log("fav step - 1");
                    console.log(val);

                    if(val!='' && val!= null && val!=undefined){
                        allFavs = JSON.parse(val);
                        // allFavs = JSON.parse(val);
                        console.log(allFavs);

                        if(!Array.isArray(allFavs)){
                            console.log("this is not array... converting it to array");
                            allFavs = [allFavs];
                        }

                        console.log(allFavs);

                        console.log(mobileNo);
                        // userFavs = _.find(allFavs,{"msisdn": mobileNo});
    
                        allFavs.forEach((item)=>{
                            console.log(item);
                            console.log(_.isArray(item));
                            if(!_.isArray(item)){
                                console.log("item is not array converting to array ==========");
                                item = [item];
                            }
                            console.log(item);
                            console.log(item[0].msisdn);
                            console.log(item[0].favourites);
                            if(item[0].msisdn==mobileNo){
                                userFavs = item[0].favourites;
                            }
                        });
    
                        console.log(this.userFavs);
              
                    }else {
                        allFavs = [];
                        userFavs = "";
                    }
    
                    console.log("Saved Favs =========== ");
                    console.log(allFavs);
                    console.log(userFavs + mobileNo);
                    console.log(" =========== ");
    
                    this.allFavs = allFavs;
                    this.userFavs = userFavs;
    
                    this.renderDeals(this.userFavs);    
    
                });
            });

        });

        
        
    }

    getUserFavs(){

        

    }

    renderDeals(cat){

            var deals = this.props.favDeals;
            
            var favDeals = [];
            var newFavs = cat;

            if(cat!='' && cat!=undefined){

                var favDealIds = cat.substring(1).split(',');
                console.log(favDealIds);

                favDealIds.forEach((item)=>{
                    console.log(item);
                    var rowIndex = _.findIndex(deals,{dealID:item});
                    if(rowIndex>=0){
                        favDeals.push(deals[rowIndex]);
                    }else {
                        this.removeFavourite(item);
                    }
                });

                console.log(favDeals);

                Geolocation.getCurrentPosition((coords)=>{
                
                    for(let i=0; i< favDeals.length; i++){
                        var distance = Distance.calc({latitude:coords.coords.latitude, longitude:coords.coords.longitude},{latitude:parseFloat(favDeals[i].latitude),longitude:parseFloat(favDeals[i].longitude)});
                        favDeals[i].distance = parseFloat(distance.toFixed(1));
                        
                    }
        
                    this.setState({dataSource:_.sortBy(favDeals,'distance')});
                    this.setState({loadingData:false});
                    globalVals.refreshDeals = false;
        
                }, (err)=>{
                    console.log(err);
                    for(let i=0; i< favDeals.length; i++){
                        favDeals[i].distance = "";   
                    }
                    this.setState({dataSource:_.sortBy(favDeals,'distance')});
                    this.setState({loadingData:false});
                    globalVals.refreshDeals = false;
                },{enableHighAccuracy: false, timeout: 5000, maximumAge: 1} );

            } else {
                this.setState({dataSource:[]});
                    this.setState({loadingData:false});
                    globalVals.refreshDeals = false;
            }
       
    }

    removeFavourite(dealId){

        var msisdn = globalVals.user.mobile;
        var newFavs = "";
        rowIndex = _.findIndex(this.allFavs, ['msisdn', msisdn]);

        newFavs = _.replace(this.userFavs,","+dealId,'');

        console.log(rowIndex);
        console.log(newFavs);
        console.log(dealId);

        if(rowIndex>=0){
            this.allFavs[rowIndex].favourites = newFavs;
        }

        AsyncStorage.setItem("userFavs", JSON.stringify(this.allFavs));
        globalVals.userFavs = this.userFavs;
    }

    componentDidMount(){

        this.props.navigation.setParams({
            onMenuBtnPress: this.toggleSideMenu 
        });

        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("Favourites");
        
        this.loadDeals('')
        globalVals.refreshDeals = false;
        
    }

    componentDidUpdate(prevProps){
        console.log("fav BBB 3");
        console.log(prevProps);
        
        console.log("refreshing favvvvvvvvs 0000 " + globalVals.refreshDeals);
        
        if(globalVals.refreshDeals === true){
            console.log("refreshing favvvvvvvvs ");
            this.loadDeals('');
        }

        globalVals.refreshDeals = false;
    }

    componentDidFocus(props){
        console.log("fav component focused");
    }

    // componentWillReceiveProps(nextProps){

    //     console.log("Fav Screen ===== Actual ========= " + nextProps.tabNav.param);

    //     console.log("refreshing favvvvvvvvs " + globalVals.refreshDeals);
        
    //     if(globalVals.refreshDeals === true){
    //         console.log("refreshing favvvvvvvvs ");
    //         this.loadDeals('');
    //     }

    //     globalVals.refreshDeals = false;

    // }

    componentWillAppear() {
        console.log("Deal component will appear");
    }
    
    isComponentActive(activeComponent) {
        console.log("Deal is active = " + activeComponent);
    }

    handleAppStateChange(newAppState){
        console.log("Deal handle app state change");
        console.log(newAppState);
    }

    render(){


        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>
                
                { this.state.dataSource.length > 0 && this.state.loadingData==false ?
            <FlatList style={Styles.listWrapper}
                data={this.state.dataSource}
                keyExtractor={(x,i)=> x.dealID}
                removeClippedSubviews={true}
                renderItem={({item}) => this.renderDealItem(item)
                }
        /> : null }

           { this.state.dataSource.length<=0 && this.state.loadingData == false ? <NoRecords label="No Records Found" message="Save deals as favourites to find them easier right here." /> : null }

           { this.state.loadingData==true ? <Loader label="Loading..." /> : null }

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
        title: 'Favourites',
        headerLeft: <Hamburger onPress={ ()=> params.onMenuBtnPress(navigation)  }/>,
    }
    };

}

function mapStateToProps(state){
    return {
        favDeals: state.Deals.deals,
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

export default connect (mapStateToProps,mapDispatchToProps)(Favourites);