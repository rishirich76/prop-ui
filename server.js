var express = require('express');
var app = express();
var path    = require("path");

app.use(express.static('/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/styles',  express.static(__dirname + '/app/styles'));
app.use('/app',  express.static(__dirname + '/app'));
app.use('/views',  express.static(__dirname + '/app/views'));
/*app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});*/

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});