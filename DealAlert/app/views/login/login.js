var dialogsModule = require("ui/dialogs");
// var actionBarUtil = require("../../shared/utils/action-bar-util");
// var formUtil = require("../../shared/utils/form-util");
var navigation = require("../../utils/navigation");
var UserViewModel = require("../../viewModels/user-view-model");

var user = new UserViewModel({
	email: "testuser",
	password: "123",
	authenticating: false
});

var email;
var password;
var signInButton;

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = user;

	email = page.getViewById("email");
	password = page.getViewById("password");
	signInButton = page.getViewById("sign-in-button");
	// formUtil.hideKeyboardOnBlur(page, [email, password]);

	// actionBarUtil.styleActionBar();

	// Prevent the first textfield from receiving focus on Android
	// See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
	// if (page.android) {
	// 	var layout = page.getViewById("layout").android;
	// 	layout.setFocusableInTouchMode(true);
	// 	layout.setFocusable(true);
	// 	email.android.clearFocus();
	// }
}

function focusPassword() {
	password.focus();
}

function disableForm() {
	email.isEnabled = false;
	password.isEnabled = false;
	signInButton.isEnabled = false;
	user.set("authenticating", true);
}

function enableForm() {
	email.isEnabled = true;
	password.isEnabled = true;
	signInButton.isEnabled = true;
	user.set("authenticating", false);
}

function login() {
	// disableForm();
	user.login()
		.then(function(resolve) {
			//TODO: Add toast that the user is successfully logged in. 
			console.log('navigatin to main page');
				navigation.goToDealDetailsPage();
			},
			function(error) {
			//TODO: Add toast that the user is not logged in
				console.log(error);
			});
}

exports.loaded = pageLoaded;
exports.focusPassword = focusPassword;
exports.signIn = login;
exports.register = navigation.goToRegisterPage;
exports.forgotPassword = navigation.goToPasswordPage;