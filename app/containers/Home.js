import React, { Component } from 'react';
import ReactNative, { StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';

import {
	GoogleAnalyticsTracker,
	GoogleTagManager,
	GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge';

import Styles from '../libs/style/style';
import HomeStyle from '../libs/style/home';
import globalVals from '../libs/global';

import Hamburger from '../components/hamburger';
import CategoryItem from '../components/categoryItem';

import images from '../assets/imgLibrary';

var _ = require('lodash');

const { ScrollView, View, Text, TextInput, Image, TouchableHighlight, StyleSheet } = ReactNative;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { loadingData: false, dataSource: [], keyword: '' };
	}

	searchPressed(text) {
		// this.setState({loadingData: true});
		// this.props.fatchCategories('').then((res) => {
		//   this.setState({loadingData: false});
		// });

		// console.log('--');
		// console.log(this.state.keyword);
		// console.log('--');

		if (this.state.keyword != '') {
			var data = 'searchKeyword=' + this.state.keyword;

			// this.props.searchDeals(data).then( (resp) => {

			//   this.props.changeTab('DealsList',"Offers");
			//   this.props.navigation.dispatch(NavigationActions.navigate({routeName:'DealsList', params:{'cat':"Offers"}}));

			// });
			globalVals.searchKeyword = this.state.keyword;
			globalVals.refreshDeals = true;
			this.props.changeTab('DealsList', 'Offers');
			this.props.navigation.dispatch(
				NavigationActions.navigate({
					routeName: 'DealsList',
					params: { cat: 'Offers', keyword: this.state.keyword }
				})
			);
		}
	}

	listItemPress(cat) {
		// this.props.navigation.dispatch(this.props.navigation.navigate({
		//   routeName: 'Home',
		//   params: {'cat': cat},
		//   action: NavigationActions.navigate(
		//       {routeName: 'DealsList', params: {'cat': cat}}),
		// }));
		// this.props.navigation.navigate('Deals', {'cat':cat});

		console.log('********************************************', cat)

		this.props.changeTab('DealsList', cat);
		globalVals.searchKeyword = '';
		globalVals.refreshDeals = true;
		this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DealsList', params: { cat: cat } }));
	}

	toggleSideMenu(navigation) {
		// console.log('toggle menu 111');
		// this.props.navigation.dispatch(NavigationActions.navigate('DrawerOpen'));
		// this.props.navigation.openDrawer();
		navigation.openDrawer();
	}

	componentDidMount() {
		// console.log(globalVals.advertisingId + ' $$$$$$$$ ' + globalVals.clientId);

		var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
		tracker.trackScreenView('Home');

		this.props.navigation.setParams({
			onMenuBtnPress: this.toggleSideMenu
		});

		this.setState({ loadingData: true });

		_.each(this.props.categories, (item) => (item.displayOrder = parseInt(item.displayOrder, 10)));

		this.setState({ dataSource: _.sortBy(this.props.categories, 'displayOrder') });

		this.setState({ loadingData: false });
	}

	render() {
		var categories = [];

		for (let i = 0; i < this.state.dataSource.length; i++) {
			categories.push(
				<CategoryItem
					key={i}
					id={i}
					label={this.state.dataSource[i].category}
					icon={{ uri: this.state.dataSource[i].categoryImage }}
					onPress={() => this.listItemPress(this.state.dataSource[i].category)}
				/>
			);
		}

		// console.log(Platform.OS + ' -- ' + Platform.Version);

		return (
			<View style={Styles.containerNoPadding}>
				<StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)" />

				{/* Background Image */}
				<View style={HomeStyle.bgImageWrapper}>
					<Image style={HomeStyle.bgImage} source={images.bgImage} />
				</View>

				<View style={HomeStyle.contentWrapper}>
					{/* Search Section */}
					<View style={HomeStyle.searchWrapper}>
						<View style={HomeStyle.searchBox}>
							<Image source={images.searchIcon} style={HomeStyle.searchIcon} />
							<TextInput
								style={HomeStyle.searchInput}
								underlineColorAndroid="transparent"
								placeholder="Search Category, Place, Merchant"
								placeholderTextColor={globalVals.colors.lightGray}
								onChangeText={(text) => this.setState({ keyword: text })}
								onSubmitEditing={() => this.searchPressed()}
								clearButtonMode={'while-editing'}
								returnKeyType="search"
							/>
						</View>
					</View>
					{/* Categories Section */}
					<View style={HomeStyle.listWrapper}>{categories}</View>
				</View>
			</View>
		);
	}

	static navigationOptions = ({ navigation, screenProps }) => {
		const { params } = navigation.state;
		return {
			title: 'Categories',
			headerLeft: <Hamburger onPress={() => params.onMenuBtnPress(navigation)} />
		};
	};
}

function mapStateToProps(state) {
	return {
		// statistics: state.Statistics.statistics.response,
		categories: state.Deals.categories
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
	// return {
	//     actions: dispatch(ActionCreators,dispatch)
	//     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch)
	// }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
