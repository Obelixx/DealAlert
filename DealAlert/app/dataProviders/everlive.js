var Everlive = require('../bower_components/everlive/min/everlive.all.min');
var navigationModule = require('../utils/navigation');
var dataProvider;

if (!global.dataProvider) {
	dataProvider = new Everlive({
		appId: 'xw7rpl6g52f4b0sj',
		scheme: 'https',
		authentication: {
			persist: true,
			onAuthenticationRequired: function() {
				alert('Your access token has expired. Please log in.');
				// Redirect to log-in page
				navigationModule.goToMainPage();
			}
		}
	});
	global.dataProvider = dataProvider;
}

module.exports = global.dataProvider;