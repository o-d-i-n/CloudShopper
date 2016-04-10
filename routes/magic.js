/**
 * Created by shubham on 10/4/16.
 */
var Account = require('../models/account');
var Catalog = require('../models/Catalog');
var Male = require('../models/Male');
var Female = require('../models/Female');
var Transaction = require('../models/Transaction');
var express = require('express');
var Merchants = require('../models/Merchant');


router.post('/getMerchants', function (req, res) {

    Merchants.find({
        location: {
            $near: req.body.location.coordinates,
            $maxDistance: 600, //metres
        }
    }).limit(req.body.limit||30).exec(function (err, merchant) {
        if(err){
            return res.json({success:false});
        }

        return res.json({success:true, merchants: merchant});
    });
});