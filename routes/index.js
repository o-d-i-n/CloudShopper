
var passport = require('passport');
var Account = require('../models/account');
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register',function(req,res,next) {
  res.render('register',{});
});

router.post('/register',function(req,res,next) {
  var email = req.body.email;
  var password = req.body.password;

  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log(err)
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.render('/',{ title: 'Express' });
        });
    });

});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/test',ensureAuthenticated,function(req,res,next){
    res.render('test');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}


module.exports = router;
