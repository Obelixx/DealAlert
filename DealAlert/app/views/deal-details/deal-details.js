'use strict';

var navigation = require("../../utils/navigation");
var vmModule = require("../../view-models/deal-details-page-view-model");
var view = require("ui/core/view");
var progressModule = require("ui/progress");
var model = vmModule.detailModel;
var hotButton;
var coldButton;
var page;

function onNavigatedTo(args) {
	page = args.object;
	hotButton = view.getViewById(page,"hotBtn");
	coldButton = view.getViewById(page,"coldBtn");
	page.bindingContext = model;
	model.loadItem(args.context);
}


function onGoBackBtnTap() {
	navigation.goBack();
}

function onTapCold() {
	coldButton.animate({ opacity: 1 })
	    .then(function () { return coldButton.animate({ scale: { x: 1.3, y: 1.3 } }); })
	    .then(function () { return coldButton.animate({ scale: { x: 1, y: 1 } }); })
	    .then(function () {
	})
	    .catch(function (e) {
		console.log(e.message);
	});
	model.onTapCold();
}

function onTapHot() {
	hotButton.animate({ opacity: 1 })
	    .then(function () { return hotButton.animate({ scale: { x: 1.3, y: 1.3 } }); })
	    .then(function () { return hotButton.animate({ scale: { x: 1, y: 1 } }); })
	    .then(function () {
	})
	    .catch(function (e) {
		console.log(e.message);
	});
	model.onTapHot();
}

exports.onNavigatedTo = onNavigatedTo;
exports.onGoBackBtnTap = onGoBackBtnTap;
exports.onTapCold = onTapCold;
exports.onTapHot = onTapHot;