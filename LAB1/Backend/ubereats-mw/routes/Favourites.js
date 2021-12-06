var express = require('express');
var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var favourites=require('../models/CustomerFavouritesModel');
const RestaurantModel = require('../models/RestaurantModel');
// var kafka = require('../kafka/client');
const { checkAuth } = require('../JwtStrategy');
router.post('/add/:custId/:restId',checkAuth,async(req,res)=>{
    // try{
    // const fav=new favourites({
    //     CUST_ID:req.params.custId,
    //     REST_ID:req.params.restId
    // })
    // let result=await fav.save()
    // res.send(result)
    // }catch(err){
    //     console.log(err)
    //     res.status(500).send(err)
    // }

    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('save_favourites',payload, function(err,results){
        if (err){
            console.log("Inside err of save_favourites kafka make_request", err);
            res.json(err)
        }else{
            console.log("Inside succes of save_favourites kakka make_request");
                res.status(201).send(results)
            }
        
    });
})
/**
 * To be converted to mongo
 */
router.delete('/delete/:favId',checkAuth,async(req,res)=>{
    // try{
    //     let removeFav="delete from CUSTOMER_FAVOURITES where fav_id=?"
    //     let result=await pool.query(removeFav,[req.params.favId]);
    //     let affectedRows = await result[0].affectedRows
    //      res.status(200).json({ affectedRows })
    // }catch(err){
    //     console.log(err)
    //     res.status(500).send(err)
    // }

    // let payload={
    //     params:req.params,
    //     body:req.body
    // }
    // kafka.make_request('save_favourites',payload, function(err,results){
    //     if (err){
    //         console.log("Inside err of save_favourites kafka make_request", err);
    //         res.json(err)
    //     }else{
    //         console.log("Inside succes of save_favourites kakka make_request");
    //             res.status(201).send(results)
    //         }
        
    // });
})

router.get('/customer/:custId',checkAuth,async(req,res)=>{
    // try{
    //     let result=await favourites.find({CUST_ID:req.params.custId}).distinct('REST_ID');
    //     res.send(result)
    // }catch(err){
    //     console.log(err)
    //     res.status(500).send(err)
    // }
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('get_favourites_custId',payload, function(err,results){
        if (err){
            console.log("Inside err of save_favourites kafka make_request", err);
            res.json(err)
        }else{
            console.log("Inside succes of save_favourites kakka make_request");
                res.status(201).send(results)
            }
        
    });
})
/**
 * Get All favourites restaurant details for a customer
 */
router.get('/details/customer/:custId',checkAuth,async(req,res)=>{
    // try{
    //     let restIDArr=await favourites.find({CUST_ID:req.params.custId}).distinct('REST_ID');
    //     let result=await RestaurantModel.find({'_id':{
    //         $in:restIDArr
    //     }})
    //     res.send(result)
    // }catch(err){
    //     console.log(err)
    //     res.status(500).send(err)
    // }
    let payload={
        params:req.params,
        body:req.body
    }
    kafka.make_request('get_favourites_details_custId',payload, function(err,results){
        if (err){
            console.log("Inside err of save_favourites kafka make_request", err);
            res.json(err)
        }else{
            console.log("Inside succes of save_favourites kakka make_request");
                res.status(200).send(results)
            }
        
    });
})
module.exports=router