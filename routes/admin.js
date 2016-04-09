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
    var prod = new Array();
    var productz = new Array();
    console.log(req.body.products)
    prod = String(req.body.products).split('.');
    for(i in prod) {
        productz.push(JSON.parse(prod[i]));
    }


    var transaction = new Transaction({
        products: productz,
        buyerID: req.body.buyerID,
        cost: req.body.price,
        merchantID: req.body.merchantID
    });

    transaction.save(function(err,transaction) {
        if(err) {
            console.log(err);
        } else {
            //res.json({transaction:transaction});
            console.log(transaction);
        }
    });

    //Recommendation Engine Part Here

    var min = getMin(req.body.age);
    var season = seasonNorth(new Date());
    var tags = String(req.body.tags);

    if(req.body.gender == 'M') {

      Male.findOne({ "age_group.min":min }, function(err, user) {

        if (err) {

            res.json({success:false,err:err});

        } else {
                //console.log(req.body.tags);
                user.age_group.tags = getFinalArray(user.age_group.tags,tags);
                user.save(function(err,features) {
                    if(err) {
                        res.json({err:err});
                    } else {
                        Male.findOne({ "season.type":season }, function(err, user) {
                            if(err) {
                                res.json({err:err});
                            } else {
                                user.season.tags = getFinalArray(user.season.tags,tags);
                                user.save(function(err,features) {
                                    if(err) {
                                        res.json({err:err});
                                    } else {
                                        Male.findOne({ "occupation.type":req.body.occupation }, function(err, user) {
                                            if(err) {
                                                res.json({err:err});
                                            } else {
                                                user.occupation.tags = getFinalArray(user.occupation.tags,tags);
                                                user.save(function(err,features) {
                                                    if(err) {
                                                        res.json({err:err});
                                                    } else {
                                                        res.json({features:features});
                                                    }
                                                });
                                            }
                                        });
                                    }
                                })
                            }
                        });
                    }
                });
                }
            });
            /* else {

                var male = new Male({
                        age_group: {
                          min:18,
                          max:24,
                          tags:[{
                            name:"shirt",
                            number:15
                          }]
                        }
                    });

                male.save( function(err,male) {
                    if(err) {
                        res.json({err:err});
                    } else {
                        res.json({male:male});
                    }
                });

            }*/


    } else {
      /*Female.findOne({},function(err,female) {
          //SAME STUFF HERE AS ABOVE
      }*/
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

function getFinalArray(user_tags,tags) {


        tags = tags.split('.');
        var hash  = new Array();
        //console.log(tagArray);

        for(i in user_tags) {
            hash[user_tags[i].name] = user_tags[i].number;
        }
        //console.log(hash);
        for(i in tags) {
            if(hash[tags[i]] == undefined) {
                //console.log(req.body.tags[i]);
                hash[tags[i]] = 1;
            } else {
                hash[tags[i]] += 1;
            }
        }


        var array = new Array();
        for(var i in hash) {
            var obj = {
                name: i,
                number:hash[i]
            };
            array.push(obj);
        }

        return array;


}


module.exports = router;
