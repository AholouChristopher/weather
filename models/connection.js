var mongoose = require('mongoose');
var option = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://lycris:<password>@weatherapp.ns7ol.mongodb.net/?retryWrites=true&w=majority',
  option,
  function(error){
    if (error) {
      console.error(error);
    } else {
      console.info("connection ok");
      }
    });

    module.exports = mongoose;
