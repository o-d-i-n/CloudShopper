var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var auth = require('../userLogic/auth');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({status: "on /user/"});
});

router.get('/register',function(req,res,next) {
    res.render('register');
});

router.post('/register',function(req,res,next) {

    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err || !account) {
            return res.json({ error: err});
        }
        else {
            return res.json({success:true, user:account });
        }
    });
});


//add user details
router.post('/addDetails',function(req, res, next) {

    Account.findById(req.body.accountID, function (err, account) {
        if(err){
            return res.json({success:false, error: err});
        }

        account.firstName=req.body.firstName;
        account.lastName=req.body.lastName;
        account.gender=req.body.gender;
        account.Age=req.body.age;
        account.occupation = req.body.occupation;
        account.phoneNo=req.body.phoneNo;
        account.photo=req.body.photo;
        account.email=req.body.email;

        account.save(function (err) {
            if(err){
                return res.json({success: true,error:err});
            }
            else{
                return res.json({success:true, user:account});
            }
        });
    });
});

router.post('/newArrivals', function(req,res,next){

  Catalog.find({merchant : req.body.merchant},null, {sort: '-dateAdded'},function(err, product) {
    if(err) res.json({success : false, err: err});
    else {
      res.json({success : true, product : product});

    }
  }).limit(20)
});



router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login',auth.parseString,passport.authenticate('local'), function(req,res) {
        console.log("You're logged in !")
        return res.json({success:true, user:req.user});
});

router.post('/merchantLogin', passport.authenticate('local'), function (req,res) {

    Merchant.find({"userID": req.user._id}, function (err, merchant) {
       if(err||!merchant) {
           res.json({success:false, error:"user not found"});
       }

        else{
           res.redirect('/admin', {merchantUser: req.user, merchantDetails: merchant});
       }
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
