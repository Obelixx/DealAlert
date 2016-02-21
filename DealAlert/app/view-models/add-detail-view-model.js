// var Observable = require("data/observable").Observable;
// var dataProvider = require("../dataProviders/everlive");

// function NewDeal() {

//     // You can add properties to observables on creation
//     var viewModel = new Observable({
//         Title: "fuck",
//         Description: "",
//         Day: 0,
//         Month: 0,
//         Year: 0,
//         isLoading: false
//     });

//     viewModel.addItem = function() {
//         return new Promise(function(resolve, reject) {
//             viewModel.isLoading = true;

// // for(var x in viewModel){
// //     console.log(x);
// // }

//             console.log(viewModel.get("Title"));

//             var table = dataProvider.data('Deals');
//             table.create({
//                     'Title': 'TestTest',
//                     'Description': viewModel.Description,
//                     'ValidUntil': new Date(viewModel.Year, viewModel.Month, viewModel.Day)
//                 },
//                 function(data) {
//                     viewModel.isLoading = false;
//                     console.log("add-deail.js ------>" + JSON.stringify(data));
//                     resolve();
//                 },
//                 function(error) {
//                     viewModel.isLoading = false;
//                     console.log("add-deail.js ------>" + JSON.stringify(error));
//                     reject(error.message);
//                 });
//         });
//     };

//     return viewModel;
// }

// module.exports = NewDeal;


var viewModelBaseModule = require("./view-model-base");
var dataProvider = require("../dataProviders/everlive");

var AddDealViewModel = (function(_super) {
    __extends(AddDealViewModel, _super);

    function AddDealViewModel() {
        _super.call(this);
        this.title = "";
        this.description = "";
        this.isLoading = false;
    }

    Object.defineProperty(AddDealViewModel.prototype, "title", {
        get: function() {
            return this._title;
        },
        set: function(value) {
            if (this._title !== value) {
                this._title = value;
                this.notifyPropertyChange("title", value);
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(AddDealViewModel.prototype, "desciption", {
        get: function() {
            return this._password;
        },
        set: function(value) {
            if (this._description !== value) {
                this._description = value;
                this.notifyPropertyChange("desciption", value);
            }
        },
        enumerable: true,
        configurable: true
    });

    AddDealViewModel.prototype.addItem = function() {
        var that = this;
                    console.log("s" + this.title);

        return new Promise(function(resolve, reject) {
            that.isLoading = true;

            console.log(that.title);

            var table = dataProvider.data('Deals');
            table.create({
                    'Title': that.title
                },
                function(data) {
                    that.isLoading = false;
                    console.log("add-deail.js ------>" + JSON.stringify(data));
                    resolve();
                },
                function(error) {
                    that.isLoading = false;
                    console.log("add-deail.js ------>" + JSON.stringify(error));
                    reject(error.message);
                });
        });
    };

    return AddDealViewModel;

})(viewModelBaseModule.ViewModelBase);

exports.AddDealViewModel = AddDealViewModel;