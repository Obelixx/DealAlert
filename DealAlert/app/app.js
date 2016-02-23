var application = require("application");
var sound = require("nativescript-sound");
global.engine = sound.create("~/res/sounds/Engine.mp3");
global.crash = sound.create("~/res/sounds/Crash.mp3");
global.short = sound.create("~/res/sounds/Short.mp3");
global.ting = sound.create("~/res/sounds/Ting.mp3");
global.connectivity = require("connectivity");
application.mainModule = "./views/first/first";

// application.mainModule = "./views/login/login";
// application.mainModule = "./views/main/main";
application.cssFile = "./app.css";
application.start();