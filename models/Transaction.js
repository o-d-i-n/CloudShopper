/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    products: [{
        productID: Number,
        quantity: Number,
        totalPrice: Number
    }],
    buyerID: Schema.ObjectId,
    cost: Number,
    date: Date,
    merchantID: Schema.ObjectId,
    bill: String
    // friendList: dataType
});


module.exports = mongoose.model('Transaction', Transaction);
