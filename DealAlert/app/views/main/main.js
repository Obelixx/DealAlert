var MainViewModel = require("../../view-models/main-view-model");
var viewModule = require('ui/core/view');
var navigation = require("../../utils/navigation");
var UserViewModel = require("../../view-models/user-view-model");
var Toast = require("nativescript-toast");

var model = MainViewModel.Deals;
var user = new UserViewModel();

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

	if (model.dealItems.length === 0) {
		model.getDeals();
	}
}

function onItemTap(args) {
	model.onItemTap(args);
}

function onAddNavBtnTap() {
	navigation.goToAddDealPage();
}

function onRefreshBtnTap() {
	model.dealItems.splice(0, model.dealItems.length);
	model.getDeals();
}


function onLogoutBtnTap() {
	console.log('logout button clicked');
	user.logout().then(function() {
			Toast.makeText('User is logged out').show();
			navigation.goToLoginPage();
		},
		function(error) {
			alert(error);
		});
}

exports.pageLoaded = pageLoaded;
exports.onItemTap = onItemTap;
exports.onAddNavBtnTap = onAddNavBtnTap;
exports.onRefreshBtnTap = onRefreshBtnTap;
exports.onLogoutBtnTap = onLogoutBtnTap;