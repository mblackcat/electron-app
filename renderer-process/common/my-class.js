(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('MyClassName', factory) : (global = global || self, global.MyClassName = factory())
}(this, function () {
  'use strict'
  const { ipcRenderer } = require('electron')
  return {
    create: function (option) {
      let myClassName = {}
      myClassName.property1 = option.property1 || undefined
      myClassName.property2 = option.property2 || undefined
      myClassName.property3 = option.property3 || undefined

      myClassName.function1 = (param) => {
        return true
      }
      myClassName.function2 = (param) => {
        myClassName.propert2 = param
      }
      myClassName.otherProperty1 = {
        func1: function (param) {
          return false
        }
      }
      myClassName.otherProperty2 = {
        func1: function (param) {},
        func2: function (param) {}
      }
      return myClassName
    }
  }
}))
