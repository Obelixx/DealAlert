var everlive = require("~/bower_components/everlive/min/everlive.all.min.js");
var vmModule = require("../../view-models/main-page-view-model");
function pageLoaded(args) {
	var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;