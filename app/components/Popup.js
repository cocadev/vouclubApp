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
import images from '../assets/imgLibrary'

class Popup extends Component { 

    render(){
        return <View style={ styles.popupWrapper }>
                <View style={styles.popup}>

                    <Image source={this.props.icon} style={styles.popupIcon} />
                    <Text style={styles.popupTitle}>{this.props.title}</Text>
                    <Text style={styles.popupMsg}>{this.props.message}</Text>

                    <TouchableHighlight onPress={this.props.onPress} style={styles.popupBtn}><Text style={styles.popupBtnLbl}>Ok</Text></TouchableHighlight>

                </View>
        </View>
              
    }

}

export default Popup; 