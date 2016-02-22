var Observable = require("data/observable").Observable;
var dataProvider = require("../dataProviders/everlive");
var config = require("../utils/config");

function User() {

    // You can add properties to observables on creation
    var viewModel = new Observable({
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

            dataProvider.Users.register(viewModel.userName, // username
                viewModel.password, null,
                function(data) { // success callback
                    viewModel.isLoading = false;
                    console.log(JSON.stringify(data));
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
                function() { // success callback
                    console.log("Logout successful!");
                    resolve();
                },
                function(error) { // error callback
                    console.log("Failed to logout: " + err.message);
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
                    Email: viewModel.email
                },
                function(data) { // success callback
                    console.log(JSON.stringify(data));
                    resolve();
                },
                function(error) { // error callback
                    console.log(JSON.stringify(error));
                    reject(JSON.stringify(error));
                });
        });
        return promise;
    };

    return viewModel;
}

module.exports = User;