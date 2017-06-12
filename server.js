var express = require('express');
var app = express();
var path    = require("path");

app.use(express.static('/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/styles',  express.static(__dirname + '/app/styles'));
app.use('/app',  express.static(__dirname + '/app'));
app.use('/views',  express.static(__dirname + '/app/views'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

}); 