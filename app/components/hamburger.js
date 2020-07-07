import React, { Component } from 'react';
import ReactNative, { StatusBar } from 'react-native';
import { connect } from 'react-redux';
const { View, Image, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text } = ReactNative;

import images from '../assets/imgLibrary';
import Styles from '../libs/style/style';

class Hamburger extends Component {
	render() {
		return (
			<TouchableHighlight underlayColor="transparent" onPress={this.props.onPress}>
				<Image resizeMode="contain" source={images.menuIcon} style={Styles.menuIcon} />
			</TouchableHighlight>
		);
	}
}

export default Hamburger;
