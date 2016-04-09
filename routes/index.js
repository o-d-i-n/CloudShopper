var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var auth = require('../userLogic/auth')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user : req.user , status:'Home page! user if logged in!!'});
});



router.get('/test',function(req,res,next){
    res.json({test: 'test succesful'});
});



module.exports = router;
