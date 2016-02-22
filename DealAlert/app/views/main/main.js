'use strict';

var vmModule = require("../../view-models/main-view-model");
var view = require('ui/core/view');
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

exports.pageLoaded = pageLoaded;
exports.onItemTap = onItemTap;
exports.onAddNavBtnTap = onAddNavBtnTap;