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

import Icon from 'react-native-vector-icons/Feather'
import styles from '../libs/style/style'

class BackButton extends Component { 

    render(){
        return <Icon name={'chevron-left'} style={styles.backButton} onPress={this.props.onPress} />
    }

}

export default BackButton;