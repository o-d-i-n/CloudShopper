var passport = require('passport');
var Account = require('../models/account');
var Catalog = require('../models/Catalog');
var Male = require('../models/Male');
var Female = require('../models/Female');
var Transaction = require('../models/Transaction');
var createSeasonResolver = require('date-season')
var express = require('express');


var router = express.Router();
var auth = require('../userLogic/auth')
var seasonNorth = createSeasonResolver();

router.post('/recommendations',auth.ensureAuthenticated,function(req,res,next) {
    var hash = new Array();

    if(req.body.gender == "M") {
        var min = getMin(req.body.age);
        //Age Group
        Male.findOne({ "age_group.min":min }, function(err, user) {
          if (err) {
              res.json({success:false,err:err});
          } else {
              for(i in user.age_group.tags) {
                  if(hash[user.age_group.tags[i].name] != undefined ) {
                      hash[user.age_group.tags[i].name] += user.age_group.tags[i].number;
                  } else {
                      hash[user.age_group.tags[i].name] = user.age_group.tags[i].number;
                  }
              }

              //season
              var season = seasonNorth(new Date());
              Male.findOne({ "season.type":season }, function(err, user) {
                  if(err) {
                      res.json({err:err});
                  } else {
                      for(i in user.season.tags) {
                          if(hash[user.season.tags[i].name] != undefined ) {
                              hash[user.season.tags[i].name] += user.season.tags[i].number;
                          } else {
                              hash[user.season.tags[i].name] = user.season.tags[i].number;
                          }
                      }

                      Male.findOne({ "occupation.type":res.body.occupation }, function(err, user) {
                          if(err) {
                              res.json({err:err});
                          } else {
                              for(i in user.occupation.tags) {
                                  if(hash[user.occupation.tags[i].name] != undefined ) {
                                      hash[user.occupation.tags[i].name] += user.occupation.tags[i].number;
                                  } else {
                                      hash[user.occupation.tags[i].name] = user.occupation.tags[i].number;
                                  }
                              }

                            console.log(hash);
                        }
                });
                }
                });


        }
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
