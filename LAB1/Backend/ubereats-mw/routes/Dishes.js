
var express = require('express');
var validator = require('express-validator');
const DishesModel = require('../models/DishesModel');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var service = require('./../services/users-service');
var kafka = require('../kafka/client');

router.post('/:id/dish',async(req,res)=>{
    
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('save_dish',payload, function(err,results){
        if (err){
            console.log("Inside err of kafka make_request", err);
            res.json(err)
        }else{
                res.status(201).send(results)
            }
        
    });
})

/**
 * Update Restaurant dish by ID
 */
router.put('/:id/dish/:dishId',async(req,res)=>{
    
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('update_dish',payload, function(err,results){
        if (err){
            console.log("Inside err of update_dish kafka make_request", err);
            res.json(err)
        }else{
                res.status(201).send(results)
            }
        
    });
})


/**
 * Get a dish by id and restaurant id
 */
router.get('/:id/dish/:dishId',async(req,res)=>{
    
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('get_dish_byId',payload, function(err,results){
        if (err){
            console.log("Inside err of update_dish kafka make_request", err);
            res.json(err)
        }else{
                res.status(201).send(results)
            }
        
    });
})

router.get('/:id/dishes',async(req,res)=>{
   
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('get_all_dishes',payload, function(err,results){
        if (err){
            console.log("Inside err of update_dish kafka make_request", err);
            res.json(err)
        }else{
                res.status(201).send(results)
            }
        
    });
})
/**
 * Get restIDs on dish name search
 */

router.post('/searchBy/dishes',async(req,res)=>{
   
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('searchBy_dishName',payload, function(err,results){
        if (err){
            console.log("Inside err of update_dish kafka make_request", err);
            res.json(err)
        }else{
                res.status(201).send(results)
            }
        
    });
})

router.get('/searchBy/type/:type',async(req,res)=>{
    
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('searchBy_dishType',payload, function(err,results){
        if (err){
            console.log("Inside err of update_dish kafka make_request", err);
            res.json(err)
        }else{
                res.status(201).send(results)
            }
        
    });
})

module.exports =router