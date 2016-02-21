var dialogsModule = require("ui/dialogs");
var navigation = require("../../utils/navigation");
var UserViewModel = require("../../view-models/user-view-model");

var user = new UserViewModel();

function pageLoaded(args) {
	user.isUserLoggedIn().then(function() {
		//TODO TOAST
			navigation.goToAddDealPage();
		},
		function(error) {
			alert(error);
		});

	var page = args.object;
	page.bindingContext = user;
}

function login() {
	user.login().then(function() {
		//TODO TOAST
			navigation.goToAddDealPage();
		},
		function(error) {
			alert(error);
		});
}

exports.pageLoaded = pageLoaded;
exports.login = login;
exports.register = navigation.goToRegisterPage;
exports.forgotPassword = navigation.goToPasswordPage;