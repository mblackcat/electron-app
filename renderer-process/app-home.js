'use strict'

const electron = require('electron')
const angular = require('angular')
const UIkit = require('uikit')

let app = angular.module('Home', [])

app.controller('HomeCtrl', function ($scope, $http, $timeout) {
  $scope.user = {}
  $scope.shared_object = electron.remote.getGlobal('sharedObject')

  $scope.init = function () {
    // do some init
  }

  // init
  $scope.init()
})
