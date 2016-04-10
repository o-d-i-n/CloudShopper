var passport = require('passport');
var Account = require('../models/account');
var Catalog = require('../models/Catalog');
var Male = require('../models/Male');
var Female = require('../models/Female');
var Transaction = require('../models/Transaction');
var Merchant = require('../models/Merchant');
var Analytics = require('../models/Analytics');
var createSeasonResolver = require('date-season')
var express = require('express');

var seasonNorth = createSeasonResolver();
var router = express.Router();
var auth = require('../userLogic/auth');



router.post('/addProduct', function(req,res,next) {

    var tagz = String(req.body.tags).split('.');

  product = new Catalog({
    merchantID: req.body.merchant_id,
    tags: tagz,
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

//  Input age ,tags(seperated by a comma) and merchantID

router.post('/transaction',function(req,res,next) {
    //  Transaction Part Here

    //  var productz = getJsonArray(req.body.products);


    var productz = getJsonArray(req.body.products);
    var tagzo = getTagsArray(req.body.tags);
    //console.log(productz);
    var transaction = new Transaction({
        products: productz,
        buyerID: req.body.buyerID,
        cost: req.body.price,
        merchantID: req.body.merchantID
    });

    transaction.save(function(err,transaction) {
        if(err) {
            //console.log(err);
            return res.json({err:err});
        }
    });

    sendToAnalytics(tagzo,req.body.merchantID,req.body.age);

    //Recommendation Engine Part Here

    var min = getMin(req.body.age);
    //var season = seasonNorth(new Date());
    //console.log(season)
    var tags = String(req.body.tags);

    if(req.body.gender == 'M') {

      Male.findOne({ "age_group.min":min }, function(err, user) {

        if (err) {
            res.json({success:false,err:err});
        }
        //console.log(user);
        if(user != null) {
            //console.log("HEYYYYYY");
            user.age_group.tags = getFinalArray(user.age_group.tags,tags); // gets updated array
            user.save(function(err,features) {
                if(err){
                    res.json({err:err});
                }
            });


        } else {

            var tagged = tagzo; // gets json array input
            var male = new Male({
                      age_group: {
                      min:min,
                      tags:tagzo
                    }
                });

            male.save( function(err,male) {
                if(err) {
                    res.json({err:err});
                }});
        }
        });


        Male.findOne({ "season.types":req.body.season }, function(err, user) {
            if(err) {
                res.json({err:err});
            }
            //console.log(user);
            if(user != null) {
                    console.log("YOOOO")
                    user.season.tags = getFinalArray(user.season.tags,tags);
                    user.save(function(err,features) {
                        if(err) {
                            res.json({err:err});
                        }});
                } else {
                    var tagged = tagzo;
                    console.log(req.body.season);
                    var male = new Male({
                              season: {
                              types:req.body.season,
                              tags:tagged
                            }
                        });

                    male.save( function(err,male) {
                        if(err) {
                            res.json({err:err});
                        }});
                }
            });

                Male.findOne({ "occupation.types":req.body.occupation }, function(err, user) {
                    if(err) {
                        res.json({err:err});
                    }
                    if(user != null){
                            user.occupation.tags = getFinalArray(user.occupation.tags,tags);
                            user.save(function(err,features) {
                                if(err) {
                                    res.json({err:err});
                                }
                            });
                        } else {
                        var tagged = tagzo;
                        var male = new Male({
                                  occupation: {
                                  types:req.body.occupation,
                                  tags:tagged
                                }
                            });

                        male.save( function(err,male) {
                            if(err) {
                                res.json({err:err});
                            }});
                        }
                    });

    } else {
      /*Female.findOne({},function(err,female) {
          //SAME STUFF HERE AS ABOVE
      }*/
    }

    res.json({success:true});
});

router.get('/analytics',function(req,res,next) {
    // get most bought tags
    // get fastest selling?
    // what percentage of what type of users shop here
    // lowest selling



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

function sendToAnalytics(tags,merchantID,age) {

    var array = new Array();
    var hash = new Array();
    for(i in tags) {
        var obj = {
            name: tags[i],
            number: 1
        }
        hash[tags[i]] = 1;
        array.push(obj);
    }

    Analytics.findOne({"merchantID":merchantID},function(err,record) {

        if(err) {
            return;
        }

            if(!record) {
                var analytics = new Analytics({
                    merchantID: merchantID,
                    tags: array
            });

            if(age < 18) {
                analytics.kid = 1
            } else if(age > 25) {
                analytics.adult = 1
            } else {
                analytics.youngster = 1
            }

            analytics.save(function(err,record) {
                if(err) {
                    return res.json({err:err});
                } else {
                return;
                }
            });

        } else {
            for(i in record.tags) {
                if(hash[record.tags[i].name]) {
                    record.tags[i].number += 1;
                }
            }

            if(age < 18) {
                record.kid = 1
            } else if(age > 25) {
                record.adult = 1
            } else {
                record.youngster = 1
            }

            record.save(function(err,recordz) {
                if(err) {
                    return res.json({err:err});
                } else {
                    return;
                }
            });
        }
    });

}


function getTagsArray(tags) {
    tags = String(tags).split('.');

    var array = new Array();

    for(i in tags) {
        var obj = {
            name:tags[i],
            number:1
        };
        array.push(obj);
    }

    return array;
}

function getJsonArray(tags) {

    var tagg = new Array();
    var tagged = new Array();
    tagg = String(tags).split('.');

    for(i in tagg) {
        tagged.push(JSON.parse(tagg[i]));
    }
    //console.log(tagged);
    return tagged;
}

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

    Merchant.findById(req.body.merchantID, function (err, merchant) {
        if(err){
            return res.json({success:false, error:err});
        }
        if(!merchant){
            return res.json({success:false, error:"merchant not found"});
        }

        //currently incomplete

    });

    Merchant.findByIdAndRemove(req.body.merchantID,function (err, merchant) {
        if (err || !merchant) {
            res.json({success: false, err: err, yolo: '2'});
        } else {
            res.json({success: true});
        }

    });
});

router.post('/listAllMerchant', function(req,res,next){

    Merchant.find({}, function(err, merchant) {
        if(err) res.json({success : false, err: err});
        else {
            res.json({merchants: merchant});

        }
    })
});


router.post('/listMerchantCatalog', auth.parseString, function(req,res,next){

    Catalog.find({merchantID : req.body.merchant}, function(err, product) {
        if(err) res.json({success : false, err: err});
        else {
            res.json({success : true, product : product});

        }
    })
});





module.exports = router;
