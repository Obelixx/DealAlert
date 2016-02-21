'use strict';

var vmModule = require("../../view-models/deals-view-model").create();
var view = require('ui/core/view');
var borderModule = require("ui/border");

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = vmModule;

	if (vmModule.dealItems.length == 0) {
		vmModule.getDeals();
	}
}


exports.pageLoaded = pageLoaded;