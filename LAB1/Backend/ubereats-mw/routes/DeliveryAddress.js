var express = require('express');
var validator = require('express-validator');
const DeliveryAddressModel = require('../models/DeliveryAddressModel');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var service = require('./../services/users-service');

router.post('/add/:custId',async(req,res)=>{
    try{
    let {name,add,city,zipcode}=req.body
    const delAdd=new DeliveryAddressModel({
        CUST_ID:req.params.custId,
        CNAME:name,
        ADDRESS:add,
        CITY:city,
        ZIPCODE:zipcode
    })
    let result=await delAdd.save({new:true})
    res.status(201).send(result)
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
})

router.get('/:custId',async(req,res)=>{
    try{
        let result=await DeliveryAddressModel.find({CUST_ID:req.params.custId})
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports=router