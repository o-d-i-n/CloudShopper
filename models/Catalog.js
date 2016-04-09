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
    // friendList: dataType
});



Catalog.plugin(passportLocalMongoose);

module.exports = mongoose.model('Catalog', Catalog);
