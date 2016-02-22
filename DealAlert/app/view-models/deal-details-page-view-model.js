'use strict';

var observable = require("data/observable");
var dataProvider = require("../dataProviders/everlive");
var Toast = require("nativescript-toast");

var moment = require("moment");
var that;

class DealDetailsModel extends observable.Observable {
    constructor() {
        super();

        this.set("Title", "");
        this.set("Description", "");
        this.set("ValidUntil", "");
        this.set("PictureUrl", "");
        this.set("PromoPrice", "");
        this.set("RegularPrice", "");
        this.set("isLoading", false);
        this.set("Discount", 0);

    }

    loadItem(item) {
        that = this;
        that.set("isLoading", true);

        // let pictureSrc = "https://api.everlive.com/v1/xw7rpl6g52f4b0sj/files/" + item.Picture + '/download';
        that.set("Id", item.Id);
        that.set("PictureSrc", item.PictureUrl);
        that.set("Title", item.Title);
        that.set("Description", item.Description);
        that.set("ValidUntil", moment(item.ValidUntil).format('MMM Do YY'));
        that.set("PromoPrice", item.PromoPrice);
        that.set("RegularPrice", item.RegularPrice);
        that.set("isLoading", false);
        that.set("Discount", item.discount);
        that.set("HotRating", item.HotRating);
        that.set("ColdRating", item.ColdRating);
        that.set("HotColdRating", item.HotColdRating);
    }

    onTapHot() {
        let newRate = that.get("HotRating");
        newRate += 10;
        dataProvider.data('Deals').updateSingle({
                Id: that.get("Id"),
                'HotRating': newRate
            },
            function(data) {
                that.set("HotRating", newRate);
                that.updateRatingString();
                //alert(JSON.stringify(data));
                Toast.makeText('Heat added').show();
            },
            function(error) {
                //alert(JSON.stringify(error));
            });

    }

    onTapCold(args) {
        let newRate = that.get("ColdRating");
        newRate += 10;
        dataProvider.data('Deals').updateSingle({
                Id: that.get("Id"),
                'ColdRating': newRate
            },
            function(data) {
                that.set("ColdRating", newRate);
                that.updateRatingString();
                Toast.makeText('Cooled down').show();
                //alert(JSON.stringify(data));
            },
            function(error) {
                //alert(JSON.stringify(error));
            });

    }

    updateRatingString() {
        if (!isNaN(that.get("HotRating") - that.get("ColdRating"))) {
            that.set("HotColdRating", (that.get("HotRating") - that.get("ColdRating")) + "");

            if (that.get("HotColdRating") > 300) {
                that.set("HotColdRating", (that.get("HotColdRating") + "° Freaking HOT"));
            } else if (that.get("HotColdRating") > 100) {
                that.set("HotColdRating", (that.get("HotColdRating") + "° HOT"));
            } else if (that.get("HotColdRating") < 0) {
                that.set("HotColdRating", (that.get("HotColdRating") + "° COLD"));
            } else if (that.get("HotColdRating") < -100) {
                that.set("HotColdRating", (that.get("HotColdRating") + "° Stone COLD"));
            } else {
                that.set("HotColdRating", (that.get("HotColdRating") + "°"));
            }
        }
    }
}


module.exports.detailModel = new DealDetailsModel();