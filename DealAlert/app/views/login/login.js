var dialogsModule = require("ui/dialogs");
var navigation = require("../../utils/navigation");
var UserViewModel = require("../../view-models/user-view-model");
var Toast = require("nativescript-toast");

var user = new UserViewModel();

function pageLoaded(args) {
	user.isUserLoggedIn().then(function() {
			navigation.goToMainPage();
		},
		function(error) {
			console.log(error);
		});

	var page = args.object;
	page.bindingContext = user;
}

function login() {
	user.login().then(function() {
			Toast.makeText('User signed in').show();
			navigation.goToMainPage();
		},
		function(error) {
			alert(error);
		});
}

exports.pageLoaded = pageLoaded;
exports.login = login;
exports.register = navigation.goToRegisterPage;
exports.forgotPassword = navigation.goToPasswordPage;