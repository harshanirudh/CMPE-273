var express = require('express');
var validator = require('express-validator');
const Restaurant = require('../models/RestaurantModel');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()

router.post('/:restId', async (req, res) => {
    try {
        Restaurant.findById(req.params.restId).then((result)=>{
            console.log(result)
            result.IMAGE.push(req.body.img)
            result.save();
            res.send(result)
        }).catch(err=>{
            console.log(err)
            res.send(err)
        })

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})
router.get('/:restId', async (req, res) => {
    try {
        let result=await Restaurant.findById(req.params.restId).select('IMAGE')
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router
