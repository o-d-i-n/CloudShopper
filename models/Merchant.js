/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Merchant = new Schema({
    username: String,
    password: String,
    address: String,
    phoneNo: String,
    email: String,
    Age: Number,
    Photo: String,
    location: {lat: Number, long: Number}
    // friendList: dataType
});



Merchant.plugin(passportLocalMongoose);

module.exports = mongoose.model('Merchant', Merchant);
