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

router.post('/customer', loginValidator, async (req, res) => {
    let authenticated = false;
    let customerRole="CUSTOMER"
    try {
        validator.validationResult(req).throw();
        let { email, pass } = req.body
        let result=await CustomerModel.findOne({EMAIL:email}).select(["PASS","CUST_ID"])
        console.log(result)
        let hash = result?.PASS
        let cust_id= result?._id
        if (hash) {
            authenticated = await bcrypt.compare(pass, hash)
            console.log(authenticated)
            if(authenticated){ 
                let token=jwt.sign({user:email,role:customerRole},config.JWT_SECRET)
                res.status(200) 
                res.send({ authenticated ,cust_id,token})
            }else {
                res.status(403)
                res.send({ authenticated ,cust_id,token:null})
            }
        } else {
            res.status(403).json({ authenticated })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.post('/restaurant', loginValidator, async (req, res) => {
    let authenticated = false;
    let restRole="RESTAURANT"
    try {
        validator.validationResult(req).throw();
        // restGetUserPass = "select pass,rest_id from restaurant_users where email=?";
        let { email, pass } = req.body
        // let result = await pool.query(restGetUserPass, [email])
        let result=await RestaurantModel.findOne({EMAIL:email}).select(["PASS","CUST_ID"])
        let hash = result?.PASS
        let rest_id= result?._id
        if (hash) {
            authenticated = await bcrypt.compare(pass, hash)
            console.log(authenticated)
            if(authenticated){ 
                let token=jwt.sign({user:email,role:restRole},config.JWT_SECRET)
                res.status(200)
                res.send({ authenticated ,rest_id,token})
            }else{
                res.status(403)
                res.send({ authenticated ,rest_id,token:null})
            }
        } else {
            res.status(403).json({ authenticated })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})
module.exports = router;
exports.verifyUser = passport.authenticate("jwt", { session: false })
