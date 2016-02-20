var observable = require("data/observable");
var everlive = require("~/bower_components/everlive/min/everlive.all.min.js");
var DealDetailsModel = (function(_super) {
    __extends(DealDetailsModel, _super);

    function DealDetailsModel() {
        _super.call(this);
        this.set("title", "title");
        this.set("description", "description");
    }
    DealDetailsModel.prototype.loadDataAction = function() {
        console.log("Load Data");
        var el = new Everlive({
            appId: 'xw7rpl6g52f4b0sj',
            scheme: 'https'
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0IjoiellKYW4zNlVmOE5hdFk2Sm9sU0M3M1V5NEhlSjZLUmJaY2lReU1HU3NpZnlYaWg5cnJ4OTNXYzVFYWRKMUpUUG9NMTdNSFY0anJSZG0yTlhsRXVhWWJqa2g4T240SkFsYTdoN0ZZdVpVbkxGNkxueUttT0JaeDJaQWZhQWY4bjJDY1dMWmRCdE1SVzhZZHlvSkJPQ1BzVE5DOXVtVzlVcjFmMjdySVdOOXQwYlFKRUFGM2J1VzVpY3dTSTZrZzl3WUFvRklCRXFIUFRiMmF1VG5XT21pb3A0Y3hOS3lFMWFTbDhHV21IdTE3bjJyNjVnNXhPTUlHZXVncG5xc3FTMyIsImV4cGlyZXMiOjE0NjExNTkyMjQsImlzc3VlciI6ImV2ZXJsaXZlIiwiaWF0IjoxNDU1OTc1MjI0fQ.ftpMn4su48ph_DsbkW_hUmKJkB3QucDtdInX5j2O-m0'
        });

        var deals = everlive.data('Places');

        deals.get(null,function (data){
            console.leg(JSON.stringify(data));
        },function(error){
            console.leg(err.message);
        }
        ));

    };
    return DealDetailsModel;
})(observable.Observable);

exports.dealDetailsViewModel = new DealDetailsModel();