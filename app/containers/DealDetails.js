import React, { Component } from 'react'
import ReactNative, { StatusBar, InteractionManager,Dimensions, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal'

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Moment from 'moment'
import Distance from '../libs/getDistance'

import Styles from '../libs/style/style'
import DealStyle from '../libs/style/deal'
import globalVals from '../libs/global';

import Hamburger from '../components/hamburger';
import Loader from '../components/loader';
import NoRecords from '../components/noRecords';
import BackButton from '../components/backButton';
import Popup from '../components/Popup';

import images from '../assets/imgLibrary';

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

class Deals extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, dataSource:[], allFavs:[], userFavs:'',isFav:false, insiderPopup:false, insiderItems:[], pageTitle:'Deal', activeTab:'deal', popup:{
            status:false,
            icon:'',
            title:'',
            message:'',
        } }
        this.navParams = this.props.navigation.state;
    }

    _handleBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({}));
    }

    searchPressed(){
        this.setState({ loadingData: true })
        this.props.fatchCategories('').then( (res) => {
            this.setState({loadingData: false })
      });
    }
    
    homeBtnPress(type){

        
    }

    renderDealItem(item){

        Moment.locale('en');
        
        return <View key={item.dealID} style={DealStyle.dealWrapper}>
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
    }

    loadDeals(cat){

        if(cat!='' && cat!=undefined){
            var deals = _.filter(this.props.deals, ['category', cat]);
        }else {
            var deals = this.props.deals;
        }

        navigator.geolocation.getCurrentPosition((coords)=>{
            
            for(let i=0; i< deals.length; i++){
                var distance = Distance.calc({latitude:coords.coords.latitude, longitude:coords.coords.longitude},{latitude:parseFloat(deals[i].latitude),longitude:parseFloat(deals[i].longitude)});
                deals[i].distance = parseFloat(distance.toFixed(1));
            }

            this.setState({dataSource:_.sortBy(deals,'distance')});

        }, (err)=>{
            console.log(err);
        },{enableHighAccuracy: false, timeout: 20000, maximumAge: 10000} );
    }

    componentDidMount(){

        this.props.navigation.setParams({
            onBackPress: this._handleBack 
        });
        
        this.setState({loadingData : true});

        // console.log(this.navParams);

        console.log ("Loading ID = " + this.navParams.params.dealId);

        this.props.dealDetails(this.navParams.params.dealId).then( (res) => {

            this.setState({loadingData: false });
            this.setState({dataSource:res.response});

            var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
            tracker.trackScreenView("Voucher Details - " + this.navParams.params.displayName);

            console.log(this.state.dataSource);
            this.getUserFavs();

            var textInsider = _.filter(this.state.dataSource.outlet.outletInsider, ['valueType', 'Text']);
            var booleanInsider = _.filter(this.state.dataSource.outlet.outletInsider, ['valueType', 'boolean']);
            // console.log(booleanInsider);
            var items = [];

            textInsider.forEach((element)=>{
                items.push(this.renderInsiderItem(element,'text'));     
            });
            booleanInsider.forEach((element)=>{
                items.push(this.renderInsiderItem(element,'boolean'));     
            });
            
            this.setState({insiderItems:items});
        });

        

    }

    

    componentDidUpdate(prevProps){
        
    }

    componentDidFocus(props){
        
    }

    componentWillReceiveProps(nextProps){
       
    }

    componentWillAppear() {
        
    }
    
    isComponentActive(activeComponent) {
        
    }

    handleAppStateChange(newAppState){
        
    }

    changeTab(val){
        this.setState({activeTab:val});
    }

    _renderTandC(){

        const fineprints = [];

        for(let i=0; i< this.state.dataSource.voucher.voucherTandCs.length; i++){

            fineprints.push(
                <View style={DealStyle.tcItem} key={i}>
                    <Text style={DealStyle.bullet}>{'\u2022'}</Text>
                    <Text style={DealStyle.cnt}>{this.state.dataSource.voucher.voucherTandCs[i].tcText}</Text>
                </View>
            );

        }

        return fineprints;
    }

    _renderWeekDays(){

        const weekDays = [];

        var days = _.split(this.state.dataSource.voucher.validWeekdays,",");

        // console.log(this.state.dataSource.voucher.validWeekdays);
        // console.log(days);

        weekDays.push(<Text key={'1'} style={[DealStyle.weekDay, (_.indexOf(days,'Sun')>=0)? DealStyle.weekDayActive : '']}>S</Text>)
        weekDays.push(<Text key={'2'} style={[DealStyle.weekDay, (_.indexOf(days,'Mon')>=0)? DealStyle.weekDayActive : '']}>M</Text>)
        weekDays.push(<Text key={'3'} style={[DealStyle.weekDay, (_.indexOf(days,'Tue')>=0)? DealStyle.weekDayActive : '']}>T</Text>)
        weekDays.push(<Text key={'4'} style={[DealStyle.weekDay, (_.indexOf(days,'Wed')>=0)? DealStyle.weekDayActive : '']}>W</Text>)
        weekDays.push(<Text key={'5'} style={[DealStyle.weekDay, (_.indexOf(days,'Thu')>=0)? DealStyle.weekDayActive : '']}>T</Text>)
        weekDays.push(<Text key={'6'} style={[DealStyle.weekDay, (_.indexOf(days,'Fri')>=0)? DealStyle.weekDayActive : '']}>F</Text>)
        weekDays.push(<Text key={'7'} style={[DealStyle.weekDay, (_.indexOf(days,'Sat')>=0)? DealStyle.weekDayActive : '']}>S</Text>)
        weekDays.push(<Text key={'8'} style={[DealStyle.weekDay, (_.indexOf(days,'VOPH')>=0)? DealStyle.weekDayActive : '']}>Public Holiday</Text>)

        return weekDays;

    }

    _formatTime(start,end){

        if(start=='CLOSED'){
            return 'Closed';
        }else {
            return Moment(start,"H:mm:ss").format("HH:mm") + " to " + Moment(end,"H:mm:ss").format("HH:mm");
        }

    }

    _renderOpeningHours(){
        const openingHours = [];

        for(let i=0; i< this.state.dataSource.outlet.outletWorkingHours.length;i++){
            openingHours.push(<View style={DealStyle.ohItem} key={i}>
                <Text style={[DealStyle.ohDay, (this.state.dataSource.outlet.outletWorkingHours[i].isToday=='true')? DealStyle.ohDayActive:'']}>{this.state.dataSource.outlet.outletWorkingHours[i].weekday}</Text>
                
                <Text style={DealStyle.ohTime}> { this._formatTime(this.state.dataSource.outlet.outletWorkingHours[i].startTime, this.state.dataSource.outlet.outletWorkingHours[i].endTime)} </Text>
                
            </View>)
        }

        return openingHours;
    }

    _renderItem ({item, index}) {

        return (
            <View style={{flex:1}} >
                <Image source={{uri:item}} style={DealStyle.galleryItem} />
            </View>
        );
    }

    openLink(){

        var val = _.filter(this.state.dataSource.outlet.outletCommunications, ['communicationType', 'Office Website']);

        Linking.openURL("http://" + val[0].value);

    }
    
    showDirection(){

        var val = _.filter(this.state.dataSource.outlet.outletCommunications, ['communicationType', 'Office Website']);

        navigator.geolocation.getCurrentPosition((coords)=>{
            
            var currentLat = coords.coords.latitude;
            var currentLong = coords.coords.longitude;
            var url = "https://www.google.ae/maps/dir/"+currentLat+","+currentLong+"/"+this.state.dataSource.outlet.latitude+","+this.state.dataSource.outlet.longitude+"/@"+currentLat+","+currentLong+",17z";

            Linking.openURL(url);        

        }, (err)=>{
            var currentLat = "";
            var currentLong = "";
            var url = "https://www.google.ae/maps/dir/"+currentLat+","+currentLong+"/"+this.state.dataSource.outlet.latitude+","+this.state.dataSource.outlet.longitude+"/@"+currentLat+","+currentLong+",17z";

            Linking.openURL(url);
        },{enableHighAccuracy: false, timeout: 20000, maximumAge: 10000} );

    }

    doRedeem(){
        
        this.props.refreshToken(globalVals.user.token).then((ref)=>{

            globalVals.user.token = ref.response.message;
            
            this.props.getProfile(globalVals.user.token).then((profile)=>{
                globalVals.user.status = profile.response.userSubscriptionStatus;

                globalVals.user.image = profile.response.userPhotoUrl;

                AsyncStorage.setItem("userData",JSON.stringify(globalVals.user));

                if(parseInt(profile.response.balanceCredits)>=parseInt(this.state.dataSource.voucher.priceCredits)){

                    globalVals.redeemDealId = this.state.dataSource.dealID;
                    
                    this.props.navigation.dispatch(NavigationActions.navigate({routeName:'MerchantPin'}));

                }else{
                    this.setState({popup:{
                        status:true,
                        icon:images.error,
                        title:"Oops!",
                        message:"You dont have sufficient credits to use this voucher"
                    }})
                }
            })

        });

    }

    closePopup(){
        this.setState({popup:{
            status:false,
            icon:images.error,
            title:"",
            message:""
        }})
    }
    closeInsiderPopup(){
        this.setState({insiderPopup:false});
    }

    doMenu(){
        var url = this.state.dataSource.outlet.outletInfo.priceGuideUrl;
        Linking.openURL(url);
    }

    doInsider(){
        
        this.setState({insiderPopup:true});
    }
    
    renderInsiderItem(item,type){
        if(type=='text'){
            return <View key={Math.random()} style={DealStyle.insiderItem}>
                <Text style={DealStyle.insiderLabel}>{item.label}: </Text>
                <Text style={DealStyle.insiderValue}>{item.value}</Text>
            </View>
        }else {
            return <View key={Math.random()} style={DealStyle.insiderItem}>
            <Image source={{uri:item.lightIconUrl}} style={DealStyle.insiderIcon} />
            <Text style={DealStyle.insiderValue}>{item.label}</Text>
        </View>     
        }
    }

    doCall(){
        var val = _.filter(this.state.dataSource.outlet.outletCommunications, ['communicationType', 'Office Phone']);
        console.log(val);
        Linking.openURL("tel:" + val[0].value);
    }

    doEmail(){
        var val = _.filter(this.state.dataSource.outlet.outletCommunications, ['communicationType', 'Office Email']);
        Linking.openURL("mailto:" + val[0].value);
    }

    getUserFavs(){

        var msisdn = globalVals.user.mobile;
        var allFavs = [];
        var userFavs = "";

        console.log("getting favourites for " + msisdn);
        
        AsyncStorage.getItem("userFavs").then(val => {
            if(val!='' && val!= null && val!=undefined){
                allFavs=JSON.parse(val);

                if(!Array.isArray(allFavs)){
                    console.log("this is not array... converting it to array");
                    allFavs = [allFavs];
                }

                this.setState({allFavs:allFavs});
                console.log(allFavs);
    
                allFavs.forEach((item)=>{
                    console.log(item);
                    if(!_.isArray(item)){
                        item = [item];
                    }
                    console.log(item[0].msisdn);
                    console.log(item[0].favourites);
                    if(item[0].msisdn==msisdn){
                        userFavs = item[0].favourites;
                    }
                });

                this.setState({allFavs:allFavs});
                this.setState({userFavs:userFavs});
    
            }else {
                this.setState({allFavs:[]});
                this.setState({userFavs:""});
            }

            console.log(this.state.userFavs);

            this.setState({isFav:_.includes(this.state.userFavs, this.state.dataSource.dealID)});
            console.log(this.state.dataSource);
            console.log(this.state.isFav);
        });

    }

    doFavourite(){

        if(globalVals.user.token!='' && globalVals.user.token!=undefined){

            /// save to favourite
            var msisdn = globalVals.user.mobile;
            var allFavs = this.state.allFavs;
            var userFavs = this.state.userFavs;
            var rowIndex;

            console.log("#######");
            console.log(allFavs);
            console.log("===");
            console.log(msisdn);
            console.log("1111111");
            console.log(this.state.userFavs);
            console.log("22222");
            console.log(this.state.dataSource.dealID);
            console.log("33333333");
            console.log(_.findIndex(this.state.allFavs,{'msisdn':msisdn}));
            console.log("44444444");
            
            if(_.includes(userFavs,this.state.dataSource.dealID)==false){
                /// save favourite

                if(_.findIndex(this.state.allFavs,{'msisdn':msisdn})>=0){
    
                    console.log("AAA");
        
                    userFavs = userFavs + "," + this.state.dataSource.dealID;
                    this.setState({userFavs:userFavs});
        
                    rowIndex = _.findIndex(allFavs, ['msisdn', msisdn]);
                    
                    allFavs[rowIndex].favourites = userFavs;
                    this.setState({userFavs:userFavs});
                    this.setState({allFavs:allFavs});
                    this.setState({isFav:_.includes(userFavs, this.state.dataSource.dealID)});
                    console.log(this.state.isFav);
                    AsyncStorage.setItem("userFavs", JSON.stringify(this.state.allFavs));
                    globalVals.userFavs = userFavs;
        
                }else {
        
                    console.log("BBB");
        
                    let thisFav = { "msisdn" : msisdn, "favourites":","+this.state.dataSource.dealID } 
        
                    allFavs.push(thisFav);

                    userFavs = "," + this.state.dataSource.dealID;
                    
                    this.setState({allFavs:allFavs});
                    this.setState({userFavs:","+this.state.dataSource.dealID});
                    this.setState({isFav:_.includes(userFavs, this.state.dataSource.dealID)});
                    console.log(this.state.isFav);
                    AsyncStorage.setItem("userFavs", JSON.stringify(thisFav));
                    globalVals.userFavs = ","+this.state.dataSource.dealID;

                    
        
                }
                console.log("current user favs .......... ");
                console.log(globalVals.userFavs);
                console.log(".......... ");

            }else {
                /// remove favourite
                rowIndex = _.findIndex(allFavs, ['msisdn', msisdn]);

                userFavs = _.replace(userFavs,","+this.state.dataSource.dealID,'');

                console.log(rowIndex);
                console.log(userFavs);
                console.log(this.state.dataSource.dealID);

                if(rowIndex>=0){
                    allFavs[rowIndex].favourites = userFavs;
                }

                this.setState({allFavs:allFavs});
                this.setState({userFavs:userFavs});
                this.setState({isFav:_.includes(userFavs, this.state.dataSource.dealID)});
                console.log(this.state.isFav);
                AsyncStorage.setItem("userFavs", JSON.stringify(allFavs));
                globalVals.userFavs = userFavs;
            }


        }else {
            
            this.setState({popup:{
                status:true,
                icon:images.error,
                title:"Oops!",
                message:"Login to your account to save as favourite"
            }})

        }
    }

    gotoLogin(){
        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'Login'}));
    }

    render(){


        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>

                {  this.state.dataSource!="" && this.state.loadingData==false ?
                <View style={{flex:1,}}>
                <ScrollView style={{flex:1,}}>
                
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.dataSource.outlet.outletImageUrls}
                    renderItem={this._renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    slideStyle={{ width: Dimensions.get('window').width, }}
                    
                />

                <View style={DealStyle.contentWrapper}>

                    {/* Image Slider */}
                    <View>
                    
                    </View>

                    {/* Tab Content */}
                    <View>
                        {/* Tab Buttons */}
                        <View style={DealStyle.tabBar}>
                            <TouchableHighlight underlayColor={ globalVals.colors.f1f1f1 } onPress= { ()=> this.changeTab('deal') } style={ this.state.activeTab=='deal'? DealStyle.tabBtnActive : DealStyle.tabBtn }><Text style={ this.state.activeTab=='deal'? DealStyle.tabLblActive : DealStyle.tabLbl }>Deal</Text></TouchableHighlight>
                            <TouchableHighlight underlayColor={ globalVals.colors.f1f1f1 } onPress= { ()=> this.changeTab('outlet') } style={ this.state.activeTab=='outlet'? DealStyle.tabBtnActive : DealStyle.tabBtn }><Text style={ this.state.activeTab=='outlet'? DealStyle.tabLblActive : DealStyle.tabLbl }>Info</Text></TouchableHighlight>
                        </View>
                        {/* Tab Content Deal */}
                        { this.state.activeTab=='deal' ?
                        <View style={DealStyle.tab}>

                            <View style={DealStyle.expWrapper}>

                                <View style={DealStyle.expBox}>
                                    <Image source={images.validFor} style={DealStyle.expIcon} />
                                    <Text style={DealStyle.expLbl}>Valid for</Text>
                                    <Text style={DealStyle.expValue}>{this.state.dataSource.voucher.validFor}</Text>
                                </View>

                                <View style={DealStyle.expBox}>
                                    <Image source={images.validUntil} style={DealStyle.expIcon} />
                                    <Text style={DealStyle.expLbl}>Valid until</Text>
                                    <Text style={DealStyle.expValue}>{ Moment(this.state.dataSource.voucher.validUntil,'ddd, Do MMMM YYYY HH:mm:ss').format('D MMM YYYY') }</Text>
                                </View>

                                <View style={[DealStyle.expBox, DealStyle.expBoxNoBorder]}>
                                    <Image source={images.usage} style={DealStyle.expIcon} />
                                    <Text style={DealStyle.expLbl}>Usage limit</Text>
                                    <Text style={DealStyle.expValue}>{this.state.dataSource.voucher.groupRedemptionLimit}</Text>
                                </View>

                            </View>

                            <View style={DealStyle.cntBox}>
                                <Text style={DealStyle.cntLbl}>Valid on:</Text>
                                <View style= {DealStyle.weekDays}>
                                    { this._renderWeekDays() }
                                </View>
                            </View>

                            <View style={DealStyle.cntBox}>
                                <Text style={DealStyle.cntLbl}>What's included:</Text>
                                <Text style={DealStyle.cnt}>{ this.state.dataSource.voucher.inclusions }</Text>
                            </View>

                            <View style={DealStyle.cntBox}>
                                <Text style={DealStyle.cntLbl}>What's not included:</Text>
                                <Text style={DealStyle.cnt}>{ this.state.dataSource.voucher.exclusions }</Text>
                            </View>    

                            <View style={[DealStyle.cntBox, DealStyle.cntBoxNoBorder]}>
                                <Text style={DealStyle.cntLbl}>Fine print:</Text>
                                { this._renderTandC() }
                            </View>
                        </View> : null }

                        {/* Tab Content Info */}
                        { this.state.activeTab=='outlet' ?    
                        <View style={DealStyle.tab}>

                            <View style={DealStyle.cntBox}>
                                <Text style={DealStyle.cntLbl}>Outlet description</Text>
                                <Text style={DealStyle.cnt}>{ this.state.dataSource.voucher.brandDescription }</Text>


                                <View style={DealStyle.boxWrapper}>
                                    <TouchableHighlight style={ {flex:1} } onPress= { ()=> this.showDirection() } underlayColor={ globalVals.colors.white }>
                                        <View style={DealStyle.box}>
                                            <Image source={images.iconDirection} style={DealStyle.iconDirection} />
                                            <Text style={DealStyle.directionLbl}>Get Directions</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight  style={ {flex:1} }  onPress= { ()=> this.openLink() } underlayColor={ globalVals.colors.white }> 
                                        <View style={[DealStyle.box,DealStyle.boxNoRightBorder]}>
                                            <Image source={images.iconWeb} style={DealStyle.iconDirection} />
                                            <Text style={DealStyle.directionLbl}>View Website</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <View style={DealStyle.cntBox}>
                                <Text style={DealStyle.cntLbl}>Why we love it</Text>
                                <Text style={DealStyle.cntTitle}>{ this.state.dataSource.outlet.outletInfo.title }</Text>
                                <Text style={DealStyle.cnt}>{ this.state.dataSource.outlet.outletInfo.message }</Text>
                            </View>

                            <View style={[DealStyle.cntBox, DealStyle.cntBoxNoBorder]}>
                                <Text style={DealStyle.cntLbl}>Opening Hours</Text>
                                { this._renderOpeningHours()}
                            </View>

                        </View> : null }
                    </View> 

                </View> 
                
                </ScrollView>
                <View style={DealStyle.footer}>
                    { globalVals.user.token!='' && globalVals.user.token!=undefined ?
                    <TouchableHighlight style={Styles.btnPurple} underlayColor={globalVals.colors.purple} onPress={()=> this.doRedeem()}><Text style={Styles.btnPurpleLbl}>USE NOW FOR {this.state.dataSource.voucher.priceCredits} CREDITS</Text></TouchableHighlight> :
                    <TouchableHighlight style={Styles.btnPurple} underlayColor={globalVals.colors.purple} onPress={()=> this.gotoLogin()}><Text style={Styles.btnPurpleLbl}>LOGIN TO USE NOW</Text></TouchableHighlight> }


                    <View style={DealStyle.footerBar}>
                        <TouchableHighlight style={DealStyle.footerBtn} underlayColor={globalVals.colors.white} onPress={()=> this.doMenu()}><Image source={images.menu} style={DealStyle.footerIcon} /></TouchableHighlight>
                        <TouchableHighlight style={DealStyle.footerBtn} underlayColor={globalVals.colors.white} onPress={()=> this.doInsider()}><Image source={images.info} style={DealStyle.footerIcon} /></TouchableHighlight>
                        <TouchableHighlight style={DealStyle.footerBtn} underlayColor={globalVals.colors.white} onPress={()=> this.doCall()}><Image source={images.phone} style={DealStyle.footerIcon} /></TouchableHighlight>
                        <TouchableHighlight style={DealStyle.footerBtn} underlayColor={globalVals.colors.white} onPress={()=> this.doEmail()}><Image source={images.email} style={DealStyle.footerIcon} /></TouchableHighlight>
                        <TouchableHighlight style={DealStyle.footerBtn} underlayColor={globalVals.colors.white} onPress={()=> this.doFavourite()}><Image source={(!this.state.isFav)?images.heart:images.heartActive} style={DealStyle.footerIcon} /></TouchableHighlight>
                    </View>
                </View> 
                </View>
               : null }

            { this.state.dataSource=="" && this.state.loadingData == false ? <NoRecords label="No Records Found" /> : null }

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

            <Modal isVisible={this.state.insiderPopup}
                    onBackdropPress={() => this.closeInsiderPopup() }
                    onBackButtonPress={() => this.closeInsiderPopup() }
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                    useNativeDriver={true}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    backdropColor={'black'}
                    backdropOpacity={0.85}
                    hideModalContentWhileAnimating={true}

                ><View style={DealStyle.insiderWrapper}>
                    <ScrollView style={{flex:1}}>
                    <Text style={DealStyle.insiderTitle}>Insider Knowledge</Text>
                    
                        {this.state.insiderItems}
                    </ScrollView> 
                    <TouchableHighlight style={DealStyle.insiderButton} underlayColor={ globalVals.colors.darkGreen} onPress={()=>this.closeInsiderPopup()}><Text style={DealStyle.insiderButtonLabel}>OK</Text></TouchableHighlight>   
                </View></Modal>    

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
            
        return {
            title: params ? params.voucher : 'Offers',
            headerLeft: <BackButton onPress={ ()=> { params.onBackPress() } } />,
        }
    };

}

function mapStateToProps(state){
    
    return {
        deals: state.Deals.deals,
        categories: state.Deals.categories,
        tabNav:state.tabNav    
    }

    // return state


}

function mapDispatchToProps (dispatch){
    return bindActionCreators(ActionCreators,dispatch);
    // return {
    //     actions: dispatch(ActionCreators,dispatch)
    //     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch) 
    // }
}

export default connect (mapStateToProps,mapDispatchToProps)(Deals);