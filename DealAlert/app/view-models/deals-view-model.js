'use strict';

var observable = require("data/observable");
var observableArrayModule = require('data/observable-array');
var moment = require('moment');
var dataProvider = require("../dataProviders/everlive");
var navigation = require("../utils/navigation");

class Deals extends observable.Observable {
  constructor() {
    super();

    this.dealItems = new observableArrayModule.ObservableArray([]);
  }

  getDeals() {
    var data = dataProvider.data('Deals');
    var that = this;

    data.get()
      .then(function(data) {
          var itemCount = data.result.length;
          for (var i = 0; i < itemCount; i++) {
            var newItem = data.result[i];

            newItem.pictureId = data.result[i].Picture;
            that.dealItems.push(newItem);
          }
        },
        function(error) {
          console.log(JSON.stringify(error));
        });
  }

  onItemTap(item) {
    console.log(item.index);
    navigation.goToDealDetailsPage(this.dealItems[item.index]);
  }
}

module.exports.Deals = new Deals();