var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use('/', express.static('/client'));

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds031183.mongolab.com:31183/inthecloset ',function(err){
  if(err) throw err;
  console.log('connected to DB');
});


var clothesItemSchema = new Schema({
  type: {type: String, required: true},
  color: {type: String, required: true},

});














app.listen(3000);
