var express = require('express');
var fs = require("fs");
var app = express();

let data = require('./index.json');
// app.all("/*", function(req, res, next){
  // res.header("Access-Control-Allow-Origin", "http://172.16.10.39:8080");
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  // next()
// })


app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/getList', (req, res)=>{
  let obj = {};
  obj["list"] = data.slice(0, Number(req.query.page)*10)
  obj["totalPage"] = Math.ceil(data.length/10)
  res.json(obj);
})

var server = app.listen(9999, function () {
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})