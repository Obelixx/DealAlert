'use strict';

var vmModule = require("../../view-models/deal-details-page-view-model");
var model = vmModule.detailModel;

function onNavigatedTo(args) {
	var page = args.object;
	page.bindingContext = model;
	model.loadItem(args.context);
}

exports.onNavigatedTo = onNavigatedTo;