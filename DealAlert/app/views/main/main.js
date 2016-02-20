'use strict';

var vmModule = require("../../viewModels/deal-view-model");
var view = require('ui/core/view');
var page;

function pageLoaded(args) {
	page = args.object;
	page.bindingContext = vmModule.dealsModel;

	if (vmModule.dealsModel.dealItems.length === 0) {
		vmModule.dealsModel.getDeals();
	}
}


exports.pageLoaded = pageLoaded;