var dialogs = require("ui/dialogs");
var navigation = require("../../utils/navigation");
var UserViewModel = require("../../view-models/user-view-model");
var Toast = require("nativescript-toast");

var user = new UserViewModel();

function pageLoaded(args) {
	user.isUserLoggedIn().then(function() {
			navigation.goToMainPage();
		},
		function(error) {
			global.crash.play();
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
			global.crash.play();
			alert(error);
		});
}

function forgotPassword() {
	dialogs.prompt({
		title: "Enter username",
		message: "A reset password link will be sent to the username email!",
		okButtonText: "Save",
		cancelButtonText: "Cancel",
		defaultText: ""
	}).then(function(r) {
		if (r.text === "") {
			global.crash.play();
			Toast.makeText('No email was entered').show();
		} else if (r.result) {
			user.userName = r.text;
			user.resetPassword().then(function() {
					global.ting.play();
					Toast.makeText('Email with reset link was sent').show();
				},
				function(error) {
					global.crash.play();
					alert(error);
				});
		}
	});
}

exports.pageLoaded = pageLoaded;
exports.login = login;
exports.register = navigation.goToRegisterPage;
exports.forgotPassword = forgotPassword;