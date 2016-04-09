var passport = require('passport');
var Account = require('../models/account');
var Catalog = require('../models/Catalog');
var Male = require('../models/Male');
var Female = require('../models/Female');
var Transaction = require('../models/Transaction');
var express = require('express');


var router = express.Router();
var auth = require('../userLogic/auth')



router.post('/addProduct',auth.ensureAuthenticated, function(req,res,next) {

  product = new Catalog({
    merchant: req.body.merchant_id,
    tags: req.body.tags,
    price: req.body.price,
    quantity: req.body.quantity,
    discount: req.body.discount, // In percrntages
    gender: req.body.gender, // M / F / U (Unisex)
    brand: req.body.brand,
    name: req.body.name
  });

  product.save(function (err, product) {
    if (err) res.json({success:false,err:err});
    else res.json({success:true,product:product});
  });

  //Recomendation Engine Part
  //dont know why chahal added this comment
});

//getUserDetails
router.post('/getDetails', function (req, res) {
    Account.findById(req.body.accountID, function (err, account) {
        if(err){
            return res.json({success:false, error:err});
        }
        if(account)
            return res.json({success:true, user:account});
        else
            return res.json({success:false});
    }) ;
});

router.post('/transaction',function(req,res,next) {
    //Transaction Part Here


    //transaction = new Transaction({
    //    productID = req.body.productID
    //
    //});

});

module.exports = router;
