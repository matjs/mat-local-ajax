var url = require('url')
var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var resolve = path.resolve

var defaultConfig = {
  dataLocation: './',
  map: {},
  jsonpCallback: 'callback'
}

var fetchData = function(dataSource) {

  if (!dataSource) return

  function fetch(callback) {

    var filePath = dataSource

    if (!fs.existsSync(filePath)) {
      callback(null,{})
    }

    try {
      callback(null,require(filePath))
    } catch (e) {
      callback(e)
    }

  }

  return fetch
}

module.exports = function(config){

  var config = _.extend(defaultConfig, config)

  return function*(next) {
    var ctx = this
    var curUrl = ctx.url
    var dataPath,resData,jsonpCb

    _.each(config.map,function(value,key){

      if (key === curUrl || new RegExp(key,'g').test(curUrl)) {

        dataPath = value
        return false
      }

    })
    resData = yield fetchData(resolve(config.dataLocation,dataPath))

    jsonpCb = ctx.query[config.jsonpCallback]

    if (jsonpCb) {
      ctx.body = jsonpCb + '(' + JSON.stringify(resData) + ')'
      ctx.type = 'application/javascript'
    } else {
      ctx.body = JSON.stringify(resData)
      ctx.type = 'application/json'
    }

  }
}
