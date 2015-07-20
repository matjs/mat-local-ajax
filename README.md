# mat-local-ajax

[![npm version](https://badge.fury.io/js/mat-local-ajax.svg)](http://badge.fury.io/js/mat-local-ajax)

提供本地json接口的功能，可以配置一个map进行线上的json接口到本地文件的映射


## Installation

```sh
npm install --save mat-local-ajax
```

## Usage

```javascript
var mat  = require('mat')
var localAjax = require('mat-local-ajax')

mat.task('daily', function () {
  mat.url([/\.json/])
    .use(localAjax({
      dataLocation: './_json/', //本地接口所在目录,默认为当前目录
      jsonpCallback:'callback', //接口默认支持jsonp.可以使用这个设置jsonp的入参
      //映射
      map: {
        'a.json':'b.js'
      }
    }))
})

//请求a.json回去返回b.js里面的内容。

```
