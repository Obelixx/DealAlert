var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		var navigationEntry = {
			moduleName: "views/login/login",
			clearHistory: true
		};
		frameModule.topmost().navigate(navigationEntry);
	},
	goToRegisterPage: function() {
		var navigationEntry = {
			moduleName: "views/register/register",
			backstackVisible: false
		};
		frameModule.topmost().navigate(navigationEntry);
	},
	goToPasswordPage: function() {
		frameModule.topmost().navigate("views/password/password");
	},
	goToMainPage: function() {
		var navigationEntry = {
			moduleName: "views/main/main",
			clearHistory: true
		};
		frameModule.topmost().navigate(navigationEntry);
	},
	goToAddDealPage: function() {
		var navigationEntry = {
			moduleName: "views/add-deal/add-deal",
			backstackVisible: false
		};
		frameModule.topmost().navigate(navigationEntry);
	},
	goToDealDetailsPage: function(item) {
		var navigationEntry = {
			moduleName: "views/deal-details/deal-details",
			context: item,
		};
		frameModule.topmost().navigate(navigationEntry);
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