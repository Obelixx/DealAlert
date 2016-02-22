'use strict';

var vmModule = require("../../view-models/main-view-model");
var viewModule = require('ui/core/view');
var model = vmModule.Deals;
var navigation = require("../../utils/navigation");

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

	if (model.dealItems.length === 0) {
		model.getDeals();
	}
}

function onItemTap(args) {
	model.onItemTap(args);
}

function onAddNavBtnTap() {
	navigation.goToAddDealPage();
}

function onRefreshBtnTap() {
	model.dealItems.splice(0, model.dealItems.length);
	model.getDeals();
}

exports.pageLoaded = pageLoaded;
exports.onItemTap = onItemTap;
exports.onAddNavBtnTap = onAddNavBtnTap;
exports.onRefreshBtnTap = onRefreshBtnTap;