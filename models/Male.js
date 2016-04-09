var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Male = new Schema({
    age_group: {
      min:Number,
      max:Number,
      tags:[{
        name:String,
        number:Number
      }]
    },
    season: {
      type:String, // winter,summer,spring,fall
      tags:{
        name:String,
        number:Number
      },
    },
    occupation: {
      type: String, // student,professional,buisness,retired
      tags:[{
        name:String,
        number:Number
      }]
    }
});


module.exports = mongoose.model('Male', Male);
