
var passport = require('passport');
var express = require('express');
var Account = require('../models/account');

var user = {

  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
},

    parseJSON: function(req, res, next) {
        req.body = JSON.parse(Object.keys(req.body)[0]);
        next();
    }
}

module.exports = user;
