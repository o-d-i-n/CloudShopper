var passport = require('passport');
var Account = require('../models/account');
var Catalog = require('../models/Catalog');
var express = require('express');

var router = express.Router();
var auth = require('../userLogic/auth')


router.post('/addProduct',auth.ensureAuthenticated,function(req,res,next) {

  product = new Catalog({
    merchant: req.body.merchant_id,
    tags: req.body.tags,
    price: req.body.price,
    quantity: {amount:req.body.quantity,default:0},
    discount: req.body.discount, // In percrntages
    gender: req.body.gender, // M / F / U (Unisex)
    brand: req.body.brand,
    name: req.body.name
  });

  product.save(function (err, product) {
    if (err) res.json({success:false,err:err});
    res.json({success:true,product:product});
  });

});

module.exports = router;
