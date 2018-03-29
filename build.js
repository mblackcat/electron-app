/**
 * Created by joey on 2017/7/6.
 */
var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './build',
    // Specify the existing folder where
    outputDirectory: './installers',
    // The name of the Author of the app (the name of your company)
    authors: 'joey',
    // The name of the executable of your built
    exe: './electron-app.exe'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(function () {
    console.log("The installers of your application were succesfully created !");
}, function (e) {
    console.log("Well, sometimes you are not so lucky: " + e.message);
});