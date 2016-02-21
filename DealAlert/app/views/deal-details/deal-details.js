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

function onTapCold(){
	model.onTapCold();
}

function onTapHot(){
	model.onTapHot();
}

exports.onNavigatedTo = onNavigatedTo;
exports.onNavBtnTap = onNavBtnTap;
exports.onTapCold = onTapCold;
exports.onTapHot = onTapHot;
