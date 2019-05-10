'use strict'

// eslint-disable-next-line no-unused-lets
const {ipcRenderer, shell} = require('electron')
const angular = require('angular')
const $ = require('jquery')
const _ = require('lodash')
const UIkit = require('uikit')
const Icons = require('uikit/dist/js/uikit-icons')
const MyClass = require('./common/my-class.js')

const ngCM = require('../assets/js/ng-context-menu.js')
// loads the Icon plugin
UIkit.use(Icons)

let app = angular.module('Checklist', ['ngContextMenu'])

app.controller('ChecklistCtrl', function ($scope, $http, $sce, $timeout) {
  $scope.user_info = undefined
  $scope.user_config = undefined

  $scope.cur_tree_list = undefined
  $scope.cur_tree = undefined
  $scope.cur_tree_type = undefined

  $scope.cur_right_click_item = undefined;

  $scope.search_keyword = ''
  $scope.loading = false
  $scope.sub_side_show = true
  $scope.gen_id = -1

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
      email: 'username@com',
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
      key2: true,
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
        total_count: 0,
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
        total_count: 0,
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
        total_count: 0,
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
        total_count: 0,
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
        total_count: 0,
      },
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
        total_count: 0,
      },
      {
        id: 2,
        name: 'item2',
        desc: 'desc2',
        author: 'author2',
        root_item_id: 1,
        create_at: 'create_at2',
        update_at: 'update_at2',
        total_count: 0,
      },
      {
        id: 3,
        name: 'item3',
        desc: 'desc3',
        author: 'author3',
        root_item_id: 1,
        create_at: 'create_at3',
        update_at: 'update_at3',
        total_count: 0,
      },
      {
        id: 4,
        name: 'item4',
        desc: 'desc4',
        author: 'author4',
        root_item_id: 1,
        create_at: 'create_at4',
        update_at: 'update_at4',
        total_count: 0,
      },
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

    $scope.cur_tree_flat_data = [
      {
        id: 1,
        desc: 'check out this',
        checked: false,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 0,
        order: 0,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 6,
        desc: 'check out this',
        checked: true,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 1,
        order: 0,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 2,
        desc: 'check out this check out this check out this check out this check out this check out this check out this',
        checked: true,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: '',
        parent_id: 0,
        order: 1,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 4,
        desc: 'check out this',
        checked: false,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 0,
        order: 3,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 3,
        desc: 'check out this',
        checked: false,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 0,
        order: 2,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 7,
        desc: 'check out this',
        checked: false,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 1,
        order: 1,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 8,
        desc: 'check out this',
        checked: true,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 7,
        order: 0,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 5,
        desc: 'check out this',
        checked: true,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 0,
        order: 4,
        root_id: 1,
        editable: false,
        expand: false
      },
      {
        id: 10,
        desc: 'check out this',
        checked: false,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 5,
        order: 1,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 9,
        desc: 'check out this',
        checked: true,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 5,
        order: 0,
        root_id: 1,
        editable: false,
        expand: true
      },
      {
        id: 11,
        desc: 'check out this',
        checked: true,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        parent_id: 5,
        order: 2,
        root_id: 1,
        editable: false,
        expand: true
      },
    ]

    let treeData = [
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
            children: [],
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
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        desc: 'check out this check out this check out this check out this check out this check out this check out this',
        checked: true,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: '',
        children: [],
      },
      {
        id: 3,
        desc: 'check out this',
        checked: false,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        children: [],
      },
      {
        id: 4,
        desc: 'check out this',
        checked: false,
        checked_by: 'John',
        checked_at: '90/1/21 12:20:10',
        appoint_to: 'Tom',
        children: [],
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
            children: [],
          },
          {
            id: 10,
            desc: 'check out this',
            checked: false,
            checked_by: 'John',
            checked_at: '90/1/21 12:20:10',
            appoint_to: 'Tom',
            children: [],
          },
          {
            id: 11,
            desc: 'check out this',
            checked: true,
            checked_by: 'John',
            checked_at: '90/1/21 12:20:10',
            appoint_to: 'Tom',
            children: [],
          },
        ],
      },
    ]

    return $scope.transform_2_tree($scope.cur_tree_flat_data)
  }

  $scope.transform_2_tree = function (flat, reset) {
    let nodes = {}
    let tree = flat
    if (reset) {
      tree = tree.map(function (obj) {
        if (obj.hasOwnProperty('children')) {
          delete obj.children
        }
        return obj
      })
    }
    tree = tree.map(function (obj) {
      if (obj.hasOwnProperty('children')) {
        delete obj.children
      }
      return obj
    }).filter(function (obj) {
      let id = obj.id
      let parentId = obj.parent_id

      nodes[id] = _.defaults(obj, nodes[id], {children: []})
      parentId && (nodes[parentId] = (nodes[parentId] || {children: []}))['children'].push(obj)

      return !parentId
    })

    function sortBy (arr, key) {
      arr.sort(function (a, b) {
        if (a.children.length > 0) {
          sortBy(a.children, key)
        }
        if (b.children.length > 0) {
          sortBy(b.children, key)
        }
        return a[key] - b[key]
      })
    }

    sortBy(tree, 'order')

    return tree
  }

  $scope.set_cur_tree_list = function (event, treeType) {
    $scope.cur_tree_type = treeType
    $scope.cur_tree_list = $scope.hasOwnProperty(treeType) ? $scope[treeType] : []
  }

  $scope.set_cur_tree = function (event, tree) {
    $scope.cur_tree = $scope.get_tree(tree.root_item_id)
    $scope.init_sortable_event()
  }
  $scope.calc_cur_tree_checked_percent = function () {
    if ($scope.cur_tree === undefined) {
      return 0
    }
    let count = 0
    let total = 0

    function loopItem (tree) {
      let i, len, item
      for (i = 0, len = tree.length; i < len; i++) {
        item = tree[i]
        if (item.checked) {
          count += 1
        }
        loopItem(item.children)
        total += 1
      }
    }

    loopItem($scope.cur_tree)

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
      name: '',
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

  // tree
  $scope.toggle_checked = function (event, item) {
    item.checked = !item.checked
    if (item.checked) {
      // update checked by and checked at
      item.checked_by = 'joey'
      item.checked_at = (new Date()).format('yy-MM-dd hh:mm:ss')
    } else {
      item.checked_by = ''
      item.checked_at = ''
    }
  }
  $scope.toggle_expand = function (event, item) {
    item.expand = !item.expand
  }
  $scope.toggle_editable = function (item) {
    item = item || $scope.cur_right_click_item
    item.editable = !item.editable;
  };
  $scope.new_item_next = function (item) {
    item = item || $scope.cur_right_click_item
    $scope.gen_id -= 1
    $scope.cur_tree_flat_data.map(function (obj) {
      if (obj.parent_id === item.parent_id && obj.order > item.order) {
        obj.order += 1
      }
      return obj
    })
    $scope.cur_tree_flat_data.push({
      id: $scope.gen_id,
      desc: '',
      checked: false,
      checked_by: '',
      checked_at: '',
      appoint_to: '',
      parent_id: item.parent_id,
      order: item.order + 1,
      root_id: item.root_id,
      editable: true,
      expand: true
    })
    $scope.cur_tree = $scope.transform_2_tree($scope.cur_tree_flat_data, true)
  }
  $scope.new_item_child = function (item) {
    item = item || $scope.cur_right_click_item
    $scope.gen_id -= 1
    $scope.cur_tree_flat_data.push({
      id: $scope.gen_id,
      desc: '',
      checked: false,
      checked_by: '',
      checked_at: '',
      appoint_to: '',
      parent_id: item.id,
      order: item.children.length,
      root_id: item.root_id,
      editable: true,
      expand: true
    })
    $scope.cur_tree = $scope.transform_2_tree($scope.cur_tree_flat_data, true)
  }
  $scope.init_sortable_event = function () {
    UIkit.util.on('.js-sortable', 'moved', function (e) {
      $scope.update_item_order(e.target)
    })
  }
  $scope.update_item_order = function (parentNode) {
    _.forEach(parentNode.children, function (node, index) {
      let itemId = 1 * node.getAttribute('data-item-id')
      let item = _.find($scope.cur_tree_flat_data, function (item) {
        return item.id === itemId
      })
      item.order = index
    })
    $scope.cur_tree = $scope.transform_2_tree($scope.cur_tree_flat_data, true)
  }

  $scope.refresh_page = function () {
  }
  $scope.show_context_menu = function (item){
    $scope.cur_right_click_item = item
    console.log(item)
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
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      'S': this.getMilliseconds(),
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }

  // init
  $scope.init()
})

// Rightclick directive
app.directive('ngRightClick', function ($parse) {
  return function (scope, element, attrs) {
    let fn = $parse(attrs.ngRightClick)
    element.bind('contextmenu', function (event) {
      scope.$apply(function () {
        event.preventDefault()
        fn(scope, {$event:event})
      })
    })
  }
})