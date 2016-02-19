// var observable = require("data/observable");
// var HelloWorldModel = (function (_super) {
//     __extends(HelloWorldModel, _super);
//     function HelloWorldModel() {
//         _super.call(this);
//         this.counter = 42;
//         this.set("message", this.counter + " taps left");
//     }
//     HelloWorldModel.prototype.tapAction = function () {
//         this.counter--;
//         if (this.counter <= 0) {
//             this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
//         }
//         else {
//             this.set("message", this.counter + " taps left");
//         }
//     };
//     return HelloWorldModel;
// })(observable.Observable);
// exports.HelloWorldModel = HelloWorldModel;
// exports.mainViewModel = new HelloWorldModel();

var observable = require("data/observable");
var everlive = require("~/bower_components/everlive/min/everlive.all.min.js");
var DealDetailsModel = (function (_super){
	__extends(DealDetailsModel, _super);
	function DealDetailsModel(){
		_super.call(this);
		this.set("title", "title");
		this.set("description", "description");
	}
	DealDetailsModel.prototype.loadDataAction = function () {
        var el = new Everlive({
        	appId: 'xw7rpl6g52f4b0sj',
        	scheme: 'https'
        });
        el.authentication.login('user',
        	'mat123')
        .then(function (data) {
        	alert(JSON.stringify(data));
    	},
 	    function(error) {
        	alert(JSON.stringify(error));
    	});
    };
	return DealDetailsModel;
})(observable.Observable);

exports.dealDetailsViewModel = new DealDetailsModel();