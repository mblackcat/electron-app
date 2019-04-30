'use strict'

const {ipcRenderer, shell} = require('electron')
const angular = require('angular')
const $ = require('jquery')
const UIkit = require('uikit')
const Icons = require('uikit/dist/js/uikit-icons')
const MyClass = require('./common/my-class.js')

// loads the Icon plugin
UIkit.use(Icons)

let app = angular.module('Checklist', [])

app.controller('ChecklistCtrl', function ($scope, $http, $sce, $timeout) {
    $scope.user_info = undefined
    $scope.user_config = undefined

    $scope.cur_item_list = undefined
    $scope.cur_item = undefined

    $scope.search_keyword = ''
    $scope.loading = false
    $scope.sub_side_show = true

    // modal
    $scope.global_tips_modal = UIkit.modal('#global-tips-modal', {stack: true})
    $scope.config_modal = UIkit.modal('#config-modal', {stack: true})
    // switcher
    $scope.config_switcher = UIkit.switcher('#config-switcher')

    $scope.init = function () {
        let lstPms = []
        $scope.loading = true
        lstPms.push($scope.get_user_info())
        lstPms.push($scope.get_user_config())
        lstPms.push($scope.get_checklist())
        lstPms.push($scope.get_template())
        Promise.all(lstPms).then(function () {
            $timeout(function () {
                $scope.loading = false
            })
        })
    }

    // get data from server
    $scope.get_user_info = function () {
        // // test data
        $scope.user_info = {
            username: 'username',
            email: 'username@com'
        }
        return new Promise(function (resolve, reject) {
            resolve()
        })
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
        return new Promise(function (resolve, reject) {
            resolve()
        })
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
    $scope.get_checklist = function () {
        // // test data
        $scope.checklist = [
            {
                id: 1,
                name: 'item1',
                desc: 'desc1',
                template_id: 1,
                author: 'author1',
                create_at: 'create_at1',
                update_at: 'update_at1',
                checked_count: 0,
                total_count: 0
            },
            {
                id: 2,
                name: 'item2',
                desc: 'desc2',
                template_id: 2,
                author: 'author2',
                create_at: 'create_at2',
                update_at: 'update_at2',
                checked_count: 0,
                total_count: 0
            },
            {
                id: 3,
                name: 'item3',
                desc: 'desc3',
                template_id: 3,
                author: 'author3',
                create_at: 'create_at3',
                update_at: 'update_at3',
                checked_count: 0,
                total_count: 0
            },
            {
                id: 4,
                name: 'item4',
                desc: 'desc4',
                template_id: 4,
                author: 'author4',
                create_at: 'create_at4',
                update_at: 'update_at4',
                checked_count: 0,
                total_count: 0
            },
            {
                id: 5,
                name: 'item5',
                desc: 'desc5',
                template_id: 1,
                author: 'author5',
                create_at: 'create_at5',
                update_at: 'update_at5',
                checked_count: 0,
                total_count: 0
            }
        ]
        return new Promise(function (resolve, reject) {
            resolve()
        })
        // return $http
        //   .get($scope.shared_object.host + '/api/get_checklist')
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
    $scope.get_template = function () {
        // // test data
        $scope.template = [
            {
                id: 1,
                name: 'item1',
                desc: 'desc1',
                author: 'author1',
                create_at: 'create_at1',
                update_at: 'update_at1',
                total_count: 0
            },
            {
                id: 2,
                name: 'item2',
                desc: 'desc2',
                author: 'author2',
                create_at: 'create_at2',
                update_at: 'update_at2',
                total_count: 0
            },
            {
                id: 3,
                name: 'item3',
                desc: 'desc3',
                author: 'author3',
                create_at: 'create_at3',
                update_at: 'update_at3',
                total_count: 0
            },
            {
                id: 4,
                name: 'item4',
                desc: 'desc4',
                author: 'author4',
                create_at: 'create_at4',
                update_at: 'update_at4',
                total_count: 0
            }
        ]
        return new Promise(function (resolve, reject) {
            resolve()
        })
        // return $http
        //   .get($scope.shared_object.host + '/api/get_template')
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

    $scope.set_cur_list = function (event, list) {
        $scope.cur_list_type = list
        $scope.cur_item_list = $scope.hasOwnProperty(list) ? $scope[list] : []
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
            UIkit.modal.confirm('Remove Item Config Confirm!', {stack: true}).then(function () {
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

    $scope.add_list = function () {

    }
    $scope.refresh = function () {
    }

    // util
    $scope.open_config = function () {
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
                UIkit.modal.alert('<pre>' + msg + '</pre>', {stack: true})
            } else {
                UIkit.modal.alert(msg, format)
            }
        } else {
            UIkit.modal.alert(msg, {stack: true})
        }
    }

    // init
    $scope.init()
})
