var passport = require('passport');
var Account = require('../models/account');
var Catalog = require('../models/Catalog');
var Male = require('../models/Male');
var Female = require('../models/Female');
var express = require('express');


var router = express.Router();
var auth = require('../userLogic/auth')


router.post('/addProduct',auth.ensureAuthenticated,function(req,res,next) {

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

});

router.post('/transaction',function(req,res,next) {
    //Transaction Part Here

    //Recommendation Engine Part Here

    var min = 18;
    var max = 25;

    if(req.body.gender == 'M') {

      Male.findOne({ "age_group.min":18 }, function(err, user) {

        if (err) {

            res.json({success:false,err:err});

        } else {

                var tags = String(req.body.tags);
                //console.log(req.body.tags);

                req.body.tags = tags.split('.');
                var hash  = new Array();
                //console.log(tagArray);

                for(i in user.age_group.tags) {
                    hash[user.age_group.tags[i].name] = user.age_group.tags[i].number;
                }
                //console.log(hash);
                for(i in req.body.tags) {
                    if(hash[req.body.tags[i]] == undefined) {
                        //console.log(req.body.tags[i]);
                        hash[req.body.tags[i]] = 1;
                    } else {
                        hash[req.body.tags[i]] += 1;
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


                user.age_group.tags = array;
                user.save(function(err,features) {
                    if(err) {
                        res.json({err:err});
                    } else {
                        console.log(features);
                        res.json({err:false,algo_features:features});
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
      Female.findOne({},function(err,female) {

      });
    }
});

module.exports = router;
