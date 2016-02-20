var dialogsModule = require("ui/dialogs");
var navigation = require("../../utils/navigation");
var UserViewModel = require("../../viewModels/user-view-model");

var user = new UserViewModel();
var email;
var password;
var signUpButton;

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = user;

	email = page.getViewById("email");
	password = page.getViewById("password");
	signUpButton = page.getViewById("sign-up-button");
}

function register() {
	// disableForm();
	console.log(user.email);
	console.log(user.password);
	user.register()
		.then(function(resolve) {
			//TODO: Add toast that the user is successfully logged in. 
			console.log('navigatin to main page');
				navigation.goToMainPage();
			},
			function(error) {
			//TODO: Add toast that the user is not logged in
				console.log(error);
			});
}

exports.pageLoaded = pageLoaded;
exports.register = register;