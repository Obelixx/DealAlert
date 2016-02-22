'use strict';

var navigation = require("../../utils/navigation");
var UserViewModel = require("../../view-models/user-view-model");
var view = require("ui/core/view");
var activityIndicatorModule = require("ui/activity-indicator");
var Toast = require("nativescript-toast");

var user = new UserViewModel();

function pageLoaded(args) {
	var page = args.object;

	var indicator = new activityIndicatorModule.ActivityIndicator();
	indicator.width = 30;
	indicator.height = 30;
	// Bind the busy property of the indicator to the isLoading property of the image
	indicator.bind({
		sourceProperty: "isLoading",
		targetProperty: "busy"
	}, isUserLoggedIn());
}

function isUserLoggedIn() {
	user.isUserLoggedIn().then(function() {
			Toast.makeText('User is logged in').show();
			navigation.goToMainPage();
		},
		function(error) {
			Toast.makeText('Please sign in!').show();
			navigation.goToLoginPage();
		});
}

exports.pageLoaded = pageLoaded;