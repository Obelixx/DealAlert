'use strict';

var observable = require("data/observable");
var dataProvider = require("../dataProviders/everlive");
var moment = require("moment");

class DealDetailsModel extends observable.Observable {
    constructor() {
        super();

        this.set("Title", "");
        this.set("Description", "");
        this.set("ValidUntil", "");
        this.set("PromoPrice", "");
        this.set("RegularPrice", "");
        this.set("isLoading", false);
        // this.loadDataAction();
    }

    // loadDataAction() {
    //     let that = this;
    //     let deals = dataProvider.data('Deals');
    //     that.set("isLoading", true);

    //     deals.get(null, function(data) {
    //         let pictureSrc = "https://api.everlive.com/v1/xw7rpl6g52f4b0sj/files/" + data.result[0].Picture +'/download';
    //         console.log(pictureSrc);
    //         that.set("PictureSrc", pictureSrc);
    //         that.set("Title", data.result[0].Title);
    //         that.set("Description", data.result[0].Description);
    //         that.set("ValidUntil", moment(data.result[0].ValidUntil).format('MMM Do YY'));
    //         that.set("PromoPrice", data.result[0].PromoPrice);
    //         that.set("RegularPrice", data.result[0].RegularPrice);
    //         that.set("isLoading", false);

    //     }, function(err) {
    //         console.log("error");
    //         // alert(err.message);
    //         that.set("isLoading", false);
    //     });
    // }

    loadItem(item) {
        let that = this;
        that.set("isLoading", true);

        let pictureSrc = "https://api.everlive.com/v1/xw7rpl6g52f4b0sj/files/" + item.Picture +'/download';
        console.log(pictureSrc);
        that.set("PictureSrc", pictureSrc);
        that.set("Title", item.Title);
        that.set("Description", item.Description);
        that.set("ValidUntil", moment(item.ValidUntil).format('MMM Do YY'));
        that.set("PromoPrice", item.PromoPrice);
        that.set("RegularPrice", item.RegularPrice);
        that.set("isLoading", false);

    }
}

module.exports.detailModel = new DealDetailsModel();