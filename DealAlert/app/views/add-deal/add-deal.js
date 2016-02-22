'use strict';

var addDealViewModel = require("../../view-models/add-detail-view-model");
var navigation = require("../../utils/navigation");
var model = new addDealViewModel();
var cameraModule = require("camera");
var imageModule = require("ui/image");
var view = require('ui/core/view');
var image;

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;
	image = view.getViewById(page, "pictureTaken");
	image.src = "http://static1.squarespace.com/static/5317b571e4b01396b757268a/535ed32ee4b05fe61b34b363/535ed32ee4b05fe61b34b368/1398722779508/photo-placeholder.png";
}

function addDeal() {
	console.log('clicked');
	model.addItem().then(function() {
			//TODO TOAST
			navigation.goToMainPage();
		},
		function(error) {
			console.log(error);
		});
}

function takePicture() {
	cameraModule.takePicture({
			width: 200,
			height: 200,
			keepAspectRatio: true
		})
		.then(function(picture) {
			image.imageSource = picture;
			model.picture = picture;
		});
}

function cancel() {
	navigation.goToMainPage();
}

exports.pageLoaded = pageLoaded;
exports.takePicture = takePicture;
exports.addDeal = addDeal;
exports.cancel = cancel;