import React, { Component } from 'react';
import ReactNative, { StatusBar, InteractionManager } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';

import {
	GoogleAnalyticsTracker,
	GoogleTagManager,
	GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge';

import Moment from 'moment';
import Distance from '../libs/getDistance';

import Styles from '../libs/style/style';
import DealStyle from '../libs/style/deal';
import globalVals from '../libs/global';

import Hamburger from '../components/hamburger';
import Loader from '../components/loader';
import NoRecords from '../components/noRecords';
import Geolocation from '@react-native-community/geolocation';

import images from '../assets/imgLibrary';

var _ = require('lodash');

const { ScrollView, View, Text, TextInput, Image, TouchableHighlight, StyleSheet, FlatList } = ReactNative;

class Deals extends Component {
	constructor(props) {
		super(props);
		this.state = { loadingData: false, dataSource: [], pageTitle: '' };
		this.navParams = this.props.navigation.state;
	}

	searchPressed() {
		this.setState({ loadingData: true });
		this.props.fatchCategories('').then((res) => {
			this.setState({ loadingData: false });
		});
	}

	toggleSideMenu(navigation) {
		// console.log('toggle menu 111');
		// this.props.navigation.dispatch(NavigationActions.navigate('DrawerOpen'));
		// this.props.navigation.openDrawer();
		navigation.openDrawer();
	}

	dealItemPress(item) {
		// console.log(item);

		this.props.navigation.dispatch(
			NavigationActions.navigate({
				routeName: 'DealDetails',
				params: { dealId: item.dealID, voucher: item.voucher, displayName: item.displayName }
			})
		);

		// const resetAction = StackActions.reset({
		//     index: 0,
		//     actions: [NavigationActions.navigate({ routeName: 'DealDetails', params:{ 'dealId':item.dealID, 'voucher':item.voucher, 'displayName': item.displayName } })]
		// });

		// this.props.navigation.dispatch(resetAction)
	}

	renderDealItem(item) {
		Moment.locale('en');

		return (
			<TouchableHighlight
				key={item.dealID}
				onPress={() => this.dealItemPress(item)}
				underlayColor={globalVals.colors.f1f1f1}
			>
				<View key={item.dealID} style={DealStyle.dealWrapper}>
					<Image source={{ uri: item.outletImageUrl }} style={DealStyle.dealImage} />

					<View style={DealStyle.dealInfo}>
						<Text style={DealStyle.dealTitle}> {item.voucher} </Text>
						<Text style={DealStyle.dealDesc}>
							{' '}
							{item.displayName} - {item.displayInfo}{' '}
						</Text>

						<View style={DealStyle.infoGroup}>
							<View style={DealStyle.otherInfo}>
								<Text style={DealStyle.infoValue}>{item.distance}</Text>
								<Text style={DealStyle.infoLabel}>kms away</Text>
							</View>

							<View style={DealStyle.otherInfo}>
								<Text style={DealStyle.infoValue}>
									{Moment(item.validUntil, 'ddd, Do MMMM YYYY HH:mm:ss').format('D MMM YYYY')}
								</Text>
								<Text style={DealStyle.infoLabel}>Expires</Text>
							</View>

							<View style={[ DealStyle.otherInfo, DealStyle.otherInfoNoBorder ]}>
								<Text style={DealStyle.infoValue}>{item.validFor}</Text>
								<Text style={DealStyle.infoLabel}>Valid for</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	loadDeals(cat) {
		// console.log('Deals Params ==== ');
		// console.log(globalVals.searchKeyword + ' ' + cat);
		// console.log('==== ');

		globalVals.refreshDeals = false;
		this.setState({ loadingData: true });

		// console.log('DEALS ===== GETTING SAVED DEALS =====');

		AsyncStorage.getItem('savedDeals').then(
			(val) => {
				// console.log('Deals Screen = = = = ' + val);

				if (val != '' && val != null && val != undefined) {
					var savedDeals = JSON.parse(val);
					globalVals.savedDeals = savedDeals.savedDeals;
					globalVals.savedDealsCount = savedDeals.savedDealsCount;
					globalVals.lastRefreshDate = savedDeals.lastRefreshDate;
				} else {
				}

				if (globalVals.searchKeyword != '' && globalVals.searchKeyword != undefined) {
					data = 'searchKeyword=' + globalVals.searchKeyword;
					// console.log('Searching for deals...');
					this.props.searchDeals(data).then((search) => {
						if (search.status == 200) {
							this.renderDeals(cat);
						} else {
							this.setState({ dataSource: [] });
							this.setState({ loadingData: false });
							globalVals.refreshDeals = false;
						}
					});
				} else {
					// console.log('loading deals from saved');
					this.props.getDeals('').then((resp) => {
						this.renderDeals(cat);
					});
				}
			},
			(err) => {
				// console.log('Deals Screen ====== saved deals error ===== ' + err);
			}
		);
	}

	renderDeals(cat) {
		if (this.props.deals != '' && this.props.deals != undefined) {
			if (cat != '' && cat != 'Offers' && cat != undefined) {
				var deals = _.filter(this.props.deals, [ 'category', cat ]);
			} else {
				var deals = this.props.deals;
			}

			Geolocation.getCurrentPosition(
				(coords) => {
					for (let i = 0; i < deals.length; i++) {
						var distance = Distance.calc(
							{ latitude: coords.coords.latitude, longitude: coords.coords.longitude },
							{ latitude: parseFloat(deals[i].latitude), longitude: parseFloat(deals[i].longitude) }
						);
						deals[i].distance = parseFloat(distance.toFixed(1));
					}

					this.setState({ dataSource: _.sortBy(deals, 'distance') });
					this.setState({ loadingData: false });
					globalVals.refreshDeals = false;
				},
				(err) => {
					// console.log(err);
					for (let i = 0; i < deals.length; i++) {
						deals[i].distance = '';
					}

					this.setState({ dataSource: _.sortBy(deals, 'distance') });
					this.setState({ loadingData: false });
					globalVals.refreshDeals = false;
				},
				{ enableHighAccuracy: false, timeout: 5000, maximumAge: 1 }
			);
		} else {
			this.setState({ loadingData: false });
			globalVals.refreshDeals = false;
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onMenuBtnPress: this.toggleSideMenu
		});

		//   console.log('**********************************************', this.props.tabNav)

		let cat = 'Offers';
		this.loadDeals(cat);

		if (cat != this.state.pageTitle) {
			this.props.navigation.setParams({ page: cat });
		}
		console.log('Deal AAA 2');
		this.setState({ pageTitle: cat });

		var tracker = new GoogleAnalyticsTracker(globalVals.googleTrackingCode);
		tracker.trackScreenView(cat);
	}

	componentDidUpdate(prevProps) {
		console.log('Deal BBB 3');
	}

	componentDidFocus(props) {
		console.log('Deal component focused');
	}

	componentDidUpdate(prevProps, state) {

		var cat = this.props.navigation.getParam('cat', 'Offers');

		// console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', cat);

		if ( state.pageTitle !== cat && cat != 'Favorite') {
			console.log(' Deals Screen ==== ' + this.props.navigation.state.routeName);

			if (globalVals.refreshDeals === true) {
				this.loadDeals(cat);
			}

			console.log('Deal AAAA 1');
			console.log(cat);
			console.log(this.state.pageTitle);
			if (cat != this.state.pageTitle) {
				this.props.navigation.setParams({ page: cat });
			}
			this.setState({ pageTitle: cat });
		}
	}

	// componentWillReceiveProps(nextProps){

	//     console.log(nextProps);

	//     console.log("Deals Screen ===== Actual ========= " + nextProps.tabNav.param);

	//     if(nextProps.tabNav.param != "Favorite"){

	//         console.log( " Deals Screen ==== " + this.props.navigation.state.routeName);

	//         var cat = nextProps.tabNav.param;

	//         if(globalVals.refreshDeals === true){
	//             this.loadDeals(cat);
	//         }

	//         console.log("Deal AAAA 1");
	//         console.log(cat);
	//         console.log(this.state.pageTitle);
	//         if(cat!=this.state.pageTitle){
	//             this.props.navigation.setParams({page:cat});
	//         }
	//         this.setState({'pageTitle':cat});

	//     }
	// }

	componentWillAppear() {
		console.log('Deal component will appear');
	}

	isComponentActive(activeComponent) {
		// console.log('Deal is active = ' + activeComponent);
	}

	handleAppStateChange(newAppState) {
		console.log('Deal handle app state change');
		// console.log(newAppState);
	}

	render() {
		return (
			<View style={Styles.containerNoPadding}>
				<StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)" />

				{this.state.dataSource.length > 0 && this.state.loadingData == false ? (
					<FlatList
						style={Styles.listWrapper}
						data={this.state.dataSource}
						keyExtractor={(x, i) => x.dealID}
						removeClippedSubviews={true}
						renderItem={({ item }) => this.renderDealItem(item)}
					/>
				) : null}

				{this.state.dataSource.length <= 0 && this.state.loadingData == false ? (
					<NoRecords label="No Records Found" />
				) : null}

				{this.state.loadingData == true ? <Loader label="Loading..." /> : null}
			</View>
		);
	}

	static navigationOptions = ({ navigation, screenProps }) => {
		const { params } = navigation.state;
		return {
			title: params ? params.page : 'Offers',
			headerLeft: <Hamburger onPress={() => params.onMenuBtnPress(navigation)} />
		};
	};
}

function mapStateToProps(state) {
	return {
		deals: state.Deals.deals,
		categories: state.Deals.categories,
		tabNav: state.tabNav
	};

	// return state
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
	// return {
	//     actions: dispatch(ActionCreators,dispatch)
	//     // getStatistics: dispatch(ActionCreators.getStatistics(),dispatch)
	// }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals);
