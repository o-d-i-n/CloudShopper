
var passport = require('passport');
var express = require('express');
var Account = require('../models/account');

var user = {

  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
  }
}

module.exports = user;
