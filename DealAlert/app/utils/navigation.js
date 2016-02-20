var frameModule = require("ui/frame");

function navigate(navigationEntry) {
    var topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
}

function goBack() {
    var topmost = frameModule.topmost();
    topmost.goBack();
}

exports.navigate = navigate;
exports.goBack = goBack;