'use strict';

let vmModule = require("../../view-models/deal-details-page-view-model");

function onLoaded(args) {
	var page = args.object;
    page.bindingContext = vmModule.create();
}

module.exports = {
	onLoaded
}