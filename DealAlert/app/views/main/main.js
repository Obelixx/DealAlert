'use strict';

var vmModule = require("../../view-models/deals-view-model");
var view = require('ui/core/view');
var borderModule = require("ui/border");
var vmModelDeals = vmModule.Deals;

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

	if (model.dealItems.length === 0) {
		model.getDeals();
	}
}


function onItemTap(args) {
    vmModelDeals.onItemTap(args);
}

exports.pageLoaded = pageLoaded;
exports.onItemTap = onItemTap;