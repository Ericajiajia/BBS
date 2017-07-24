var express = require('express')
// var path = require('path')
// var favicon = require('serve-favicon')
// var logger = require('morgan')
// var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = 'mongodb://localhost:27017/Collections'
var data

var insertData = function(db, data, callback) {  
    //连接到表 example
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

app.post('/register', function(req, res, next) { 
  MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！")
      insertData(db, req.body, function (result) {
          console.log(result)
          db.close()
      })
  })
  console.log(req.body)
  res.json({result: 0})
})

// app.use('/users', users);
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
app.listen(3000, function () {
  console.log('Open successfully!')
})