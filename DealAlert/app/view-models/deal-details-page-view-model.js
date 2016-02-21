'use strict';

var observable = require("data/observable");
var dataProvider = require("../dataProviders/everlive");

var moment = require("moment");
var thisItem,that;

class DealDetailsModel extends observable.Observable {
    constructor() {
        super();

        this.set("Title", "");
        this.set("Description", "");
        this.set("ValidUntil", "");
        this.set("PromoPrice", "");
        this.set("RegularPrice", "");
        this.set("isLoading", false);
    }

    loadItem(item) {
        that = this;
        thisItem = item;
        that.set("isLoading", true);

        let pictureSrc = "https://api.everlive.com/v1/xw7rpl6g52f4b0sj/files/" + item.Picture + '/download';
        that.set("PictureSrc", pictureSrc);
        that.set("Title", item.Title);
        that.set("Description", item.Description);
        that.set("ValidUntil", moment(item.ValidUntil).format('MMM Do YY'));
        that.set("PromoPrice", item.PromoPrice);
        that.set("RegularPrice", item.RegularPrice);
        that.set("Discount", item.discount);
        that.set("HotRating", item.HotRating);
        that.set("ColdRating", item.ColdRating);
        that.set("isLoading", false);
    }

    onTapHot() {
        let newRate = that.get("HotRating");
        newRate +=1;
        //console.log(thisItem.id);
        dataProvider.data('Deals').updateSingle({
                Id: thisItem.id,
                'HotRating': newRate
            },
            function(data) {
                that.set("HotRating", newRate);
                alert(JSON.stringify(data));
            },
            function(error) {
                alert(JSON.stringify(error));
            });

    }

    onTapCold(args) {
    }
}

module.exports.detailModel = new DealDetailsModel();