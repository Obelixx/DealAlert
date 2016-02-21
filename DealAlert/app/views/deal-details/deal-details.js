'use strict';

var navigation = require("../../utils/navigation");
var vmModule = require("../../view-models/deal-details-page-view-model");
var model = vmModule.detailModel;

function onNavigatedTo(args) {
	var page = args.object;
	page.bindingContext = model;
	model.loadItem(args.context);
}

function onNavBtnTap(){
	navigation.goBack();
}

exports.onNavigatedTo = onNavigatedTo;
exports.onNavBtnTap = onNavBtnTap;