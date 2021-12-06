var express = require('express');
var validator = require('express-validator');
const DeliveryAddressModel = require('../models/DeliveryAddressModel');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var service = require('./../services/users-service');
// var kafka = require('../kafka/client');
const { checkAuth } = require('../JwtStrategy');

router.post('/add/:custId',checkAuth,async(req,res)=>{
    // try{
    // let {name,add,city,zipcode}=req.body
    // const delAdd=new DeliveryAddressModel({
    //     CUST_ID:req.params.custId,
    //     CNAME:name,
    //     ADDRESS:add,
    //     CITY:city,
    //     ZIPCODE:zipcode
    // })
    // let result=await delAdd.save({new:true})
    // res.status(201).send(result)
    // }
    // catch(err){
    //     console.log(err);
    //     res.status(500).send(err)
    // }
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('post_delivery_address',payload, function(err,results){
        if (err){
            console.log("Inside err of kafka make_request", err);
            res.json(err)
        }else{
            console.log("Inside succes of kakka make_request");
                res.status(201).send(results)
            }
        
    });
});


router.get('/:custId',checkAuth,async(req,res)=>{
    // try{
    //     let result=await DeliveryAddressModel.find({CUST_ID:req.params.custId})
    //     res.send(result)
    // }catch(err){
    //     console.log(err)
    //     res.status(500).send(err)
    // }
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('get_delivery_address',payload, function(err,results){
        if (err){
            console.log("Inside err of kafka make_request", err);
            res.json(err)
        }else{
            console.log("Inside succes of kakka make_request");
                res.status(200).send(results)
            }
        
    });
})

module.exports=router