
import React, { Component } from 'react'
import ReactNative, { StatusBar } from 'react-native'
import { connect } from 'react-redux'
const {
    View,
    Image,
    TouchableHighlight,
    StyleSheet,
    Text,
} = ReactNative

import styles from '../libs/style/style'
import globalVals from '../libs/global'

class NoRecords extends Component { 

    render(){
        return <View style={ styles.noRecordsWrapper }>
            <Text style={ styles.noRecords }>{ this.props.label }</Text>
            <Text style={ styles.noRecordsMsg }>{"\n"}{ this.props.message }</Text>
        </View>
              
    }

}

export default NoRecords; 