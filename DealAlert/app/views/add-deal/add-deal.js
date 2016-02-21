'use strict';

var addDealViewModel = require("../../view-models/add-detail-view-model");
var navigation = require("../../utils/navigation");
var model = new addDealViewModel();

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;
}

function addDeal(){
	console.log('clicked');
	model.addItem().then(function() {
		//TODO TOAST
			navigation.goToMainPage();
		},
		function(error) {
			console.log(error);
		});
}


exports.pageLoaded = pageLoaded;
exports.addDeal = addDeal;