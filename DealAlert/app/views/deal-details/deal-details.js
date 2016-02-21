'use strict';

let vmModule = require("../../view-models/deal-details-page-view-model");

function onLoaded(args) {
	var page = args.object;
	page.bindingContext = vmModule.detailModel;
}

function onNavigatedTo(args) {
	var page = args.object;
	page.bindingContext = vmModule.detailModel;
	console.log(args.context);
	vmModule.detailModel.loadItem(args.context);
}


exports.onLoaded = onLoaded;