var mongoose = require('./connection');

    var userSignUpSchema = mongoose.Schema({
      Username:String,
      email:String,
      password:String,
    });
    var userSignUpModel = mongoose.model('users',userSignUpSchema);

module.exports = userSignUpModel;
