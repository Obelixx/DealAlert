'use strict';

let vmModule = require("../../view-models/deal-details-page-view-model");
var model = vmModule.detailModel;

// function onLoaded(args) {
// 	var page = args.object;
// 	page.bindingContext = vmModule.detailModel;
// }

function onNavigatedTo(args) {
	var page = args.object;
	page.bindingContext = model;
	console.log(args.context);
	model.loadItem(args.context);
}

exports.onNavigatedTo = onNavigatedTo;