'use strict';

var vmModule = require("../../view-models/deals-view-model");
var view = require('ui/core/view');
var borderModule = require("ui/border");

console.log(vmModule);

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = vmModule.Deals;

	if (vmModule.Deals.dealItems.length === 0) {
		vmModule.Deals.getDeals();
	}
}

function onItemTap(args) {
    vmModule.Deals.onItemTap();
}

exports.pageLoaded = pageLoaded;
exports.onItemTap = onItemTap;