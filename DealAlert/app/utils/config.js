var applicationSettingsModule = require("application-settings");

var configObject = {
	apiUrl: "https://api.everlive.com/v1/xw7rpl6g52f4b0sj/",
	invalidateToken: function() {
		this.token = "";
	}
};
Object.defineProperty(configObject, "token", {
	get: function() {
		return applicationSettingsModule.getString("token");
	},
	set: function(token) {
		return applicationSettingsModule.setString("token", token);
	}
});

module.exports = configObject;