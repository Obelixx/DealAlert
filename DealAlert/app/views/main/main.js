var MainViewModel = require("../../view-models/main-view-model");
var viewModule = require('ui/core/view');
var navigation = require("../../utils/navigation");
var UserViewModel = require("../../view-models/user-view-model");
var Toast = require("nativescript-toast");
var gestures = require("ui/gestures");

var model = MainViewModel.Deals;
var user = new UserViewModel();
var elementWithEvents

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

	elementWithEvents = viewModule.getViewById(page, "listViewElement");
	attachEvents(elementWithEvents);

	if (model.dealItems.length === 0) {
		model.getDeals();
	}
}

function onItemTap(args) {
	elementWithEvents.off(gestures.GestureTypes.swipe);
	model.onItemTap(args);
}

function onAddNavBtnTap() {
	elementWithEvents.off(gestures.GestureTypes.swipe);
	navigation.goToAddDealPage();
}

function onRefreshBtnTap() {
	Toast.makeText('Refreshing..').show();
	model.dealItems.splice(0, model.dealItems.length);
	model.getDeals();
}


function onLogoutBtnTap() {
	console.log('logout button clicked');
	user.logout().then(function() {
			Toast.makeText('User is logged out').show();
			elementWithEvents.off(gestures.GestureTypes.swipe);
			navigation.goToLoginPage();
		},
		function(error) {
			alert(error);
		});
}

function attachEvents(elementWithEvents) {
	elementWithEvents.on(gestures.GestureTypes.swipe, function(args) {
		//console.log(args.direction);
		if(args.direction == 2){
			elementWithEvents.off(gestures.GestureTypes.swipe);
			navigation.goToAddDealPage();
		}
		if(args.direction == 8){
			onRefreshBtnTap();
		}
	});
}

exports.pageLoaded = pageLoaded;
exports.onItemTap = onItemTap;
exports.onAddNavBtnTap = onAddNavBtnTap;
exports.onRefreshBtnTap = onRefreshBtnTap;
exports.onLogoutBtnTap = onLogoutBtnTap;