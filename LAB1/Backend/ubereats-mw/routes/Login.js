const { json } = require('express');
const bcrypt = require('bcryptjs');
var express = require('express');
var validator = require('express-validator');
const jwt = require('jsonwebtoken');
var router = express.Router();
var pool = require('./../db-config')
var service = require('./../services/users-service')
var config =require('../config')
var session = require('express-session');
const loginValidator = validator.check(['email', 'pass'], 'Bad Request').exists()
router.post('/customer', loginValidator, async (req, res) => {
    let authenticated = false;
    let customerRole="CUSTOMER"
    try {
        validator.validationResult(req).throw();
        customerGetUserPass = "select pass,cust_id from uber_eats.customer_users where email=?";
        let { email, pass } = req.body
        let result = await pool.query(customerGetUserPass, [email])
        let hash = result[0][0]?.pass
        let cust_id= result[0][0]?.cust_id
        if (hash) {
            authenticated = await bcrypt.compare(pass, hash)
            console.log(result[0][0].pass)
            // let token=jwt.sign({user:email,role:customerRole},config.JWT_SECRET)
            authenticated ? res.status(200) : res.status(403)
            // res.json({ authenticated })
            res.cookie('cookie',{ authenticated ,cust_id},{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = cust_id;
            res.send({ authenticated ,cust_id})
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
        restGetUserPass = "select pass,rest_id from restaurant_users where email=?";
        let { email, pass } = req.body
        let result = await pool.query(restGetUserPass, [email])
        let hash = result[0][0]?.pass
        // console.log(config.JWT_SECRET)
        // let token=jwt.sign({user:email,role:restRole},config.JWT_SECRET)
        let rest_id= result[0][0]?.rest_id
        if (hash) {
            authenticated = await bcrypt.compare(pass, hash)
            console.log(result[0][0].pass)
            authenticated ? res.status(200) : res.status(403)
            res.cookie('restCookie',{ authenticated ,rest_id},{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = rest_id;
            res.send({ authenticated ,rest_id})
        } else {
            res.status(403).json({ authenticated })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})
module.exports = router;