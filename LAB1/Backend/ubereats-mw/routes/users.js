const { json } = require('express');
const bcrypt = require('bcryptjs');
var express = require('express');
var validator = require('express-validator');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var service = require('./../services/users-service');
const app = require('../app');
const Customer = require('../models/CustomerModel');
const Restaurant = require('../models/RestaurantModel')
var kafka = require('../kafka/client');
const { checkAuth } = require('../JwtStrategy');
/**
 * Define the no of salt rounds for hashing
 */
const saltRounds = 5;
/* GET users listing. */
router.get('/customers',checkAuth, async function (req, res, next) {
  try {
    res.json(await service.getCustomerUsers());
  } catch (err) {
    res.status(500).send(err)
  }
});

/**
 * Get customers by customer ID
 */
router.get('/customers/:id',checkAuth, async function (req, res) {
  let payload = {
    params: req.params,
    body: req.body
  }
  kafka.make_request('get_customer_byId', payload, function (err, results) {
    if (err) {
      console.log("Inside err of kafka make_request", err);
      res.status(500).json(err)
    } else {
      console.log("Inside succes of kakka make_request");
      res.status(200).send(results)
    }

  });
});
/**
 * Save new Customer
 */
const customerPostValidator = validator.check(['fname', 'lname', 'email', 'pass'], 'Bad Request').exists();
router.post('/customer', customerPostValidator, checkAuth,async (req, res) => {
  try {
    validator.validationResult(req).throw();
    let payload = {
      params: req.params,
      body: req.body
    }
    kafka.make_request('save_customer', payload, function (err, results) {
      if (err) {
        console.log("Inside err of save_customer kafka make_request", err);
        res.status(500).json(err)
      } else {
        console.log("Inside succes of save_customer kakka make_request");
        res.status(200).send(results)
      }

    });
  } catch (err) {
    res.status(400).send(err)
  }
})
/**
 * Update Customer Profile
 */
const custPutValidator = validator.check(['about', 'add', 'city', 'country', 'dob', 'email', 'fname', 'lname', 'phone', 'state'], 'Bad Request').exists()
router.put('/customer/:id', custPutValidator,checkAuth, async (req, res) => {
  try {
    validator.validationResult(req).throw();
    let payload = {
      params: req.params,
      body: req.body
    }
    kafka.make_request('update_customer', payload, function (err, results) {
      if (err) {
        console.log("Inside err of update_customer kafka make_request", err);
        res.status(500).json(err)
      } else {
        console.log("Inside succes of update_customer kakka make_request");
        res.status(200).send(results)
      }

    });
  } catch (err) {
    res.status(400).send(err)
  }
})
/**
 * Get Customers Location from profile
 */
router.get('/customer/location/:id',checkAuth, async (req, res) => {
  let payload = {
    params: req.params,
    body: req.body
  }
  kafka.make_request('customer_location', payload, function (err, results) {
    if (err) {
      console.log("Inside err of customer_location kafka make_request", err);
      res.status(500).json(err)
    } else {
      console.log("Inside succes of customer_location kakka make_request");
      res.status(200).send(results)
    }

  });
})

/**
 * Get All Unique restaurants and single image
 */
router.get('/restarunt',checkAuth, async (req, res) => {
  let payload = {
    params: req.params,
    body: req.body
  }
  kafka.make_request('get_restaurants_list', payload, function (err, results) {
    if (err) {
      console.log("Inside err of customer_location kafka make_request", err);
      res.status(500).json(err)
    } else {
      console.log("Inside succes of customer_location kakka make_request");
      res.status(200).send(results)
    }

  });
})
/**
 * Get restaurant by restaurant ID
 */
router.get('/restarunt/:id', checkAuth,async (req, res) => {
  let payload = {
    params: req.params,
    body: req.body
  }
  kafka.make_request('get_restaurants_byId', payload, function (err, results) {
    if (err) {
      console.log("Inside err of get_restaurants_byId kafka make_request", err);
      res.status(500).json(err)
    } else {
      console.log("Inside succes of get_restaurants_byId kakka make_request");
      res.status(200).send(results)
    }

  });
})
/**
 * Save New Restaurant
 */
const restPostValidator = validator.check(['add', 'city', 'country', 'email', 'pass', 'rname', 'state', 'zipcode'], 'Bad Request').exists();
router.post('/restaurant', restPostValidator,checkAuth, async (req, res) => {
  try {
    validator.validationResult(req).throw();
    let payload = {
      params: req.params,
      body: req.body
    }
    kafka.make_request('save_restaurant', payload, function (err, results) {
      if (err) {
        console.log("Inside err of save_restaurant kafka make_request", err);
        res.status(500).json(err)
      } else {
        console.log("Inside succes of save_restaurant kakka make_request");
        res.status(200).send(results)
      }

    });
  } catch (err) {
    res.status(400).send(err)
  }
})

/**
 * Update Restaurant profile
 * 
 */
const restPutValidator = validator.check(['add', 'city', 'country', 'email', 'rname', 'state', 'zipcode', 'rdeliverymode'], 'Bad Request').exists();
router.put('/restaurant/:id', restPutValidator, checkAuth,async (req, res) => {
  try {
    validator.validationResult(req).throw();
    let payload = {
      params: req.params,
      body: req.body
    }
    kafka.make_request('update_restaurant', payload, function (err, results) {
      if (err) {
        console.log("Inside err of update_restaurant kafka make_request", err);
        res.status(500).json(err)
      } else {
        console.log("Inside succes of update_restaurant kakka make_request");
        res.status(200).send(results)
      }

    });
  } catch (err) {
    res.status(400).send(err)
  }
})
module.exports = router;
