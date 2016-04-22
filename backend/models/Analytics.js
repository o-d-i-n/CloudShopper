/**
 * Created by Saksham on 4/9/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Analytics = new Schema({
    merchantID: Schema.ObjectId, // We will refer to the product by its _id
    tags: [{
        name:String,
        number:Number
    }],
    kid: {type:Number,default:0},
    youngster: {type:Number,default:0},
    adult: {type:Number,default:0}
    // friendList: dataType
});



module.exports = mongoose.model('Analytics', Analytics);
