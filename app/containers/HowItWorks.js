import React, { Component } from 'react'
import ReactNative, { StatusBar, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'
import Carousel from 'react-native-snap-carousel';

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import hiw from '../libs/style/hiw'
import globalVals from '../libs/global';

import Loader from '../components/loader';
import NoRecords from '../components/noRecords';
import BackButton from '../components/backButton';

import images from '../assets/imgLibrary';


const {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet
} = ReactNative

class HowItWorks extends Component {

    constructor(props) {
        super(props)
        this.state = { loadingData: false, dataSource:[
            {
                title:"Browse VoucherClub categories in list or map view",
                image:images.hiw1,
            },
            {
                title:"Check the voucher for validity and what's included",
                image:images.hiw2
            },
            {
                title:"Pay as you go by credits",
                image:images.hiw3,
            },
            {
                title:"Show voucher code to merchant",
                image:images.hiw4
            }
        ] }
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

    _renderItem({item, index}){
        
        return (<View style={hiw.item}>
            <Text style={hiw.title}>{item.title}</Text>
            <Image source={item.image} style={hiw.image} />
        </View>);

    }

    componentDidMount(){

        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("How it Works");

        this.props.navigation.setParams({
            onBackPress: this._handleBack 
        });
    }

    render(){

        var categories = [];

        return <View style={Styles.containerNoPadding}>
               <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>
                
                <View style={ hiw.wrapper }>

                    <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    slideStyle={{ width: Dimensions.get('window').width, }}
                    
                />
                    
                </View>

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
        return {
            title: "How it works",
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

export default connect (mapStateToProps,mapDispatchToProps)(HowItWorks);