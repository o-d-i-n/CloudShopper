var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var auth = require('../userLogic/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({status: "on /user/"});
});

router.get('/register',function(req,res,next) {
    res.json({register: 'Welcome! you landed on the register page'});
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
router.post('/addDetails', function(req, res, next) {

    Account.findById(req.body.accountID, function (err, account) {
        if(err){
            return res.json({success:false, error: err});
        }

        account.firstName=req.body.firstName;
        account.lastName=req.body.lastName;
        account.gender=req.body.lastName;
        account.age=req.body.age;
        account.phoneNo=req.body.phoneNo;
        account.photo=req.body.photo;
        account.email=req.body.email;

        account.save(function (err) {
            if(err){
                return res.json({success: true,error:err});
            }
            else{
                return res.json({success:true});
            }
        });
    });
});



router.post('/login', passport.authenticate('local'), function(req,res) {
        //console.log(req.body);
        return res.json({success:true, user:req.user});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;
