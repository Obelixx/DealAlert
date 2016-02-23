var addDealViewModel = require("../../view-models/add-detail-view-model");
var navigation = require("../../utils/navigation");
var model = new addDealViewModel();
var cameraModule = require("camera");
var imageModule = require("ui/image");
var view = require('ui/core/view');
var Toast = require("nativescript-toast");
var dialogsModule = require("ui/dialogs");
var image;

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

	image = view.getViewById(page, "pictureTaken");
	image.src = "http://static1.squarespace.com/static/5317b571e4b01396b757268a/535ed32ee4b05fe61b34b363/535ed32ee4b05fe61b34b368/1398722779508/photo-placeholder.png";
	if (global.connectivity.getConnectionType() === connectivity.connectionType.none) {
		global.crash.play();
		Toast.makeText("No internet connection.").show();
	}
}

function addDeal() {
	console.log('clicked');
	model.addItem().then(function() {
			global.ting.play();
			Toast.makeText('New deal added').show();
			navigation.goToMainPage();
		},
		function(error) {
			global.crash.play();
			alert(error);
		});
}

function takePicture() {
	console.log("take picture");
	cameraModule.takePicture({
			width: 200,
			height: 200,
			keepAspectRatio: true
		})
		.then(function(picture) {
			image.imageSource = picture;
			model.picture = picture;
			global.ting.play();
		});
}

function cancel() {
	navigation.goToMainPage();
}

function onGoBackBtnTap() {
	navigation.goToMainPage();
}

exports.pageLoaded = pageLoaded;
exports.takePicture = takePicture;
exports.addDeal = addDeal;
exports.cancel = cancel;
exports.onGoBackBtnTap = onGoBackBtnTap;