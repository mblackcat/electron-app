'use strict'

const { ipcRenderer, shell } = require('electron')
const angular = require('angular')
const $ = require('jquery')
const UIkit = require('uikit')
const Icons = require('uikit/dist/js/uikit-icons')
const MyClass = require('./common/my-class.js')

// loads the Icon plugin
UIkit.use(Icons)

let app = angular.module('Demo', [])

app.controller('DemoCtrl', function ($scope, $http, $sce, $timeout) {
  $scope.user_info = undefined
  $scope.user_config = undefined

  $scope.cur_feature = undefined
  $scope.new_feature_list = []
  $scope.cur_item = undefined
  $scope.new_item_list = []
  $scope.search_keyword = ''
  $scope.main_data_loading = false

  // modal
  $scope.global_tips_modal = UIkit.modal('#global-tips-modal', { stack: true })
  $scope.config_modal = UIkit.modal('#config-modal', { stack: true })
  // switcher
  $scope.config_switcher = UIkit.switcher('#config-switcher')

  $scope.init = function () {
    let lstPms = []
    lstPms.push($scope.get_user_info())
    lstPms.push($scope.get_user_config())
    lstPms.push($scope.get_features())
  }

  // get data from server
  $scope.get_user_info = function () {
    // // test data
    $scope.user_info = {
      username: 'username',
      email: 'username@com'
    }
    // return $http
    //   .get($scope.shared_object.host + '/api/get_user_info')
    //   .then(function (response) {
    //     let data = response.data
    //     if (data.result) {
    //       $scope.user_info = data.user_info
    //     } else {
    //       console.log(data.message)
    //     }
    //   })
    //   .catch(function (error) {
    //     $scope.alert(error)
    //   })
  }
  $scope.get_user_config = function () {
    // // test data
    $scope.user_config = {
      key1: 'value',
      key2: true
    }
    // return $http
    //   .get($scope.shared_object.host + '/api/get_user_config')
    //   .then((response) => {
    //     let data = response.data
    //     if (data.result) {
    //       $scope.user_config = data.user_config
    //     }
    //   })
    //   .catch((error) => {
    //     $scope.alert(error)
    //   })
  }
  $scope.get_features = function () {
    // // test data
    $scope.features = [
      { id: 1, name: 'F1', disabled: false },
      { id: 2, name: 'F2', disabled: false },
      { id: 3, name: 'F3', disabled: true }
    ]
    // return $http
    //   .get($scope.shared_object.host + '/api/get_features')
    //   .then(function (response) {
    //     let data = response.data
    //     if (data.result) {
    //       $scope.features = data.features
    //     } else {
    //       console.log(data.message)
    //     }
    //   })
    //   .catch(function (error) {
    //     $scope.alert(error)
    //   })
  }
  $scope.get_item_list_by_feature = function (feature) {
    // // test data
    $scope.item_list = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
      { id: 3, name: 'item3' },
      { id: 4, name: 'item4' }
    ]
    // return $http
    //   .get($scope.shared_object.host + '/api/get_item_list?feature_id=' + feature.id)
    //   .then(function (response) {
    //     let data = response.data
    //     if (data.result) {
    //       $scope.item_list = data.item_list
    //     } else {
    //       console.log(data.message)
    //     }
    //   })
    //   .catch(function (error) {
    //     $scope.alert(error)
    //   })
  }

  $scope.set_cur_feature = function (event, feature) {
    $scope.cur_feature = feature
    $scope.get_item_list_by_feature(feature)
  }
  $scope.remove_feature_confirm = function (event, feature, index) {
    let $this = $(event.currentTarget)
    let label = $this.html()
    if (feature.id < 0) {
      index = index - $scope.features.length
      $scope.new_feature_list.splice(index, 1)
    } else {
      UIkit.modal.confirm('Remove Feature Config Confirm!', { stack: true }).then(function () {
        // $this.html('<div uk-spinner></div>').prop('disabled', 'disable')
        // $http.post($scope.shared_object.host + '/api/remove_feature', feature)
        //   .then(function (response) {
        //     let data = response.data
        //     if (data.result) {
        //       $scope.features.splice(index, 1)
        //       UIkit.notification('Feature Config Removed')
        //     } else {
        //       console.log(data.message)
        //     }
        //   })
        //   .catch(function (error) {
        //     $scope.alert(error)
        //   })
        //   .finally(function () {
        //     $this.html(label).removeAttr('disabled')
        //   })
      }, function () {
        // console.log('It\'s OK.')
      })
    }
  }
  $scope.add_feature = function () {
    $scope.new_feature_list.push({
      id: -1,
      name: '',
      disabled: false
    })
  }
  $scope.save_add_feature = function (event, feature) {
    let $this = $(event.currentTarget)
    let label = $this.html()
    // $this.html('<div uk-spinner></div>').prop('disabled', 'disable')
    // return $http.post($scope.shared_object.host + '/api/add_feature', feature)
    //   .then(function (response) {
    //     let data = response.data
    //     if (data.result) {
    //       UIkit.notification('Feature Config Added')
    //     } else {
    //       console.log(data.message)
    //     }
    //   })
    //   .catch(function (error) {
    //     $scope.alert(error)
    //   })
    //   .finally(function () {
    //     $this.html(label).removeAttr('disabled')
    //   })
  }

  $scope.set_cur_item = function (event, item) {
    $scope.cur_item = item
  }
  $scope.remove_item_confirm = function (event, item, index) {
    let $this = $(event.currentTarget)
    let label = $this.html()
    if (item.id < 0) {
      index = index - $scope.item_list.length
      $scope.new_item_list.splice(index, 1)
    } else {
      UIkit.modal.confirm('Remove Item Config Confirm!', { stack: true }).then(function () {
        // $this.html('<div uk-spinner></div>').prop('disabled', 'disable')
        // $http.post($scope.shared_object.host + '/api/remove_item', item)
        //   .then(function (response) {
        //     let data = response.data
        //     if (data.result) {
        //       $scope.item_list.splice(index, 1)
        //       UIkit.notification('Item Config Removed')
        //     } else {
        //       console.log(data.message)
        //     }
        //   })
        //   .catch(function (error) {
        //     $scope.alert(error)
        //   })
        //   .finally(function () {
        //     $this.html(label).removeAttr('disabled')
        //   })
      }, function () {
        // console.log('It\'s OK.')
      })
    }
  }
  $scope.add_item = function () {
    $scope.new_item_list.push({
      id: -1,
      name: ''
    })
  }
  $scope.save_add_item = function (event, item) {
    let $this = $(event.currentTarget)
    let label = $this.html()
    // $this.html('<div uk-spinner></div>').prop('disabled', 'disable')
    // return $http.post($scope.shared_object.host + '/api/add_item', item)
    //   .then(function (response) {
    //     let data = response.data
    //     if (data.result) {
    //       UIkit.notification('Feature Config Added')
    //     } else {
    //       console.log(data.message)
    //     }
    //   })
    //   .catch(function (error) {
    //     $scope.alert(error)
    //   })
    //   .finally(function () {
    //     $this.html(label).removeAttr('disabled')
    //   })
  }

  $scope.refresh = function () {}

  // util
  $scope.open_config = function (kind) {
    switch (kind) {
      case 'system':
        $scope.config_switcher.show(0)
        break
      case 'feature':
        $scope.config_switcher.show(1)
        break
      case 'item':
        $scope.config_switcher.show(2)
        break
      default:
        break
    }
    $scope.config_modal.show()
  }
  $scope.open_global_tips = function (kind) {
    switch (kind) {
      case '0':
        $scope.global_tips_header = 'header'
        $scope.global_tips_body = 'body'
        break
      case '1':
        $scope.global_tips_header = 'header'
        $scope.global_tips_body = 'body'
        break
      default:
        break
    }
    if ($scope.global_tips_header !== '') {
      $scope.global_tips_modal.show()
    }
  }
  $scope.alert = function (msg, format) {
    if (format) {
      if (format === 'pre') {
        UIkit.modal.alert('<pre>' + msg + '</pre>', { stack: true })
      } else {
        UIkit.modal.alert(msg, format)
      }
    } else {
      UIkit.modal.alert(msg, { stack: true })
    }
  }

  // init
  $scope.init()
})
