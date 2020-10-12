var cityModel = require('../models/cities');
var userSignUpModel = require('../models/userSignUp');

var express = require('express');
var router = express.Router();
var request = require('sync-request');


if ( cityList === undefined){
var cityList = [];
}
var citySave;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/weather', async function(req, res, next) {
  cityList = await cityModel.find();
  res.render('weather',{cityList,messageError:false});
});

router.post('/add-city', async function(req, res, next) {

  var currentWeathData = request("GET",`https://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&lang=fr&units=metric&appid=8c667794050951aa7b364865592a32fe`)
  var currentWeathDataJSON = JSON.parse(currentWeathData.body);
  var notDoubleCity=false;
  var messageError = true;
  var cityList = await cityModel.find();



  for(var i = 0; i <cityList.length; i++){
    if( cityList[i].name.toLowerCase() == req.body.name.toLowerCase())
    notDoubleCity= true;
  };


  if( currentWeathDataJSON.cod !=404){
    messageError=false;
  };

  if(notDoubleCity == false&&currentWeathDataJSON.cod !=404){
    var newCity = new cityModel({
      name: req.body.name,
      url:"http://openweathermap.org/img/wn/"+currentWeathDataJSON.weather[0].icon+"@2x.png",
      description:currentWeathDataJSON.weather[0].description,
      tmpMin:currentWeathDataJSON.main.temp_min,
      tmpMax:currentWeathDataJSON.main.temp_max,
      longitude: currentWeathDataJSON.coord.lon,
      latitude:currentWeathDataJSON.coord.lat
    });
    var citySave = await newCity.save();
  }

  cityList = await cityModel.find();

  res.render('weather',{cityList,messageError,citySave});
});

router.get('/delete-city', async function(req, res, next) {
    //cityList.splice(req.query.countDelete,1);
    await cityModel.deleteOne({
      _id: req.query.id
    });
    cityList = await cityModel.find();
  res.render('weather',{cityList, messageError:false});
});


//signup
router.post('/sign-up', async function(req, res, next){
req.session.user =[];


  var newUser = new userSignUpModel({
    username: req.body.usernameFromFront,
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  });

  var newUserSave = await newUser.save();
  req.session.user = {
    Username: newUserSave.username,
    sessionId: newUserSave._id
  };

  res.redirect('/weather');
});

router.post('/sign-in', async function(req, res, next){
  seachUser = await userSignUpModel.findOne({email: req.body.emailFromFront, password: req.body.passwordFromFront});
  if (seachUser != null){
    req.session.user = {
      username: req.body.usernameFromFront,
      sessionId: seachUser._id
    };
  res.redirect('/weather');
  } else {
      res.redirect('/');
    }
});
module.exports = router;
