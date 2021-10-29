const { json } = require('express');
const bcrypt = require('bcryptjs');
var express = require('express');
var validator = require('express-validator');
const jwt = require('jsonwebtoken');
var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var service = require('./../services/users-service')
var config =require('../config')
var session = require('express-session');
const CustomerModel=require('../models/CustomerModel')
const passport=require('passport');
const RestaurantModel = require('../models/RestaurantModel');
const loginValidator = validator.check(['email', 'pass'], 'Bad Request').exists()
var kafka = require('../kafka/client');

router.post('/customer', loginValidator, async (req, res) => {
    try {
        validator.validationResult(req).throw();
        let payload = {
          params: req.params,
          body: req.body
        }
        kafka.make_request('login_customer', payload, function (err, results) {
          if (err) {
            console.log("Inside err of save_customer kafka make_request", err);
            res.status(500).json(err)
          } else {
            console.log("Inside succes of save_customer kakka make_request");
            if(results.authenticated===true)
                res.status(200)
            else
                res.status(403)
            res.send(results)
          }
    
        });
      } catch (err) {
        res.status(400).send(err)
      }
})

router.post('/restaurant', loginValidator, async (req, res) => {
    try {
        validator.validationResult(req).throw();
        let payload = {
          params: req.params,
          body: req.body
        }
        kafka.make_request('login_restaurant', payload, function (err, results) {
          if (err) {
            console.log("Inside err of login_restaurant kafka make_request", err);
            res.status(500).json(err)
          } else {
            console.log("Inside succes of login_restaurant kakka make_request");
            if(results.authenticated===true)
                res.status(200)
            else
                res.status(403)
            res.send(results)
          }
    
        });
      } catch (err) {
        res.status(400).send(err)
      }
})
module.exports = router;
exports.verifyUser = passport.authenticate("jwt", { session: false })
