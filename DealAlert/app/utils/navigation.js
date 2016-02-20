var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		frameModule.topmost().navigate("views/login/login");
	},
	goToRegisterPage: function() {
		frameModule.topmost().navigate("views/register/register");
	},
	goToPasswordPage: function() {
		frameModule.topmost().navigate("views/password/password");
	},	
	goToMainPage: function() {
		frameModule.topmost().navigate("views/main/main");
	},
	goToListPage: function() {
		frameModule.topmost().navigate({
			moduleName: "views/list/list",
			// Workaround for https://github.com/NativeScript/NativeScript/issues/1569
			// clearHistory: true
		});
	},
	goBack: function() {
		frameModule.topmost().goBack();
	}
};