'use strict';

var navigation = require("../../utils/navigation");
var UserViewModel = require("../../view-models/user-view-model");
var view = require("ui/core/view");

var user = new UserViewModel();

function pageLoaded(args) {
	var page = args.object;
	var isLoading = view.getViewById(page, "activityIndicator");
	isLoading.busy = true;

	user.isUserLoggedIn().then(function() {
			navigation.goToMainPage();
		},
		function(error) {
			navigation.goToLoginPage();
		});
}

exports.pageLoaded = pageLoaded;