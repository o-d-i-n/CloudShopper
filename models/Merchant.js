/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//merchant account will be same as account
//so that passport is not set up two times
var Merchant = new Schema({
    userID: Schema.ObjectId,
    username: String,
    address: String,
    location: { type: String, coordinates: [Number]}
});



module.exports = mongoose.model('Merchant', Merchant);
