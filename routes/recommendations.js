var passport = require('passport');
var Account = require('../models/account');
var mongoose = require('mongoose');
var Catalog = require('../models/Catalog');
var Male = require('../models/Male');
var Female = require('../models/Female');
var Transaction = require('../models/Transaction');
var createSeasonResolver = require('date-season');
var Schema = mongoose.Schema;
var express = require('express');


var router = express.Router();
var auth = require('../userLogic/auth')
var seasonNorth = createSeasonResolver();

router.post('/',function(req,res,next) {
    var hash = new Array();

    if(req.body.gender == "M") {
        var min = getMin(req.body.age);
        //Age Group
        Male.findOne({ "age_group.min":min }, function(err, user) {
          if (err) {
              res.json({success:false,err:err});
          } else {console.log(user.age_group);
              if(user) {
              for(i in user.age_group.tags) {
                  if(hash[user.age_group.tags[i].name] != undefined ) {
                      hash[user.age_group.tags[i].name] += user.age_group.tags[i].number;
                  } else {
                      hash[user.age_group.tags[i].name] = user.age_group.tags[i].number;
                  }
              }
              }

              //season
              var season = seasonNorth(new Date());
              Male.findOne({ "season.types":req.body.season }, function(err, user) {
                  if(err) {
                      res.json({err:err});
                  } else {
                      if(user) {
                      for(i in user.season.tags) {
                          if(hash[user.season.tags[i].name] != undefined ) {
                              hash[user.season.tags[i].name] += user.season.tags[i].number;
                          } else {
                              hash[user.season.tags[i].name] = user.season.tags[i].number;
                          }
                      }
                    }

                      Male.findOne({ "occupation.types":req.body.occupation }, function(err, user) {
                          if(err) {
                              res.json({err:err});
                          } else {
                              if(user) {
                              for(i in user.occupation.tags) {
                                  if(hash[user.occupation.tags[i].name] != undefined ) {
                                      hash[user.occupation.tags[i].name] += user.occupation.tags[i].number;
                                  } else {
                                      hash[user.occupation.tags[i].name] = user.occupation.tags[i].number;
                                  }
                              }
                            }

                            //console.log(hash);
                            // Getting best of the tags set from a particular store
                            var tagArray = new Array();

                            for(var i in hash) {
                                tagArray.push(i);
                            }
                            console.log(tagArray);
                            var id = req.body.merchantID;
                            Catalog.find( { $and : [
                                {$or : [{"merchantID":id}] },
                                {$or : [{ tags: {$in: tagArray} }] }
                            ]},function(err,finals) {
                                    if(err) {
                                        res.json({success:false,err:err});
                                    } else {
                                        for(i in finals) {
                                            var score = 0;
                                            for(j in finals[i].tags) {
                                                score += hash[finals[i].tags[j]];
                                            }
                                        }



                                        //Score finals
                                    res.json({success:true,finals:finals});
                                    }
                                });

                        }
                });
                }
                });


        }
        });

    } else {
        // Do for Females too
        res.json({success:true});
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
