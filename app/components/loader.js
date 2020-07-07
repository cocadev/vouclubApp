import React, { Component } from 'react'
import ReactNative, { StatusBar } from 'react-native'
import { connect } from 'react-redux'
const {
    View,
    Image,
    TouchableHighlight,

    Text,
    ActivityIndicator
} = ReactNative

import styles from '../libs/style/style'
import globalVals from '../libs/global'

class Loader extends Component { 

    render(){
        return <View style={ styles.loaderWrapper }>
            <ActivityIndicator size="large" color={ globalVals.colors.darkGreen } />
        </View>
              
    }

}

export default Loader; 