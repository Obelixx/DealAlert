'use strict';

var observable = require("data/observable");
var observableArrayModule = require('data/observable-array');
var dataProvider = require("../dataProviders/everlive");
var navigation = require("../utils/navigation");
var Everlive = require('../bower_components/everlive/min/everlive.all.min');

class Deals extends observable.Observable {
  constructor() {
    super();

    this.dealItems = new observableArrayModule.ObservableArray([]);
  }

  getDeals() {
    var data = dataProvider.data('Deals');
    var that = this;

    var expandExp = {"Commnets.DealId": {ReturnAs:'Comments'}};
    var query = new Everlive.Query();
    query.orderDesc('HotRating').expand(expandExp);
    data.get(query)
      .then(function(data) {
        console.log(JSON.stringify(data));
          var itemCount = data.result.length;
          for (var i = 0; i < itemCount; i++) {
            var newItem = data.result[i];

            // calculations
            newItem.discount = Math.round(100 / newItem.RegularPrice * (newItem.RegularPrice - newItem.PromoPrice));
            if (isNaN(newItem.discount)) {
              newItem.discount = 0;
            }

            if (!isNaN(newItem.HotRating - newItem.ColdRating)) {
              newItem.HotColdRating = (newItem.HotRating - newItem.ColdRating) + "";

              if (newItem.HotColdRating > 300) {
                newItem.HotColdRating += "° Freaking HOT";
              } else if (newItem.HotColdRating > 100) {
                newItem.HotColdRating += '° HOT';
              } else if (newItem.HotColdRating < 0) {
                newItem.HotColdRating += '° COLD';
              } else if (newItem.HotColdRating < -100) {
                newItem.HotColdRating += '° Stone COLD';
              } else {
                newItem.HotColdRating += '°';
              }
            }

            that.dealItems.push(newItem);
          }
        },
        function(error) {
          console.log(JSON.stringify(error));
        });
  }

  onItemTap(item) {
    navigation.goToDealDetailsPage(this.dealItems.getItem(item.index));
  }
}


module.exports.Deals = new Deals();