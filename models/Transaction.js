/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    productID: [Number],
    buyerName: String,
    cost: Number,
    date: Date,
    merchantName: String,
    bill: String
    // friendList: dataType
});




module.exports = mongoose.model('Transaction', Transaction);
