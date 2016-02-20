var vmModule = require("../viewModels/main-view-model");
var userViewModel = require("../viewModels/user-view-model");


function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;

    // Temporary code for testing if the login works. TODO - remove
    var user = new userViewModel({email:"testuser", password:"123"});
    user.login();
}
exports.pageLoaded = pageLoaded;
