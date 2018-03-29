/**
 * Created by joey on 2017/7/7.
 */
'use strict';
// basic package
var electron = require('electron');
var path = require('path');
var fs = require('fs');
var shell = electron.shell;
var ipcRenderer = electron.ipcRenderer;

// add-on package which need in dependencies
var mysql = require('mysql');

String.prototype.format = function(args) {
    var result = this, reg = undefined;
    if (arguments.length > 0) {
        if (arguments.length === 1 && typeof (args) === "object") {
            for (var k in args) {
                if(args.hasOwnProperty(k) && args[k]!==undefined){
                    reg = new RegExp("({" + k + "})", "g");
                    result = result.replace(reg, args[k]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};
const LOCALE = {
    error_msg: 'error',
    error_msg_with_param_x: 'error {0}, info {1}',

    tips_offline: 'you are offline',
    tips_open_dir_failed: 'open dir failed',    
    tips_open_file_failed: 'open file failed',
    tips_save_file_failed: 'save file failed',
    tips_config_update: 'config update success',

    label_ok: 'OK',
    label_cancel: 'Cancel',
    label_to_config: 'Config',
};
const ERROR_CODE = {
    null_pointer_exception: 1000
}

var ngApp = angular.module('App', []).controller('AppCtrl', function ($scope, $http) {  
    $scope.loading = false;
    $scope.offline = true;
    $scope.toggle_maximize_btn = true;

    $scope.shared_object = electron.remote.getGlobal('sharedObject');
    $scope.mysql_connention = undefined;

    // ipc
    $scope.ipc = {
        close_main_window: function () {
            ipcRenderer.send('close-main-window');
        },
        maximize_main_window: function () {
            ipcRenderer.send('maximize-main-window');
            $scope.toggle_maximize_btn = !$scope.toggle_maximize_btn;
        },
        restore_main_window: function () {
            ipcRenderer.send('restore-main-window');
            $scope.toggle_maximize_btn = !$scope.toggle_maximize_btn;
        },
        minimize_main_window: function () {
            ipcRenderer.send('minimize-main-window');
        },
        open_directory_dialog: function (dir_key) {
            ipcRenderer.send('open-directory-dialog', dir_key);
        },
        open_file_dialog: function (file_key) {
            ipcRenderer.send('open-file-dialog', file_key);
        },
        save_file_dialog: function (opt) {
            ipcRenderer.send('save-file-dialog', opt);
        }
    }
    
    // config
    $scope.config = {
        data: {},
        modal: UIkit.modal('#config-modal'),
        get: function (callback) {
            if ($scope.offline){
                UIkit.notification(LOCALE.tips_offline);
                return;
            }
            $http.get($scope.shared_object.host + '/config/get')
                .then(function (response) {
                    if (response.result) {
                        $scope.config.data = response.config;
                        if(callback){
                            callback();
                        }
                    }else{
                        $scope.utils.alert(response.message);
                    }
                }).catch(function (error) {
                    $scope.utils.alert(error);
            });
        },
        save: function () {
            if ($scope.offline){
                UIkit.notification(LOCALE.tips_offline);
                return;
            }
            $http.post($scope.shared_object.host + '/config/save', $scope.config.data)
                .then(function (response) {
                    if(response.result){
                        UIkit.notification(LOCALE.tips_config_update, {status: 'success'});
                    }else{
                        $scope.utils.alert(response.message);
                    }
                }).catch(function (error) {
                    $scope.utils.alert(error);
            });
        },
        go_to: function (msg) {
            UIkit.modal.confirm(msg, {labels:{ok: LOCALE.label_to_config, cancel: LOCALE.label_cancel}}).then(function() {
                $scope.config.modal.show();
            }, function () {
                return;
            });
        }
    };

    // common utils
    $scope.utils = {
        alert: function (msg, format) {
            if(format){
                if(format === 'pre'){
                    UIkit.modal.alert('<pre>'+ msg + '</pre>', {props:{close: LOCALE.label_ok}});
                }else {
                    UIkit.modal.alert(msg, format);
                }
            }else{
                UIkit.modal.alert(msg, {props:{close: LOCALE.label_ok}});
            }
        },
        bind_ipc_event: function () {
            ipcRenderer.on('selected-directory', function (event, data) {
                if(!data){
                    $scope.utils.alert(LOCALE.tips_open_dir_failed);
                    return;
                }
                var dir = data.directory[0],
                    dir_key = data.args;
                $scope.utils.alert(dir);
            });
            ipcRenderer.on('selected-file', function (event, data) {
                if(!data){
                    $scope.utils.alert(LOCALE.tips_open_file_failed);
                    return;
                }
                var file_path = data.files[0],
                    file_key = data.args;
                $scope.utils.alert(file_path);
                
            });
            ipcRenderer.on('saved-file', function (event, data) {
                if(!data){
                    $scope.utils.alert(LOCALE.tips_save_file_failed);
                    return;
                }
                var filename = data.filename,
                    file_key = data.args;
                $scope.utils.alert(filename);
            });
        }
    }

    // init
    $scope.init = function () {
        $scope.utils.alert('Hello world, welcome to use electron!');
        
        $scope.utils.bind_ipc_event();
    };

    $scope.init();

});


