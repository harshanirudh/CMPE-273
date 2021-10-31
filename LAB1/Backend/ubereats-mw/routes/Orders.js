
var express = require('express');
var validator = require('express-validator');
const OrdersModel = require('../models/OrdersModel');
const RestaurantModel = require('../models/RestaurantModel');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var service = require('./../services/users-service');
const {verifyUser}=require('./Login')
const passport=require('passport');
var kafka = require('../kafka/client');
/**
 * Save New Order
 */
router.post('/new',async(req,res)=>{
    let payload = {
        params: req.params,
        body: req.body
      }
      kafka.make_request('save_order', payload, function (err, results) {
        if (err) {
          console.log("Inside err of save_order kafka make_request", err);
          res.status(500).json(err)
        } else {
          console.log("Inside succes of save_order kakka make_request");
          res.status(200).send(results)
        }
})
})
router.get('/customer/:custId',async(req,res)=>{
    let payload = {
        params: req.params,
        body: req.body
      }
      kafka.make_request('get_orders_customer', payload, function (err, results) {
        if (err) {
          console.log("Inside err of get_orders_customer kafka make_request", err);
          res.status(500).json(err)
        } else {
          console.log("Inside succes of get_orders_customer kakka make_request");
          res.status(200).send(results)
        }
})
})

router.get('/restaurant/:restId',async(req,res)=>{
    let payload = {
        params: req.params,
        body: req.body
      }
      kafka.make_request('get_orders_restaurant', payload, function (err, results) {
        if (err) {
          console.log("Inside err of save_restImage kafka make_request", err);
          res.status(500).json(err)
        } else {
          console.log("Inside succes of save_restImage kakka make_request");
          res.status(200).send(results)
        }
})
})
module.exports=router
router.put('/edit/:orderId',async(req,res)=>{
    let payload = {
        params: req.params,
        body: req.body
      }
      kafka.make_request('update_orderStatus', payload, function (err, results) {
        if (err) {
          console.log("Inside err of update order status kafka make_request", err);
          res.status(500).json(err)
        } else {
          console.log("Inside succes of update order status kakka make_request");
          res.status(200).send(results)
        }
})
})
