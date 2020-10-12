var mongoose = require('./connection');

    var citySchema = mongoose.Schema({
      name:String,
      url:String,
      description:String,
      tmpMin:Number,
      tmpMax:Number,
      longitude: Number,
      latitude: Number
    });
    var cityModel = mongoose.model('cities',citySchema);

module.exports = cityModel;
