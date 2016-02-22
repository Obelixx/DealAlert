'use strict';

var navigation = require("../../utils/navigation");
var vmModule = require("../../view-models/deal-details-page-view-model");
var view = require("ui/core/view");
var progressModule = require("ui/progress");
// var dockModule = require("ui/layouts/dock-layout");
// var stackModule = require("ui/layouts/stack-layout");
var model = vmModule.detailModel;
var hotButton;
var coldButton;
var page;
var imageElement;

function onNavigatedTo(args) {
	page = args.object;
	hotButton = view.getViewById(page,"hotBtn");
	coldButton = view.getViewById(page,"coldBtn");
	// dock = dockModule.getViewById(page,"dock");
	// stack = stackModule.getViewById(page,"stack");
	imageElement = view.getViewById(page,"imageElement");
	page.bindingContext = model;
	model.loadItem(args.context);
	attachEvents(imageElement);
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

function attachEvents(element) {
	var initial = element.height;
	element.on("doubleTap", function(args) {
		if(element.height <= initial){
			element.width *=1.6;
			element.height *=1.6;
		}else{
			element.width /=1.6;
			element.height /=1.6;
		}
	});
}

function addComment(){
	console.log('Add comment clicked');
}

exports.onNavigatedTo = onNavigatedTo;
exports.onGoBackBtnTap = onGoBackBtnTap;
exports.onTapCold = onTapCold;
exports.onTapHot = onTapHot;
exports.addComment = addComment;