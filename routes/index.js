
var express = require('express');
var router = express.Router();
var request = require('sync-request');

var cityModel = require('../models/cities');


if ( cityList === undefined){
var cityList = [];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/logout', function(req, res, next){
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
});

router.get('/weather', async function(req, res, next) {
  cityList = await cityModel.find();
  res.render('weather',{cityList,messageError:false});
});

router.post('/add-city', async function(req, res, next) {
// verifier que la clez API marche !
  var currentWeathData = request("GET",`https://api.openweathermap.org/data/2.5/weather?q=${req.body.name},fr&appid=8c667794050951aa7b364865592a32fe`)
  var currentWeathDataJSON = JSON.parse(currentWeathData.body);
  var notDoubleCity=false;
  var messageError = true;
  var cityList = await cityModel.find();

  console.log(currentWeathDataJSON)



  for(var i = 0; i <cityList.length; i++){
    if( cityList[i].name.toLowerCase() == req.body.name.toLowerCase())
    notDoubleCity= true;
  };
  if( currentWeathDataJSON.cod !=404){
    messageError=false;
  };

  if(notDoubleCity == false&&messageError == false){
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
  res.render('weather',{cityList, messageError, citySave});
});

router.get('/delete-city', async function(req, res, next) {
    //cityList.splice(req.query.countDelete,1);
    await cityModel.deleteOne({
      _id: req.query.id
    });
    cityList = await cityModel.find();
  res.render('weather',{cityList, messageError:false});
});



module.exports = router;
