var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use('/', express.static('/client'));

mongoose.connect('mongodb://inthecloset:c0desmith@ds031223.mongolab.com:31223/inthecloset',function(err){
  if(err) throw err;
  console.log('connected to DB');
});
//will store facebook given _id and name. closet_id === _id
var userSchema = new Schema({
  _id: {type:String,required: true},
  username:{ type: String, required: true, index: { unique: true } },
  closet_id:{type: String, required: true}
});

var closetSchema = new Schema({
  closet_id = {type: Schema.Types.ObjectId},
  tops: [Schema.Types.ObjectId],
  bottoms:[Schema.Types.ObjectId],
  shoes:[Schema.Types.ObjectId],
  accessories:[Schema.Types.ObjectId],
  onesie:[Schema.Types.ObjectId]
});

var ItemSchema = new Schema({
  _itemId = {type: Schema.Types.ObjectId},
  category: {type: String, required: true},
  color: {type: String, required: true},
  img: { data: Buffer, contentType: String },
  name:{type: String}
});



var User = mongoose.model('User',userSchema);
var Closet = mongoose.model('Closet',closetSchema);
var Item = mongoose.model('Item',ItemSchema);

//login request
app.post('',function(req,res){
//  var closet_id = req.body.id;
  var user = new User({
    _id :req.body.id,
    username:req.body.name,
    closet_id: req.body.id
  });
  res.send('should send back user Id? as a cookie?!!' + user.closet_id);
});

//when the user logs in they should receive the clothes in their closet
app.get('/',function(req,res){
  //get profile for each user
  //get the users closet object of arrays holding objects
  User.findOne({_id: req.body.closet_id},function(err,closetId){
    Closet.findOne({closet_id: closetId.closetId}, function(err,fullCloset){
      if(err) throw err;
      res.send(fullCloset);//should send back a large object of arrays
    });

  });
});


/**
//request for an outfit suggestion
//every request should carry the users id
app.get('/', function(req,res){
  Closet.findOne({closet_id: req.body._id},function(err,fullCloset){
    matchClothes(fullCloset.)
  });
});
function matchClothes(shirt,bottom,shoes,accessories){
  //??
}
*/












app.listen(3000);
