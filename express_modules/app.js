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

// // 引用mongoose，打开一个到测试库连接
// var mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/Collections', { useMongoClient: true})
// //测试连接是否正确
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function callback () {
//   console.log('success')
// })
// var personSchema = mongoose.Schema({
//   username: String,
//   password: String,
//   email: String,
//   time: Object
// })
// var Person = mongoose.model('Person', personSchema)
// var person1 = new Person({
//   username: 'jia',
//   password: '222',
//   time: new Date()
// })
// person1.save(function (person1) {
// }).then(function (value) {
//   console.log(value)
// }).catch(function (err) {
//   console.log(err)
// })
// Person.find({username: 'jia'}, function (doc){}).then(function (value) {
//   console.log(1, value, 'success')
// }).catch(function (err) {console.log(err)})



// 注册页面传递新产生的数据
app.post('/register', function(req, res, next) {
  // request是后台从前端接受的数据，必须搭配解析器
  console.log(req.body)
  // res是后台传给前端的返回对象
  res.json({result: 0})
})


//登录页面的后台
app.post('/login', function(req, res, next) {
  // res是后台传给前端的返回对象
  res.json({result: 0})
})
// 搭建服务器，打开前端页面
// 简便方法
app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
//复杂方法
//  app.get('/public/*', function(req, res, next) {
//     // 使用默认参数，除了根路径要改变
//     var options = {
//         root: './public/',
//         dotfile: 'deny',
//         headers: {
//             'x-timestamp': Date.now(),
//             'x-sent': true
//         }
//     };
//     // 由于拿到的数据是个数组（前面用了*匹配），从index.html开始，所以filename取第一个
//     var fileName = req.params[0]
//     // 通过sendFile()函数取到主页面的内容并展现出来
//     res.sendFile(fileName, options, function(err) {
//         if (err) {
//             console.log(err);
//             res.status(err.status).end()
//         }
//         else {
//             console.log('sent', fileName)
//         }
//     })
// })
// 端口监听
app.listen(3000, function () {
  console.log('Open successfully!')
})