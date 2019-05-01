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

    $scope.cur_tree_list = undefined
    $scope.cur_tree = undefined
    $scope.cur_tree_type = undefined

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
                root_item_id: 2,
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
                root_item_id: 2,
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
                root_item_id: 2,
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
                root_item_id: 2,
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
                root_item_id: 2,
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
                root_item_id: 1,
                create_at: 'create_at1',
                update_at: 'update_at1',
                total_count: 0
            },
            {
                id: 2,
                name: 'item2',
                desc: 'desc2',
                author: 'author2',
                root_item_id: 1,
                create_at: 'create_at2',
                update_at: 'update_at2',
                total_count: 0
            },
            {
                id: 3,
                name: 'item3',
                desc: 'desc3',
                author: 'author3',
                root_item_id: 1,
                create_at: 'create_at3',
                update_at: 'update_at3',
                total_count: 0
            },
            {
                id: 4,
                name: 'item4',
                desc: 'desc4',
                author: 'author4',
                root_item_id: 1,
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

    $scope.get_tree = function (rootItemId) {
        // { id: 1, desc: 'check out this', checked: true, checked_by: 'John', checked_at: '90/1/21 12:20:10', appoint_to: '', children: []}
        return [
            {
                id: 1,
                desc: 'check out this',
                checked: false,
                checked_by: 'John',
                checked_at: '90/1/21 12:20:10',
                appoint_to: 'Tom',
                children: [
                    {
                        id: 6,
                        desc: 'check out this',
                        checked: true,
                        checked_by: 'John',
                        checked_at: '90/1/21 12:20:10',
                        appoint_to: 'Tom',
                        children: []
                    },
                    {
                        id: 7,
                        desc: 'check out this',
                        checked: false,
                        checked_by: 'John',
                        checked_at: '90/1/21 12:20:10',
                        appoint_to: 'Tom',
                        children: [
                            {
                                id: 8,
                                desc: 'check out this',
                                checked: true,
                                checked_by: 'John',
                                checked_at: '90/1/21 12:20:10',
                                appoint_to: 'Tom',
                                children: []
                            },
                        ]
                    }
                ]
            },
            {
                id: 2,
                desc: 'check out this check out this check out this check out this check out this check out this check out this',
                checked: true,
                checked_by: 'John',
                checked_at: '90/1/21 12:20:10',
                appoint_to: '',
                children: []
            },
            {
                id: 3,
                desc: 'check out this',
                checked: false,
                checked_by: 'John',
                checked_at: '90/1/21 12:20:10',
                appoint_to: 'Tom',
                children: []
            },
            {
                id: 4,
                desc: 'check out this',
                checked: false,
                checked_by: 'John',
                checked_at: '90/1/21 12:20:10',
                appoint_to: 'Tom',
                children: []
            },
            {
                id: 5,
                desc: 'check out this',
                checked: true,
                checked_by: 'John',
                checked_at: '90/1/21 12:20:10',
                appoint_to: 'Tom',
                children: [
                    {
                        id: 9,
                        desc: 'check out this',
                        checked: true,
                        checked_by: 'John',
                        checked_at: '90/1/21 12:20:10',
                        appoint_to: 'Tom',
                        children: []
                    },
                    {
                        id: 10,
                        desc: 'check out this',
                        checked: false,
                        checked_by: 'John',
                        checked_at: '90/1/21 12:20:10',
                        appoint_to: 'Tom',
                        children: []
                    },
                    {
                        id: 11,
                        desc: 'check out this',
                        checked: true,
                        checked_by: 'John',
                        checked_at: '90/1/21 12:20:10',
                        appoint_to: 'Tom',
                        children: []
                    }
                ]
            }
        ]
    }

    $scope.set_cur_tree_list = function (event, treeType) {
        $scope.cur_tree_type = treeType
        $scope.cur_tree_list = $scope.hasOwnProperty(treeType) ? $scope[treeType] : []
    }

    $scope.set_cur_tree = function (event, tree) {
        $scope.cur_tree = $scope.get_tree(tree.root_item_id)
    }
    $scope.calc_cur_tree_checked_percent = function () {
        if ($scope.cur_tree === undefined) {
            return 0
        }
        let count = 0
        let total = 0

        function loop_item(tree) {
            let i, len, item
            for (let i = 0, len = tree.length; i < len; i++) {
                item = tree[i]
                if (item.checked) {
                    count += 1
                }
                loop_item(item.children)
                total += 1
            }
        }

        loop_item($scope.cur_tree)

        return 100 * count / total
    }
    $scope.delete_tree_confirm = function (event, tree, index) {
        let $this = $(event.currentTarget)
        let label = $this.html()
        if (tree.id < 0) {
            index = index - $scope.item_list.length
            $scope.new_tree_list.splice(index, 1)
        } else {
            UIkit.modal.confirm('Remove Item Config Confirm!', {stack: true}).then(function () {
                // $this.html('<div uk-spinner></div>').prop('disabled', 'disable')
                // $http.post($scope.shared_object.host + '/api/remove_item', tree)
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

    $scope.add_tree = function () {
        $scope.new_tree_list.push({
            id: -1,
            name: ''
        })
    }
    $scope.save_add_tree = function (event, tree) {
        let $this = $(event.currentTarget)
        let label = $this.html()
        // $this.html('<div uk-spinner></div>').prop('disabled', 'disable')
        // return $http.post($scope.shared_object.host + '/api/add_item', tree)
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
    $scope.as_checklist = function (event, template) {

    }

    $scope.toggle_checked = function (event, item) {
        item.checked = !item.checked
        if (item.checked) {
            // update checked by and checked at
            item.checked_by = 'joey'
            item.checked_at = (new Date()).format("yy-MM-dd hh:mm:ss")
        } else {
            item.checked_by = ''
            item.checked_at = ''
        }
    }

    $scope.refresh_page = function () {
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
    Date.prototype.format = function (fmt) {
        let o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        return fmt
    }

    // init
    $scope.init()
})
