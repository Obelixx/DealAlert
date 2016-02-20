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
        dataProvider.authentication.login(viewModel.email, // username
                viewModel.password) // password
            .then(function(data) { // success callback
                console.log(JSON.stringify(data));
            }, function(error) { // error callback
                console.log(JSON.stringify(error));
            });
    };

    viewModel.register = function() {
        dataProvider.authentication.register(viewModel.userName, // username
                viewModel.password, {
                    Email: viewModel.email,
                    DisplayName: viewModel.displayName
                }) // password
            .then(function(data) { // success callback
                console.log(JSON.stringify(data));
            }, function(error) { // error callback
                console.log(JSON.stringify(error));
            });
    };

    viewModel.logout = function() {
        dataProvider.authentication.logout()
            .then(function() { // success callback
                console.log("Logout successful!");
            }, function(error) { // error callback
                console.log("Failed to logout: " + err.message);
            });
    };

    viewModel.isUserLoggedIn = function() {
        dataProvider.Users.currentUser()
            .then(function(data) { // success callback
                if (data.result) {
                    var username = data.result.Username;
                    console.log(username + " is logged in!");
                } else {
                    alert("Missing access token. Please log in!");
                }
            }, function(error) { // error callback
                console.log(err.message + " Please log in.");
            });
    };

    viewModel.resetPassword = function() {
        dataProvider.Users.resetPassword({
                Email: viewModel.email
            })
            .then(function(data) { // success callback
                console.log(JSON.stringify(data));
            }, function(error) { // error callback
                console.log(JSON.stringify(error));
            });
    };

    return viewModel;
}

module.exports = User;