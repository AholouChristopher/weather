var express = require('express');
var router = express.Router();


var userSignUpModel = require('../models/userSignUp');

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
