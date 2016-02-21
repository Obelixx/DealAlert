var application = require("application");
var UserViewModel = require("./view-models/user-view-model");
application.mainModule = "./views/main/main";

var user = new UserViewModel();

application.on(application.launchEvent, function(args) {
	if (args.android) {
		user.isUserLoggedIn().then(function() {
				console.log('User is logged-in');
			},
			function(error) {
				navigation.goToLoginPage();
			});
		
		// For Android applications, args.android is an android.content.Intent class.
		console.log("Launched Android application with the following intent: " + args.android + ".");
	} else if (args.ios !== undefined) {
		// For iOS applications, args.ios is NSDictionary (launchOptions).
		console.log("Launched iOS application with options: " + args.ios);
	}
});

// application.mainModule = "./views/login/login";
// application.mainModule = "./views/main/main";
application.cssFile = "./app.css";
application.start();