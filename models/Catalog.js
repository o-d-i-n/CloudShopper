/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Catalog = new Schema({
    merchant: String,
    productID: Number,
    category: String,
    tags: [String],
    dateAdded: Date,
    price: Number,
    quantity: {amount:Number,default:0},
    discount: Number // In percrntages
    gender: String, // M / F / U (Unisex)
    brand: String,
    name: String,
    photo: String
    // friendList: dataType
});



Catalog.plugin(passportLocalMongoose);

module.exports = mongoose.model('Catalog', Catalog);
