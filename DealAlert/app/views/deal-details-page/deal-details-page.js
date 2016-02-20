var vmModule = require("../../view-models/deal-details-page-view-model");

function pageLoaded(args) {
	var page = args.object;
    page.bindingContext = vmModule.dealDetailsViewModel;
}
exports.pageLoaded = pageLoaded;