'use strict';

var navigation = require("../../utils/navigation");
var vmModule = require("../../view-models/deal-details-page-view-model");
var view = require("ui/core/view");
var progressModule = require("ui/progress");
var model = vmModule.detailModel;

function onNavigatedTo(args) {
	var page = args.object;
	page.bindingContext = model;
	model.loadItem(args.context);
}

function onGoBackBtnTap(){
	navigation.goBack();
}

function onTapCold(){
	model.onTapCold();
}

function onTapHot(){
	model.onTapHot();
}

exports.onNavigatedTo = onNavigatedTo;
exports.onGoBackBtnTap = onGoBackBtnTap;
exports.onTapCold = onTapCold;
exports.onTapHot = onTapHot;