var platformModule = require("platform");
var observableModule = require("data/observable");
var enumsModule = require("ui/enums");
var dialogsModule = require("ui/dialogs");
var connectivity = require("connectivity");

var ViewModelBase = (function (_super) {
    __extends(ViewModelBase, _super);
    function ViewModelBase() {
        _super.call(this);
        this.isLoading = false;
    }
    
    Object.defineProperty(ViewModelBase.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            if (this._isLoading != value) {
                this._isLoading = value;
                this.notifyPropertyChange("isLoading", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    
    ViewModelBase.prototype.beginLoading = function () {
        if (connectivity.getConnectionType() === connectivity.connectionType.none) {
            this.showError("No internet connection.");
            return false;
        }
        
        this.isLoading = true;
        return true;
    };
    
    ViewModelBase.prototype.endLoading = function () {
        this.isLoading = false;
    };
    
    ViewModelBase.prototype.showError = function (error) {
        dialogsModule.alert({ title: "Error", message: error, okButtonText: "Close" });
    };
    
    ViewModelBase.prototype.showInfo = function (message) {
        dialogsModule.alert({ title: "Info", message: message, okButtonText: "OK" });
    };
    
    return ViewModelBase;
})(observableModule.Observable);

exports.ViewModelBase = ViewModelBase;