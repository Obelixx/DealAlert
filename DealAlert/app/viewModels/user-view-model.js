// var config = require("../../shared/config");
var Observable = require("data/observable").Observable;
// var validator = require("email-validator");
var dataProvider = require("../dataProviders/everlive");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        userName: info.userName || "test",
        email: info.email || "testuser",
        password: info.password || "123",
        displayName: info.displayName || "Test user",
    });

    viewModel.login = function() {
        var promise = new Promise(function(resolve, reject) {
            dataProvider.authentication.login(viewModel.email, // username
                viewModel.password,
                function(data) {
                    console.log(JSON.stringify(data));
                    resolve();
                },
                function(error) {
                    console.log(JSON.stringify(error));
                    reject(error.message);
                });
        });

        return promise;
    };

    viewModel.register = function() {
        var promise = new Promise(function(resolve, reject) {
            dataProvider.Users.register(viewModel.userName, // username
                viewModel.password, null,
                function(data) { // success callback
                    console.log(JSON.stringify(data));
                    resolve();
                },
                function(error) { // error callback
                    console.log(JSON.stringify(error));
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
        console.log('entering isUserLoggedIn');
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