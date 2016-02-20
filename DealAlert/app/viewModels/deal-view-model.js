'use strict';

var observable = require("data/observable");
var observableArrayModule = require('data/observable-array');
var moment = require('moment');
var dataProvider = require("../dataProviders/everlive");

class Deals extends observable.Observable {
  constructor() {
    super();

    this.dealItems = new observableArrayModule.ObservableArray([]);
  }

  getDeals() {
    var data = dataProvider.data('Deals');
    data.get()
      .then(function(data) {
          console.log(data.result);
          this.dataItems = data.result;
        },
        function(error) {
          console.log(JSON.stringify(error));
        });
  }
}

exports.Deals = Deals;
exports.dealsModel = new Deals();