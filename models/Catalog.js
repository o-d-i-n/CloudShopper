/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Catalog = new Schema({
    merchant: String, // We will refer to the product by its _id
    tags: [String],
    dateAdded: {type:Date,default:Date.now},
    price: Number,
    quantity: {type:Number,default:0},
    discount: Number, // In percrntages
    gender: String, // M / F / U (Unisex)
    brand: String,
    name: String,
    photo: String
    // friendList: dataType
});



module.exports = mongoose.model('Catalog', Catalog);
