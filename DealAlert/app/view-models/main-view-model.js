'use strict';

var observable = require("data/observable");
var observableArrayModule = require('data/observable-array');
//var moment = require('moment');
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

            newItem.pictureUrl = "https://api.everlive.com/v1/xw7rpl6g52f4b0sj/files/" + data.result[i].Picture + '/download';

            // calculations
            newItem.discount = Math.round(100 / newItem.RegularPrice * (newItem.RegularPrice - newItem.PromoPrice));
            if (isNaN(newItem.discount)) {
              newItem.discount = 0;
            }

            if (!isNaN(newItem.HotRating - newItem.ColdRating)) {
              newItem.HotColdRating = (newItem.HotRating - newItem.ColdRating) + "";

              if (newItem.HotColdRating > 0) {
                newItem.HotColdRating += '°  it is HOT offer';
              } else if (newItem.HotColdRating < 0) {
                newItem.HotColdRating += '°  it is COLD offer';
              } else {
                newItem.HotColdRating += '°';
              }
            }

            console.log(JSON.stringify(newItem.Title) + ' Added!');
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