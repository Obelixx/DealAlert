'use strict';

var observable = require("data/observable");
var observableArrayModule = require('data/observable-array');
var moment = require('moment');
var dataProvider = require("../dataProviders/everlive");

class Deals extends observable.Observable {
  constructor() {
    super();

    this.dealItems = new observableArrayModule.ObservableArray([]);
    this.dealDetailItem = new observable.Observable();
  }

  getDeals() {
    var data = dataProvider.data('Deals');
    var that = this;

    data.get()
      .then(function(data) {
          for (var i = 0; i < data.result.length; i++) {
            var newItem = data.result[i];
            newItem.pictureUrl = 'https://bs1.cdn.telerik.com/v1/xw7rpl6g52f4b0sj/'+data.result[i].Picture;
            that.dealItems.push(newItem);
          }
        },
        function(error) {
          console.log(JSON.stringify(error));
        });
  }
}

exports.Deals = Deals;
exports.dealsModel = new Deals();