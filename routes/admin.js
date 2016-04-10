var passport = require('passport');
var Account = require('../models/account');
var Catalog = require('../models/Catalog');
var Male = require('../models/Male');
var Female = require('../models/Female');
var Transaction = require('../models/Transaction');
var Merchant = require('../models/Merchant');
var express = require('express');


var router = express.Router();
var auth = require('../userLogic/auth');



router.post('/addProduct',auth.ensureAuthenticated, function(req,res,next) {

  product = new Catalog({
    merchant: req.body.merchant,
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
      else
    {
        res.json({success:true,product:product});
    }
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


router.post('/modifyProduct',auth.ensureAuthenticated,function(req,res,next) {

  Catalog.findById(req.body.product_id,function (err, product) {
    if (err) res.json({success:false,err:err});
    else {
            product.merchant= req.body.merchant,
            product.tags= req.body.tags,
            product.price= req.body.price,
            product.quantity= req.body.quantity,
            product.discount= req.body.discount, // In percentages
            product.gender= req.body.gender, // M / F / U (Unisex)
            product.brand= req.body.brand,
            product.name= req.body.name
        product.save(function (err, product) {
            if (err) res.json({success:false,err:err});
            else
            {
                res.json({success:true,product:product});
            }
        });

    }

  });
});

router.post('/deleteProduct', function(req, res, next){

    Catalog.findByIdAndRemove(req.body.product_id,function (err, product) {
        if (err) res.json({success:false,err:err});
        else {
                    console.log('Product deleted.');
                    res.json({success:true});
                }
            });
        });

router.post('/listProduct',  function(req,res,next){

    Catalog.find({}, function(err, product) {
        if(err) res.json({success : false, err: err});
        else {
            res.json({product: product});

        }
    })
});

router.post('/registerMerchant', function(req,res,next) {


    merchant = new Merchant({
        userID: req.body.userID,
        username: req.body.username,
        address: req.body.address,
        location: req.body.location
    });

    merchant.save(function (err, product) {
        if (err) res.json({success:false,err:err});
        else
        {
            res.json({success:true,merchant:merchant});
        }
    });
});

router.post('/deleteMerchant', function(req, res, next){

    //Merchant.findById(req.body.merchantID)
    //
    Merchant.findByIdAndRemove(req.body.merchantID,function (err, merchant) {
        if (err || !merchant) {
            res.json({success: false, err: err, yolo: '2'});
        } else {
            res.json({success: true});
        }

    });
});

router.post('/listAllMerchant', function(req,res,next){

    Merchant.find({}, function(err, Merchant) {
        if(err) res.json({success : false, err: err});
        else {
            res.json({Merchant: Merchant});

        }
    })
});

//end of user-generated responses

module.exports = router;
