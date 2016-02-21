'use strict';

var observable = require("data/observable");
var observableArrayModule = require('data/observable-array');
//var moment = require('moment');
var dataProvider = require("../dataProviders/everlive");

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
          for (var i = 0; i < data.result.length; i++) {
            var newItem = data.result[i];
            newItem.pictureUrl = "https://bs1.cdn.telerik.com/v1/xw7rpl6g52f4b0sj/" + data.result[i].Picture;
            //that.set("pictureUrl", newItem.pictureUrl);
            that.dealItems.push(newItem);
            console.log(JSON.stringify(newItem.Title) + " Added!");

          }
        },
        function(error) {
          console.log(JSON.stringify(error));
        });
  }
}

module.exports = {
    create: function() {
        return new Deals();
    }
}

// exports.Deals = Deals;
// exports.dealsModel = new Deals();