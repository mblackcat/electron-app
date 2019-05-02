'use strict'

// eslint-disable-next-line no-unused-lets
const {ipcRenderer, shell} = require('electron')
const angular = require('angular')
const $ = require('jquery')
const _ = require('lodash')
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
        editable: false
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
        editable: false
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
        editable: false
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
        editable: false
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
        editable: false
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
        editable: false
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
        editable: false
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
        editable: false
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
        editable: false
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
        editable: false
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
        editable: false
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
  $scope.new_item_next = function (item) {
    $scope.gen_id -= 1
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
      editable: true
    })
    $scope.cur_tree = $scope.transform_2_tree($scope.cur_tree_flat_data, true)
  }
  $scope.new_item_child = function (item) {
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
      editable: true
    })
    $scope.cur_tree = $scope.transform_2_tree($scope.cur_tree_flat_data, true)
  }
  $scope.editable_item_self = function (item) {
    item.editable = true
  }
  $scope.dis_editable_item_self = function (item) {
    item.editable = false
  }
  $scope.focus_item = function (item) {

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

app.factory('shortcuts', [
  '$document',
  function ($document) {
    let shortcuts = []

    let charKeyCodes = {
      'delete': 8,
      'tab': 9,
      'enter': 13,
      'return': 13,
      'esc': 27,
      'space': 32,
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
      ';': 186,
      '=': 187,
      ',': 188,
      '-': 189,
      '.': 190,
      '/': 191,
      '`': 192,
      '[': 219,
      '\\': 220,
      ']': 221,
      '\'': 222,
    }

    let inOrder = function (keys, initial) {
      let len = keys.length
      for (let i = 0; i < len; i++) {
        charKeyCodes[keys[i]] = initial + i
      }
    }

    inOrder('1234567890', 49)
    inOrder('abcdefghijklmnopqrstuvwxyz', 65)

    let keyCodeChars = {}
    _.forEach(charKeyCodes, function (keyCode, character) {
      keyCodeChars[keyCode] = character
    })

    let modifierKeys = {
      'shift': 'shift',
      'ctrl': 'ctrl',
      'meta': 'meta',
      'alt': 'alt',
    }

    let parseKeySet = function (keySet) {
      let names = keySet.split('+')
      let keys = {}

      // Default modifiers to unset.
      _.forEach(modifierKeys, function (name) {
        keys[name] = false
      })

      _.forEach(names, function (name) {
        let modifierKey = modifierKeys[name]
        if (modifierKey) {
          keys[modifierKey] = true
        } else {
          keys.keyCode = charKeyCodes[name]

          // In case someone tries for a weird key.
          if (!keys.keyCode) {
            return
          }
        }
      })

      return keys
    }

    let overwriteWithout = function (arr, item) {
      for (let i = arr.length; i >= 0; i--) {
        if (arr[i] === item) {
          arr.splice(i, 1)
        }
      }
    }

    let parseEvent = function (e) {
      let keys = {}
      keys.keyCode = charKeyCodes[keyCodeChars[e.which]]
      keys.meta = e.metaKey || false
      keys.alt = e.altKey || false
      keys.ctrl = e.ctrlKey || false
      keys.shift = e.shiftKey || false
      return keys
    }

    let match = function (k1, k2) {
      return (
        k1.keyCode === k2.keyCode &&
        k1.ctrl === k2.ctrl &&
        k1.alt === k2.alt &&
        k1.meta === k2.meta &&
        k1.shift === k2.shift
      )
    }

    $document.bind('keydown', function (e) {
      // Don't catch keys that were in inputs.
      let $target = $(e.target)
      if ($target.is('input[type="text"], textarea')) {
        return
      }

      let eventKeys = parseEvent(e)
      let shortcut
      for (let i = shortcuts.length - 1; i >= 0; i--) {
        shortcut = shortcuts[i]
        if (match(eventKeys, shortcut.keys)) {
          e.preventDefault()

          // NOTE: the action is responsible for $scope.$apply!
          shortcut.action()
          return
        }
      }
    })

    return {
      shortcuts: shortcuts,
      register: function (shortcut) {
        shortcut.keys = parseKeySet(shortcut.keySet)

        // Be lenient.
        if (!shortcut.keys) {
          return
        }

        shortcuts.push(shortcut)
        return shortcut
      },
      unregister: function (shortcut) {
        overwriteWithout(shortcuts, shortcut)
      },
    }
  },
])

app.directive('ngShortcut', [
  '$parse',
  'shortcuts',
  function ($parse, shortcuts) {
    let isSet = function (scope, expr) {
      if (_.isUndefined(expr)) {
        return false
      }
      if (expr === '') {
        return true
      }
      return scope.$eval(expr)
    }

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        let shortcutKeySets = scope.$eval(attrs.ngShortcut)
        if (_.isUndefined(shortcutKeySets)) {
          return
        }
        shortcutKeySets = shortcutKeySets.split('|')

        let action = _.ignore
        let eventAction = function (event) {
          return function () {
            element.trigger(event)
          }
        }
        if (isSet(scope, attrs.ngShortcutClick)) {
          action = eventAction('click')
        } else if (isSet(scope, attrs.ngShortcutFocus)) {
          action = eventAction('focus')
        } else if (isSet(scope, attrs.ngShortcutFastClick)) {
          // Since we are just triggering (not binding)
          // this works just fine.
          action = eventAction('click')
        } else if (attrs.ngShortcutNavigate) {
          let url = scope.$eval(attrs.ngShortcutNavigate)
          action = function () {
            navigation.redirect(url, true)
          }
        } else if (attrs.ngShortcutAction) {
          let fn = $parse(attrs.ngShortcutAction)
          action = function () {
            scope.$apply(function () {
              fn(scope)
            })
          }
        } else if (attrs.ngShortcutActions) {
          action = attrs.ngShortcutActions.split('|').map(function (fn) {
            fn = $parse(fn)
            return function () {
              scope.$apply(function () {
                fn(scope)
              })
            }
          })
        }
        if (Array.isArray(action)) {
          _.forEach(shortcutKeySets, function (keySet, idx) {
            let shortcut = shortcuts.register({
              keySet: keySet,
              action: action[idx],
              description: attrs.ngShortcutDescription || '',
            })
            scope.$on('$destroy', function () {
              shortcuts.unregister(shortcut)
            })
          })
        } else {
          _.forEach(shortcutKeySets, function (keySet) {
            let shortcut = shortcuts.register({
              keySet: keySet,
              action: action,
              description: attrs.ngShortcutDescription || '',
            })
            scope.$on('$destroy', function () {
              shortcuts.unregister(shortcut)
            })
          })
        }
      },
    }
  },
])
