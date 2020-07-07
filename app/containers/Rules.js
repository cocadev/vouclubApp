import React, { Component } from 'react'
import ReactNative, { StatusBar, InteractionManager,Dimensions, Linking } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux' 
import { ActionCreators } from '../actions/index'

import { GoogleAnalyticsTracker, GoogleTagManager, GoogleAnalyticsSettings } from "react-native-google-analytics-bridge";

import Styles from '../libs/style/style'
import faq from '../libs/style/faq'
import htmlStyles from '../libs/style/html'
import globalVals from '../libs/global';

import Loader from '../components/loader';
import NoRecords from '../components/noRecords';
import BackButton from '../components/backButton';

import images from '../assets/imgLibrary';

var _ = require('lodash');
import Moment from 'moment'

import HTMLView from 'react-native-htmlview';

const {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet
} = ReactNative

class Rules extends Component {

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

        this.setState({loadingData:true});
        
        this.props.navigation.setParams({
            onBackPress: this._handleBack 
        });

        var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
        tracker.trackScreenView("Rules of Use");

        this.props.getContent().then((resp)=>{
            console.log("---------");
            console.log(resp);
            console.log("---------");
            
            var content = _.filter(resp.response,{'contentType':'ROU'});

            // _.forEach(content,(val,key)=>{
            //     content[key].displayOrder = parseInt(content[key].displayOrder);
            // })


            this.setState({dataSource:content});

            console.log(this.state.dataSource);
            this.setState({loadingData:false});

        })

       

    }

    _renderItem(){
        var faq = [];

        // for(let i=0; i<this.state.dataSource.length;i++){
        //     faq.push(<View style={faq.item} key={i}>
        //         <Text style={faq.que}>{this.state.dataSource[i].title}</Text>
        //         <Text style={faq.ans}>{this.state.dataSource[i].description}</Text>
        //     </View>);
        // }

        faq.push(<HTMLView value={this.state.dataSource[0].description} addLineBreaks={false} stylesheet={htmlStyles}></HTMLView>)

        return faq;
    }

    render(){

        

        return <View style={Styles.containerNoPadding}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)"/>

                {  this.state.dataSource!="" && this.state.loadingData==false ? 
                <View style={faq.wrapper}>
                <ScrollView >
                    { this._renderItem() }
                </ScrollView>
                </View>    

                : null }

                { this.state.dataSource=="" && this.state.loadingData == false ? <NoRecords label="No Records Found" /> : null }

                { this.state.loadingData==true ? <Loader label="Loading..." /> : null }

        </View>
    }

    static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
        return {
            title: "Rules of Use",
            headerLeft: <BackButton onPress={ ()=> { params.onBackPress() } } />,
        }
    }


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

export default connect (mapStateToProps,mapDispatchToProps)(Rules);