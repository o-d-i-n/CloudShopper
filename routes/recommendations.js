var passport = require('passport');
var Account = require('../models/account');
var Catalog = require('../models/Catalog');
var Male = require('../models/Male');
var Female = require('../models/Female');
var Transaction = require('../models/Transaction');
var express = require('express');


var router = express.Router();
var auth = require('../userLogic/auth')


router.post('/recommendations',auth.ensureAuthenticated,function(req,res,next) {

    if(req.body.gender == "M") {
        var min = getMin(req.body.age);
        Male.findOne({ "age_group.min":min }, function(err, user) {
          if (err) {
              res.json({success:false,err:err});
          } else {
              for(i in user.age_group.tags)
          });

    } else {

    }

});

function getMin(age) {
    if(age >= 18) {
        if(age <= 25) {
            return 18;
        }
        return 30;
    } else {
        return 10;
    }
}

module.exports = router;
