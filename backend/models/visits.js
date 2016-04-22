/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Visits = new Schema({
    accountID : number,
    merchantID : number,
    date : Date
});

Visits.plugin(passportLocalMongoose);

module.exports = mongoose.model('Visits', Visits);