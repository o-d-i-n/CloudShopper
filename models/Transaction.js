/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Transaction = new Schema({
    productID: [Number],
    buyerName: String,
    cost: Number,
    date: Date,
    merchantName: String,
    bill: String
    // friendList: dataType
});



Transaction.plugin(passportLocalMongoose);

module.exports = mongoose.model('Transaction', Transaction);
