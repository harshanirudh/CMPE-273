var express = require('express');
var validator = require('express-validator');
const Restaurant = require('../models/RestaurantModel');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
// var kafka = require('../kafka/client');
var passport=require('passport');
const { checkAuth } = require('../JwtStrategy');

router.post('/:restId',checkAuth, async (req, res) => {
    let payload = {
        params: req.params,
        body: req.body
      }
      kafka.make_request('save_restImage', payload, function (err, results) {
        if (err) {
          console.log("Inside err of save_restImage kafka make_request", err);
          res.status(500).json(err)
        } else {
          console.log("Inside succes of save_restImage kakka make_request");
          res.status(200).send(results)
        }
})
})
router.get('/:restId',passport.authenticate('jwt', { session: false }), async (req, res) => {
    let payload = {
        params: req.params,
        body: req.body
      }
      kafka.make_request('get_restImage', payload, function (err, results) {
        if (err) {
          console.log("Inside err of get_restImage kafka make_request", err);
          res.status(500).json(err)
        } else {
          console.log("Inside succes of get_restImage kakka make_request");
          res.status(200).send(results)
        }
})
})

module.exports = router
