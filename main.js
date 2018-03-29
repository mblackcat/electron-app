const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const Tray = electron.Tray;
const Menu = electron.Menu;
const session = electron.session;

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

const path = require('path');
const url = require('url');
const mysql = require('mysql');
const exec = require('child_process').exec;
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';

const BrowserWindow = electron.BrowserWindow;
const DEBUG = true;

var mainWindow;
app.on('ready', function () {
    handleMainWindow();
});

global.sharedObject = {
    DEBUG: DEBUG,
    host: DEBUG ? 'http://127.0.0.1:8000' : 'http://127.0.0.1',
    login: false,
    csrftoken: undefined,
    sessionid: undefined,
    mysql_config:{
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'electron'
    },    
    TMP_DIR: path.join(__dirname, 'client', 'tmp'),
    BASE_DIR: __dirname
};

const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

ipcMain.on('close-main-window', function () {
    app.quit();
});
ipcMain.on('maximize-main-window', function () {
    mainWindow.maximize();
});
ipcMain.on('restore-main-window', function () {
    mainWindow.restore();
});
ipcMain.on('minimize-main-window', function () {
    mainWindow.minimize();
});

ipcMain.on('open-directory-dialog', function (event, args) {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, function (directory) {
        if (directory) {
            event.sender.send('selected-directory', {directory: directory, args:args});
        }
    })
});
ipcMain.on('open-file-dialog', function (event, args) {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, function (files) {
        if (files) {
            event.sender.send('selected-file', {files: files, args:args});
        }
    })
});
ipcMain.on('save-file-dialog', function (event, args) {
    dialog.showSaveDialog(args?args:{}, function (filename) {
        if (filename) {
            event.sender.send('saved-file', {filename: filename, args:args});
        }
    })
});
ipcMain.on('get-mysql-data', function (event, args) {
    var connection = mysql.createConnection(global.sharedObject.mysql_config);
    connection.connect(function (error) {
        if (error) {
            connection.end();
            console.error(error);
            event.returnValue = error;
        } else {
            if (!args) {
                connection.end();
                event.returnValue = 'no query exec';
            } else {
                connection.query(args, function (error, data) {
                    if (error) {
                        console.error(error);
                        event.returnValue = error;
                    } else {
                        event.returnValue = data;
                    }
                    connection.end();
                })
            }
        }
    });
});
ipcMain.on('exec', function (event, args) {
    if(!args){
        event.sender.send('no command exec');
    }else{
        exec(args, { encoding: binaryEncoding }, function(error, std_out, std_err){
            std_out = iconv.decode(new Buffer(std_out, binaryEncoding), encoding);
            std_err = iconv.decode(new Buffer(std_err, binaryEncoding),encoding);
            if(error){
                console.error(error, std_err);
                event.returnValue = std_err;
            }else {
                event.returnValue = std_out;
            }
        });
    }
});
ipcMain.on('exec-with-exit-code', function (event, args) {
    if(!args){
        event.sender.send('no command exec');
    }else{
        exec(args, { encoding: binaryEncoding }, function(error, std_out, std_err){
            iconv.decode(new Buffer(std_out, binaryEncoding), encoding), iconv.decode(new Buffer(std_err, binaryEncoding), encoding);
            if(error){
                console.error(error, std_err);
            }else {
                console.log(std_out);
            }
        }).on('exit', function (code) {
            event.returnValue = code;
        });
    }
});

function handleMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 640,
        minHeight: 480,
        title: 'electron app',
        frame: false
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'client', 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.on('close', function () {
        mainWindow = null;
    }, false);

    if(DEBUG){
        mainWindow.openDevTools();
    }

}

function handleGlobalShortcut() {
    globalShortcut.register('CommandOrControl+Alt+R', function () {
        if(mainWindow){
            mainWindow.show();
        }
    })
}

function handleTray() {
    var appIcon = new Tray(path.join(__dirname, 'client', 'static', 'images', 'favicon.ico'));
    const contextMenu = Menu.buildFromTemplate([{
        label: 'electron app',
        click: function() {
            if(mainWindow){
                mainWindow.show();
            }
        }
    }, {
        label: 'exit',
        click: function() {
            if(mainWindow){
                mainWindow = null;
            }
        }
    }]);
    appIcon.setToolTip('electron app');
    appIcon.setContextMenu(contextMenu);
    appIcon.on('click', function () {
        if(searchBarWindow){
            searchBarWindow.show();
        }
    });
}

function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        var spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {
        }

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
}