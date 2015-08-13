var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = '120609078282934';
var FACEBOOK_APP_SECRET = '6007cc397e47b966843dbaec826cd3c7';
var bodyParser = require('body-parser');
var path = require('path');
var multer  = require('multer');
var done = false;
var upload = multer({dest: 'uploads/'});

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


app.use('/', express.static(__dirname + '/../client'));


mongoose.connect('mongodb://inthecloset:c0desmith@ds031223.mongolab.com:31223/inthecloset',function(err){
 if(err) throw err;
 //console.log('connected to DB');
});


/*Configure the multer.*/

// app.post('/profile', upload.single('avatar'), function(req,res,nest){
//   console.log('body to porofile ' + req.body );
// })

app.use(multer({ dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename+ '-' +Date.now();
  },
  onFileUploadStart: function (file) {
    // console.log(file.originalname + ' is starting ...')
    // console.log(file);
  },
  onFileUploadComplete: function (file) {
    // console.log('file contains   ' + file);
    //  console.log('file.fieldname ====  ' +file.fieldname);
    //  console.log('file.path ===== ' + file.path);
    done=true;
  }
}));

/*Handling routes.*/


app.post('/api/photo',function(req,res){
  if(done==true){

    var newItem = new Item({
      category: req.body.category,
      color:req.body.itemColor,
      img: req.files.userPhoto.path
    });
    newItem.save(function(){
      console.log('saved item');
    });
    Closet.find({}, function(err, closet){
      if(closet[req.body.category])
      {
        closet[req.body.category].push(newItem);
      }
    });



    console.log(req.body.category);
    console.log(req.body.itemColor);
    console.log(req.files.userPhoto.path);
    res.redirect('/success');
    res.end();



    // res.sendFile(path.resolve(__dirname + "/../client/success.html"));
  }
});


//setting up OAuth facebook login
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
 }, function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
      done(null, profile);

      var fbUser = new User({
        _id: profile._json.id,
        username:profile._json.name,
        closet_id:profile._json.id
      });
      var userCloset = new Closet({
        closet_id: profile._json.id
      });


      fbUser.save(function(){
        console.log('user saved to database');
      });
      userCloset.save(function(){
        console.log('made a new Closet');
      });
        //console.log(profile._json); //save this info into database using schema
   });
}));

passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(obj, done) {
 done(null, obj);
});


//will store facebook given _id and name. closet_id === _id
var userSchema = new Schema({
 _id: {type:String,required: true},
 username:{ type: String, required: true, index: { unique: true } },
 closet_id:{type: String, required: true}
});

var closetSchema = new Schema({
 closet_id : {type: Schema.Types.ObjectId},
 tops: [{type: Schema.ObjectId, ref: ItemSchema}],
 bottoms:[{type: Schema.ObjectId, ref: ItemSchema}],
 shoes:[],
 accessories:[],
 onesie:[]
});

var ItemSchema = new Schema({
 _itemId : {type: Schema.Types.ObjectId},
 category: {type: String, required: true},
 color: {type: String, required: true},
 img: { type: String}
});

var User = mongoose.model('User',userSchema);
var Closet = mongoose.model('Closet',closetSchema);
var Item = mongoose.model('Item',ItemSchema);

app.get('/api/photo', function(req, res, next) {
 res.sendfile('./client/api/photo');
});
app.get('/success', function(req, res, next) {
  console.log('get request made before serving file');
 res.sendfile('./client/Profile.html');
 console.log('get request made after serving file');

 //console.log('req.body info from /success' + req.body);
});
app.get('/error', function(req, res, next) {
 res.sendfile('./client/error.html');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
 successRedirect: '/success',
 failureRedirect: '/error'
}));


//login request
// app.post('',function(req,res){
// //  var closet_id = req.body.id;
//  var user = new User({
//    _id :req.body.id,
//    username:req.body.name,
//    closet_id: req.body.id
//  });
//
//  res.send('should send back user Id? as a cookie?!!' + user.closet_id);
// });

//when the user logs in they should receive the clothes in their closet
app.get('/closet',function(req,res){
 //get profile for each user
 //get the users closet object of arrays holding objects

  // User.find({}, function(err, blah){
  //   console.log(blah);
  // })
Item.find({}, function(err, clothes){
  console.log('item is  : ' + clothes);
  res.send(clothes);
})

//ideally want to find that user then their closet
 // User.findOne({_id: req.body.closet_id},function(err,closetId){
 //   Closet.findOne({closet_id: closetId.closetId}, function(err,fullCloset){
 //     if(err) throw err;
 //     res.send(fullCloset);//should send back a large object of arrays
 //   });
 //
 // });
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
