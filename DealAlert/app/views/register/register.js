var dialogsModule = require("ui/dialogs");
var navigation = require("../../utils/navigation");
var UserViewModel = require("../../view-models/user-view-model");
var Toast = require("nativescript-toast");

var user = new UserViewModel();

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = user;
}

function register() {
	user.register()
		.then(function(resolve) {
				Toast.makeText('User ' + user.userName + ' registered').show();
				user.login().then(function(resolve) {
					global.ting.play();
					Toast.makeText('User is logged in').show();
				}, function(error) {
					global.crash.play();
					Toast.makeText(error).show();
				});
				navigation.goToMainPage();
			},
			function(error) {
				global.crash.play();
				Toast.makeText(error).show();
			});
}

exports.pageLoaded = pageLoaded;
exports.register = register;