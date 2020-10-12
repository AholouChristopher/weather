//connection mongoose
var mongoose = require('mongoose');
var option = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect('mongodb+srv://lycris:loulou@weatherapp.ns7ol.mongodb.net/weatherapp?retryWrites=true&w=majority',
  option,
  function(error){
    if (error) {
      console.error(error);
    } else {
      console.info("connection ok");
      }
    });
    var citySchema = mongoose.Schema({
      name:String,
      url:String,
      description:String,
      tmpMin:Number,
      tmpMax:Number,
    });
    var cityModel = mongoose.model('cities',citySchema);

module.exports = cityModel;
