import React, { Component } from 'react';
import ReactNative, { StatusBar } from 'react-native';
import { connect } from 'react-redux';
const { View, Image, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text } = ReactNative;

import HomeStyle from '../libs/style/home';
import globalVals from '../libs/global';

class CategoryItem extends Component {
	render() {
		return (
			<TouchableHighlight
				key="this.props.id"
				onPress={this.props.onPress}
				style={HomeStyle.listItem}
				underlayColor={globalVals.colors.f1f1f1}
			>
				<View key="this.props.id" style={HomeStyle.listItemWrapper}>
					<Image source={this.props.icon} style={HomeStyle.catIcon} />
					<Text style={HomeStyle.listItemLabel}>{this.props.label}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

export default CategoryItem;
