import React, { Component } from 'react'
import ReactNative, { StatusBar, Dimensions, PermissionsAndroid, ToastAndroid, Platform } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'
import Modal from "react-native-modal"

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import HomeStyle from '../libs/style/home'
import DealStyle from '../libs/style/deal'
import globalVals from '../libs/global';
import Distance from '../libs/getDistance';

import Hamburger from '../components/hamburger';

import images from '../assets/imgLibrary';

import { Marker, Callout } from 'react-native-maps'
import ClusteredMapView from 'react-native-maps-super-cluster'
import Geolocation from '@react-native-community/geolocation';

var _ = require('lodash');
import Moment from 'moment'

const {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    ImageBackground,
    TouchableHighlight,
    StyleSheet
} = ReactNative

let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;

const INIT_REGION = {
    latitude: 25.276987,
    longitude: 55.296249,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4 * (width/height),
  }

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, dataSource:[], popupItems:"", showPopup:false }
        this.map = "";
        this.latitude = "";
        this.longitude = "";
    };

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

      hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
          return true;
        }
    
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (hasPermission) return true;
    
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
    
        if (status === PermissionsAndroid.RESULTS.DENIED) {
          ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }
    
        return false;
      }

    async componentDidMount(){

        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.props.navigation.setParams({
            onMenuBtnPress: this.toggleSideMenu 
          });

          var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
          tracker.trackScreenView("Map Listing");  
          
        var deals = this.props.deals;

        for(let i=0; i<deals.length; i++){
            deals[i]["location"] = {"latitude":Number(deals[i].latitude), "longitude":Number(deals[i].longitude)};
        }

        Geolocation.getCurrentPosition((coords)=>{
            console.log(coords);
            this.latitude = coords.coords.latitude;
            this.longitude = coords.coords.longitude;
         }, (err)=>{
            console.log(err);
        });

        console.log("# # # #");
        console.log(deals);
        console.log("# # # #");

        this.setState({dataSource:deals});
    }

    
    
    clusterPress(cluster){

        console.log(cluster);
        
        this.setState({showPopup:true});
        let items = [];
        
        cluster.forEach(element => {
            var distance = "";
            if(this.latitude!="" && this.longitude!=""){
                distance = Distance.calc({latitude:this.latitude, longitude:this.longitude},{latitude:parseFloat(element.properties.item.latitude),longitude:parseFloat(element.properties.item.longitude)});
            }
            element.properties.item['distance'] = parseFloat(distance.toFixed(1));
            items.push(this.renderDealItem(element.properties.item));
        });

        console.log(items);

        this.setState({popupItems:items});
    }

    markerPress(data){
        console.log(data);
        var distance = "";
        let items = [];

        if(this.latitude!="" && this.longitude!=""){
            distance = Distance.calc({latitude:this.latitude, longitude:this.longitude},{latitude:parseFloat(data.latitude),longitude:parseFloat(data.longitude)});
        }
        
        data.distance = distance;
        items.push(this.renderDealItem(data));
        this.setState({popupItems:items});
        this.setState({showPopup:true});
    }

    closePopup(){
        this.setState({showPopup:false});
    }

    renderCluster = (cluster, onPress) => {
        const pointCount = cluster.pointCount,
              coordinate = cluster.coordinate,
              clusterId = cluster.clusterId
              

        const clusteringEngine = this.map.getClusteringEngine(),
          clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

        return (
          <Marker coordinate={coordinate} onPress={()=>this.clusterPress(clusteredPoints)}>
            <ImageBackground source={images.cluster} style={Styles.myClusterStyle}>
              <Text style={Styles.myClusterTextStyle}>
                {pointCount}
              </Text>
            </ImageBackground>
            {
              /*
                Eventually use <Callout /> to
                show clustered point thumbs, i.e.:
                <Callout>
                  <ScrollView>
                    {
                      clusteredPoints.map(p => (
                        <Image source={p.image}>
                      ))
                    }
                  </ScrollView>
                </Callout>
    
                IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
               */
            }
            
          </Marker>
        )
      }
    
    //   renderMarker = (data) => <Marker key={data.id || Math.random()} coordinate={{latitude:data.latitude,longitude:data.longitude}} />
    renderMarker = (data) => {
        return(
            <Marker identifier={'pin-${data.dealID}'} key={data.dealID || Math.random()} image={images.marker} coordinate={data.location} onPress={()=>this.markerPress(data)} />   
        )
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

    dealItemPress(item){

        this.setState({showPopup:false});

        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DealDetails', params:{ 'dealId':item.dealID, 'voucher':item.voucher, 'displayName': item.displayName } }));
    }

    render(){

        var categories = [];

        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>
                { this.state.dataSource.length>0 ?
                <ClusteredMapView
                    style={{flex: 1}}
                    ref={(r) => { this.map = r }}
                    data={this.state.dataSource}
                    initialRegion={INIT_REGION}
                    minZoomLevel={10}
                    maxZoomLevel={16}
                    loadingEnabled={true}
                    moveOnMarkerPress={false}
                    showsUserLocation={true}
                    renderMarker={this.renderMarker}
                    renderCluster={this.renderCluster} /> : null }

                <Modal isVisible={this.state.showPopup}
                    onBackdropPress={() => this.closePopup() }
                    onBackButtonPress={() => this.closePopup() }
                    backdropOpacity={0.5}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                    useNativeDriver={true}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    hideModalContentWhileAnimating={true}
                    style={{paddingLeft:0, paddingBottom:0, paddingRight:0, marginLeft:0, marginBottom:0, marginRight:0, justifyContent:'flex-end'}}

                >
                    
                        <View style={Styles.mapPopup}>
                            <ScrollView>
                                {this.state.popupItems}   
                            </ScrollView>    
                        </View>
                    
                </Modal>

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
        return {
            title: "Map",
            headerLeft: <Hamburger onPress={ ()=> params.onMenuBtnPress(navigation)  }/>,
        }
    };

}

function mapStateToProps(state){
    return {
        // statistics: state.Statistics.statistics.response,
        deals: state.Deals.deals
    }

}

function mapDispatchToProps (dispatch){
    return bindActionCreators(ActionCreators,dispatch);
    // return {
    //     actions: dispatch(ActionCreators,dispatch)
    //     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch) 
    // }
}

export default connect (mapStateToProps,mapDispatchToProps)(Map);