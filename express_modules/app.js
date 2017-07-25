var express = require('express')
// var path = require('path')
// var favicon = require('serve-favicon')
// var logger = require('morgan')
// var cookieParser = require('cookie-parser')

//封装好的解析器，否则无法从前端得到Json数据格式 
var bodyParser = require('body-parser')



var app = express()

// 自定义解析器
// app.use((req, res, next) => {
//   let data = []
//   req.on('data', (chunk) => {
//     data.push(chunk)
//   })
//   req.on('end', () => {
//     data = Buffer.concat(chunk)
//     res.myOwnBody = data
//     next()
//   })
//   })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
// 引用数据库模块和接口
var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = 'mongodb://localhost:27017/Collections'
var data, resind

// 对数据库执行插入数据
var insertData = function(db, data, callback) {  
    //连接到数据库example
    var collection = db.collection('example')
    //插入数据
    collection.insert(data, function (err, result) { 
        if(err)
        {
            console.log('Error:'+ err)
            return
        }     
        callback(result)
    })
}
// 对数据库执行查询数据
var selectData = function(db, data, callback) {  
  //连接到表  
  var collection = db.collection('example')
  //查询数据
  resind = collection.find(data).topology.id
  console.log(resind)
  collection.find(data).toArray(function(err, result, resp) {
    if(err)
    {
      console.log('Error:'+ err)
      return
    }     
    callback(result)
  })
}
// 注册页面传递新产生的数据
app.post('/register', function(req, res, next) { 
  MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！")
      insertData(db, req.body, function (result) {
          console.log(result)
          db.close()
      })
  })
  // request是后台从前端接受的数据，必须搭配解析器
  console.log(resind)
  // res是后台传给前端的返回对象
  res.json({result: resind})
})
app.post('/login', function(req, res, next) { 
  MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！")
      selectData(db, req.body, function(result) {
          console.log(result)
          db.close()
      });
  })
  // request是后台从前端接受的数据，必须搭配解析器
  console.log(req.body)
  // res是后台传给前端的返回对象
  res.json({result: 0})
  res.send(1)
})
// 搭建服务器，打开前端页面
app.get('/public/*', function(req, res, next) {
    // 使用默认参数，除了根路径要改变
    var options = {
        root: './public/',
        dotfile: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    // 由于拿到的数据是个数组（前面用了*匹配），从index.html开始，所以filename取第一个
    var fileName = req.params[0]
    // 通过sendFile()函数取到主页面的内容并展现出来
    res.sendFile(fileName, options, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end()
        }
        else {
            console.log('sent', fileName)
        }
    })
})
// 端口监听
app.listen(3000, function () {
  console.log('Open successfully!')
})