// var vmModule = require("../viewModels/main-view-model");
var userViewModel1 = require("../../viewModels/user-view-model");

var user = new userViewModel1();

function pageLoaded(args) {
	var page = args.object;
	// page.bindingContext = vmModule.mainViewModel;

	// Temporary code for testing if the login works. TODO - remove
	// var user = new userViewModel({email:"testuser", password:"123"});
	user.isUserLoggedIn()
		.then(function(resolve) {
				//TODO: Add toast that the user is successfully logged in. 
				console.log("super");
			},
			function(error) {
				//TODO: Add toast that the user is not logged in
				console.log(error);
			});

}

exports.pageLoaded = pageLoaded;