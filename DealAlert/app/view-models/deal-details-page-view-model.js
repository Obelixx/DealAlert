'use strict';

var Observable = require("data/observable").Observable;
var dataProvider = require("../dataProviders/everlive");
//var moment = require("../../node_modules/moment/min/moment.min");

class DealDetailsModel extends Observable {
    constructor() {
        super();
        this.set("title", "TITLE");
        this.set("description", "DESCRIPTION");
        this.set("validUntil", "validUntil");
        this.set("promoPrice", "promoPrice");
        this.set("regularPrice", "regularPrice");
    }

    loadDataAction() {
        let that = this;
        let deals = dataProvider.data('Deals');

        deals.get(null, function(data) {
            console.log(JSON.stringify(data.result[0]));
            console.log(dataProvider.appId);

            let pictureSrc = "https://bs1.cdn.telerik.com/v1/xw7rpl6g52f4b0sj/" 
                            + data.result[0].Picture;
            that.set("pictureSrc", pictureSrc);
            that.set("title", data.result[0].Title);
            that.set("description", data.result[0].Description);
            that.set("validUntil", data.result[0].ValidUntil);
            that.set("promoPrice",  data.result[0].PromoPrice);
            that.set("regularPrice",  data.result[0].RegularPrice);

        }, function(err) {
            console.log("error");
            alert(err.message);
        });
    }
}

module.exports = {
    create: function() {
        return new DealDetailsModel();
    }
}