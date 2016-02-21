'use strict';

var observable = require("data/observable");
var dataProvider = require("../dataProviders/everlive");
var moment = require("moment");

class DealDetailsModel extends observable.Observable {
    constructor() {
        super();


        // this.Title = "";
        // this.Description = "";
        // this.ValidUntil = "";
        // this.PictureUrl = "";
        // this.loadDataAction();
        
        this.set("Title", "TITLE");
        this.set("Description", "DESCRIPTION");
        this.set("ValidUntil", "validUntil");
        this.set("PromoPrice", "promoPrice");
        this.set("RegularPrice", "regularPrice");
                this.loadDataAction();
    }

    loadDataAction() {
        let that = this;
        let deals = dataProvider.data('Deals');

        deals.get(null, function(data) {
            // that.Title = data.result[0].Title;
            // that.Description = data.result[0].Description;
            // that.ValidUntil = moment(data.result[0].ValidUntil).format('MMM Do YY');
            // that.PictureUrl = "https://bs1.cdn.telerik.com/v1/xw7rpl6g52f4b0sj/" + data.result[0].Picture;

            let pictureSrc = "https://bs1.cdn.telerik.com/v1/xw7rpl6g52f4b0sj/" + data.result[0].Picture;
            console.log(pictureSrc);
            that.set("PictureSrc", pictureSrc);
            that.set("Title", data.result[0].Title);
            that.set("Description", data.result[0].Description);
            that.set("ValidUntil", moment(data.result[0].ValidUntil).format('MMM Do YY'));
            that.set("PromoPrice", data.result[0].PromoPrice);
            that.set("RegularPrice", data.result[0].RegularPrice);

        }, function(err) {
            console.log("error");
            // alert(err.message);
        });
    }
}

module.exports.detailModel = new DealDetailsModel();

//     create: function() {
//         return new DealDetailsModel();
//     }
// };