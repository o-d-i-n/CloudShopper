var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    gender: String,
    email: String,
    Age: Number,
    Photo: String,
    phoneNo: Number
   // friendList: dataType
});

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
      tags:[{
        name:String,
        number:Number
      }]
    },
    occupation: {
      type: String, // student,professional,buisness,retired
      tags:[{
        name:String,
        number:Number
      }]
    }

});

var Female = new Schema({

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
      tags:[{
        name:String,
        number:Number
      }]
    },
    occupation: {
      type: String, // student,professional,buisness,retired
      tags:[{
        name:String,
        number:Number
      }]
    }

});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
