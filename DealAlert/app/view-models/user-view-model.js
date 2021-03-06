var Observable = require("data/observable").Observable;
var dataProvider = require("../dataProviders/everlive");
var config = require("../utils/config");

function User() {

    var viewModel = new Observable({
        email: "",
        displayName: "",
        userName: "",
        password: "",
        isLoading: false
    });

    viewModel.login = function() {
        return new Promise(function(resolve, reject) {
            if (!viewModel.userName || !viewModel.password) {
                reject('Invalid input');
            } else {
                viewModel.isLoading = true;

                dataProvider.authentication.login(viewModel.get('userName'), viewModel.get('password'),
                    function(data) {
                        console.log(JSON.stringify(data));
                        viewModel.isLoading = false;
                        viewModel.userName = "";
                        viewModel.password = "";

                        resolve();
                    },
                    function(error) {
                        viewModel.isLoading = false;
                        reject(error.message);
                    });
            }
        });
    };

    viewModel.register = function() {
        var promise = new Promise(function(resolve, reject) {
            viewModel.isLoading = true;

            dataProvider.Users.register(
                viewModel.get('userName'),
                viewModel.get('password'), {
                    Email: viewModel.get('email'),
                    DisplayName: viewModel.get('displayName')
                },
                function(data) { // success callback
                    viewModel.isLoading = false;
                    console.log(JSON.stringify(data));

                    viewModel.set('email', '');
                    viewModel.set('displayName', '');

                    resolve();
                },
                function(error) { // error callback
                    console.log(JSON.stringify(error));
                    viewModel.isLoading = false;
                    reject(error.message);
                });
        });

        return promise;
    };

    viewModel.logout = function() {
        var promise = new Promise(function(resolve, reject) {
            dataProvider.authentication.logout(
                function() {
                    console.log('logout from user view model');
                    resolve();
                },
                function(error) {
                    console.log(error+'from user view model');
                    reject(error.message);
                });
        });
        return promise;
    };

    viewModel.isUserLoggedIn = function() {
        var promise = new Promise(function(resolve, reject) {
            dataProvider.users.currentUser(
                function(data) { // success callback
                    if (data.result) {
                        var username = data.result.Username;
                        console.log(username + " is logged in!");
                        resolve();
                    } else {
                        console.log("Missing access token. Please log in!");
                        reject("Missing access token. Please log in!");
                    }
                },
                function(error) { // error callback
                    console.log(error.message + " Please log in.");
                    reject(error.message + " Please log in.");
                });
        });
        return promise;
    };

    viewModel.resetPassword = function() {
        var promise = new Promise(function(resolve, reject) {
            dataProvider.Users.resetPassword({
                    Username: viewModel.get('userName')
                },
                function(data) { // success callback
                    resolve();
                },
                function(error) { // error callback
                    reject(error.message);
                });
        });
        return promise;
    };

    return viewModel;
}

module.exports = User;